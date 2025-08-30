import { FileCode2, GitPullRequestArrow } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { GitBranches, GitDetails } from '../../../../types';
import {
  CodeDiffViewer,
  FilesChangedPanel,
  Header,
  PRDetails,
  RightPanel,
} from './components';
import type {
  Commit,
  DiffLine,
  FileChange,
  ProjectInfo,
  PRStats,
} from './types';

interface CodeReviewPageProps {
  onBackToWelcome?: () => void;
}

const CodeReviewPage = ({ onBackToWelcome }: CodeReviewPageProps) => {
  const [activeTab, setActiveTab] = useState<'code-review' | 'pr-details'>(
    'code-review'
  );
  const [projectInfo, setProjectInfo] = useState<ProjectInfo | null>(null);
  const [branches, setBranches] = useState<string[]>([]);
  const [gitRepoPath, setGitRepoPath] = useState<string>('');
  const [isLoadingBranches, setIsLoadingBranches] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load repository data from localStorage
    const gitDetailsStr = localStorage.getItem('gitDetails');
    if (gitDetailsStr) {
      try {
        const gitDetails: GitDetails = JSON.parse(gitDetailsStr);

        // Convert GitDetails to ProjectInfo
        const project: ProjectInfo = {
          name: 'PR Pilot',
          version: '0.0.0',
          repoName: gitDetails.name,
          repoUrl: gitDetails.remoteUrl,
          currentBranch: gitDetails.currentBranch,
          targetBranch: 'main', // Default target branch
        };

        setProjectInfo(project);
        setGitRepoPath(gitDetails.path);

        // Fetch real branches from Git
        fetchBranches(gitDetails.path);
      } catch (error) {
        console.error('Error parsing git details:', error);
        setError('Failed to load repository details');
      }
    }
  }, []);

  const fetchBranches = async (repoPath: string) => {
    if (!window.electronAPI) {
      setError('Electron API not available');
      return;
    }

    setIsLoadingBranches(true);
    setError(null);

    try {
      // First fetch all branches from remote
      const fetchResult = await window.electronAPI.gitFetchAll(repoPath);
      if (!fetchResult.success) {
        console.warn(
          'Warning: Failed to fetch remote branches:',
          fetchResult.error
        );
        // Continue anyway to get local branches
      }

      // Get all available branches
      const branchesResult = await window.electronAPI.gitGetBranches(repoPath);
      if (branchesResult.success && branchesResult.branches) {
        const gitBranches: GitBranches = branchesResult.branches;

        // Combine local and remote branches, removing duplicates
        const allBranches = [
          ...gitBranches.local,
          ...gitBranches.remote.map(branch => branch.replace('origin/', '')),
        ].filter((branch, index, arr) => arr.indexOf(branch) === index);

        setBranches(allBranches);

        // Update project info with actual current branch
        if (projectInfo && gitBranches.current !== projectInfo.currentBranch) {
          setProjectInfo(prev =>
            prev
              ? {
                  ...prev,
                  currentBranch: gitBranches.current,
                }
              : null
          );
        }
      } else {
        setError(`Failed to get branches: ${branchesResult.error}`);
      }
    } catch (error) {
      console.error('Error fetching branches:', error);
      setError('Failed to fetch branches from Git repository');
    } finally {
      setIsLoadingBranches(false);
    }
  };

  const handleBackToWelcome = () => {
    // Clear the selected repository
    localStorage.removeItem('gitDetails');
    onBackToWelcome?.();
  };

  const handleRefreshBranches = () => {
    if (gitRepoPath) {
      fetchBranches(gitRepoPath);
    }
  };

  // Show loading or redirect if no repository is selected
  if (!projectInfo) {
    return (
      <div className="min-h-screen bg-base-300 flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-primary mb-4"></div>
          <p className="text-gray-400">Loading repository...</p>
        </div>
      </div>
    );
  }

  // Show error state if there's an error
  if (error) {
    return (
      <div className="min-h-screen bg-base-300 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="alert alert-error mb-4">
            <span>{error}</span>
          </div>
          <button
            onClick={handleRefreshBranches}
            className="btn btn-primary mr-2"
          >
            Retry
          </button>
          <button onClick={handleBackToWelcome} className="btn btn-ghost">
            Back to Welcome
          </button>
        </div>
      </div>
    );
  }

  // Dummy data for demonstration
  const filesChanged: FileChange[] = [
    {
      name: 'src/ui/pages/code-review/index.tsx',
      status: 'modified',
      linesAdded: 45,
      linesRemoved: 12,
      type: 'modified',
    },
    {
      name: 'src/ui/components/Button.tsx',
      status: 'added',
      linesAdded: 67,
      linesRemoved: 0,
      type: 'added',
    },
    {
      name: 'src/ui/components/Header.tsx',
      status: 'modified',
      linesAdded: 23,
      linesRemoved: 8,
      type: 'modified',
    },
    {
      name: 'src/ui/utils/helpers.ts',
      status: 'deleted',
      linesAdded: 0,
      linesRemoved: 34,
      type: 'deleted',
    },
    {
      name: 'src/ui/styles/components.css',
      status: 'modified',
      linesAdded: 12,
      linesRemoved: 5,
      type: 'modified',
    },
    {
      name: 'src/ui/pages/very/deep/nested/folder/structure/with/a/very/long/file/path/that/will/need/truncation/example.tsx',
      status: 'added',
      linesAdded: 89,
      linesRemoved: 0,
      type: 'added',
    },
    {
      name: 'src/ui/components/very/long/component/name/that/exceeds/normal/length/limits/and/requires/ellipses/display/ComponentWithVeryLongName.tsx',
      status: 'modified',
      linesAdded: 34,
      linesRemoved: 12,
      type: 'modified',
    },
  ];

  const diffContent: DiffLine[] = [
    {
      lineNumber: 1,
      type: 'context',
      content: "import React from 'react';",
      oldLine: 1,
      newLine: 1,
    },
    {
      lineNumber: 2,
      type: 'context',
      content: "import { Button } from './Button';",
      oldLine: 2,
      newLine: 2,
    },
    { lineNumber: 3, type: 'context', content: '', oldLine: 3, newLine: 3 },
    {
      lineNumber: 4,
      type: 'removed',
      content: 'const Header = ({ title }: { title: string }) => {',
      oldLine: 4,
      newLine: null,
    },
    {
      lineNumber: 5,
      type: 'added',
      content:
        'const Header = ({ title, subtitle }: { title: string; subtitle?: string }) => {',
      oldLine: null,
      newLine: 4,
    },
    {
      lineNumber: 6,
      type: 'context',
      content: '  return (',
      oldLine: 5,
      newLine: 5,
    },
    {
      lineNumber: 7,
      type: 'context',
      content: '    <header className="bg-base-200 p-4 rounded-lg">',
      oldLine: 6,
      newLine: 6,
    },
    {
      lineNumber: 8,
      type: 'context',
      content:
        '      <h1 className="text-xl font-bold text-white">{title}</h1>',
      oldLine: 7,
      newLine: 7,
    },
    {
      lineNumber: 9,
      type: 'added',
      content:
        '      {subtitle && <p className="text-gray-400 mt-2">{subtitle}</p>}',
      oldLine: null,
      newLine: 8,
    },
    {
      lineNumber: 10,
      type: 'context',
      content: '    </header>',
      oldLine: 8,
      newLine: 9,
    },
    {
      lineNumber: 11,
      type: 'context',
      content: '  );',
      oldLine: 9,
      newLine: 10,
    },
    {
      lineNumber: 12,
      type: 'context',
      content: '};',
      oldLine: 10,
      newLine: 11,
    },
    { lineNumber: 13, type: 'context', content: '', oldLine: 11, newLine: 12 },
    {
      lineNumber: 14,
      type: 'context',
      content: 'export default Header;',
      oldLine: 12,
      newLine: 13,
    },
  ];

  const suggestions = [
    'Add JSDoc comments for all functions',
    'Add unit tests for Button component',
    'Consider adding error boundaries',
    'Add accessibility attributes (aria-labels)',
    'Implement proper TypeScript interfaces',
    'Add loading states for async operations',
  ];

  const commits: Commit[] = [
    {
      id: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6',
      message: 'feat: add subtitle support to Header component',
      date: '2024-01-15 14:30:25',
      author: 'John Doe',
    },
    {
      id: 'e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0',
      message: 'style: improve Header component styling',
      date: '2024-01-15 13:45:12',
      author: 'John Doe',
    },
    {
      id: 'i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4',
      message: 'docs: update Header component documentation',
      date: '2024-01-15 12:20:08',
      author: 'John Doe',
    },
  ];

  const prStats: PRStats = {
    filesChanged: 5,
    linesAdded: 147,
    linesRemoved: 59,
    commits: 3,
  };

  return (
    <div className="min-h-screen bg-base-300">
      <Header
        projectInfo={projectInfo}
        branches={branches}
        onBackToWelcome={handleBackToWelcome}
        onRefreshBranches={handleRefreshBranches}
        isLoadingBranches={isLoadingBranches}
      />

      {/* Main Tabs */}
      <div className="w-full px-8 py-4">
        <div
          role="tablist"
          className="tabs bg-base-200 rounded-lg p-1 flex shadow-lg"
        >
          <button
            role="tab"
            className={`tab flex-1 flex items-center justify-center gap-2 rounded-md transition-all duration-200 font-medium ${
              activeTab === 'code-review'
                ? 'bg-base-100 text-base-content shadow-md border border-base-300'
                : 'text-gray-400 hover:text-gray-300 hover:bg-base-100/50'
            }`}
            onClick={() => setActiveTab('code-review')}
          >
            <FileCode2 />
            Code Review
          </button>
          <button
            role="tab"
            className={`tab flex-1 flex items-center justify-center gap-2 rounded-md transition-all duration-200 font-medium ${
              activeTab === 'pr-details'
                ? 'bg-base-100 text-base-content shadow-md border border-base-300'
                : 'text-gray-400 hover:text-gray-300 hover:bg-base-100/50'
            }`}
            onClick={() => setActiveTab('pr-details')}
          >
            <GitPullRequestArrow />
            PR Details
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'code-review' && (
        <div className="flex h-[calc(100vh-180px)]">
          <FilesChangedPanel filesChanged={filesChanged} />
          <CodeDiffViewer
            diffContent={diffContent}
            fileName="src/ui/components/Header.tsx"
          />
          <RightPanel suggestions={suggestions} prStats={prStats} />
        </div>
      )}

      {activeTab === 'pr-details' && (
        <div className="flex h-[calc(100vh-180px)]">
          <PRDetails commits={commits} prStats={prStats} />
        </div>
      )}
    </div>
  );
};

export default CodeReviewPage;
