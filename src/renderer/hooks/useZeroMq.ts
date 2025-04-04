import { useContext, useEffect, useRef, useState } from 'react';
import { ZeroMqContext } from '../contexts/zeroMqContext';
import type { IZeroMqHooks } from '../types/zeromq';
import { SOCKET_TYPE } from '../../types/zeroMqEnums';
import type { Command, RequestId } from '../../types/command';

/**
 * ZeroMQ 기능을 사용할 수 있게 하는 커스텀 훅<br/>
 * key 및 그에 맞는 포트 정보와 패턴은 /services/zeromq/defaultConfig.ts에 지정되어 있음.<br/>
 * @returns 다음의 3가지 기능을 각각 제공하는 함수들을 정의한 인터페이스. 필요한 것만 선언해서 사용할 것.<br/>
 * - send: 주어진 key로 요청을 보내고 답이 있는 경우 답을 받음. REQ, PUSH 대응.<br/>
 * - useDealer: Router-Dealer 패턴을 지원하기 위한 함수들을 제공. DEALER 대응. 상세 사용법은 example 참조.<br/>
 * - useReceive: 주어진 key에 맞는 callback 함수 등록 (SUB의 경우 topic도 필요). SUB, PULL 대응.<br/>
 * @example
 * // 1. REQ
 * const { send } = useZeroMq(); *
 * const data = await send('user-data', { id: 1 });
 * console.log(data);
 *
 * // 2. PUSH
 * // PUSH key로 send를 수행할 경우 성공 여부를 나타내는 boolean 값을 리턴함.
 * const { send } = useZeroMq();
 * const success: boolean = await send('update-user', { id: 1, name: 'Random-Name' });
 *
 * // 3. DEALER
 * // useDealer 호출 필요. useDelaer의 리턴값으로 아래 3개의 함수를 제공함.
 * // options.persistent가 true라면 callback이 수행된 후 삭제하지 않고 resendMessage로 동일한 콜백을 재사용할 수 있다.
 * // - sendMessage: 세팅된 key, callback을 사용하여 message를 보냄.
 * // - unsubscribe: 기존 세팅된 key 및 callback 수동으로 제거. 단 컴포넌트 언마운트 시에는 이미 unsubscribe를 호출하므로 굳이 부를 필요는 없다.
 * const { useDealer } = useZeroMq();
 * const { sendMessage, unsubscribe } = useDealer('user-data', (message) => {
 *   console.log(data);
 * }, { persistent: true });
 * // 요청 보낼 때마다 message를 새로 만들어서 보내야 하며 이 때 requestId는 반드시 필요.
 * sendMessage({ requestId: 'id', id: 1 });
 *
 * // 4. SUB
 * // SUB의 경우 options.topic을 반드시 지정해야 한다.
 * const { useReceive } = useZeroMq();
 * useReceive('notification', (message) => {
 *   console.log('New notification:', message);
 * }, { topic: 'user' });
 *
 * // 5. PULL
 * // PULL의 경우 options를 사용하지 않음.
 * const { useReceive } = useZeroMq();
 * useReceive('tasks-channel', {}, (task) => {
 *   console.log('New task:', task);
 * });
 */
export const useZeroMQ = (): IZeroMqHooks => {
  const context = useContext(ZeroMqContext);
  if (!context)
    throw new Error('useZeroMQ must be used within a ZeroMqProvider');

  return {
    send: async (key: string, message: Command): Promise<any> => {
      const config = context.getEndpointConfig(key);
      if (!config) {
        console.error(`Endpoint configuration not found for key: ${key}`);
        return false;
      }

      switch (config.type) {
        case SOCKET_TYPE.REQ:
          return await context.request(key, message);
        case SOCKET_TYPE.PUSH:
          return await context.push(key, message);
        case SOCKET_TYPE.DEALER:
          console.error('ROUTER-DEALER pattern does not support direct sending. Use useDealer instead.');
          return false;
        case SOCKET_TYPE.SUB:
          console.error('PUB-SUB pattern does not support direct sending. Use useReceive instead.');
          return false;
        default:
          console.error(`Unsupported socket type: ${config.type}`);
          return false;
      }
    },

    useDealer: (key: string, callback: (response: any) => void): {
      sendMessage: (message: Command) => Promise<void>;
      unsubscribe: () => void;
    } => {
      const config = context.getEndpointConfig(key);
      if (!config)
        throw new Error(`Endpoint configuration not found for key: ${key}`);

      if (config.type !== SOCKET_TYPE.DEALER)
        throw new Error(`Socket type ${config.type} does not support ROUTER-DEALER pattern.`);

      const [subscriptions, setSubscriptions] = useState<Record<RequestId, {
        resend: (newMessage: Command) => Promise<void>;
        cancel: () => void;
      }>>({});

      const lastResendRef = useRef<{
        function: ((newMessage: Command) => Promise<void>) | null;
        key: string;
      }>({ function: null, key });

      const sendMessage = async (message: Command): Promise<void> => {
        // requestId가 없으면 이후 처리를 수행하지 않음.
        if (!message.requestId)
          return;

        try {
          if (lastResendRef.current.function && lastResendRef.current.key === key) {
            await lastResendRef.current.function(message);
          } else {
            const result = await context.dealer(key, message, callback);
            lastResendRef.current = { function: result.resend, key };
            setSubscriptions(prev => ({
              ...prev,
              [message.requestId]: {
                resend: result.resend,
                cancel: result.cancel
              }
            }));
          }
        } catch (error) {
          console.error('Error in useDealer', error);
          throw error;
        }
      };

      const unsubscribe = () => {
        const uniqueUnsubscribes = new Set<() => void>();
        Object.values(subscriptions).forEach(sub => {
          uniqueUnsubscribes.add(sub.cancel);
        });

        uniqueUnsubscribes.forEach(unsub => unsub());

        lastResendRef.current.function = null;
        setSubscriptions({});
      }

      // key 변경시 resend 초기화
      useEffect(() => {
        lastResendRef.current.key = key;
        if (lastResendRef.current.function)
          lastResendRef.current.function = null;
      }, [key]);

      useEffect(() => {
        return () => {
          unsubscribe();
        };
      }, []);

      return { sendMessage, unsubscribe };
    },

    useReceive: (key: string, callback: (message: any) => void, options: { topic?: string } = {}): void => {
      useEffect(() => {
        let unsubscribe: (() => void) | undefined;
        const cleanup = () => {
          if (unsubscribe)
            unsubscribe();
        }

        const setup = async () => {
          try {
            const config = context.getEndpointConfig(key);
            if (!config) {
              console.error(`Endpoint configuration not found for key: ${key}`);
              return cleanup;
            }

            switch (config.type) {
              case SOCKET_TYPE.SUB:
                if (!options.topic) {
                  console.error(`Topic is required for PUB-SUB pattern`);
                  return cleanup;
                }
                unsubscribe = await context.subscribe(key, options.topic, callback);
                break;

              case SOCKET_TYPE.PULL:
                unsubscribe = await context.pull(key, callback);
                break;

              default:
                console.error(`Socket type ${config.type} does not support subscription`);
                return cleanup;
            }
          } catch (error) {
            console.error('Subscription setup error:', error);
          }
        };

        setup().then();

        return cleanup;
      }, [key, options.topic, callback]);
    }
  };
}
