import * as jose from 'jose';
import { supabase } from './supabase';

// Generate a client token
export const generateClientToken = async (userId: string, clientId: string) => {
  try {
    // Generate a unique token ID
    const tokenId = crypto.randomUUID();
    
    // In a real app, use a proper secret key and store it securely
    const secretKey = new TextEncoder().encode(
      'your-secret-key-would-be-much-longer-and-stored-securely'
    );
    
    const alg = 'HS256';
    
    const jwt = await new jose.SignJWT({
      userId,
      clientId,
      tokenId,
      type: 'client_token',
    })
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setIssuer('napier-api')
      .setAudience('napier-client')
      .setExpirationTime('365d')
      .sign(secretKey);
    
    // Store the token in Supabase
    const { data, error } = await supabase
      .from('tokens')
      .insert([
        {
          id: tokenId,
          user_id: userId,
          client_id: clientId,
          name: `Client Token for ${clientId}`,
          token: jwt,
          is_active: true,
          calls_count: 0,
        },
      ])
      .select();
    
    if (error) throw error;
    
    return { token: jwt, data };
  } catch (error) {
    console.error('Error generating client token:', error);
    throw error;
  }
};

// Get all tokens for a user
export const getUserTokens = async (userId: string) => {
  const { data, error } = await supabase
    .from('tokens')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  return { data, error };
};

// Revoke a token
export const revokeToken = async (tokenId: string) => {
  const { data, error } = await supabase
    .from('tokens')
    .update({ is_active: false })
    .eq('id', tokenId)
    .select();
  
  return { data, error };
};

// Verify a token
export const verifyToken = async (token: string) => {
  try {
    const secretKey = new TextEncoder().encode(
      'your-secret-key-would-be-much-longer-and-stored-securely'
    );
    
    const { payload } = await jose.jwtVerify(token, secretKey, {
      issuer: 'napier-api',
      audience: 'napier-client',
    });
    
    return { payload, verified: true };
  } catch (error) {
    console.error('Error verifying token:', error);
    return { verified: false, error };
  }
};