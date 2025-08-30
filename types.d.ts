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

export interface GitBranches {
  local: string[];
  remote: string[];
  current: string;
}

export interface GitFetchResult {
  success: boolean;
  message?: string;
  error?: string;
}

export interface GitBranchesResult {
  success: boolean;
  branches?: GitBranches;
  error?: string;
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
  gitFetchAll: (repoPath: string) => Promise<GitFetchResult>;
  gitGetBranches: (repoPath: string) => Promise<GitBranchesResult>;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}

export {}; //This makes the file a module, which is required for global declarations to work properly
