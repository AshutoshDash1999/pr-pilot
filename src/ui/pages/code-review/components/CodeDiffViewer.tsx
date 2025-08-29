import type { DiffLine } from '../types';

interface CodeDiffViewerProps {
  diffContent: DiffLine[];
  fileName: string;
}

const CodeDiffViewer = ({ diffContent, fileName }: CodeDiffViewerProps) => {
  return (
    <div className="flex-1 bg-base-100 overflow-y-auto">
      <div className="p-4 border-b border-base-200">
        <h2 className="text-lg font-semibold text-white">Code Diff</h2>
        <p className="text-sm text-gray-400">{fileName}</p>
      </div>

      <div className="font-mono text-sm">
        {diffContent.map((line, index) => (
          <div
            key={index}
            className={`flex hover:bg-base-200 transition-colors ${
              line.type === 'added'
                ? 'bg-green-900 bg-opacity-30'
                : line.type === 'removed'
                  ? 'bg-red-900 bg-opacity-30'
                  : ''
            }`}
          >
            <div className="w-16 text-right text-gray-500 pr-3 py-1 select-none">
              {line.oldLine && (
                <span className="text-red-400">{line.oldLine}</span>
              )}
            </div>
            <div className="w-16 text-right text-gray-500 pr-3 py-1 select-none">
              {line.newLine && (
                <span className="text-green-400">{line.newLine}</span>
              )}
            </div>
            <div className="flex-1 pl-3 py-1">
              <span
                className={`${
                  line.type === 'added'
                    ? 'text-green-300 bg-green-900 bg-opacity-50'
                    : line.type === 'removed'
                      ? 'text-red-300 bg-red-900 bg-opacity-50'
                      : 'text-gray-300'
                }`}
              >
                {line.content}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CodeDiffViewer;
