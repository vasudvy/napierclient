import React from 'react';
import Card from './Card';

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  change?: {
    value: number;
    isPositive: boolean;
  };
  isLoading?: boolean;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  description,
  icon,
  change,
  isLoading = false,
  className = '',
}) => {
  return (
    <Card className={`${className}`} isLoading={isLoading}>
      <div className="flex items-start">
        {icon && (
          <div className="flex-shrink-0 p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
            {icon}
          </div>
        )}
        
        <div className={icon ? 'ml-4' : ''}>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {title}
          </p>
          <div className="flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
              {value}
            </p>
            
            {change && (
              <span className={`ml-2 text-sm font-medium ${
                change.isPositive 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {change.isPositive ? '+' : ''}
                {change.value}%
              </span>
            )}
          </div>
          
          {description && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {description}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
};

export default StatCard;