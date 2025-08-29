import { Check, Copy, GitPullRequest } from 'lucide-react';
import { useState } from 'react';

interface Commit {
  id: string;
  message: string;
  date: string;
  author: string;
}

interface PullRequestPanelProps {
  title?: string;
  description?: string;
  commits?: Commit[];
}

const PullRequestPanel = ({
  title = 'Add enhanced Header component with subtitle support',
  description = 'This PR enhances the Header component by adding optional subtitle support and improving the overall styling. The component now accepts a subtitle prop and renders it below the main title with appropriate spacing and typography.',
  commits = [
    {
      id: 'a1b2c3d4',
      message: 'feat: add subtitle support to Header component',
      date: '2024-01-15 14:30:25',
      author: 'John Doe',
    },
    {
      id: 'e5f6g7h8',
      message: 'style: improve Header component styling',
      date: '2024-01-15 13:45:12',
      author: 'John Doe',
    },
    {
      id: 'i9j0k1l2',
      message: 'docs: update Header component documentation',
      date: '2024-01-15 12:20:08',
      author: 'John Doe',
    },
  ],
}: PullRequestPanelProps) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const getCopyButton = (text: string, field: string) => (
    <button
      onClick={() => copyToClipboard(text, field)}
      className="btn btn-ghost btn-xs text-gray-400 hover:text-white"
      title={`Copy ${field}`}
    >
      {copiedField === field ? (
        <Check className="w-3 h-3 text-green-400" />
      ) : (
        <Copy className="w-3 h-3" />
      )}
    </button>
  );

  return (
    <div className="space-y-4">
      {/* PR Form */}
      <div className="collapse collapse-arrow bg-base-100 border border-base-300">
        <input type="checkbox" defaultChecked />
        <div className="collapse-title text-lg font-semibold text-white flex items-center">
          <GitPullRequest className="w-5 h-5 mr-2" />
          Pull Request
        </div>
        <div className="collapse-content">
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="label">
                  <span className="label-text text-gray-300">Title</span>
                </label>
                {getCopyButton(title, 'title')}
              </div>
              <input
                type="text"
                className="input input-bordered w-full bg-base-200 text-white border-base-300"
                defaultValue={title}
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
                className="textarea textarea-bordered w-full bg-base-200 text-white border-base-300"
                rows={4}
                defaultValue={description}
              />
            </div>
          </div>
        </div>
      </div>

      {/* PR Preview */}
      <div className="collapse collapse-arrow bg-base-100 border border-base-300">
        <input type="checkbox" />
        <div className="collapse-title text-lg font-semibold text-white">
          PR Preview
        </div>
        <div className="collapse-content">
          <div className="prose prose-invert max-w-none">
            <div className="bg-base-200 p-4 rounded-lg">
              <h1 className="text-xl font-bold text-white mb-3">{title}</h1>
              <p className="text-gray-300 whitespace-pre-wrap">{description}</p>
            </div>
            <div className="mt-4 p-3 bg-base-200 rounded-lg">
              <h3 className="text-sm font-semibold text-gray-400 mb-2">
                Markdown Source:
              </h3>
              <pre className="text-xs text-gray-300 bg-base-300 p-3 rounded overflow-x-auto">
                <code>{`# ${title}\n\n${description}`}</code>
              </pre>
              <div className="mt-2 flex justify-end">
                {getCopyButton(`# ${title}\n\n${description}`, 'markdown')}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Commits */}
      <div className="collapse collapse-arrow bg-base-100 border border-base-300">
        <input type="checkbox" />
        <div className="collapse-title text-lg font-semibold text-white">
          Commits ({commits.length})
        </div>
        <div className="collapse-content">
          <div className="space-y-3">
            {commits.map((commit, index) => (
              <div key={index} className="bg-base-200 p-3 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white font-medium truncate">
                      {commit.message}
                    </p>
                    <div className="flex items-center space-x-3 mt-1 text-xs text-gray-400">
                      <span className="font-mono bg-base-300 px-2 py-1 rounded">
                        {commit.id.substring(0, 8)}
                      </span>
                      <span>{commit.author}</span>
                      <span>{commit.date}</span>
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      copyToClipboard(commit.id, `commit-${index}`)
                    }
                    className="btn btn-ghost btn-xs text-gray-400 hover:text-white ml-2"
                    title="Copy commit ID"
                  >
                    {copiedField === `commit-${index}` ? (
                      <Check className="w-3 h-3 text-green-400" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PullRequestPanel;
