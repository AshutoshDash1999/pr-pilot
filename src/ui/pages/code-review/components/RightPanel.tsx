import type { PRStats } from '../types';
import PRStatsPanel from './PRStatsPanel';
import SecurityCheckPanel from './SecurityCheckPanel';
import SuggestionsPanel from './SuggestionsPanel';

interface RightPanelProps {
  suggestions: string[];
  prStats: PRStats;
}

const RightPanel = ({ suggestions, prStats }: RightPanelProps) => {
  return (
    <div className="w-96 bg-base-200 border-l border-base-100 overflow-y-auto">
      <div className="p-4 space-y-4">
        <SecurityCheckPanel />
        <SuggestionsPanel suggestions={suggestions} />
        <PRStatsPanel prStats={prStats} />
      </div>
    </div>
  );
};

export default RightPanel;
