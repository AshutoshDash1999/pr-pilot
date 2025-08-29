import { useState } from 'react';
import './App.css';
import GitDetailsPage from './pages/git-details';
import WelcomePage from './pages/welcome';

function App() {
  const [currentPage, setCurrentPage] = useState<'welcome' | 'git-details'>(
    'welcome'
  );

  const renderPage = () => {
    switch (currentPage) {
      case 'git-details':
        return <GitDetailsPage onPageChange={setCurrentPage} />;
      case 'welcome':
      default:
        return <WelcomePage onPageChange={setCurrentPage} />;
    }
  };

  return <main className="container">{renderPage()}</main>;
}

export default App;
