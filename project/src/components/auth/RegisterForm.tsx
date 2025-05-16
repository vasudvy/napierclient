import React, { useState } from 'react';
import { Mail, Lock, User, UserPlus } from 'lucide-react';
import { signUp } from '../../lib/supabase';
import { useAuthStore } from '../../store/authStore';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface RegisterFormProps {
  onToggleForm: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onToggleForm }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const { checkAuth } = useAuthStore();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    try {
      const { data, error } = await signUp(email, password, fullName);
      
      if (error) {
        throw error;
      }
      
      if (data) {
        // Auto-login the user since email confirmation is disabled as per requirements
        setSuccess(true);
        await checkAuth();
      }
    } catch (err: any) {
      console.error('Registration error:', err);
      setError(err.message || 'Failed to register. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  if (success) {
    return (
      <div className="text-center p-6 bg-green-50 dark:bg-green-900 border border-green-100 dark:border-green-800 rounded-lg">
        <h3 className="text-xl font-medium text-green-800 dark:text-green-200 mb-2">
          Registration Successful!
        </h3>
        <p className="text-green-700 dark:text-green-300 mb-4">
          Your account has been created and you are now signed in.
        </p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-md">
      <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-6">
        Create your Napier account
      </h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Full Name"
          type="text"
          id="fullName"
          placeholder="John Doe"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          leftIcon={<User size={18} />}
          disabled={isLoading}
        />
        
        <Input
          label="Email Address"
          type="email"
          id="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          leftIcon={<Mail size={18} />}
          disabled={isLoading}
        />
        
        <Input
          label="Password"
          type="password"
          id="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          leftIcon={<Lock size={18} />}
          disabled={isLoading}
          minLength={6}
        />
        
        <Button
          type="submit"
          fullWidth
          isLoading={isLoading}
          leftIcon={<UserPlus size={18} />}
          disabled={isLoading}
        >
          Register
        </Button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <button
            type="button"
            onClick={onToggleForm}
            className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
            disabled={isLoading}
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;