import { BrainCircuit, Zap } from 'lucide-react';

interface SuggestionsPanelProps {
  suggestions: string[];
}

const SuggestionsPanel = ({ suggestions }: SuggestionsPanelProps) => {
  return (
    <div className="collapse collapse-arrow bg-base-100 border border-base-300">
      <input type="checkbox" defaultChecked />
      <div className="collapse-title text-lg font-semibold text-white flex items-center">
        <Zap className="w-5 h-5 mr-2" />
        Suggestions
      </div>
      <div className="collapse-content">
        <div className="space-y-2">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="flex items-start space-x-2 p-2 hover:bg-base-200 rounded-lg"
            >
              <input
                type="checkbox"
                className="checkbox checkbox-sm checkbox-primary"
              />
              <span className="text-sm text-gray-300">{suggestion}</span>
            </div>
          ))}
          <button className="btn btn-primary w-full">
            <BrainCircuit />
            Re-Analyze
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuggestionsPanel;
