import type { PRStats } from '../types';

interface PRStatsDisplayProps {
  prStats: PRStats;
}

const PRStatsDisplay = ({ prStats }: PRStatsDisplayProps) => {
  return (
    <div className="bg-base-200 rounded-lg p-6 border border-base-300">
      <h2 className="text-2xl font-bold text-white mb-4">PR Statistics</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <p className="text-3xl font-bold text-blue-400">
            {prStats.filesChanged}
          </p>
          <p className="text-gray-400">Files Changed</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-green-400">
            +{prStats.linesAdded}
          </p>
          <p className="text-gray-400">Lines Added</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-red-400">
            -{prStats.linesRemoved}
          </p>
          <p className="text-gray-400">Lines Removed</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-purple-400">
            {prStats.commits}
          </p>
          <p className="text-gray-400">Commits</p>
        </div>
      </div>
    </div>
  );
};

export default PRStatsDisplay;
