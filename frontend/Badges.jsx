import React, { useState } from 'react';

const Badges = ({ badges, darkMode, consultationCount }) => {
  const [selectedBadge, setSelectedBadge] = useState(null);

  const allBadges = {
    'first-consultation': {
      icon: '🎯',
      title: 'First Steps',
      description: 'Completed your first health consultation',
      color: 'from-blue-500 to-cyan-500',
      rarity: 'Common'
    },
    'health-seeker': {
      icon: '🔍',
      title: 'Health Seeker',
      description: 'Used BIMARIBOT 5 times',
      color: 'from-green-500 to-emerald-500',
      rarity: 'Uncommon'
    },
    'wellness-warrior': {
      icon: '🛡️',
      title: 'Wellness Warrior',
      description: 'Reached 10 consultations',
      color: 'from-purple-500 to-violet-500',
      rarity: 'Rare'
    },
    'confident-diagnosis': {
      icon: '🎖️',
      title: 'High Confidence',
      description: 'Received a diagnosis with >80% confidence',
      color: 'from-yellow-500 to-orange-500',
      rarity: 'Epic'
    },
    'early-bird': {
      icon: '🌅',
      title: 'Early Bird',
      description: 'Used the app before 8 AM',
      color: 'from-pink-500 to-rose-500',
      rarity: 'Special'
    },
    'night-owl': {
      icon: '🦉',
      title: 'Night Owl',
      description: 'Used the app after 10 PM',
      color: 'from-indigo-500 to-purple-500',
      rarity: 'Special'
    }
  };

  const upcomingBadges = [
    { icon: '👑', title: 'Health Master', requirement: '25 consultations', current: consultationCount },
    { icon: '🏆', title: 'Diagnosis Expert', requirement: '50 consultations', current: consultationCount },
    { icon: '💎', title: 'Wellness Legend', requirement: '100 consultations', current: consultationCount }
  ];

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'Common': return 'text-gray-500';
      case 'Uncommon': return 'text-green-500';
      case 'Rare': return 'text-blue-500';
      case 'Epic': return 'text-purple-500';
      case 'Special': return 'text-pink-500';
      default: return 'text-gray-500';
    }
  };

  if (badges.length === 0 && consultationCount === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      {/* Earned Badges */}
      {badges.length > 0 && (
        <div className={`p-6 rounded-2xl mb-6 ${
          darkMode 
            ? 'bg-purple-800/20 border border-purple-600/20' 
            : 'bg-white/60 border border-purple-200 shadow-lg'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-xl font-bold ${
              darkMode ? 'text-white' : 'text-purple-900'
            }`}>
              🏆 Your Health Badges
            </h2>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              darkMode 
                ? 'bg-purple-700/50 text-purple-200' 
                : 'bg-purple-100 text-purple-700'
            }`}>
              {badges.length} earned
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {badges.map((badgeId) => {
              const badge = allBadges[badgeId];
              if (!badge) return null;

              return (
                <div
                  key={badgeId}
                  onClick={() => setSelectedBadge(badgeId)}
                  className={`relative p-4 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 ${
                    darkMode 
                      ? 'bg-purple-900/40 hover:bg-purple-800/50 border border-purple-600/30' 
                      : 'bg-white/80 hover:bg-white/90 border border-purple-200 shadow-md hover:shadow-lg'
                  }`}
                >
                  <div className="text-center">
                    <div className={`w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-br ${badge.color} flex items-center justify-center text-white text-xl shadow-lg`}>
                      {badge.icon}
                    </div>
                    <h3 className={`font-semibold text-sm ${
                      darkMode ? 'text-white' : 'text-purple-900'
                    }`}>
                      {badge.title}
                    </h3>
                    <p className={`text-xs ${getRarityColor(badge.rarity)}`}>
                      {badge.rarity}
                    </p>
                  </div>
                  
                  {/* Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full animate-pulse"></div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Progress Badges */}
      <div className={`p-6 rounded-2xl ${
        darkMode 
          ? 'bg-purple-800/20 border border-purple-600/20' 
          : 'bg-white/60 border border-purple-200 shadow-lg'
      }`}>
        <h2 className={`text-xl font-bold mb-4 ${
          darkMode ? 'text-white' : 'text-purple-900'
        }`}>
          🎯 Upcoming Badges
        </h2>

        <div className="space-y-4">
          {upcomingBadges.map((badge, index) => {
            const requirement = parseInt(badge.requirement.split(' ')[0]);
            const progress = Math.min((badge.current / requirement) * 100, 100);
            const isCompleted = badge.current >= requirement;

            return (
              <div key={index} className={`p-4 rounded-xl ${
                darkMode 
                  ? 'bg-purple-900/30 border border-purple-600/20' 
                  : 'bg-purple-50 border border-purple-200'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isCompleted 
                        ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white' 
                        : darkMode 
                          ? 'bg-purple-700/50 text-purple-300' 
                          : 'bg-purple-200 text-purple-600'
                    }`}>
                      {badge.icon}
                    </div>
                    <div>
                      <h3 className={`font-semibold ${
                        darkMode ? 'text-white' : 'text-purple-900'
                      }`}>
                        {badge.title}
                      </h3>
                      <p className={`text-xs ${
                        darkMode ? 'text-purple-300' : 'text-purple-600'
                      }`}>
                        {badge.requirement}
                      </p>
                    </div>
                  </div>
                  <div className={`text-sm font-medium ${
                    darkMode ? 'text-purple-200' : 'text-purple-700'
                  }`}>
                    {badge.current}/{requirement}
                  </div>
                </div>
                
                <div className={`w-full h-2 rounded-full overflow-hidden ${
                  darkMode ? 'bg-purple-800/50' : 'bg-purple-100'
                }`}>
                  <div 
                    className={`h-full transition-all duration-500 ${
                      isCompleted 
                        ? 'bg-gradient-to-r from-yellow-400 to-orange-500' 
                        : 'bg-gradient-to-r from-purple-500 to-pink-500'
                    }`}
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Badge Detail Modal */}
      {selectedBadge && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`max-w-sm w-full p-6 rounded-2xl ${
            darkMode 
              ? 'bg-purple-900 border border-purple-600' 
              : 'bg-white border border-purple-200'
          } shadow-2xl`}>
            <div className="text-center">
              <div className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br ${allBadges[selectedBadge].color} flex items-center justify-center text-white text-3xl shadow-lg`}>
                {allBadges[selectedBadge].icon}
              </div>
              <h2 className={`text-2xl font-bold mb-2 ${
                darkMode ? 'text-white' : 'text-purple-900'
              }`}>
                {allBadges[selectedBadge].title}
              </h2>
              <p className={`text-sm mb-4 ${
                darkMode ? 'text-purple-200' : 'text-purple-600'
              }`}>
                {allBadges[selectedBadge].description}
              </p>
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 ${
                getRarityColor(allBadges[selectedBadge].rarity)
              } ${
                darkMode ? 'bg-purple-800/50' : 'bg-purple-100'
              }`}>
                {allBadges[selectedBadge].rarity} Badge
              </div>
              <button
                onClick={() => setSelectedBadge(null)}
                className={`w-full py-2 px-4 rounded-xl font-medium transition-all duration-200 ${
                  darkMode 
                    ? 'bg-purple-700 hover:bg-purple-600 text-white' 
                    : 'bg-purple-600 hover:bg-purple-700 text-white'
                }`}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Badges;