/*
  # Create tokens and usage tracking tables

  1. New Tables
    - `tokens`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `client_id` (text)
      - `name` (text)
      - `token` (text)
      - `is_active` (boolean)
      - `calls_count` (integer)
      - `created_at` (timestamp)
      - `last_used_at` (timestamp)
    
    - `usage_logs`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `token_id` (uuid, references tokens)
      - `date` (date)
      - `calls_count` (integer)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users
*/

-- Create tokens table
CREATE TABLE IF NOT EXISTS tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  client_id text NOT NULL,
  name text NOT NULL,
  token text NOT NULL,
  is_active boolean DEFAULT true,
  calls_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  last_used_at timestamptz
);

-- Create usage_logs table
CREATE TABLE IF NOT EXISTS usage_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  token_id uuid REFERENCES tokens NOT NULL,
  date date NOT NULL,
  calls_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for tokens
CREATE POLICY "Users can read own tokens"
  ON tokens
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own tokens"
  ON tokens
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tokens"
  ON tokens
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policies for usage_logs
CREATE POLICY "Users can read own usage logs"
  ON usage_logs
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own usage logs"
  ON usage_logs
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_tokens_user_id ON tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_usage_logs_user_id_date ON usage_logs(user_id, date);
CREATE INDEX IF NOT EXISTS idx_usage_logs_token_id ON usage_logs(token_id);