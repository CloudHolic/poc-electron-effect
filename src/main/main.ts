import {app, BrowserWindow, ipcMain} from 'electron';
import path from 'path';
import * as os from 'os';

// if (require('electron-squirrel-startup'))
//   app.quit();

let mainWindow: BrowserWindow | null = null;

const createWindow = (): void => {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 800,
    minWidth: 1400,
    minHeight: 800,
    autoHideMenuBar: true,
    webPreferences: {
      devTools: process.env.NODE_ENV !== 'production',
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL).then();
  } else {
    mainWindow.loadFile(path.join(__dirname, `../build/renderer/index.html`)).then();
  }

  mainWindow.webContents.openDevTools();
};

app.whenReady().then(async () => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0)
      createWindow();
  });
});

app.on('window-all-closed', () => {
  if (os.platform() !== 'darwin')
    app.quit();
});

ipcMain.handle('example-message', (_event, args) => {
  console.log('Example message received from renderer:', args);
  return {
    success: true,
    message: 'Message received'
  };
});