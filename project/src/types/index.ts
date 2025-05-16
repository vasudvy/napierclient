// Authentication types
export interface User {
  id: string;
  email: string;
  created_at: string;
  full_name?: string;
  avatar_url?: string;
}

export interface AuthState {
  user: User | null;
  session: any | null;
  isLoading: boolean;
}

// API Key types
export interface ApiKey {
  id: string;
  user_id: string;
  name: string;
  key: string;
  created_at: string;
  last_used_at: string | null;
  is_active: boolean;
}

// Stats types
export interface UsageStats {
  total_agents: number;
  total_calls: number;
  incoming_calls: number;
  outgoing_calls: number;
  total_usage_minutes: number;
}

export interface DailyStats {
  date: string;
  calls: number;
  minutes: number;
}

// Agent types
export interface Agent {
  id: string;
  name: string;
  created_at: string;
  status: 'active' | 'inactive';
  description?: string;
}

// Pricing types
export interface PricingTier {
  name: string;
  base_price: number;
  price_per_minute: number;
  included_minutes: number;
}