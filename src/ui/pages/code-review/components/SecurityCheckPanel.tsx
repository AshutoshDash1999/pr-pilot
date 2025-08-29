import { CheckCircle, Shield } from 'lucide-react';

const SecurityCheckPanel = () => {
  return (
    <div className="collapse collapse-arrow bg-base-100 border border-base-300">
      <input type="checkbox" defaultChecked />
      <div className="collapse-title text-lg font-semibold text-white flex items-center">
        <Shield className="w-5 h-5 mr-2" />
        Security Check
      </div>
      <div className="collapse-content">
        <div className="flex items-center space-x-3 p-3 bg-green-900 bg-opacity-20 rounded-lg border border-green-700">
          <CheckCircle className="w-6 h-6 text-green-400" />
          <div>
            <p className="text-green-400 font-semibold">Secure</p>
            <p className="text-xs text-gray-400">Last checked: 2 minutes ago</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityCheckPanel;
