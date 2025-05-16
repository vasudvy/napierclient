import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

const DashboardLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('theme') === 'dark' || 
    (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );
  
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  
  // Update theme
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);
  
  return (
    <div className="h-screen bg-gray-100 dark:bg-gray-900 overflow-x-hidden">
      <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />
      <TopBar collapsed={collapsed} onToggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      
      <div className={`transition-all duration-300 pt-16 min-h-screen ${
        collapsed ? 'ml-16' : 'ml-64'
      }`}>
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;