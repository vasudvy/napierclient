import React, { useState, useEffect } from 'react';
import { Calculator } from 'lucide-react';
import Card from '../../ui/Card';
import { calculateCost } from '../../../lib/stats';

const PricingCalculator: React.FC = () => {
  const [calls, setCalls] = useState(500);
  const [tier, setTier] = useState('pro');
  const [cost, setCost] = useState(0);
  
  const tiers = [
    { id: 'basic', name: 'Basic', base: 10, perCall: 0.2, included: 100 },
    { id: 'pro', name: 'Professional', base: 50, perCall: 0.15, included: 500 },
    { id: 'enterprise', name: 'Enterprise', base: 200, perCall: 0.1, included: 2500 },
  ];
  
  useEffect(() => {
    setCost(calculateCost(calls, tier));
  }, [calls, tier]);
  
  const getCurrentTier = () => {
    return tiers.find(t => t.id === tier) || tiers[0];
  };
  
  const handleCallsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setCalls(isNaN(value) ? 0 : value);
  };
  
  const currentTier = getCurrentTier();
  const extraCalls = Math.max(0, calls - currentTier.included);
  const basePrice = currentTier.base;
  const extraCost = extraCalls * currentTier.perCall;
  
  return (
    <Card 
      title="Pricing Calculator"
      subtitle="Estimate your costs based on usage"
      className="max-w-4xl mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Select a Plan
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {tiers.map((t) => (
                <div 
                  key={t.id}
                  onClick={() => setTier(t.id)}
                  className={`border rounded-lg p-4 cursor-pointer transition ${
                    tier === t.id 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900 ring-2 ring-blue-500' 
                      : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
                  }`}
                >
                  <h3 className="font-medium text-gray-900 dark:text-white">{t.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    ${t.base}/mo + ${t.perCall.toFixed(2)}/call
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Includes {t.included.toLocaleString()} calls
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <label htmlFor="callsRange" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Estimated Monthly Calls: {calls.toLocaleString()}
            </label>
            <input
              id="callsRange"
              type="range"
              min="0"
              max="5000"
              step="10"
              value={calls}
              onChange={handleCallsChange}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>0</span>
              <span>2,500</span>
              <span>5,000</span>
            </div>
          </div>
          
          <div>
            <label htmlFor="callsInput" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Or enter a specific amount:
            </label>
            <input
              id="callsInput"
              type="number"
              min="0"
              value={calls}
              onChange={handleCallsChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
            />
          </div>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-4">
            <Calculator size={24} className="text-blue-500" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Cost Summary</h3>
          </div>
          
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Base price ({currentTier.name})</span>
              <span className="font-medium text-gray-900 dark:text-white">${basePrice.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Included calls</span>
              <span className="font-medium text-gray-900 dark:text-white">{currentTier.included.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Extra calls</span>
              <span className="font-medium text-gray-900 dark:text-white">{extraCalls.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Cost per extra call</span>
              <span className="font-medium text-gray-900 dark:text-white">${currentTier.perCall.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Extra calls cost</span>
              <span className="font-medium text-gray-900 dark:text-white">${extraCost.toFixed(2)}</span>
            </div>
            
            <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3">
              <div className="flex justify-between">
                <span className="font-medium text-gray-900 dark:text-white">Total estimated monthly cost</span>
                <span className="font-bold text-lg text-blue-600 dark:text-blue-400">${cost.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <p className="text-xs text-gray-500 dark:text-gray-400">
            These estimates are based on your selected plan and usage. Actual costs may vary based on your actual usage and applicable taxes.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default PricingCalculator;