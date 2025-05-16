import { create } from 'zustand';
import { UsageStats, DailyStats } from '../types';
import { getUserStats, getDailyStats } from '../lib/stats';

interface StatsStore {
  usageStats: UsageStats | null;
  dailyStats: DailyStats[];
  isLoading: boolean;
  fetchUsageStats: (userId: string) => Promise<void>;
  fetchDailyStats: (userId: string, days?: number) => Promise<void>;
}

export const useStatsStore = create<StatsStore>((set) => ({
  usageStats: null,
  dailyStats: [],
  isLoading: false,
  
  fetchUsageStats: async (userId) => {
    set({ isLoading: true });
    
    try {
      const stats = await getUserStats(userId);
      set({ usageStats: stats, isLoading: false });
    } catch (error) {
      console.error('Error fetching usage stats:', error);
      set({ isLoading: false });
    }
  },
  
  fetchDailyStats: async (userId, days = 30) => {
    set({ isLoading: true });
    
    try {
      const stats = await getDailyStats(userId, days);
      set({ dailyStats: stats, isLoading: false });
    } catch (error) {
      console.error('Error fetching daily stats:', error);
      set({ isLoading: false });
    }
  },
}));