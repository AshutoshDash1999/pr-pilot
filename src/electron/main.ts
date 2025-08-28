import { app, BrowserWindow } from 'electron';
import path from 'path';
import { isDev } from './util.js';

app.on('ready', () => {
  const mainWindow = new BrowserWindow({});

  if (isDev()) {
    console.log('Dev mode');
    mainWindow.loadURL('http://localhost:5174');
  } else {
    console.log('Prod mode');
    mainWindow.loadFile(
      path.join(app.getAppPath(), 'dist-react', 'index.html')
    );
  }
});
