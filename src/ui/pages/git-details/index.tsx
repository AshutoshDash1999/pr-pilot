import { ArrowLeft, Folder, GitBranch, GitCommit, Globe } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { GitDetails } from '../../../../types';

interface GitDetailsPageProps {
  onPageChange?: (page: 'welcome' | 'git-details') => void;
}

const GitDetailsPage = ({ onPageChange }: GitDetailsPageProps) => {
  const [gitDetails, setGitDetails] = useState<GitDetails | null>(null);

  useEffect(() => {
    // Get git details from localStorage or window object
    const storedDetails = localStorage.getItem('gitDetails');
    if (storedDetails) {
      setGitDetails(JSON.parse(storedDetails));
    }
  }, []);

  const handleBackToWelcome = () => {
    localStorage.removeItem('gitDetails');
    onPageChange?.('welcome');
  };

  if (!gitDetails) {
    return (
      <div className="min-h-screen bg-base-300 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">
            No Repository Selected
          </h1>
          <p className="text-gray-300 mb-6">
            Please go back and select a valid Git repository.
          </p>
          <button onClick={handleBackToWelcome} className="btn btn-primary">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Welcome
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-300 p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleBackToWelcome}
              className="btn btn-ghost btn-sm text-gray-300 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </button>
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
              <Folder className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">
                {gitDetails.name}
              </h1>
              <p className="text-gray-400">Git Repository</p>
            </div>
          </div>
        </div>

        {/* Repository Path */}
        <div className="bg-base-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-400 mb-1">Repository Path</p>
          <p className="text-white font-mono text-sm break-all">
            {gitDetails.path}
          </p>
        </div>

        {/* Git Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Current Branch */}
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                  <GitBranch className="w-5 h-5 text-white" />
                </div>
                <h3 className="card-title text-white">Current Branch</h3>
              </div>
              <p className="text-2xl font-bold text-blue-400">
                {gitDetails.currentBranch}
              </p>
            </div>
          </div>

          {/* Remote URL */}
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <h3 className="card-title text-white">Remote URL</h3>
              </div>
              <p className="text-sm text-gray-300 break-all">
                {gitDetails.remoteUrl || 'No remote configured'}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="btn btn-primary btn-lg">
            <GitCommit className="w-5 h-5 mr-2" />
            View Commits
          </button>
          <button className="btn btn-secondary btn-lg">
            <GitBranch className="w-5 h-5 mr-2" />
            Manage Branches
          </button>
          <button className="btn btn-accent btn-lg">
            <Folder className="w-5 h-5 mr-2" />
            Open in Explorer
          </button>
        </div>

        {/* Repository Status */}
        <div className="mt-8 bg-base-200 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-4">
            Repository Status
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-3xl font-bold text-green-400">0</p>
              <p className="text-gray-400 text-sm">Modified Files</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-400">0</p>
              <p className="text-gray-400 text-sm">Staged Files</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-yellow-400">0</p>
              <p className="text-gray-400 text-sm">Untracked Files</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-purple-400">0</p>
              <p className="text-gray-400 text-sm">Conflicts</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GitDetailsPage;
