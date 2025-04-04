import {contextBridge} from 'electron';
import { zmqApis } from './zmq/api';
import { ipcApis } from './ipc/api';

contextBridge.exposeInMainWorld('ipc', ipcApis);
contextBridge.exposeInMainWorld('zmq', zmqApis);
