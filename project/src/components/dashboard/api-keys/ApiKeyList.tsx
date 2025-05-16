import React, { useEffect, useState } from 'react';
import { Key, Copy, X, Check, AlertTriangle } from 'lucide-react';
import Button from '../../ui/Button';
import Card from '../../ui/Card';
import { useApiKeyStore } from '../../../store/apiKeyStore';
import { useAuthStore } from '../../../store/authStore';

const ApiKeyList: React.FC = () => {
  const { user } = useAuthStore();
  const { 
    apiKeys, 
    isLoading, 
    error, 
    fetchApiKeys, 
    generateApiKey, 
    revokeKey 
  } = useApiKeyStore();
  
  const [newClientId, setNewClientId] = useState('');
  const [generatingKey, setGeneratingKey] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [newToken, setNewToken] = useState<string | null>(null);
  
  useEffect(() => {
    if (user) {
      fetchApiKeys(user.id);
    }
  }, [user, fetchApiKeys]);
  
  const handleGenerateKey = async () => {
    if (!user || !newClientId.trim()) return;
    
    setGeneratingKey(true);
    setNewToken(null);
    
    try {
      const token = await generateApiKey(user.id, newClientId);
      if (token) {
        setNewToken(token);
        setNewClientId('');
      }
    } finally {
      setGeneratingKey(false);
    }
  };
  
  const handleRevokeKey = async (keyId: string) => {
    if (window.confirm('Are you sure you want to revoke this API key? This action cannot be undone.')) {
      await revokeKey(keyId);
    }
  };
  
  const copyToClipboard = (text: string, keyId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(keyId);
    setTimeout(() => setCopiedKey(null), 2000);
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  return (
    <div className="space-y-6">
      <Card title="Create API Key">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col md:flex-row md:items-end space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-grow">
              <label htmlFor="clientId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Client ID
              </label>
              <input
                id="clientId"
                type="text"
                value={newClientId}
                onChange={(e) => setNewClientId(e.target.value)}
                placeholder="my-awesome-app"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
              />
            </div>
            <Button
              onClick={handleGenerateKey}
              disabled={!newClientId.trim() || generatingKey}
              isLoading={generatingKey}
              leftIcon={<Key size={18} />}
            >
              Generate API Key
            </Button>
          </div>
          
          {newToken && (
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-800 rounded-md">
              <div className="flex items-start space-x-3">
                <AlertTriangle size={20} className="text-yellow-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    Store this API key securely!
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    This key will only be shown once. Make sure to copy it now and store it in a safe place.
                  </p>
                  <div className="flex items-center">
                    <code className="p-2 bg-gray-100 dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-200 rounded border border-gray-300 dark:border-gray-700 flex-grow overflow-x-auto">
                      {newToken}
                    </code>
                    <Button
                      variant="secondary"
                      onClick={() => copyToClipboard(newToken, 'new')}
                      className="ml-2 flex-shrink-0"
                      leftIcon={copiedKey === 'new' ? <Check size={18} /> : <Copy size={18} />}
                    >
                      {copiedKey === 'new' ? 'Copied!' : 'Copy'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
      
      <Card 
        title="API Keys" 
        subtitle="Manage your application's API keys"
        isLoading={isLoading}
      >
        {error && (
          <div className="p-4 mb-4 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded">
            {error}
          </div>
        )}
        
        {apiKeys.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <Key size={40} className="mx-auto mb-3 opacity-40" />
            <p>No API keys found. Generate your first key above.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Last Used
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                {apiKeys.map((key) => (
                  <tr key={key.id} className={!key.is_active ? "opacity-60" : ""}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {key.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(key.created_at)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {key.last_used_at ? formatDate(key.last_used_at) : 'Never'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        key.is_active 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                      }`}>
                        {key.is_active ? 'Active' : 'Revoked'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      {key.is_active && (
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleRevokeKey(key.id)}
                          leftIcon={<X size={16} />}
                        >
                          Revoke
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ApiKeyList;