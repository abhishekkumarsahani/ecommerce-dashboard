import React, { useState } from 'react';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import StatsCard from './components/dashboard/StatsCard';
import { DollarSign, ShoppingCart, Users, Package } from 'lucide-react';
import { Product, Order, Review, Stats } from './types';
import ProductTable from '../src/components/dashboard/ProductTable';
import SalesChart from '../src/components/dashboard/SalesChart';

// Mock data
const mockProducts: Product[] = [
  { id: '1', name: 'Wireless Headphones', category: 'Electronics', price: 199.99, stock: 45, sales: 120, image: '🎧' },
  { id: '2', name: 'Running Shoes', category: 'Fashion', price: 89.99, stock: 120, sales: 89, image: '👟' },
  { id: '3', name: 'Smart Watch', category: 'Electronics', price: 299.99, stock: 25, sales: 45, image: '⌚' },
  { id: '4', name: 'Backpack', category: 'Fashion', price: 49.99, stock: 200, sales: 156, image: '🎒' },
];

const statsData: Stats = {
  totalRevenue: 54232.89,
  totalSales: 1245,
  activeUsers: 892,
  pendingOrders: 23,
};

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatsCard
                title="Total Revenue"
                value={`$${statsData.totalRevenue.toLocaleString()}`}
                icon={DollarSign}
                change="+12.5%"
                trend="up"
              />
              <StatsCard
                title="Total Sales"
                value={statsData.totalSales.toLocaleString()}
                icon={ShoppingCart}
                change="+8.2%"
                trend="up"
              />
              <StatsCard
                title="Active Users"
                value={statsData.activeUsers.toLocaleString()}
                icon={Users}
                change="+5.7%"
                trend="up"
              />
              <StatsCard
                title="Pending Orders"
                value={statsData.pendingOrders.toString()}
                icon={Package}
                change="-2.1%"
                trend="down"
              />
            </div>

            {/* Charts and Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-bold mb-4">Sales Overview</h2>
                <SalesChart />
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
                <div className="space-y-4">
                  {['John Doe', 'Jane Smith', 'Robert Johnson', 'Emily Davis'].map((customer, i) => (
                    <div key={i} className="flex justify-between items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">
                      <div>
                        <p className="font-medium">{customer}</p>
                        <p className="text-sm text-gray-500">Order #ORD-{1000 + i}</p>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        Completed
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Products Table */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
              <div className="p-6 border-b dark:border-gray-700">
                <h2 className="text-xl font-bold">Products</h2>
                <p className="text-gray-500 dark:text-gray-400">Manage your products inventory</p>
              </div>
              <ProductTable products={mockProducts} />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;