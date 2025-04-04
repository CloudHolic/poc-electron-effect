import { ipcRenderer } from 'electron';

// TODO: IPC 통신에 사용할 'Command' 타입 정의 및 유효한 타입 체크

export const send = (channel: string, data: any): void => {
  ipcRenderer.send(channel, data);
};

export const invoke = async (channel: string, data: any): Promise<any> => {
  return await ipcRenderer.invoke(channel, data);
};

export const receive = (channel: string, func: (...args: any[]) => void): void => {
  ipcRenderer.on(channel, (_event, ...args) => func(...args));
};

export const removeListeners = (channel: string): void => {
  ipcRenderer.removeAllListeners(channel);
};
