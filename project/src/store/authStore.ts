import { create } from 'zustand';
import { AuthState, User } from '../types';
import { supabase, getCurrentUser, getCurrentSession } from '../lib/supabase';

interface AuthStore extends AuthState {
  setUser: (user: User | null) => void;
  setSession: (session: any | null) => void;
  setLoading: (isLoading: boolean) => void;
  checkAuth: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  session: null,
  isLoading: true,
  
  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),
  setLoading: (isLoading) => set({ isLoading }),
  
  checkAuth: async () => {
    set({ isLoading: true });
    
    try {
      const { session } = await getCurrentSession();
      
      if (session) {
        const { user } = await getCurrentUser();
        set({ user, session, isLoading: false });
      } else {
        set({ user: null, session: null, isLoading: false });
      }
    } catch (error) {
      console.error('Error checking auth:', error);
      set({ user: null, session: null, isLoading: false });
    }
  },
  
  signOut: async () => {
    set({ isLoading: true });
    
    try {
      await supabase.auth.signOut();
      set({ user: null, session: null, isLoading: false });
    } catch (error) {
      console.error('Error signing out:', error);
      set({ isLoading: false });
    }
  },
}));