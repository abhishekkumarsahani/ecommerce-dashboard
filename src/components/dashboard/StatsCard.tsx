import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend: 'up' | 'down';
  change: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon: Icon, trend, change }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-all hover:shadow-md">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">{title}</p>
          <h3 className="text-2xl font-bold dark:text-white">{value}</h3>
        </div>
        <div className={`p-3 rounded-lg ${
          trend === 'up' 
            ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
            : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
        }`}>
          <Icon size={24} />
        </div>
      </div>
      
      <div className="flex items-center mt-4">
        <span className={`inline-flex items-center text-sm font-medium ${
          trend === 'up' 
            ? 'text-green-600 dark:text-green-400'
            : 'text-red-600 dark:text-red-400'
        }`}>
          {trend === 'up' ? '↗' : '↘'} {change}
          <span className="text-gray-500 dark:text-gray-400 ml-2">from last month</span>
        </span>
      </div>
    </div>
  );
};

export default StatsCard;