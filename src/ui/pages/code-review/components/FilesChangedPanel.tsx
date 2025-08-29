import { Circle, FileText, Minus, Plus } from 'lucide-react';

import type { FileChange } from '../types';

interface FilesChangedPanelProps {
  filesChanged: FileChange[];
}

const FilesChangedPanel = ({ filesChanged }: FilesChangedPanelProps) => {
  const getFileIcon = (type: string) => {
    switch (type) {
      case 'added':
        return <Plus className="w-4 h-4 text-green-400" />;
      case 'modified':
        return <Circle className="w-4 h-4 text-orange-400" />;
      case 'deleted':
        return <Minus className="w-4 h-4 text-red-400" />;
      default:
        return <FileText className="w-4 h-4 text-gray-400" />;
    }
  };

  const getFileStatusColor = (type: string) => {
    switch (type) {
      case 'added':
        return 'text-green-400';
      case 'modified':
        return 'text-orange-400';
      case 'deleted':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="w-80 bg-base-200 border-r border-base-100 overflow-y-auto">
      <div className="p-4 border-b border-base-100">
        <h2 className="text-lg font-semibold text-white flex items-center">
          <FileText className="w-5 h-5 mr-2" />
          Files Changed ({filesChanged.length})
        </h2>
      </div>

      <div className="p-2">
        {filesChanged.map((file, index) => (
          <div
            key={index}
            className="p-3 hover:bg-base-100 rounded-lg cursor-pointer transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2 min-w-0 flex-1">
                {getFileIcon(file.type)}

                <div className="min-w-0 flex-1">
                  <span
                    className="text-sm text-white font-medium block truncate cursor-pointer tooltip tooltip-right"
                    data-tip={file.name}
                  >
                    {file.name}
                  </span>
                </div>
              </div>
              <span
                className={`text-xs px-2 py-1 rounded-full ${getFileStatusColor(
                  file.type
                )} bg-opacity-20 bg-base-100 ml-2 flex-shrink-0`}
              >
                {file.status}
              </span>
            </div>
            <div className="flex items-center space-x-4 text-xs text-gray-400">
              <span className="flex items-center">
                <Plus className="w-3 h-3 mr-1 text-green-400" />+
                {file.linesAdded}
              </span>
              <span className="flex items-center">
                <Minus className="w-3 h-3 mr-1 text-red-400" />-
                {file.linesRemoved}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilesChangedPanel;
