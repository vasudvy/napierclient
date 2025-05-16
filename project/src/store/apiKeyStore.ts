import { create } from 'zustand';
import { ApiKey } from '../types';
import { getUserApiKeys, generateJwsToken, revokeApiKey } from '../lib/token';

interface ApiKeyStore {
  apiKeys: ApiKey[];
  isLoading: boolean;
  error: string | null;
  fetchApiKeys: (userId: string) => Promise<void>;
  generateApiKey: (userId: string, clientId: string) => Promise<string | null>;
  revokeKey: (keyId: string) => Promise<boolean>;
}

export const useApiKeyStore = create<ApiKeyStore>((set, get) => ({
  apiKeys: [],
  isLoading: false,
  error: null,
  
  fetchApiKeys: async (userId) => {
    set({ isLoading: true, error: null });
    
    try {
      const { data, error } = await getUserApiKeys(userId);
      
      if (error) throw error;
      
      set({ 
        apiKeys: data || [], 
        isLoading: false 
      });
    } catch (error) {
      console.error('Error fetching API keys:', error);
      set({ 
        error: 'Failed to fetch API keys', 
        isLoading: false 
      });
    }
  },
  
  generateApiKey: async (userId, clientId) => {
    set({ isLoading: true, error: null });
    
    try {
      const { token, data } = await generateJwsToken(userId, clientId);
      
      // Refresh the list of API keys
      await get().fetchApiKeys(userId);
      
      set({ isLoading: false });
      return token;
    } catch (error) {
      console.error('Error generating API key:', error);
      set({ 
        error: 'Failed to generate API key', 
        isLoading: false 
      });
      return null;
    }
  },
  
  revokeKey: async (keyId) => {
    set({ isLoading: true, error: null });
    
    try {
      const { data, error } = await revokeApiKey(keyId);
      
      if (error) throw error;
      
      // Update the local state
      set((state) => ({
        apiKeys: state.apiKeys.map(key => 
          key.id === keyId ? { ...key, is_active: false } : key
        ),
        isLoading: false
      }));
      
      return true;
    } catch (error) {
      console.error('Error revoking API key:', error);
      set({ 
        error: 'Failed to revoke API key', 
        isLoading: false 
      });
      return false;
    }
  }
}));