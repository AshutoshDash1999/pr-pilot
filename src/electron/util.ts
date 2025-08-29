import fs from 'fs-extra';
import path from 'path';

export const isDev = () => {
  return process.env.NODE_ENV === 'development';
};

export const isProd = () => {
  return process.env.NODE_ENV === 'production';
};

export const isMac = () => {
  return process.platform === 'darwin';
};

export const isWin = () => {
  return process.platform === 'win32';
};

export const isLinux = () => {
  return process.platform === 'linux';
};

export async function isGitRepository(dirPath: string): Promise<boolean> {
  try {
    const gitPath = path.join(dirPath, '.git');
    return await fs.pathExists(gitPath);
  } catch (error) {
    console.log('error :', error);
    return false;
  }
}

export async function getGitDetails(dirPath: string) {
  try {
    const gitConfigPath = path.join(dirPath, '.git', 'config');
    const headPath = path.join(dirPath, '.git', 'HEAD');

    let currentBranch = 'main';
    let remoteUrl = '';

    // Read current branch
    if (await fs.pathExists(headPath)) {
      try {
        const headContent = await fs.readFile(headPath, 'utf8');
        const trimmed = headContent.trim();
        if (trimmed.startsWith('ref: refs/heads/')) {
          currentBranch = trimmed.replace('ref: refs/heads/', '');
        }
      } catch (error) {
        console.log('Error reading HEAD file:', error);
      }
    }

    // Read remote URL
    if (await fs.pathExists(gitConfigPath)) {
      try {
        const configContent = await fs.readFile(gitConfigPath, 'utf8');
        const remoteMatch = configContent.match(/url\s*=\s*(.+)/);
        if (remoteMatch) {
          remoteUrl = remoteMatch[1].trim();
        }
      } catch (error) {
        console.log('Error reading git config:', error);
      }
    }

    return {
      path: dirPath,
      name: path.basename(dirPath),
      currentBranch,
      remoteUrl,
    };
  } catch (error) {
    console.error('Error reading git details:', error);
    return null;
  }
}
