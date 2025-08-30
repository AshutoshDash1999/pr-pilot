import { useEffect, useState } from 'react';
import './App.css';
import CodeReviewPage from './pages/code-review';
import WelcomePage from './pages/welcome';

function App() {
  const [currentPage, setCurrentPage] = useState<'welcome' | 'code-review'>(
    'welcome'
  );

  useEffect(() => {
    // Check if a repository is already selected
    const gitDetails = localStorage.getItem('gitDetails');
    if (gitDetails) {
      try {
        JSON.parse(gitDetails);
        setCurrentPage('code-review');
      } catch (error) {
        console.error('Error parsing git details:', error);
        localStorage.removeItem('gitDetails');
      }
    }
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'code-review':
        return (
          <CodeReviewPage onBackToWelcome={() => setCurrentPage('welcome')} />
        );
      case 'welcome':
      default:
        return <WelcomePage onPageChange={setCurrentPage} />;
    }
  };

  return <main className="container">{renderPage()}</main>;
}

export default App;
