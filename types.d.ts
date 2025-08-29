export interface ResourceUsage {
  cpu: number;
  ram: number;
  timestamp: number;
}

export interface ElectronAPI {
  subscribeResourceUsage: (
    callback: (statistics: ResourceUsage) => void
  ) => void;
  getCPUUsage: () => Promise<number>;
  getRAMUsage: () => number;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}

export {}; //This makes the file a module, which is required for global declarations to work properly
