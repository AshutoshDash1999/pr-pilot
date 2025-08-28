import { Folder, GitCompareArrows, Info, Shield, Zap } from 'lucide-react';

const WelcomePage = () => {
  return (
    <div className="min-h-screen bg-base-300 flex flex-col items-center justify-center p-8">
      {/* Main Icon */}
      <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-3xl flex items-center justify-center mb-8 shadow-lg">
        <GitCompareArrows className="w-12 h-12 text-white" />
      </div>

      {/* Welcome Title */}
      <h1 className="text-5xl font-bold text-white mb-4 text-center">
        Welcome to PR Pilot
      </h1>

      {/* Subtitle */}
      <p className="text-xl text-gray-300 mb-12 text-center">
        Your AI-powered code review assistant
      </p>

      {/* Open Repository Button */}
      <button className="btn btn-primary btn-xl px-8 py-4 mb-16 bg-gradient-to-r from-blue-500 to-purple-500 border-0 hover:from-blue-600 hover:to-purple-600 rounded-xl">
        <Folder className="w-5 h-5 mr-2" />
        Open Repository
      </button>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-6xl">
        {/* Secure Code Review Card */}
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body items-center text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="card-title text-white text-xl">
              Secure Code Review
            </h3>
            <p className="text-gray-300">
              Identify vulnerabilities before they reach production.
            </p>
          </div>
        </div>

        {/* Smart Suggestions Card */}
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body items-center text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
              <Info className="w-8 h-8 text-white" />
            </div>
            <h3 className="card-title text-white text-xl">Smart Suggestions</h3>
            <p className="text-gray-300">
              Get AI-powered recommendations to improve your code.
            </p>
          </div>
        </div>

        {/* Lightning Fast Card */}
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body items-center text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="card-title text-white text-xl">Lightning Fast</h3>
            <p className="text-gray-300">
              Accelerate your entire review process.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Text */}
      <p className="text-gray-400 text-center">
        Ready to revolutionize your code review workflow?
      </p>
    </div>
  );
};

export default WelcomePage;
