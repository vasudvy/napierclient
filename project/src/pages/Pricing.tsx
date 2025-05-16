import React from 'react';
import PricingCalculator from '../components/dashboard/pricing/PricingCalculator';

const Pricing: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Pricing Calculator</h1>
      </div>
      
      <div className="bg-purple-50 dark:bg-purple-900 border-l-4 border-purple-400 dark:border-purple-600 p-4 rounded mb-6">
        <div className="flex">
          <div className="ml-3">
            <p className="text-sm text-purple-700 dark:text-purple-300">
              Use this calculator to estimate your monthly costs based on expected usage.
              Adjust the plan tier and estimated minutes to see how it affects your pricing.
            </p>
          </div>
        </div>
      </div>
      
      <PricingCalculator />
    </div>
  );
};

export default Pricing;