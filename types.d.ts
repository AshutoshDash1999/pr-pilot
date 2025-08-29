export interface ResourceUsage {
  cpu: number;
  ram: number;
  timestamp: number;
}

export interface GitDetails {
  path: string;
  name: string;
  currentBranch: string;
  remoteUrl: string;
}

export interface ElectronAPI {
  subscribeResourceUsage: (
    callback: (statistics: ResourceUsage) => void
  ) => void;
  getCPUUsage: () => Promise<number>;
  getRAMUsage: () => Promise<number>;
  selectGitDirectory: () => Promise<{
    success: boolean;
    gitDetails?: GitDetails;
    error?: string;
  }>;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}

export {}; //This makes the file a module, which is required for global declarations to work properly
