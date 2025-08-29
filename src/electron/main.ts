import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { getPreloadScript } from './pathResolver.js';
import { getCPUUsage, getRAMUsage } from './resourceManager.js';
import { isDev } from './util.js';

app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: getPreloadScript(),
    },
  });

  if (isDev()) {
    console.log('Dev mode');
    mainWindow.loadURL('http://localhost:5174');
  } else {
    console.log('Prod mode');
    mainWindow.loadFile(
      path.join(app.getAppPath(), 'dist-react', 'index.html')
    );
  }

  // Set up IPC handlers for resource usage
  ipcMain.handle('getCPUUsage', async () => {
    return await getCPUUsage();
  });

  ipcMain.handle('getRAMUsage', async () => {
    return getRAMUsage();
  });

  // Start resource usage monitoring
  let resourceUsageInterval: NodeJS.Timeout;

  const startResourceMonitoring = () => {
    resourceUsageInterval = setInterval(async () => {
      try {
        // Get current resource usage using resource manager
        const cpuUsage = await getCPUUsage();
        const ramUsage = getRAMUsage();

        // Send resource usage data to renderer
        mainWindow.webContents.send('resource-usage', {
          cpu: cpuUsage,
          ram: ramUsage,
          timestamp: Date.now(),
        });
      } catch (error) {
        console.error('Error monitoring resources:', error);
      }
    }, 1000); // Update every second
  };

  // Start monitoring when window is ready
  mainWindow.webContents.on('did-finish-load', () => {
    startResourceMonitoring();
  });

  // Fallback: start monitoring after a delay in case did-finish-load doesn't fire
  setTimeout(() => {
    if (!resourceUsageInterval) {
      startResourceMonitoring();
    }
  }, 3000);

  // Clean up interval when app closes
  app.on('before-quit', () => {
    if (resourceUsageInterval) {
      clearInterval(resourceUsageInterval);
    }
  });
});
