import { useState } from "react";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import StatsCard from "./components/dashboard/StatsCard";
import ProductTable from "./components/dashboard/ProductTable";
import SalesChart from "./components/dashboard/SalesChart";
import { DollarSign, ShoppingCart, Users, Package } from "lucide-react";
import { Product } from "./types";

const mockProducts: Product[] = [
  { id: "1", name: "Wireless Headphones", category: "Electronics", price: 199.99, stock: 45, sales: 120, image: "🎧" },
  { id: "2", name: "Running Shoes", category: "Fashion", price: 89.99, stock: 120, sales: 89, image: "👟" },
  { id: "3", name: "Smart Watch", category: "Electronics", price: 299.99, stock: 25, sales: 45, image: "⌚" },
  { id: "4", name: "Backpack", category: "Fashion", price: 49.99, stock: 200, sales: 156, image: "🎒" },
];

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">

        {/* Sidebar */}
        <Sidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        {/* Main */}
        <div className="flex-1 lg:ml-72">
          <Header onMenuClick={() => setSidebarOpen(true)} />

          <main className="p-4 md:p-6 space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              <StatsCard title="Revenue" value="$54,232" icon={DollarSign} trend="up" change="+12.5%" />
              <StatsCard title="Sales" value="1,245" icon={ShoppingCart} trend="up" change="+8.2%" />
              <StatsCard title="Users" value="892" icon={Users} trend="up" change="+5.7%" />
              <StatsCard title="Pending Orders" value="23" icon={Package} trend="down" change="-2.1%" />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <Card title="Sales Overview">
                <SalesChart />
              </Card>

              <Card title="Recent Orders">
                <ul className="space-y-3">
                  {["John Doe", "Jane Smith", "Alex Brown"].map((name, i) => (
                    <li key={i} className="flex justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                      <span>{name}</span>
                      <span className="text-green-500 text-sm">Completed</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            {/* Products */}
            <Card title="Products">
              <ProductTable products={mockProducts} />
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
}

const Card = ({ title, children }: any) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
    <h2 className="text-xl font-bold mb-4">{title}</h2>
    {children}
  </div>
);
