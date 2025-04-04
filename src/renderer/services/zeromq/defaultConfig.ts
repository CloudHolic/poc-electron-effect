import type { ZmqConfig } from '../../types/zeromq';
import {SOCKET_TYPE} from '../../../types/zeroMqEnums';

// TODO: 각 요청별 port 정보 합의되면 반영

export const defaultConfig: ZmqConfig = {
  endpoints: {
    'data': {
      port: 60027,
      type: SOCKET_TYPE.DEALER
    }
  },
  options: {
    timeout: 5000,
    hostname: 'localhost'
  }
}
