import React from 'react';
import { 
  Home, ShoppingBag, Users, Package, Settings, 
  DollarSign, BarChart3, FileText, HelpCircle, 
  X, LogOut, ChevronRight 
} from "lucide-react";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

const menuItems = [
  { icon: Home, label: "Dashboard", active: true },
  { icon: ShoppingBag, label: "Products" },
  { icon: Users, label: "Customers" },
  { icon: DollarSign, label: "Sales" },
  { icon: Package, label: "Inventory" },
  { icon: BarChart3, label: "Analytics" },
  { icon: FileText, label: "Reports" },
  { icon: Settings, label: "Settings" },
];

const Sidebar: React.FC<SidebarProps> = ({ open, onClose, darkMode, setDarkMode }) => {
  return (
    <>
      {/* Overlay for mobile */}
      {open && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`fixed inset-y-0 left-0 z-40 w-72 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        open ? 'translate-x-0' : '-translate-x-full'
      } ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
        
        {/* Sidebar header */}
        <div className={`flex items-center justify-between p-6 border-b ${
          darkMode ? 'border-gray-800' : 'border-gray-200'
        }`}>
          <div className="flex items-center space-x-3">
            <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
              darkMode ? 'bg-blue-600' : 'bg-blue-500'
            }`}>
              <ShoppingBag className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-xl font-bold">ShopDash</h1>
              <p className="text-xs opacity-70">E-Commerce Panel</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-800"
          >
            <X size={20} />
          </button>
        </div>

        {/* Sidebar menu */}
        <nav className="p-4 space-y-1">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href="#"
              className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                item.active 
                  ? darkMode 
                    ? 'bg-blue-900/30 text-blue-300' 
                    : 'bg-blue-50 text-blue-700'
                  : darkMode 
                    ? 'hover:bg-gray-800' 
                    : 'hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center space-x-3">
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </div>
              <ChevronRight size={16} className="opacity-50" />
            </a>
          ))}
        </nav>

        {/* User section */}
        <div className={`absolute bottom-0 w-full p-6 border-t ${
          darkMode ? 'border-gray-800' : 'border-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                darkMode ? 'bg-blue-700' : 'bg-blue-600'
              }`}>
                <span className="text-white font-medium">JD</span>
              </div>
              <div>
                <p className="font-medium">John Doe</p>
                <p className="text-xs opacity-70">Admin</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <button className={`flex items-center space-x-2 p-2 rounded-lg text-sm ${
              darkMode 
                ? 'hover:bg-gray-800' 
                : 'hover:bg-gray-100'
            }`}>
              <HelpCircle size={16} />
              <span>Help</span>
            </button>
            
            <button className={`flex items-center space-x-2 p-2 rounded-lg text-sm ${
              darkMode 
                ? 'hover:bg-gray-800' 
                : 'hover:bg-gray-100'
            }`}>
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;