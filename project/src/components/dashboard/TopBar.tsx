import React, { useState } from 'react';
import { Moon, Sun, Bell, Search } from 'lucide-react';

interface TopBarProps {
  collapsed: boolean;
  onToggleTheme: () => void;
  isDarkMode: boolean;
}

const TopBar: React.FC<TopBarProps> = ({ collapsed, onToggleTheme, isDarkMode }) => {
  const [searchValue, setSearchValue] = useState('');
  
  return (
    <div className={`fixed top-0 right-0 h-16 transition-all duration-300 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-10 flex items-center justify-between px-4 ${
      collapsed ? 'left-16' : 'left-64'
    }`}>
      {/* Search */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search size={18} className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="py-2 pl-10 pr-4 rounded-md bg-gray-100 dark:bg-gray-700 border-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100 w-64"
        />
      </div>
      
      {/* Actions */}
      <div className="flex items-center space-x-4">
        <button className="relative p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
          <Bell size={20} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        <button
          onClick={onToggleTheme}
          className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </div>
  );
};

export default TopBar;