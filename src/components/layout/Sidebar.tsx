import React from 'react';
import { Home, ShoppingCart, Users, BarChart, Package, Settings, CreditCard } from 'lucide-react';

const Sidebar: React.FC = () => {
  const menuItems = [
    { icon: <Home size={20} />, label: 'Dashboard', active: true },
    { icon: <ShoppingCart size={20} />, label: 'Orders' },
    { icon: <Package size={20} />, label: 'Products' },
    { icon: <Users size={20} />, label: 'Customers' },
    { icon: <BarChart size={20} />, label: 'Analytics' },
    { icon: <CreditCard size={20} />, label: 'Transactions' },
    { icon: <Settings size={20} />, label: 'Settings' },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white h-screen p-6 hidden lg:block">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">🛍️ E-Commerce</h1>
        <p className="text-gray-400 text-sm">Admin Dashboard</p>
      </div>
      <nav>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.label}>
              <a
                href="#"
                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  item.active
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-gray-800 text-gray-300'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;