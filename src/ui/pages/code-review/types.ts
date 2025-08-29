export interface FileChange {
  name: string;
  status: string;
  linesAdded: number;
  linesRemoved: number;
  type: 'added' | 'modified' | 'deleted';
}

export interface DiffLine {
  lineNumber: number;
  type: 'context' | 'added' | 'removed';
  content: string;
  oldLine: number | null;
  newLine: number | null;
}

export interface ProjectInfo {
  name: string;
  version: string;
  repoName: string;
  repoUrl: string;
  currentBranch: string;
  targetBranch: string;
}

export interface Commit {
  id: string;
  message: string;
  date: string;
  author: string;
}

export interface PRStats {
  filesChanged: number;
  linesAdded: number;
  linesRemoved: number;
  commits: number;
}
