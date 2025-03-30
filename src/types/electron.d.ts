declare namespace Electron {
  interface IpcRenderer {
    send: (channel: string, data: any) => void;
    invoke: (channel: string, data: any) => Promise<any>;
    receive: (channel: string, func: (...args: any[]) => void) => void;
    removeListener: (channel: string) => void;
  }
}

declare global {
  interface Window {
    electron: Electron.IpcRenderer;
  }
}

export {};