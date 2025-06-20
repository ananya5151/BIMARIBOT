import React, { useState, useEffect } from 'react';

const Loader = ({ darkMode }) => {
  const [currentTip, setCurrentTip] = useState(0);
  const [heartbeatPhase, setHeartbeatPhase] = useState(0);

  const healthTips = [
    "🧠 Analyzing your symptoms...",
    "🔍 Cross-referencing medical database...",
    "📊 Processing health patterns...",
    "🩺 Consulting AI medical knowledge...",
    "💊 Preparing recommendations...",
    "✨ Almost ready with your diagnosis..."
  ];

  useEffect(() => {
    const tipInterval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % healthTips.length);
    }, 2000);

    const heartbeatInterval = setInterval(() => {
      setHeartbeatPhase((prev) => (prev + 1) % 3);
    }, 500);

    return () => {
      clearInterval(tipInterval);
      clearInterval(heartbeatInterval);
    };
  }, [healthTips.length]);

  return (
    <div className={`p-8 rounded-2xl text-center ${
      darkMode 
        ? 'bg-purple-800/30 border border-purple-600/20 backdrop-blur-lg' 
        : 'bg-white/80 border border-purple-200 shadow-xl backdrop-blur-sm'
    }`}>
      {/* Main Loading Animation */}
      <div className="relative mb-8">
        {/* Rotating Stethoscope */}
        <div className="relative w-24 h-24 mx-auto mb-4">
          <div className="absolute inset-0 animate-spin">
            <div className={`w-full h-full rounded-full border-4 border-transparent ${
              darkMode 
                ? 'border-t-purple-400 border-r-pink-400' 
                : 'border-t-purple-500 border-r-pink-500'
            }`}></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl animate-pulse">🩺</span>
          </div>
        </div>

        {/* Heartbeat Animation */}
        <div className="flex justify-center items-center space-x-2 mb-4">
          <div className={`w-2 h-8 rounded-full transition-all duration-300 ${
            darkMode ? 'bg-red-400' : 'bg-red-500'
          } ${heartbeatPhase === 0 ? 'h-12 bg-red-300' : ''}`}></div>
          <div className={`w-2 h-6 rounded-full transition-all duration-300 ${
            darkMode ? 'bg-red-400' : 'bg-red-500'
          } ${heartbeatPhase === 1 ? 'h-16 bg-red-300' : ''}`}></div>
          <div className={`w-2 h-4 rounded-full transition-all duration-300 ${
            darkMode ? 'bg-red-400' : 'bg-red-500'
          } ${heartbeatPhase === 2 ? 'h-10 bg-red-300' : ''}`}></div>
          <div className={`w-2 h-6 rounded-full transition-all duration-300 ${
            darkMode ? 'bg-red-400' : 'bg-red-500'
          } ${heartbeatPhase === 1 ? 'h-16 bg-red-300' : ''}`}></div>
          <div className={`w-2 h-8 rounded-full transition-all duration-300 ${
            darkMode ? 'bg-red-400' : 'bg-red-500'
          } ${heartbeatPhase === 0 ? 'h-12 bg-red-300' : ''}`}></div>
        </div>

        {/* Pulse Circles */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`w-32 h-32 rounded-full border-2 animate-ping ${
            darkMode 
              ? 'border-purple-400/30' 
              : 'border-purple-500/30'
          }`}></div>
          <div className={`absolute w-40 h-40 rounded-full border-2 animate-ping ${
            darkMode 
              ? 'border-purple-300/20' 
              : 'border-purple-400/20'
          }`} style={{ animationDelay: '0.5s' }}></div>
        </div>
      </div>

      {/* Loading Text */}
      <div className="space-y-4">
        <h3 className={`text-xl font-bold ${
          darkMode ? 'text-white' : 'text-purple-900'
        }`}>
          Diagnosing Your Symptoms
        </h3>
        
        <div className={`text-sm transition-all duration-500 ${
          darkMode ? 'text-purple-200' : 'text-purple-600'
        }`}>
          {healthTips[currentTip]}
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center space-x-2">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i <= currentTip
                  ? darkMode 
                    ? 'bg-purple-400' 
                    : 'bg-purple-500'
                  : darkMode 
                    ? 'bg-purple-700/30' 
                    : 'bg-purple-200'
              }`}
            ></div>
          ))}
        </div>

        {/* Medical Icons Animation */}
        <div className="flex justify-center space-x-4 mt-6">
          {['💊', '🏥', '🩺', '💉', '🧬'].map((icon, index) => (
            <div
              key={index}
              className="text-2xl animate-bounce"
              style={{ 
                animationDelay: `${index * 0.2}s`,
                animationDuration: '1.5s'
              }}
            >
              {icon}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="mt-8 relative overflow-hidden">
        <div className={`h-1 rounded-full ${
          darkMode ? 'bg-purple-800/30' : 'bg-purple-100'
        }`}>
          <div className={`h-full rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 animate-pulse`}
               style={{
                 width: '60%',
                 animation: 'wave 2s ease-in-out infinite'
               }}>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes wave {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default Loader;