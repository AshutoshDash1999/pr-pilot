interface PRPreviewProps {
  title: string;
  description: string;
}

const PRPreview = ({ title, description }: PRPreviewProps) => {
  return (
    <div className="bg-base-200 rounded-lg p-6 border border-base-300">
      <h2 className="text-2xl font-bold text-white mb-4">Preview</h2>
      <div className="prose prose-invert max-w-none">
        <div className="bg-base-100 p-6 rounded-lg">
          <h1 className="text-3xl font-bold text-white mb-4">{title}</h1>
          <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-wrap">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PRPreview;
