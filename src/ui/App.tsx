import { useState } from 'react';
import './App.css';
import CodeReviewPage from './pages/code-review';
import WelcomePage from './pages/welcome';

function App() {
  const [currentPage, setCurrentPage] = useState<'welcome' | 'code-review'>(
    'welcome'
  );

  const renderPage = () => {
    switch (currentPage) {
      case 'code-review':
        return <CodeReviewPage />;
      case 'welcome':
      default:
        return <WelcomePage onPageChange={setCurrentPage} />;
    }
  };

  return <main className="container">{renderPage()}</main>;
}

export default App;
