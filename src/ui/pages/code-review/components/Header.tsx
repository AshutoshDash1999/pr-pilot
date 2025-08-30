import {
  ArrowLeft,
  Folder,
  GitCompare,
  GitPullRequestArrow,
} from 'lucide-react';
import { useState } from 'react';

import type { ProjectInfo } from '../types';

interface HeaderProps {
  projectInfo: ProjectInfo;
  branches: string[];
  onBackToWelcome?: () => void;
  onRefreshBranches?: () => void;
  isLoadingBranches?: boolean;
}

const Header = ({
  projectInfo,
  branches,
  onBackToWelcome,
  onRefreshBranches,
  isLoadingBranches = false,
}: HeaderProps) => {
  const [currentBranch, setCurrentBranch] = useState(projectInfo.currentBranch);
  const [targetBranch, setTargetBranch] = useState(projectInfo.targetBranch);

  const handleGeneratePR = () => {
    // In a real app, this would trigger PR generation
    console.log('Generating PR for:', projectInfo.repoName);
    console.log('From branch:', currentBranch);
    console.log('To branch:', targetBranch);

    // You could show a modal or navigate to a PR creation page here
    alert(
      `Generating PR from ${currentBranch} to ${targetBranch} in ${projectInfo.repoName}`
    );
  };

  const handleFetchBranches = () => {
    if (onRefreshBranches) {
      onRefreshBranches();
    } else {
      // Fallback for when onRefreshBranches is not provided
      console.log('Fetching all branches for:', projectInfo.repoName);
      alert('Fetching all branches...');
    }
  };

  return (
    <div className="bg-base-200 border-b border-base-100 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBackToWelcome}
            className="btn btn-ghost btn-sm text-gray-400 hover:text-gray-300 mr-2"
            title="Back to Welcome"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
              <Folder className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">
                {projectInfo.name}
              </h1>
              <p className="text-sm text-gray-400">v{projectInfo.version}</p>
            </div>
          </div>

          <div className="border-l border-base-100 pl-4">
            <p className="text-sm text-gray-400">Repository</p>
            <p className="text-white font-mono text-sm">
              {projectInfo.repoName}
            </p>
            <p className="text-xs text-gray-500 break-all">
              {projectInfo.repoUrl}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-400">Current:</label>
            <select
              className="select select-bordered bg-base-100 text-white border-base-300"
              value={currentBranch}
              onChange={e => setCurrentBranch(e.target.value)}
            >
              {branches.map(branch => (
                <option key={branch} value={branch}>
                  {branch}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-400">Target:</label>
            <select
              className="select select-bordered bg-base-100 text-white border-base-300"
              value={targetBranch}
              onChange={e => setTargetBranch(e.target.value)}
            >
              {branches.map(branch => (
                <option key={branch} value={branch}>
                  {branch}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleFetchBranches}
            className="btn btn-ghost btn-sm text-gray-400 hover:text-gray-300"
            disabled={isLoadingBranches}
          >
            {isLoadingBranches ? (
              <div className="loading loading-spinner loading-xs mr-2"></div>
            ) : (
              <GitCompare className="w-4 h-4 mr-2" />
            )}
            {isLoadingBranches ? 'Fetching...' : 'Fetch All Branches'}
          </button>

          <button onClick={handleGeneratePR} className="btn btn-primary btn-sm">
            <GitPullRequestArrow className="w-4 h-4 mr-2" />
            Generate PR
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
