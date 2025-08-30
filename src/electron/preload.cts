const electron = require('electron');

electron.contextBridge.exposeInMainWorld('electronAPI', {
  subscribeResourceUsage: (callback: (statistics: any) => void) => {
    electron.ipcRenderer.on(
      'resource-usage',
      (event: Electron.IpcRendererEvent, statistics: any) => {
        callback(statistics);
      }
    );
  },
  getCPUUsage: () => electron.ipcRenderer.invoke('getCPUUsage'),
  getRAMUsage: () => electron.ipcRenderer.invoke('getRAMUsage'),
  selectGitDirectory: () => electron.ipcRenderer.invoke('select-git-directory'),
  gitFetchAll: (repoPath: string) =>
    electron.ipcRenderer.invoke('git-fetch-all', repoPath),
  gitGetBranches: (repoPath: string) =>
    electron.ipcRenderer.invoke('git-get-branches', repoPath),
});
