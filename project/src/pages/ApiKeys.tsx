import React from 'react';
import ApiKeyList from '../components/dashboard/api-keys/ApiKeyList';

const ApiKeys: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">API Keys</h1>
      </div>
      
      <div className="bg-blue-50 dark:bg-blue-900 border-l-4 border-blue-400 dark:border-blue-600 p-4 rounded mb-6">
        <div className="flex">
          <div className="ml-3">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Generate and manage your API keys here. Each key is associated with a client ID and can be revoked at any time. 
              <strong className="font-medium"> Make sure to securely store your API keys and never expose them in client-side code.</strong>
            </p>
          </div>
        </div>
      </div>
      
      <ApiKeyList />
    </div>
  );
};

export default ApiKeys;