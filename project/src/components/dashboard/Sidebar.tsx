import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Key, 
  ChevronRight, 
  BarChart, 
  Users, 
  Phone, 
  DollarSign, 
  Settings, 
  LogOut, 
  MessageCircle,
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

interface SidebarProps {
  collapsed: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, toggleSidebar }) => {
  const location = useLocation();
  const { signOut, user } = useAuthStore();
  
  const menuItems = [
    { icon: <Home size={20} />, label: 'Dashboard', path: '/dashboard' },
    { icon: <Key size={20} />, label: 'API Keys', path: '/dashboard/api-keys' },
    { icon: <Users size={20} />, label: 'Agents', path: '/dashboard/agents' },
    { icon: <Phone size={20} />, label: 'Calls', path: '/dashboard/calls' },
    { icon: <BarChart size={20} />, label: 'Usage', path: '/dashboard/usage' },
    { icon: <DollarSign size={20} />, label: 'Pricing', path: '/dashboard/pricing' },
    { icon: <Settings size={20} />, label: 'Settings', path: '/dashboard/settings' },
  ];
  
  return (
    <div className={`h-screen fixed top-0 left-0 z-10 transition-all duration-300 ease-in-out bg-gray-900 text-white ${
      collapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Sidebar header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-800">
        <div className="flex items-center space-x-2 overflow-hidden">
          <MessageCircle className="text-blue-400 flex-shrink-0" />
          {!collapsed && <span className="font-bold text-lg">Napier</span>}
        </div>
        <button 
          onClick={toggleSidebar}
          className="text-gray-400 hover:text-white"
        >
          <ChevronRight size={20} className={`transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`} />
        </button>
      </div>
      
      {/* User info */}
      <div className="px-4 py-4 border-b border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
            {user?.full_name ? user.full_name.charAt(0).toUpperCase() : 'U'}
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <p className="font-medium text-sm truncate">{user?.full_name || 'User'}</p>
              <p className="text-xs text-gray-400 truncate">{user?.email || ''}</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Menu items */}
      <div className="py-4">
        <ul>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center py-3 px-4 text-sm space-x-3 ${
                    isActive 
                      ? 'bg-blue-700 text-white' 
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      
      {/* Sign out */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
        <button
          onClick={() => signOut()}
          className="flex items-center py-2 px-4 text-sm space-x-3 text-gray-300 hover:bg-gray-800 w-full rounded"
        >
          <LogOut size={20} className="flex-shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;