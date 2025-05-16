import React from 'react';
import { Users, PhoneCall, PhoneIncoming, PhoneOutgoing, Clock } from 'lucide-react';
import StatCard from '../../ui/StatCard';
import { UsageStats } from '../../../types';

interface StatsGridProps {
  stats: UsageStats | null;
  isLoading: boolean;
}

const StatsGrid: React.FC<StatsGridProps> = ({ stats, isLoading }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      <StatCard 
        title="Total Agents"
        value={stats?.total_agents || 0}
        icon={<Users size={24} className="text-blue-600 dark:text-blue-400" />}
        isLoading={isLoading}
      />
      
      <StatCard 
        title="Total Calls"
        value={stats?.total_calls || 0}
        icon={<PhoneCall size={24} className="text-indigo-600 dark:text-indigo-400" />}
        isLoading={isLoading}
      />
      
      <StatCard 
        title="Incoming Calls"
        value={stats?.incoming_calls || 0}
        icon={<PhoneIncoming size={24} className="text-green-600 dark:text-green-400" />}
        isLoading={isLoading}
      />
      
      <StatCard 
        title="Outgoing Calls"
        value={stats?.outgoing_calls || 0}
        icon={<PhoneOutgoing size={24} className="text-orange-600 dark:text-orange-400" />}
        isLoading={isLoading}
      />
      
      <StatCard 
        title="Usage (minutes)"
        value={stats?.total_usage_minutes || 0}
        icon={<Clock size={24} className="text-purple-600 dark:text-purple-400" />}
        isLoading={isLoading}
      />
    </div>
  );
};

export default StatsGrid;