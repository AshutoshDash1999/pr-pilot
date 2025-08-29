import { Check, Copy } from 'lucide-react';
import { useState } from 'react';
import { copyToClipboard } from '../../../utils/copyToClipboard';

interface PRFormProps {
  title: string;
  description: string;
  onTitleChange: (title: string) => void;
  onDescriptionChange: (description: string) => void;
}

const PRForm = ({
  title,
  description,
  onTitleChange,
  onDescriptionChange,
}: PRFormProps) => {
  const [copiedField, setCopiedField] = useState<
    'title' | 'description' | null
  >(null);

  const handleCopy = async (text: string, field: 'title' | 'description') => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    }
  };

  const getCopyButton = (text: string, field: 'title' | 'description') => {
    const isCopied = copiedField === field;
    return (
      <button
        onClick={() => handleCopy(text, field)}
        className="btn btn-ghost btn-xs text-gray-400 hover:text-white"
        title={`Copy ${field}`}
      >
        {isCopied ? (
          <Check className="w-4 h-4 text-green-400" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </button>
    );
  };

  return (
    <div className="bg-base-200 rounded-lg p-6 border border-base-300">
      <h2 className="text-2xl font-bold text-white mb-4">Pull Request</h2>
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="label">
              <span className="label-text text-gray-300">Title</span>
            </label>
            {getCopyButton(title, 'title')}
          </div>
          <input
            type="text"
            className="input input-bordered w-full bg-base-100 text-white border-base-300"
            value={title}
            onChange={e => onTitleChange(e.target.value)}
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="label">
              <span className="label-text text-gray-300">Description</span>
            </label>
            {getCopyButton(description, 'description')}
          </div>
          <textarea
            className="textarea textarea-bordered w-full bg-base-100 text-white border-base-300"
            rows={6}
            value={description}
            onChange={e => onDescriptionChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default PRForm;
