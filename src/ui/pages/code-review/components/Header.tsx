import { Folder, GitCompare } from 'lucide-react';

import type { ProjectInfo } from '../types';

interface HeaderProps {
  projectInfo: ProjectInfo;
  branches: string[];
}

const Header = ({ projectInfo, branches }: HeaderProps) => {
  return (
    <div className="bg-base-200 border-b border-base-100 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
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
            <select className="select select-bordered bg-base-100 text-white border-base-300">
              <option>{projectInfo.currentBranch}</option>
              {branches.map(branch => (
                <option key={branch}>{branch}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-400">Target:</label>
            <select className="select select-bordered bg-base-100 text-white border-base-300">
              <option>{projectInfo.targetBranch}</option>
              {branches.map(branch => (
                <option key={branch}>{branch}</option>
              ))}
            </select>
          </div>

          <button className="btn btn-primary btn-sm">
            <GitCompare className="w-4 h-4 mr-2" />
            Fetch All Branches
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
