import React, { useState } from 'react';
import { 
  Home, ShoppingBag, Users, Package, Settings, 
  DollarSign, BarChart3, FileText, HelpCircle, 
  X, LogOut, ChevronRight, Bell, Search, 
  Moon, Sun, ChevronLeft, User, CreditCard,
  Shield, Globe, MessageSquare
} from "lucide-react";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

const menuItems = [
  { icon: Home, label: "Dashboard", active: true, badge: null },
  { icon: ShoppingBag, label: "Products", active: false, badge: 12 },
  { icon: Users, label: "Customers", active: false, badge: null },
  { icon: DollarSign, label: "Sales", active: false, badge: "New" },
  { icon: Package, label: "Inventory", active: false, badge: 3 },
  { icon: BarChart3, label: "Analytics", active: false, badge: null },
  { icon: FileText, label: "Reports", active: false, badge: 5 },
  { icon: Settings, label: "Settings", active: false, badge: null },
];

const secondaryMenuItems = [
  { icon: Shield, label: "Security" },
  { icon: CreditCard, label: "Billing" },
  { icon: Globe, label: "Region" },
  { icon: MessageSquare, label: "Support" },
];

const Sidebar: React.FC<SidebarProps> = ({ open, onClose, darkMode, setDarkMode }) => {
  const [collapsed, setCollapsed] = useState(false);
  
  return (
    <>
      {/* Overlay for mobile */}
      {open && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      <aside className={`fixed inset-y-0 left-0 z-40 flex flex-col transform transition-all duration-300 ease-in-out lg:translate-x-0 ${
        open ? 'translate-x-0' : '-translate-x-full'
      } ${collapsed ? 'w-20' : 'w-72'} ${
        darkMode 
          ? 'bg-gradient-to-b from-gray-900 to-gray-950 text-white' 
          : 'bg-gradient-to-b from-white to-gray-50 text-gray-900'
      }`}>
        
        {/* Sidebar header with branding */}
        <div className={`flex items-center ${collapsed ? 'justify-center p-4' : 'justify-between p-6'} ${
          darkMode ? 'border-gray-800' : 'border-gray-200'
        }`}>
          {!collapsed ? (
            <div className="flex items-center space-x-3">
              <div className={`h-10 w-10 rounded-xl flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg`}>
                <ShoppingBag className="text-white" size={20} />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">ShopDash</h1>
                <p className="text-xs opacity-70">E-Commerce Panel</p>
              </div>
            </div>
          ) : (
            <div className={`h-10 w-10 rounded-xl flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg`}>
              <ShoppingBag className="text-white" size={20} />
            </div>
          )}
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setCollapsed(!collapsed)}
              className={`hidden lg:flex p-2 rounded-full transition-all ${
                darkMode 
                  ? 'hover:bg-gray-800' 
                  : 'hover:bg-gray-100'
              }`}
            >
              <ChevronLeft className={`transition-transform ${collapsed ? 'rotate-180' : ''}`} size={18} />
            </button>
            
            <button 
              onClick={onClose}
              className="lg:hidden p-2 rounded-full hover:bg-gray-800"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Search bar (hidden when collapsed) */}
        {!collapsed && (
          <div className="px-4 mb-6">
            <div className={`relative rounded-xl overflow-hidden ${
              darkMode ? 'bg-gray-800' : 'bg-gray-100'
            }`}>
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <Search size={18} className="opacity-50" />
              </div>
              <input 
                type="text" 
                placeholder="Search..."
                className={`w-full py-3 pl-10 pr-4 text-sm focus:outline-none ${
                  darkMode 
                    ? 'bg-gray-800 text-white placeholder-gray-400' 
                    : 'bg-gray-100 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>
          </div>
        )}

        {/* Sidebar menu */}
        <nav className="flex-1 overflow-y-auto px-3 space-y-1">
          <div className={`mb-4 ${collapsed ? 'px-2' : 'px-3'}`}>
            {!collapsed && (
              <p className="text-xs font-semibold uppercase tracking-wider opacity-50 mb-2">
                Main Menu
              </p>
            )}
            
            {menuItems.map((item, index) => (
              <a
                key={index}
                href="#"
                className={`flex items-center ${collapsed ? 'justify-center p-3' : 'justify-between p-3'} rounded-xl transition-all group relative ${
                  item.active 
                    ? darkMode 
                      ? 'bg-gradient-to-r from-blue-900/40 to-purple-900/30 text-blue-300 shadow-inner' 
                      : 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 shadow-sm'
                    : darkMode 
                      ? 'hover:bg-gray-800/50' 
                      : 'hover:bg-gray-100'
                }`}
              >
                <div className={`flex items-center ${collapsed ? '' : 'space-x-3'}`}>
                  <div className={`relative ${item.active ? 'text-blue-500' : 'opacity-70'}`}>
                    <item.icon size={20} />
                    {item.active && (
                      <span className="absolute -top-1 -right-1 h-2 w-2 bg-blue-500 rounded-full animate-pulse"></span>
                    )}
                  </div>
                  
                  {!collapsed && (
                    <span className="font-medium">{item.label}</span>
                  )}
                </div>
                
                {!collapsed && (
                  <div className="flex items-center gap-2">
                    {item.badge && (
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        typeof item.badge === 'number'
                          ? darkMode 
                            ? 'bg-blue-900/50 text-blue-300' 
                            : 'bg-blue-100 text-blue-700'
                          : darkMode
                            ? 'bg-green-900/50 text-green-300'
                            : 'bg-green-100 text-green-700'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                    <ChevronRight size={16} className="opacity-30 group-hover:opacity-70" />
                  </div>
                )}
                
                {/* Tooltip for collapsed mode */}
                {collapsed && (
                  <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                    {item.label}
                    {item.badge && (
                      <span className="ml-2 text-xs bg-blue-500 px-1.5 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </a>
            ))}
          </div>
          
          {/* Secondary menu */}
          {!collapsed && (
            <div className="mb-4 px-3">
              <p className="text-xs font-semibold uppercase tracking-wider opacity-50 mb-2">
                Preferences
              </p>
              
              {secondaryMenuItems.map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className={`flex items-center p-3 rounded-xl transition-colors ${
                    darkMode 
                      ? 'hover:bg-gray-800/50' 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <item.icon size={18} className="opacity-70 mr-3" />
                  <span className="text-sm font-medium">{item.label}</span>
                </a>
              ))}
            </div>
          )}
        </nav>

        {/* Dark mode toggle */}
        <div className={`p-4 border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
          <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between'}`}>
            {!collapsed && (
              <div className="flex items-center">
                {darkMode ? (
                  <Moon size={18} className="mr-2 opacity-70" />
                ) : (
                  <Sun size={18} className="mr-2 opacity-70" />
                )}
                <span className="text-sm">Dark Mode</span>
              </div>
            )}
            
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                darkMode ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                darkMode ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>
        </div>

        {/* User section */}
        <div className={`p-4 border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
          <div className={`flex items-center ${collapsed ? 'justify-center mb-2' : 'justify-between mb-4'}`}>
            {!collapsed ? (
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 shadow-md`}>
                    <User className="text-white" size={18} />
                  </div>
                  <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-gray-900"></span>
                </div>
                <div className="flex-1">
                  <p className="font-medium">John Doe</p>
                  <p className="text-xs opacity-70">Admin</p>
                </div>
              </div>
            ) : (
              <div className="relative">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 shadow-md`}>
                  <User className="text-white" size={18} />
                </div>
              </div>
            )}
            
            {!collapsed && (
              <button className={`p-2 rounded-full ${
                darkMode 
                  ? 'hover:bg-gray-800' 
                  : 'hover:bg-gray-100'
              }`}>
                <Bell size={18} />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
            )}
          </div>
          
          <div className={`flex items-center ${collapsed ? 'justify-center gap-1' : 'justify-between'}`}>
            {!collapsed ? (
              <>
                <button className={`flex items-center space-x-2 p-2 rounded-lg text-sm flex-1 justify-center ${
                  darkMode 
                    ? 'hover:bg-gray-800' 
                    : 'hover:bg-gray-100'
                }`}>
                  <HelpCircle size={16} />
                  <span>Help</span>
                </button>
                
                <button className={`flex items-center space-x-2 p-2 rounded-lg text-sm flex-1 justify-center ${
                  darkMode 
                    ? 'hover:bg-gray-800' 
                    : 'hover:bg-gray-100'
                }`}>
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <button className="p-2 rounded-full hover:bg-gray-800 relative group">
                  <HelpCircle size={18} />
                  <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap">
                    Help
                  </div>
                </button>
                
                <button className="p-2 rounded-full hover:bg-gray-800 relative group">
                  <LogOut size={18} />
                  <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap">
                    Logout
                  </div>
                </button>
              </>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;