import type { Commit } from '../types';

interface CommitsListProps {
  commits: Commit[];
}

const CommitsList = ({ commits }: CommitsListProps) => {
  return (
    <div className="bg-base-200 rounded-lg p-6 border border-base-300">
      <h2 className="text-2xl font-bold text-white mb-4">
        Commits ({commits.length})
      </h2>
      <div className="space-y-4">
        {commits.map((commit, index) => (
          <div key={index} className="bg-base-100 p-4 rounded-lg">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-lg text-white font-medium mb-2">
                  {commit.message}
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <span className="font-mono bg-base-200 px-3 py-1 rounded">
                    {commit.id.substring(0, 8)}
                  </span>
                  <span>{commit.author}</span>
                  <span>{commit.date}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommitsList;
