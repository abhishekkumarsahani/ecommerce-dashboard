import React from 'react';

const SalesChart: React.FC = () => {
  const data = [
    { month: 'Jan', sales: 4000, revenue: 2400 },
    { month: 'Feb', sales: 3000, revenue: 1398 },
    { month: 'Mar', sales: 2000, revenue: 9800 },
    { month: 'Apr', sales: 2780, revenue: 3908 },
    { month: 'May', sales: 1890, revenue: 4800 },
    { month: 'Jun', sales: 2390, revenue: 3800 },
    { month: 'Jul', sales: 3490, revenue: 4300 },
  ];

  const maxSales = Math.max(...data.map(d => d.sales));
  const maxRevenue = Math.max(...data.map(d => d.revenue));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold dark:text-white">Monthly Performance</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Last 7 months overview</p>
        </div>
        <div className="flex space-x-4">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
            <span className="text-sm text-gray-600 dark:text-gray-300">Sales</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
            <span className="text-sm text-gray-600 dark:text-gray-300">Revenue</span>
          </div>
        </div>
      </div>

      <div className="relative h-64">
        {/* Grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="border-t border-gray-200 dark:border-gray-700"></div>
          ))}
        </div>

        {/* Chart bars */}
        <div className="absolute inset-0 flex items-end justify-between px-4 pb-8">
          {data.map((item, index) => (
            <div key={index} className="flex flex-col items-center w-10">
              {/* Sales bar */}
              <div 
                className="w-3 bg-blue-500 rounded-t-lg mb-1"
                style={{ height: `${(item.sales / maxSales) * 80}%` }}
              ></div>
              
              {/* Revenue bar */}
              <div 
                className="w-3 bg-green-500 rounded-t-lg"
                style={{ height: `${(item.revenue / maxRevenue) * 80}%` }}
              ></div>
              
              {/* Month label */}
              <span className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                {item.month}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
          <p className="text-gray-500 dark:text-gray-400 text-sm">Avg. Sales</p>
          <p className="text-xl font-bold dark:text-white">
            ${(data.reduce((sum, item) => sum + item.sales, 0) / data.length).toFixed(0)}
          </p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
          <p className="text-gray-500 dark:text-gray-400 text-sm">Avg. Revenue</p>
          <p className="text-xl font-bold dark:text-white">
            ${(data.reduce((sum, item) => sum + item.revenue, 0) / data.length).toFixed(0)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SalesChart;