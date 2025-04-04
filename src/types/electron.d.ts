import type { SubscriptionMessage } from './zeroMq';
import type { SocketType } from './zeroMqEnums';

declare namespace Electron {
  type Ipc = {
    send: (channel: string, data: any) => void;
    invoke: (channel: string, data: any) => Promise<any>;
    receive: (channel: string, func: (...args: any[]) => void) => void;
    removeListeners: (channel: string) => void;
  }

  type Zmq = {
    createSocket: (type: SocketType) => Promise<number>;
    connect: (socketId: number, endpoint: string) => Promise<boolean>;
    setIdentity: (socketId: number, identity: string) => Promise<boolean>;
    send: (socketId: number, message: any) => Promise<boolean>;
    receive: (socketId: number) => Promise<any>;
    subscribe: (socketId: number, topic: string) => Promise<boolean>;
    unsubscribe: (socketId: number, topic: string) => Promise<boolean>;
    receiveSubscription: (socketId: number) => Promise<SubscriptionMessage>;
    close: (socketId: number) => boolean;
  }
}

declare global {
  interface Window {
    ipc: Electron.Ipc;
    zmq: Electron.Zmq;
  }
}

export {};