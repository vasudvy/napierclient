import { supabase } from './supabase';
import { DailyStats, UsageStats } from '../types';

// Get usage statistics for a user
export const getUserStats = async (userId: string): Promise<UsageStats> => {
  try {
    // Get the number of agents
    const { data: agents, error: agentsError } = await supabase
      .from('agents')
      .select('id')
      .eq('user_id', userId);
      
    if (agentsError) throw agentsError;
    
    // Get call statistics
    const { data: tokens, error: tokensError } = await supabase
      .from('tokens')
      .select('calls_count')
      .eq('user_id', userId);
      
    if (tokensError) throw tokensError;
    
    // Calculate statistics
    const totalAgents = agents?.length || 0;
    const totalCalls = tokens?.reduce((sum, token) => sum + (token.calls_count || 0), 0) || 0;
    const incomingCalls = Math.floor(totalCalls * 0.4); // Example ratio
    const outgoingCalls = totalCalls - incomingCalls;
    
    return {
      total_agents: totalAgents,
      total_calls: totalCalls,
      incoming_calls: incomingCalls,
      outgoing_calls: outgoingCalls,
      total_usage_minutes: totalCalls, // Each call counts as 1 minute for simplicity
    };
  } catch (error) {
    console.error('Error fetching user stats:', error);
    throw error;
  }
};

// Get daily statistics for charts
export const getDailyStats = async (userId: string, days = 30): Promise<DailyStats[]> => {
  try {
    const { data: usageData, error } = await supabase
      .from('usage_logs')
      .select('date, calls_count')
      .eq('user_id', userId)
      .gte('date', new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString())
      .order('date', { ascending: true });
      
    if (error) throw error;
    
    return usageData?.map(log => ({
      date: log.date,
      calls: log.calls_count,
      minutes: log.calls_count, // Each call counts as 1 minute for simplicity
    })) || [];
  } catch (error) {
    console.error('Error fetching daily stats:', error);
    return [];
  }
};

// Calculate the cost of usage
export const calculateCost = (calls: number, tier: string): number => {
  const pricing = {
    basic: { base: 10, perCall: 0.2, included: 100 },
    pro: { base: 50, perCall: 0.15, included: 500 },
    enterprise: { base: 200, perCall: 0.1, included: 2500 },
  };
  
  const plan = pricing[tier as keyof typeof pricing] || pricing.basic;
  
  if (calls <= plan.included) {
    return plan.base;
  }
  
  const extraCalls = calls - plan.included;
  return plan.base + extraCalls * plan.perCall;
};