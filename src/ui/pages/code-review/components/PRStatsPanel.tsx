import { GitCommit } from 'lucide-react';

import type { PRStats } from '../types';

interface PRStatsPanelProps {
  prStats: PRStats;
}

const PRStatsPanel = ({ prStats }: PRStatsPanelProps) => {
  return (
    <div className="collapse collapse-arrow bg-base-100 border border-base-300">
      <input type="checkbox" defaultChecked />
      <div className="collapse-title text-lg font-semibold text-white flex items-center">
        <GitCommit className="w-5 h-5 mr-2" />
        PR Stats
      </div>
      <div className="collapse-content">
        <div className="overflow-x-auto">
          <table className="table table-sm w-full">
            <tbody>
              <tr>
                <td className="text-gray-400">Files Changed</td>
                <td className="text-white font-semibold">
                  {prStats.filesChanged}
                </td>
              </tr>
              <tr>
                <td className="text-gray-400">Lines Added</td>
                <td className="text-green-400 font-semibold">
                  +{prStats.linesAdded}
                </td>
              </tr>
              <tr>
                <td className="text-gray-400">Lines Removed</td>
                <td className="text-red-400 font-semibold">
                  -{prStats.linesRemoved}
                </td>
              </tr>
              <tr>
                <td className="text-gray-400">Commits</td>
                <td className="text-blue-400 font-semibold">
                  {prStats.commits}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PRStatsPanel;
