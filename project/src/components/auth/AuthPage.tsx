import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  
  return (
    <div className="min-h-screen flex flex-col justify-center sm:py-12 bg-gray-100 dark:bg-gray-900">
      <div className="p-6 sm:p-10 mx-auto">
        <div className="flex flex-col md:flex-row bg-white dark:bg-gray-800 shadow-lg rounded-2xl overflow-hidden">
          {/* Brand section */}
          <div className="w-full md:w-1/2 bg-gradient-to-br from-blue-500 to-blue-600 p-8 flex flex-col justify-center">
            <div className="mb-6 flex items-center">
              <div className="rounded-full bg-white p-3 mr-3">
                <MessageCircle size={28} className="text-blue-600" />
              </div>
              <h1 className="text-3xl font-bold text-white">Napier</h1>
            </div>
            
            <h2 className="text-xl font-semibold text-white mb-4">
              Welcome to your API management dashboard
            </h2>
            
            <p className="text-blue-100 mb-6">
              Securely manage your API keys, track usage, and monitor your agents all in one place.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white bg-opacity-20 rounded-lg p-4 text-white">
                <h3 className="font-medium mb-1">User Registration</h3>
                <p className="text-sm text-blue-100">Secure account creation and login</p>
              </div>
              
              <div className="bg-white bg-opacity-20 rounded-lg p-4 text-white">
                <h3 className="font-medium mb-1">API Key Management</h3>
                <p className="text-sm text-blue-100">Generate and revoke API keys</p>
              </div>
              
              <div className="bg-white bg-opacity-20 rounded-lg p-4 text-white">
                <h3 className="font-medium mb-1">Usage Statistics</h3>
                <p className="text-sm text-blue-100">Track your API consumption</p>
              </div>
              
              <div className="bg-white bg-opacity-20 rounded-lg p-4 text-white">
                <h3 className="font-medium mb-1">Pricing Calculator</h3>
                <p className="text-sm text-blue-100">Estimate your monthly costs</p>
              </div>
            </div>
          </div>
          
          {/* Form section */}
          <div className="w-full md:w-1/2 p-8 sm:p-12 flex items-center">
            {isLogin ? (
              <LoginForm onToggleForm={() => setIsLogin(false)} />
            ) : (
              <RegisterForm onToggleForm={() => setIsLogin(true)} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;