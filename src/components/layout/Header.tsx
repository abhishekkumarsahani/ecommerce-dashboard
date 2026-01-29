import React, { useState, useRef, useEffect } from 'react';
import { 
  Menu, Search, Bell, Sun, Moon, ChevronDown, User, 
  LogOut, Settings, HelpCircle, Shield, CreditCard,
  Mail, Calendar, ChevronRight, X
} from "lucide-react";

interface HeaderProps {
  onMenuClick: () => void;
  darkMode?: boolean;
  onDarkModeToggle?: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  onMenuClick, 
  darkMode = false, 
  onDarkModeToggle 
}) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [notifications] = useState(3);
  const profileRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  
  // Sample notifications data
  const notificationItems = [
    { id: 1, title: "New order received", time: "5 min ago", read: false, type: "order" },
    { id: 2, title: "Payment successful", time: "1 hour ago", read: false, type: "payment" },
    { id: 3, title: "Inventory low", time: "2 hours ago", read: true, type: "alert" },
    { id: 4, title: "New customer registered", time: "5 hours ago", read: true, type: "user" },
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close search on ESC key
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, []);

  const handleNotificationClick = (id: number) => {
    console.log(`Notification ${id} clicked`);
    // In a real app, you would mark as read here
  };

  const handleClearAllNotifications = () => {
    console.log('Clear all notifications');
    // In a real app, you would clear notifications here
  };

  return (
    <>
      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="relative flex items-center justify-center h-full">
            <div className={`w-full max-w-2xl px-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              <div className={`relative rounded-xl shadow-2xl overflow-hidden ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              }`}>
                <div className="p-4">
                  <div className="flex items-center">
                    <Search size={24} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
                    <input 
                      type="text" 
                      placeholder="Search products, customers, orders..." 
                      autoFocus
                      className={`ml-3 bg-transparent outline-none text-lg flex-1 ${
                        darkMode 
                          ? 'placeholder-gray-500 text-white' 
                          : 'placeholder-gray-400 text-gray-900'
                      }`}
                    />
                    <button 
                      onClick={() => setIsSearchOpen(false)}
                      className={`p-2 rounded-lg ${
                        darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                      }`}
                    >
                      <X size={20} />
                    </button>
                  </div>
                  <div className="mt-4 text-sm opacity-70">
                    Press <kbd className="px-2 py-1 mx-1 rounded border">ESC</kbd> to close
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <header className={`sticky top-0 z-30 border-b transition-all duration-300 ${
        darkMode 
          ? 'bg-gradient-to-r from-gray-900 to-gray-950 border-gray-800 text-white' 
          : 'bg-gradient-to-r from-white to-gray-50 border-gray-200 text-gray-900'
      } shadow-sm`}>
        <div className="flex items-center justify-between px-4 py-3 md:px-6">
          {/* Left section */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={onMenuClick} 
              className={`p-2 rounded-xl transition-all duration-200 lg:hidden ${
                darkMode 
                  ? 'hover:bg-gray-800 active:bg-gray-700' 
                  : 'hover:bg-gray-100 active:bg-gray-200'
              }`}
              aria-label="Toggle menu"
            >
              <Menu size={22} />
            </button>
            
            <div className="flex items-center space-x-3">
              <div className={`hidden md:block h-10 w-2 rounded-full bg-gradient-to-b from-blue-500 to-purple-600`}></div>
              <div>
                <h1 className="font-bold text-xl md:text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                  Dashboard
                </h1>
                <p className={`hidden md:block text-xs mt-1 ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Welcome back, John
                </p>
              </div>
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-2 md:space-x-3 lg:space-x-4">
            {/* Mobile search button */}
            <button 
              onClick={() => setIsSearchOpen(true)}
              className={`md:hidden p-2.5 rounded-xl ${
                darkMode 
                  ? 'hover:bg-gray-800' 
                  : 'hover:bg-gray-100'
              }`}
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            {/* Desktop search bar */}
            <div className={`hidden md:flex items-center rounded-xl px-4 py-2.5 w-64 lg:w-72 transition-all duration-300 ${
              darkMode 
                ? 'bg-gray-800 hover:bg-gray-750 border border-gray-700' 
                : 'bg-gray-100 hover:bg-gray-200 border border-gray-200'
            }`}>
              <Search size={18} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
              <input 
                type="text" 
                placeholder="Search..." 
                className={`ml-3 bg-transparent outline-none text-sm flex-1 ${
                  darkMode ? 'placeholder-gray-500' : 'placeholder-gray-400'
                }`}
              />
              <kbd className={`hidden lg:inline-flex items-center px-2 py-1 text-xs rounded ${
                darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-300 text-gray-600'
              }`}>
                ⌘K
              </kbd>
            </div>

            {/* Calendar button */}
            <button 
              className={`hidden lg:flex items-center px-3 py-2 rounded-xl transition-all duration-200 ${
                darkMode 
                  ? 'hover:bg-gray-800' 
                  : 'hover:bg-gray-100'
              }`}
              aria-label="Calendar"
            >
              <Calendar size={18} className="mr-2" />
              <span className="text-sm font-medium">Mar 15, 2024</span>
            </button>

            {/* Dark mode toggle */}
            <button 
              onClick={onDarkModeToggle}
              className={`p-2.5 rounded-xl transition-all duration-300 relative overflow-hidden group ${
                darkMode 
                  ? 'hover:bg-gray-800' 
                  : 'hover:bg-gray-100'
              }`}
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? (
                <>
                  <Sun size={20} className="text-yellow-400 relative z-10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 to-yellow-400/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </>
              ) : (
                <>
                  <Moon size={20} className="text-gray-700 relative z-10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 to-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </>
              )}
            </button>

            {/* Notifications dropdown */}
            <div className="relative" ref={notificationsRef}>
              <button 
                className={`p-2.5 rounded-xl transition-all duration-200 relative ${
                  darkMode 
                    ? 'hover:bg-gray-800' 
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => {
                  setIsNotificationsOpen(!isNotificationsOpen);
                  setIsProfileMenuOpen(false);
                }}
                aria-label="Notifications"
              >
                <Bell size={20} />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-xs text-white shadow-sm animate-pulse">
                    {notifications}
                  </span>
                )}
              </button>

              {/* Notifications dropdown */}
              {isNotificationsOpen && (
                <div className={`absolute right-0 mt-2 w-80 sm:w-96 rounded-xl shadow-2xl border animate-slideDown ${
                  darkMode 
                    ? 'bg-gray-900 border-gray-800' 
                    : 'bg-white border-gray-200'
                }`}>
                  <div className={`p-4 border-b ${
                    darkMode ? 'border-gray-800' : 'border-gray-200'
                  }`}>
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-lg">Notifications</h3>
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={handleClearAllNotifications}
                          className={`text-xs px-3 py-1 rounded-lg ${
                            darkMode 
                              ? 'hover:bg-gray-800 text-gray-400' 
                              : 'hover:bg-gray-100 text-gray-600'
                          }`}
                        >
                          Clear all
                        </button>
                        <button 
                          onClick={() => setIsNotificationsOpen(false)}
                          className={`p-1 rounded-lg ${
                            darkMode 
                              ? 'hover:bg-gray-800' 
                              : 'hover:bg-gray-100'
                          }`}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="max-h-96 overflow-y-auto">
                    {notificationItems.map((item) => (
                      <div 
                        key={item.id}
                        onClick={() => handleNotificationClick(item.id)}
                        className={`p-4 border-b cursor-pointer transition-colors group ${
                          darkMode 
                            ? 'border-gray-800 hover:bg-gray-800' 
                            : 'border-gray-100 hover:bg-gray-50'
                        } ${!item.read ? (darkMode ? 'bg-blue-900/20' : 'bg-blue-50') : ''}`}
                      >
                        <div className="flex items-start">
                          <div className={`mr-3 mt-1 h-2 w-2 rounded-full ${
                            item.read 
                              ? (darkMode ? 'bg-gray-700' : 'bg-gray-300') 
                              : (item.type === 'alert' ? 'bg-red-500' : 'bg-blue-500')
                          }`}></div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="font-medium">{item.title}</p>
                              <ChevronRight size={16} className="opacity-0 group-hover:opacity-70 transition-opacity" />
                            </div>
                            <p className={`text-sm mt-1 ${
                              darkMode ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              {item.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className={`p-3 border-t ${
                    darkMode ? 'border-gray-800' : 'border-gray-200'
                  }`}>
                    <a 
                      href="#" 
                      className={`block text-center py-2 rounded-lg text-sm font-medium ${
                        darkMode 
                          ? 'hover:bg-gray-800 text-blue-400' 
                          : 'hover:bg-gray-100 text-blue-600'
                      }`}
                    >
                      View all notifications
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* User profile dropdown */}
            <div className="relative" ref={profileRef}>
              <button 
                className={`flex items-center space-x-2 p-2 rounded-xl transition-all duration-200 group ${
                  darkMode 
                    ? 'hover:bg-gray-800' 
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => {
                  setIsProfileMenuOpen(!isProfileMenuOpen);
                  setIsNotificationsOpen(false);
                }}
                aria-label="User menu"
              >
                <div className="relative">
                  <div className={`flex items-center justify-center h-9 w-9 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 shadow-md`}>
                    <User size={18} className="text-white" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-sm font-semibold">John Doe</p>
                  <p className="text-xs opacity-70">Administrator</p>
                </div>
                <ChevronDown size={16} className={`hidden lg:block transition-transform duration-200 ${
                  isProfileMenuOpen ? 'rotate-180' : ''
                }`} />
              </button>

              {/* Profile dropdown menu */}
              {isProfileMenuOpen && (
                <div className={`absolute right-0 mt-2 w-64 rounded-xl shadow-2xl border animate-slideDown ${
                  darkMode 
                    ? 'bg-gray-900 border-gray-800' 
                    : 'bg-white border-gray-200'
                }`}>
                  {/* User info */}
                  <div className={`p-4 border-b ${
                    darkMode ? 'border-gray-800' : 'border-gray-200'
                  }`}>
                    <div className="flex items-center space-x-3">
                      <div className={`flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 shadow-md`}>
                        <User size={20} className="text-white" />
                      </div>
                      <div>
                        <p className="font-bold">John Doe</p>
                        <p className={`text-sm ${
                          darkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          john@shopdash.com
                        </p>
                        <div className={`inline-flex items-center px-2 py-0.5 mt-1 text-xs rounded-full ${
                          darkMode 
                            ? 'bg-blue-900/30 text-blue-300' 
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          Administrator
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Menu items */}
                  <div className="p-2">
                    <a href="#" className={`flex items-center px-3 py-3 rounded-lg transition-colors ${
                      darkMode 
                        ? 'hover:bg-gray-800' 
                        : 'hover:bg-gray-100'
                    }`}>
                      <User size={18} className="mr-3 opacity-70" />
                      <span>My Profile</span>
                    </a>
                    <a href="#" className={`flex items-center px-3 py-3 rounded-lg transition-colors ${
                      darkMode 
                        ? 'hover:bg-gray-800' 
                        : 'hover:bg-gray-100'
                    }`}>
                      <Settings size={18} className="mr-3 opacity-70" />
                      <span>Settings</span>
                    </a>
                    <a href="#" className={`flex items-center px-3 py-3 rounded-lg transition-colors ${
                      darkMode 
                        ? 'hover:bg-gray-800' 
                        : 'hover:bg-gray-100'
                    }`}>
                      <CreditCard size={18} className="mr-3 opacity-70" />
                      <span>Billing</span>
                    </a>
                    <a href="#" className={`flex items-center px-3 py-3 rounded-lg transition-colors ${
                      darkMode 
                        ? 'hover:bg-gray-800' 
                        : 'hover:bg-gray-100'
                    }`}>
                      <Shield size={18} className="mr-3 opacity-70" />
                      <span>Security</span>
                    </a>
                    <a href="#" className={`flex items-center px-3 py-3 rounded-lg transition-colors ${
                      darkMode 
                        ? 'hover:bg-gray-800' 
                        : 'hover:bg-gray-100'
                    }`}>
                      <HelpCircle size={18} className="mr-3 opacity-70" />
                      <span>Help & Support</span>
                    </a>
                  </div>

                  {/* Footer */}
                  <div className={`p-3 border-t ${
                    darkMode ? 'border-gray-800' : 'border-gray-200'
                  }`}>
                    <button className={`flex items-center justify-center w-full px-3 py-2.5 rounded-lg transition-colors font-medium ${
                      darkMode 
                        ? 'bg-red-900/20 hover:bg-red-900/30 text-red-400' 
                        : 'bg-red-50 hover:bg-red-100 text-red-600'
                    }`}>
                      <LogOut size={18} className="mr-2" />
                      Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Custom animations CSS - add to your global styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }
        
        .bg-gray-750 {
          background-color: #374151;
        }
      `}</style>
    </>
  );
};

export default Header;