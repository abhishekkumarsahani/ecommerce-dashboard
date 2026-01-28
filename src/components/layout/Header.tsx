import React from 'react';
import { Menu, Search, Bell, Sun, Moon, ChevronDown, User } from "lucide-react";

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
  const [isProfileMenuOpen, setIsProfileMenuOpen] = React.useState(false);
  const [notifications] = React.useState(3);

  return (
    <header className={`sticky top-0 z-20 border-b transition-colors duration-300 ${
      darkMode 
        ? 'bg-gray-900 border-gray-800 text-white' 
        : 'bg-white border-gray-200 text-gray-900'
    }`}>
      <div className="flex items-center justify-between px-4 py-3 md:px-6">
        {/* Left section */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={onMenuClick} 
            className={`p-2 rounded-lg transition-all duration-200 lg:hidden ${
              darkMode 
                ? 'hover:bg-gray-800 active:bg-gray-700' 
                : 'hover:bg-gray-100 active:bg-gray-200'
            }`}
            aria-label="Toggle menu"
          >
            <Menu size={20} />
          </button>
          
          <div className="flex items-center space-x-3">
            <div className={`hidden md:block h-8 w-1 rounded-full ${
              darkMode ? 'bg-blue-500' : 'bg-blue-600'
            }`}></div>
            <h1 className="font-semibold text-lg md:text-xl">Dashboard</h1>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-3 md:space-x-4">
          {/* Search bar */}
          <div className={`hidden md:flex items-center rounded-lg px-3 py-2 ${
            darkMode 
              ? 'bg-gray-800' 
              : 'bg-gray-100'
          }`}>
            <Search size={18} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
            <input 
              type="text" 
              placeholder="Search..." 
              className={`ml-2 bg-transparent outline-none text-sm w-40 lg:w-56 ${
                darkMode ? 'placeholder-gray-500' : 'placeholder-gray-400'
              }`}
            />
          </div>

          {/* Dark mode toggle */}
          <button 
            onClick={onDarkModeToggle}
            className={`p-2 rounded-lg transition-all duration-200 ${
              darkMode 
                ? 'hover:bg-gray-800' 
                : 'hover:bg-gray-100'
            }`}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? (
              <Sun size={20} className="text-yellow-400" />
            ) : (
              <Moon size={20} className="text-gray-700" />
            )}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button 
              className={`p-2 rounded-lg transition-all duration-200 relative ${
                darkMode 
                  ? 'hover:bg-gray-800' 
                  : 'hover:bg-gray-100'
              }`}
              aria-label="Notifications"
            >
              <Bell size={20} />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {notifications}
                </span>
              )}
            </button>
          </div>

          {/* User profile */}
          <div className="relative">
            <button 
              className={`flex items-center space-x-2 p-2 rounded-lg transition-all duration-200 ${
                darkMode 
                  ? 'hover:bg-gray-800' 
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              aria-label="User menu"
            >
              <div className={`flex items-center justify-center h-8 w-8 rounded-full ${
                darkMode ? 'bg-blue-700' : 'bg-blue-600'
              }`}>
                <User size={16} className="text-white" />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs opacity-70">Admin</p>
              </div>
              <ChevronDown size={16} className={`hidden md:block transition-transform ${
                isProfileMenuOpen ? 'rotate-180' : ''
              }`} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;