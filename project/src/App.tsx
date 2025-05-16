import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import AuthPage from './components/auth/AuthPage';
import DashboardLayout from './components/dashboard/DashboardLayout';
import Dashboard from './pages/Dashboard';
import ApiKeys from './pages/ApiKeys';
import Pricing from './pages/Pricing';

function App() {
  const { user, isLoading, checkAuth } = useAuthStore();
  
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <svg 
            className="animate-spin h-10 w-10 text-blue-500 mx-auto mb-4" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <p className="text-gray-600 dark:text-gray-400">Loading Napier dashboard...</p>
        </div>
      </div>
    );
  }
  
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/auth" element={user ? <Navigate to="/dashboard" /> : <AuthPage />} />
        
        {/* Protected routes */}
        <Route path="/dashboard" element={user ? <DashboardLayout /> : <Navigate to="/auth" />}>
          <Route index element={<Dashboard />} />
          <Route path="api-keys" element={<ApiKeys />} />
          <Route path="pricing" element={<Pricing />} />
          {/* Other routes to be implemented */}
          <Route path="agents" element={<div className="p-6">Agents page coming soon</div>} />
          <Route path="calls" element={<div className="p-6">Calls page coming soon</div>} />
          <Route path="usage" element={<div className="p-6">Usage page coming soon</div>} />
          <Route path="settings" element={<div className="p-6">Settings page coming soon</div>} />
        </Route>
        
        {/* Redirect root to dashboard or auth */}
        <Route path="*" element={<Navigate to={user ? "/dashboard" : "/auth"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;