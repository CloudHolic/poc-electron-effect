import {contextBridge, ipcRenderer} from 'electron';

contextBridge.exposeInMainWorld('electron', {
  send: (channel: string, data: any) => {
    const validChannels = ['example-message'];
    if (validChannels.includes(channel))
      ipcRenderer.send(channel, data);
  },
  invoke: async (channel: string, data: any) => {
    const validChannels = ['example-message'];
    if (validChannels.includes(channel))
      return await ipcRenderer.invoke(channel, data);
    return null;
  },
  receive: (channel: string, func: (...args: any[]) => void) => {
    const validChannels = ['example-message'];
    if (validChannels.includes(channel))
      ipcRenderer.on(channel, (_event, ...args) => func(...args));
  },
  removeListener: (channel: string) => {
    const validChannels = ['example-message'];
    if (validChannels.includes(channel))
      ipcRenderer.removeAllListeners(channel);
  }
});