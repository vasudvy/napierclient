import React, { useEffect } from 'react';
import StatsGrid from '../components/dashboard/home/StatsGrid';
import UsageChart from '../components/dashboard/home/UsageChart';
import QuickActions from '../components/dashboard/home/QuickActions';
import { useStatsStore } from '../store/statsStore';
import { useAuthStore } from '../store/authStore';

const Dashboard: React.FC = () => {
  const { user } = useAuthStore();
  const { 
    usageStats, 
    dailyStats, 
    isLoading, 
    fetchUsageStats, 
    fetchDailyStats 
  } = useStatsStore();
  
  useEffect(() => {
    if (user) {
      fetchUsageStats(user.id);
      fetchDailyStats(user.id, 30);
    }
  }, [user, fetchUsageStats, fetchDailyStats]);
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Dashboard</h1>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>
      
      <StatsGrid stats={usageStats} isLoading={isLoading} />
      <UsageChart dailyStats={dailyStats} isLoading={isLoading} />
      <QuickActions />
    </div>
  );
};

export default Dashboard;