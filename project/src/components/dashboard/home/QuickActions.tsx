import React from 'react';
import { Plus, Key, Calculator, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../../ui/Card';

const QuickActions: React.FC = () => {
  const actions = [
    {
      title: 'Create Agent',
      description: 'Set up a new agent for your application',
      icon: <Users size={20} className="text-green-600 dark:text-green-400" />,
      link: '/dashboard/agents/new',
      color: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
    },
    {
      title: 'Generate API Key',
      description: 'Create a new API key for your application',
      icon: <Key size={20} className="text-blue-600 dark:text-blue-400" />,
      link: '/dashboard/api-keys',
      color: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
    },
    {
      title: 'Calculate Pricing',
      description: 'Estimate your costs based on expected usage',
      icon: <Calculator size={20} className="text-purple-600 dark:text-purple-400" />,
      link: '/dashboard/pricing',
      color: 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200',
    },
  ];
  
  return (
    <Card title="Quick Actions" className="mt-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {actions.map((action) => (
          <Link
            key={action.title}
            to={action.link}
            className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg ${action.color}`}>
                {action.icon}
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {action.title}
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {action.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Card>
  );
};

export default QuickActions;