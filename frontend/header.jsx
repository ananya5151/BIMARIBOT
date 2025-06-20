import React from 'react';

const Header = ({ darkMode, setDarkMode }) => {
  return (
    <header className={`sticky top-0 z-50 backdrop-blur-lg transition-all duration-300 ${
      darkMode 
        ? 'bg-purple-900/80 border-b border-purple-700/30' 
        : 'bg-white/80 border-b border-purple-200/30'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                darkMode 
                  ? 'bg-gradient-to-br from-purple-500 to-pink-500' 
                  : 'bg-gradient-to-br from-purple-600 to-pink-600'
              } shadow-lg animate-pulse`}>
                <span className="text-white text-xl font-bold">🤖</span>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-ping"></div>
            </div>
            <div>
              <h1 className={`text-2xl font-bold tracking-tight ${
                darkMode ? 'text-white' : 'text-purple-900'
              }`}>
                BIMARI<span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">BOT</span>
              </h1>
              <p className={`text-xs ${
                darkMode ? 'text-purple-200' : 'text-purple-600'
              }`}>
                AI Health Assistant
              </p>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center space-x-4">
            {/* Health Status Indicator */}
            <div className={`hidden md:flex items-center space-x-2 px-3 py-1 rounded-full ${
              darkMode 
                ? 'bg-purple-800/50 border border-purple-600/30' 
                : 'bg-green-50 border border-green-200'
            }`}>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className={`text-xs font-medium ${
                darkMode ? 'text-green-300' : 'text-green-700'
              }`}>
                System Online
              </span>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`relative w-14 h-8 rounded-full transition-all duration-300 ${
                darkMode 
                  ? 'bg-purple-600 shadow-inner' 
                  : 'bg-purple-200 shadow-inner'
              }`}
            >
              <div className={`absolute top-1 w-6 h-6 rounded-full transition-all duration-300 flex items-center justify-center ${
                darkMode 
                  ? 'left-7 bg-purple-900 text-yellow-300' 
                  : 'left-1 bg-white text-purple-600 shadow-md'
              }`}>
                {darkMode ? '🌙' : '☀️'}
              </div>
            </button>

            {/* Menu Button */}
            <button className={`p-2 rounded-xl transition-all duration-200 ${
              darkMode 
                ? 'bg-purple-800/50 hover:bg-purple-700/50 text-white' 
                : 'bg-white/80 hover:bg-purple-50 text-purple-800 shadow-md'
            }`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Animated Health Bar */}
        <div className="mt-3">
          <div className={`h-1 rounded-full overflow-hidden ${
            darkMode ? 'bg-purple-800/30' : 'bg-purple-100'
          }`}>
            <div className="h-full bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 animate-pulse"></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;