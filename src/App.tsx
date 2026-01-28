import { useState } from "react";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import StatsCard from "./components/dashboard/StatsCard";
import ProductTable from "./components/dashboard/ProductTable";
import SalesChart from "./components/dashboard/SalesChart";
import { DollarSign, ShoppingCart, Users, Package, TrendingUp, TrendingDown } from "lucide-react";
import { Product } from "./types";

const mockProducts: Product[] = [
  { id: "1", name: "Wireless Headphones", category: "Electronics", price: 199.99, stock: 45, sales: 120, image: "🎧" },
  { id: "2", name: "Running Shoes", category: "Fashion", price: 89.99, stock: 120, sales: 89, image: "👟" },
  { id: "3", name: "Smart Watch", category: "Electronics", price: 299.99, stock: 25, sales: 45, image: "⌚" },
  { id: "4", name: "Backpack", category: "Fashion", price: 49.99, stock: 200, sales: 156, image: "🎒" },
  { id: "5", name: "Bluetooth Speaker", category: "Electronics", price: 129.99, stock: 65, sales: 98, image: "🔊" },
  { id: "6", name: "Yoga Mat", category: "Fitness", price: 29.99, stock: 150, sales: 210, image: "🧘" },
  { id: "7", name: "Laptop Stand", category: "Electronics", price: 39.99, stock: 85, sales: 67, image: "💻" },
  { id: "8", name: "Water Bottle", category: "Fitness", price: 24.99, stock: 300, sales: 342, image: "💧" },
];

const recentOrders = [
  { id: "ORD-001", customer: "John Doe", date: "2024-01-15", amount: 199.99, status: "completed" },
  { id: "ORD-002", customer: "Jane Smith", date: "2024-01-14", amount: 349.98, status: "completed" },
  { id: "ORD-003", customer: "Alex Brown", date: "2024-01-14", amount: 89.99, status: "completed" },
  { id: "ORD-004", customer: "Mike Wilson", date: "2024-01-13", amount: 129.99, status: "pending" },
  { id: "ORD-005", customer: "Sarah Johnson", date: "2024-01-13", amount: 299.99, status: "completed" },
];

const topCustomers = [
  { name: "Emily Davis", email: "emily@example.com", purchases: 24, totalSpent: 2899.99 },
  { name: "Robert Chen", email: "robert@example.com", purchases: 18, totalSpent: 2150.50 },
  { name: "Lisa Wong", email: "lisa@example.com", purchases: 15, totalSpent: 1875.75 },
  { name: "David Miller", email: "david@example.com", purchases: 12, totalSpent: 1549.99 },
];

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("month");

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex transition-colors duration-300">
        
        {/* Sidebar */}
        <Sidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        {/* Main Content */}
        <div className="flex-1 lg:ml-72 transition-all duration-300">
          <Header 
            onMenuClick={() => setSidebarOpen(true)} 
            darkMode={darkMode}
            onDarkModeToggle={toggleDarkMode}
          />

          <main className="p-4 md:p-6 space-y-8 animate-fade-in">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  Welcome back, John 👋
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                  Here's what's happening with your store today.
                </p>
              </div>
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                  {["day", "week", "month", "year"].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className={`px-3 py-1.5 rounded-md text-sm font-medium capitalize transition-all ${
                        activeFilter === filter
                          ? darkMode
                            ? "bg-gray-700 text-white"
                            : "bg-white text-gray-900 shadow"
                          : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                  + New Product
                </button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              <StatsCard 
                title="Total Revenue" 
                value="$54,232" 
                icon={DollarSign} 
                trend="up" 
                change="+12.5%" 
                description="+$2,450 from last month"
              />
              <StatsCard 
                title="Total Sales" 
                value="1,245" 
                icon={ShoppingCart} 
                trend="up" 
                change="+8.2%" 
                description="+142 orders this month"
              />
              <StatsCard 
                title="Active Customers" 
                value="892" 
                icon={Users} 
                trend="up" 
                change="+5.7%" 
                description="+48 new customers"
              />
              <StatsCard 
                title="Pending Orders" 
                value="23" 
                icon={Package} 
                trend="down" 
                change="-2.1%" 
                description="5 urgent orders"
              />
            </div>

            {/* Charts & Recent Orders */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Sales Chart - Takes 2 columns on large screens */}
              <div className="lg:col-span-2">
                <Card 
                  title="Sales Overview" 
                  subtitle="Monthly revenue and sales trends"
                  action={
                    <select className="text-sm bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1.5">
                      <option>Last 7 months</option>
                      <option>Last 12 months</option>
                      <option>Year to date</option>
                    </select>
                  }
                >
                  <SalesChart />
                </Card>
              </div>

              {/* Recent Orders & Top Customers - Takes 1 column */}
              <div className="space-y-6">
                <Card title="Recent Orders" subtitle="Latest customer orders">
                  <div className="space-y-3">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{order.customer}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{order.id} • {order.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold dark:text-white">${order.amount.toFixed(2)}</p>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                            order.status === 'completed' 
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                              : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
                          }`}>
                            {order.status === 'completed' ? '✓' : '⏱'} {order.status}
                          </span>
                        </div>
                      </div>
                    ))}
                    <button className="w-full text-center py-3 text-blue-600 dark:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg font-medium transition-colors">
                      View all orders →
                    </button>
                  </div>
                </Card>

                <Card title="Top Customers" subtitle="Highest spending customers">
                  <div className="space-y-4">
                    {topCustomers.map((customer, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                            <span className="font-medium text-blue-600 dark:text-blue-300">
                              {customer.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium dark:text-white">{customer.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-[120px]">
                              {customer.email}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold dark:text-white">${customer.totalSpent.toFixed(2)}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{customer.purchases} purchases</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>

            {/* Products Table */}
            <Card 
              title="Product Inventory" 
              subtitle="Manage your products and inventory"
              action={
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search products..."
                      className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent text-sm w-48"
                    />
                    <SearchIcon className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  </div>
                  <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    Filter
                  </button>
                </div>
              }
            >
              <ProductTable products={mockProducts} />
              
              {/* Summary Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <SummaryItem 
                  label="Total Products" 
                  value={mockProducts.length.toString()} 
                  icon={Package}
                  trend="up"
                  change="+2"
                />
                <SummaryItem 
                  label="Avg. Price" 
                  value={`$${(mockProducts.reduce((sum, p) => sum + p.price, 0) / mockProducts.length).toFixed(2)}`}
                  icon={DollarSign}
                  trend="up"
                  change="+5.2%"
                />
                <SummaryItem 
                  label="Total Stock" 
                  value={mockProducts.reduce((sum, p) => sum + p.stock, 0).toString()}
                  icon={Package}
                  trend="neutral"
                />
                <SummaryItem 
                  label="Low Stock" 
                  value={mockProducts.filter(p => p.stock < 50).length.toString()}
                  icon={TrendingDown}
                  trend="down"
                  change="Attention needed"
                  warning
                />
              </div>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100">Conversion Rate</p>
                    <h3 className="text-2xl font-bold mt-1">3.24%</h3>
                    <p className="text-blue-100 text-sm mt-2">+0.8% from last week</p>
                  </div>
                  <TrendingUp className="h-12 w-12 opacity-80" />
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100">Avg. Order Value</p>
                    <h3 className="text-2xl font-bold mt-1">$89.42</h3>
                    <p className="text-purple-100 text-sm mt-2">+$4.20 from last month</p>
                  </div>
                  <DollarSign className="h-12 w-12 opacity-80" />
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100">Customer Satisfaction</p>
                    <h3 className="text-2xl font-bold mt-1">4.8/5.0</h3>
                    <p className="text-green-100 text-sm mt-2">Based on 892 reviews</p>
                  </div>
                  <Users className="h-12 w-12 opacity-80" />
                </div>
              </div>
            </div>
          </main>

          {/* Footer */}
          <footer className="px-6 py-4 border-t border-gray-200 dark:border-gray-800 text-center text-gray-500 dark:text-gray-400 text-sm">
            <p>© 2024 ShopDash. All rights reserved. • v2.1.0</p>
            <p className="mt-1">Dashboard updated just now</p>
          </footer>
        </div>
      </div>
    </div>
  );
}

// Helper Components
const Card = ({ title, subtitle, children, action }: any) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover-card transition-all">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
      <div>
        <h2 className="text-xl font-bold dark:text-white">{title}</h2>
        {subtitle && <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{subtitle}</p>}
      </div>
      {action && <div className="mt-3 sm:mt-0">{action}</div>}
    </div>
    {children}
  </div>
);

const SummaryItem = ({ label, value, icon: Icon, trend, change, warning = false }: any) => (
  <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/30">
    <div className={`p-2 rounded-lg ${warning ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'}`}>
      <Icon size={20} />
    </div>
    <div>
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      <p className="font-bold text-lg dark:text-white">{value}</p>
      {change && (
        <p className={`text-xs mt-1 ${warning ? 'text-red-600 dark:text-red-400' : trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>
          {trend === 'up' && '↗ '}{trend === 'down' && '↘ '}{change}
        </p>
      )}
    </div>
  </div>
);

const SearchIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);