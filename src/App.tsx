import { useState, useEffect } from "react";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import StatsCard from "./components/dashboard/StatsCard";
import ProductTable from "./components/dashboard/ProductTable";
import SalesChart from "./components/dashboard/SalesChart";
import { 
  DollarSign, ShoppingCart, Users, Package, 
  TrendingUp, TrendingDown, Filter, Plus, 
  Download, Eye, MoreVertical, Calendar,
  BarChart3, Target, Clock, CheckCircle,
  AlertTriangle, ArrowUpRight, ArrowDownRight
} from "lucide-react";
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
  { id: "ORD-001", customer: "John Doe", date: "2024-01-15", amount: 199.99, status: "completed", items: 2 },
  { id: "ORD-002", customer: "Jane Smith", date: "2024-01-14", amount: 349.98, status: "completed", items: 3 },
  { id: "ORD-003", customer: "Alex Brown", date: "2024-01-14", amount: 89.99, status: "completed", items: 1 },
  { id: "ORD-004", customer: "Mike Wilson", date: "2024-01-13", amount: 129.99, status: "pending", items: 1 },
  { id: "ORD-005", customer: "Sarah Johnson", date: "2024-01-13", amount: 299.99, status: "completed", items: 2 },
];

const topCustomers = [
  { name: "Emily Davis", email: "emily@example.com", purchases: 24, totalSpent: 2899.99, avatar: "ED" },
  { name: "Robert Chen", email: "robert@example.com", purchases: 18, totalSpent: 2150.50, avatar: "RC" },
  { name: "Lisa Wong", email: "lisa@example.com", purchases: 15, totalSpent: 1875.75, avatar: "LW" },
  { name: "David Miller", email: "david@example.com", purchases: 12, totalSpent: 1549.99, avatar: "DM" },
];

const activityLog = [
  { id: 1, user: "John Doe", action: "added new product", target: "Wireless Headphones", time: "10 min ago" },
  { id: 2, user: "Jane Smith", action: "updated inventory", target: "Running Shoes", time: "25 min ago" },
  { id: 3, user: "System", action: "completed order", target: "ORD-001", time: "1 hour ago" },
  { id: 4, user: "Alex Brown", action: "processed refund", target: "$149.99", time: "2 hours ago" },
];

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeFilter, setActiveFilter] = useState("month");
  const [time, setTime] = useState(new Date());
  const [sidebarWidth, setSidebarWidth] = useState(288); // Default 72 * 4 = 288px

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Update sidebar width based on collapsed state
    setSidebarWidth(sidebarCollapsed ? 80 : 288);
  }, [sidebarCollapsed]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleSidebarToggle = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 flex transition-all duration-300 overflow-hidden">
        
        {/* Sidebar */}
        <Sidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          onToggle={handleSidebarToggle}
        />

        {/* Main Content - Dynamic margin based on sidebar state */}
        <div 
          className="flex-1 transition-all duration-300 ease-in-out"
          style={{
            marginLeft: sidebarCollapsed ? '80px' : '288px',
            width: sidebarCollapsed ? 'calc(100% - 80px)' : 'calc(100% - 288px)'
          }}
        >
          <Header 
            onMenuClick={() => setSidebarOpen(true)} 
            darkMode={darkMode}
            onDarkModeToggle={toggleDarkMode}
            sidebarCollapsed={sidebarCollapsed}
            onSidebarToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          />

          <main className="p-4 md:p-6 space-y-6 animate-fade-in">
            {/* Welcome Header with Time */}
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <div className="flex items-center space-x-3">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">
                    System is live
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  Welcome back, John <span className="wave">👋</span>
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                  {formatDate(time)} • {formatTime(time)}
                </p>
              </div>
              
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                {/* Time Period Filter */}
                <div className="flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
                  {["day", "week", "month", "year"].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all duration-200 ${
                        activeFilter === filter
                          ? darkMode
                            ? "bg-gray-700 text-white shadow-md"
                            : "bg-white text-gray-900 shadow-md"
                          : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
                
                {/* Action Buttons */}
                <div className="flex items-center space-x-2">
                  <button className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                    <Download size={20} />
                  </button>
                  <button className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg flex items-center space-x-2">
                    <Plus size={20} />
                    <span>New Product</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Stats Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
              <StatsCard 
                title="Total Revenue" 
                value="$54,232" 
                icon={DollarSign} 
                trend="up" 
                change="+12.5%" 
                description="+$2,450 from last month"
                gradient="from-blue-500 to-cyan-500"
              />
              <StatsCard 
                title="Total Sales" 
                value="1,245" 
                icon={ShoppingCart} 
                trend="up" 
                change="+8.2%" 
                description="+142 orders this month"
                gradient="from-green-500 to-emerald-500"
              />
              <StatsCard 
                title="Active Customers" 
                value="892" 
                icon={Users} 
                trend="up" 
                change="+5.7%" 
                description="+48 new customers"
                gradient="from-purple-500 to-violet-500"
              />
              <StatsCard 
                title="Pending Orders" 
                value="23" 
                icon={Package} 
                trend="down" 
                change="-2.1%" 
                description="5 urgent orders"
                gradient="from-amber-500 to-orange-500"
              />
            </div>

            {/* Main Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {/* Sales Chart */}
              <div className="lg:col-span-2">
                <Card 
                  title="Revenue Analytics" 
                  subtitle="Sales performance over time"
                  action={
                    <div className="flex items-center space-x-3">
                      <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        <Filter size={18} />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  }
                >
                  <div className="h-[300px]">
                    <SalesChart />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <MetricItem label="Avg. Daily Sales" value="$1,485" change="+4.2%" positive />
                    <MetricItem label="Conversion Rate" value="3.24%" change="+0.8%" positive />
                    <MetricItem label="Return Rate" value="2.1%" change="-0.3%" positive />
                    <MetricItem label="Avg. Order Value" value="$89.42" change="+2.7%" positive />
                  </div>
                </Card>
              </div>

              {/* Recent Activity */}
              <div className="space-y-5">
                <Card title="Recent Activity" subtitle="Latest system activities">
                  <div className="space-y-4">
                    {activityLog.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                          {activity.user.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium dark:text-white truncate">
                            {activity.user} <span className="font-normal text-gray-600 dark:text-gray-400">{activity.action}</span>
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{activity.target}</p>
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                          {activity.time}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Quick Stats */}
                <Card title="Performance" subtitle="Store metrics at a glance">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-800/30">
                          <Target size={20} className="text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium dark:text-white">Target Achievement</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Monthly goal</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold dark:text-white">84%</p>
                        <div className="h-2 w-20 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mt-1">
                          <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" style={{ width: '84%' }}></div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium dark:text-white">Avg. Response</p>
                          <Clock size={16} className="text-gray-400" />
                        </div>
                        <p className="text-xl font-bold mt-2 dark:text-white">2.4m</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Customer support</p>
                      </div>
                      
                      <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium dark:text-white">Satisfaction</p>
                          <CheckCircle size={16} className="text-green-400" />
                        </div>
                        <p className="text-xl font-bold mt-2 dark:text-white">94%</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Based on reviews</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Products & Orders Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {/* Recent Orders */}
              <div className="lg:col-span-2">
                <Card 
                  title="Recent Orders" 
                  subtitle="Latest customer orders"
                  action={
                    <button className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                      View all →
                    </button>
                  }
                >
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left text-sm text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                          <th className="pb-3 font-medium">Order ID</th>
                          <th className="pb-3 font-medium">Customer</th>
                          <th className="pb-3 font-medium">Date</th>
                          <th className="pb-3 font-medium">Items</th>
                          <th className="pb-3 font-medium">Amount</th>
                          <th className="pb-3 font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentOrders.map((order) => (
                          <tr key={order.id} className="border-b border-gray-200 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                            <td className="py-4 font-medium dark:text-white">{order.id}</td>
                            <td className="py-4 dark:text-white">{order.customer}</td>
                            <td className="py-4 text-gray-500 dark:text-gray-400">{order.date}</td>
                            <td className="py-4">
                              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm">
                                {order.items} item{order.items > 1 ? 's' : ''}
                              </span>
                            </td>
                            <td className="py-4 font-semibold dark:text-white">${order.amount.toFixed(2)}</td>
                            <td className="py-4">
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                order.status === 'completed' 
                                  ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                                  : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
                              }`}>
                                {order.status === 'completed' ? (
                                  <>
                                    <CheckCircle size={12} className="mr-1" />
                                    Completed
                                  </>
                                ) : (
                                  <>
                                    <Clock size={12} className="mr-1" />
                                    Pending
                                  </>
                                )}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </div>

              {/* Top Customers */}
              <div>
                <Card title="Top Customers" subtitle="Highest spending customers">
                  <div className="space-y-4">
                    {topCustomers.map((customer, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group">
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                              {customer.avatar}
                            </div>
                            {index < 3 && (
                              <div className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-yellow-500 flex items-center justify-center text-xs text-white font-bold">
                                {index + 1}
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-medium dark:text-white">{customer.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-[120px]">
                              {customer.email}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg dark:text-white">${customer.totalSpent.toFixed(2)}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{customer.purchases} purchases</p>
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
                <div className="flex items-center space-x-3">
                  <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <Filter size={16} />
                    <span>Filter</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors">
                    <Download size={16} />
                    <span>Export</span>
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
                  color="blue"
                />
                <SummaryItem 
                  label="Avg. Price" 
                  value={`$${(mockProducts.reduce((sum, p) => sum + p.price, 0) / mockProducts.length).toFixed(2)}`}
                  icon={DollarSign}
                  trend="up"
                  change="+5.2%"
                  color="green"
                />
                <SummaryItem 
                  label="Total Stock" 
                  value={mockProducts.reduce((sum, p) => sum + p.stock, 0).toString()}
                  icon={Package}
                  trend="neutral"
                  color="purple"
                />
                <SummaryItem 
                  label="Low Stock" 
                  value={mockProducts.filter(p => p.stock < 50).length.toString()}
                  icon={AlertTriangle}
                  trend="down"
                  change="Attention needed"
                  color="red"
                />
              </div>
            </Card>
          </main>

          {/* Enhanced Footer */}
          <footer className="px-6 py-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div className="text-center md:text-left">
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  © 2024 ShopDash. All rights reserved. • <span className="font-medium">v2.1.0</span>
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  Dashboard updated just now • <span className="text-green-500">●</span> All systems operational
                </p>
              </div>
              <div className="flex items-center justify-center md:justify-end space-x-6 mt-3 md:mt-0">
                <a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                  Support
                </a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

// Enhanced Helper Components
const Card = ({ title, subtitle, children, action }: any) => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700">
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

const SummaryItem = ({ label, value, icon: Icon, trend, change, color = "blue" }: any) => {
  const colorClasses = {
    blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
    green: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
    purple: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
    red: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400",
  };

  return (
    <div className="flex items-center space-x-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/30 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors group">
      <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
        <Icon size={22} />
      </div>
      <div className="flex-1">
        <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
        <p className="font-bold text-xl dark:text-white mt-1">{value}</p>
        {change && (
          <div className="flex items-center mt-2">
            {trend === 'up' && <ArrowUpRight size={14} className="text-green-500 mr-1" />}
            {trend === 'down' && <ArrowDownRight size={14} className="text-red-500 mr-1" />}
            <span className={`text-xs font-medium ${
              trend === 'up' ? 'text-green-600 dark:text-green-400' : 
              trend === 'down' ? 'text-red-600 dark:text-red-400' : 
              'text-gray-500 dark:text-gray-400'
            }`}>
              {change}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

const MetricItem = ({ label, value, change, positive }: any) => (
  <div className="text-center">
    <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
    <p className="text-xl font-bold mt-2 dark:text-white">{value}</p>
    <div className={`inline-flex items-center mt-1 text-xs font-medium ${
      positive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
    }`}>
      {positive ? <ArrowUpRight size={12} className="mr-1" /> : <ArrowDownRight size={12} className="mr-1" />}
      {change}
    </div>
  </div>
);