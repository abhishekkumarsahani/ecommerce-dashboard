import React, { useState } from "react";
import {
  Home,
  ShoppingCart,
  Users,
  BarChart,
  Package,
  Settings,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  Bell,
  LogOut,
  HelpCircle,
  Sun,
  Moon,
  ShoppingBag,
  TrendingUp,
  DollarSign,
  User,
} from "lucide-react";

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState("Dashboard");
  const [darkMode, setDarkMode] = useState(true);

  const menuItems = [
    { icon: Home, label: "Dashboard", badge: null },
    { icon: ShoppingCart, label: "Orders", badge: "24" },
    { icon: Package, label: "Products", badge: "156" },
    { icon: Users, label: "Customers", badge: "1.2k" },
    { icon: BarChart, label: "Analytics", badge: null },
    { icon: CreditCard, label: "Transactions", badge: null },
    { icon: Settings, label: "Settings", badge: null },
  ];

  const statsItems = [
    { icon: DollarSign, label: "Revenue", value: "$42.8k", change: "+12.5%" },
    { icon: TrendingUp, label: "Growth", value: "24.7%", change: "+8.2%" },
  ];

  return (
    <aside
      className={`
        ${collapsed ? "w-20" : "w-72"}
        h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 
        text-white p-4 transition-all duration-300 
        hidden lg:flex flex-col border-r border-gray-800
        shadow-2xl
      `}
    >
      {/* Header with Logo */}
      <div className="flex items-center justify-between mb-8 pt-2">
        {!collapsed ? (
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <ShoppingBag size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">ShopSphere</h1>
              <p className="text-xs text-gray-400 font-medium">Admin Panel</p>
            </div>
          </div>
        ) : (
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto">
            <ShoppingBag size={20} className="text-white" />
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`
            p-2 rounded-xl transition-all duration-200
            ${collapsed ? "bg-gray-800" : "hover:bg-gray-800"}
            border border-gray-700 shadow-sm
          `}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight size={18} className="text-gray-300" />
          ) : (
            <ChevronLeft size={18} className="text-gray-300" />
          )}
        </button>
      </div>

      {/* Quick Stats (Visible when expanded) */}
      {!collapsed && (
        <div className="mb-6 space-y-3">
          {statsItems.map((stat, index) => (
            <div
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-3 border border-gray-700"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-gray-700 flex items-center justify-center">
                    <stat.icon size={14} className="text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">
                      {stat.label}
                    </p>
                    <p className="text-sm font-bold">{stat.value}</p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-green-400 bg-green-900/30 px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Menu */}
      <nav className="flex-1">
        <p
          className={`
            text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3
            ${collapsed ? "text-center" : "px-3"}
            transition-all duration-300
          `}
        >
          {collapsed ? "···" : "Navigation"}
        </p>
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.label;

            return (
              <li key={item.label}>
                <button
                  onClick={() => setActive(item.label)}
                  className={`
                    w-full flex items-center justify-between
                    ${collapsed ? "justify-center px-0" : "px-3"}
                    py-3 rounded-xl transition-all duration-200
                    group relative overflow-hidden
                    ${isActive
                      ? "bg-gradient-to-r from-blue-600/20 to-blue-500/10 text-white shadow-lg"
                      : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                    }
                    border border-transparent hover:border-gray-700
                  `}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-r-full" />
                  )}

                  <div className="flex items-center gap-3">
                    <div
                      className={`
                        h-9 w-9 rounded-lg flex items-center justify-center
                        transition-all duration-200
                        ${isActive
                          ? "bg-gradient-to-br from-blue-500 to-blue-600"
                          : "bg-gray-800 group-hover:bg-gray-700"
                        }
                      `}
                    >
                      <Icon
                        size={18}
                        className={`
                          transition-all duration-200
                          ${isActive ? "text-white" : "group-hover:text-white"}
                        `}
                      />
                    </div>
                    {!collapsed && (
                      <span className="text-sm font-medium">{item.label}</span>
                    )}
                  </div>

                  {/* Badge */}
                  {!collapsed && item.badge && (
                    <span
                      className={`
                        h-6 px-2 flex items-center justify-center
                        text-xs font-semibold rounded-full
                        ${isActive
                          ? "bg-white/20 text-white"
                          : "bg-blue-900/30 text-blue-400"
                        }
                      `}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile & Settings */}
      <div className="border-t border-gray-800 pt-4">
        {/* Theme Toggle */}
        <div
          className={`
            flex items-center justify-between mb-4
            ${collapsed ? "justify-center" : ""}
          `}
        >
          {!collapsed && (
            <span className="text-xs text-gray-400">Theme</span>
          )}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`
              h-10 ${collapsed ? "w-10" : "w-20"} rounded-xl
              relative bg-gray-800 border border-gray-700
              flex items-center justify-center
              transition-all duration-300
            `}
            aria-label="Toggle theme"
          >
            <div
              className={`
                absolute h-8 w-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500
                flex items-center justify-center
                transition-all duration-300
                ${darkMode ? "left-1" : "right-1"}
              `}
            >
              {darkMode ? (
                <Moon size={16} className="text-white" />
              ) : (
                <Sun size={16} className="text-white" />
              )}
            </div>
            {!collapsed && (
              <>
                <Moon size={16} className="mr-7" />
                <Sun size={16} className="ml-7" />
              </>
            )}
          </button>
        </div>

        {/* User Profile */}
        <div
          className={`
            flex items-center gap-3 p-3 rounded-xl
            transition-all duration-200
            ${collapsed ? "justify-center" : ""}
            bg-gray-800/50 border border-gray-700
            hover:bg-gray-800
          `}
        >
          <div className="relative">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center font-bold">
              <User size={18} />
            </div>
            <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-green-500 border-2 border-gray-900"></div>
          </div>
          
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold truncate">Alex Morgan</p>
                  <p className="text-xs text-gray-400 truncate">Admin</p>
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-1.5 rounded-lg hover:bg-gray-700">
                    <Bell size={14} />
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-gray-700">
                    <HelpCircle size={14} />
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-red-900/30 text-red-400">
                    <LogOut size={14} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Status (Visible when expanded) */}
        {!collapsed && (
          <div className="mt-3 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-gray-400">Active</span>
            </div>
            <span className="text-gray-500">v2.1.4</span>
          </div>
        )}
      </div>

      {/* Collapsed Tooltip Indicator */}
      {collapsed && (
        <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2">
          <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            Click to expand
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;