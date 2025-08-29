import { useState } from 'react';
import type { Commit, PRStats } from '../types';
import CommitsList from './CommitsList';
import PRForm from './PRForm';
import PRPreview from './PRPreview';
import PRStatsDisplay from './PRStatsDisplay';

interface PRDetailsProps {
  commits: Commit[];
  prStats: PRStats;
}

const PRDetails = ({ commits, prStats }: PRDetailsProps) => {
  const [title, setTitle] = useState(
    'Add enhanced Header component with subtitle support'
  );
  const [description, setDescription] = useState(
    'This PR enhances the Header component by adding optional subtitle support and improving the overall styling. The component now accepts a subtitle prop and renders it below the main title with appropriate spacing and typography.'
  );

  return (
    <div className="flex-1 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <PRForm
          title={title}
          description={description}
          onTitleChange={setTitle}
          onDescriptionChange={setDescription}
        />
        <PRPreview title={title} description={description} />
        <CommitsList commits={commits} />
        <PRStatsDisplay prStats={prStats} />
      </div>
    </div>
  );
};

export default PRDetails;
