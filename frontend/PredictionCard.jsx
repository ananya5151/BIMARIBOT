import React, { useState, useEffect } from 'react';

const PredictionCard = ({ prediction, darkMode, onReset }) => {
  const [showAnimation, setShowAnimation] = useState(false);
  const [expandedPredictions, setExpandedPredictions] = useState(false);

  useEffect(() => {
    setShowAnimation(true);
  }, [prediction]);

  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.8) return 'text-green-500';
    if (confidence >= 0.6) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getConfidenceEmoji = (confidence) => {
    if (confidence >= 0.9) return '🎯';
    if (confidence >= 0.8) return '✅';
    if (confidence >= 0.6) return '⚠️';
    return '❓';
  };

  const getSeverityBadge = (confidence) => {
    if (confidence >= 0.8) return { text: 'High Confidence', color: 'bg-green-100 text-green-800 border-green-200' };
    if (confidence >= 0.6) return { text: 'Moderate Confidence', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' };
    return { text: 'Low Confidence', color: 'bg-red-100 text-red-800 border-red-200' };
  };

  const precautionEmojis = ['🏥', '💊', '🛏️', '🥗', '💧', '🚫', '⚠️', '📞'];

  return (
    <div className={`transform transition-all duration-500 ${
      showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
    }`}>
      <div className={`p-6 rounded-2xl transition-all duration-300 ${
        darkMode 
          ? 'bg-purple-800/30 border border-purple-600/20 backdrop-blur-lg' 
          : 'bg-white/80 border border-purple-200 shadow-xl backdrop-blur-sm'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-2xl font-bold ${
            darkMode ? 'text-white' : 'text-purple-900'
          }`}>
            🩺 Diagnosis Results
          </h2>
          <button
            onClick={onReset}
            className={`p-2 rounded-lg transition-all duration-200 ${
              darkMode 
                ? 'bg-purple-700/50 hover:bg-purple-600/60 text-purple-200' 
                : 'bg-purple-50 hover:bg-purple-100 text-purple-600'
            }`}
          >
            🔄
          </button>
        </div>

        {/* Main Prediction */}
        <div className={`p-6 rounded-xl mb-6 ${
          darkMode 
            ? 'bg-purple-900/50 border border-purple-600/30' 
            : 'bg-purple-50 border border-purple-200'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-semibold ${
              darkMode ? 'text-white' : 'text-purple-900'
            }`}>
              Primary Diagnosis
            </h3>
            <div className={`px-3 py-1 rounded-full text-xs font-medium border ${
              darkMode 
                ? getSeverityBadge(prediction.Confidence).color.replace(/bg-\w+-100/, 'bg-purple-800/50').replace(/text-\w+-800/, 'text-purple-200').replace(/border-\w+-200/, 'border-purple-600/30')
                : getSeverityBadge(prediction.Confidence).color
            }`}>
              {getSeverityBadge(prediction.Confidence).text}
            </div>
          </div>

          <div className="flex items-center space-x-3 mb-4">
            <div className="text-3xl">
              {getConfidenceEmoji(prediction.Confidence)}
            </div>
            <div>
              <h4 className={`text-xl font-bold capitalize ${
                darkMode ? 'text-purple-100' : 'text-purple-800'
              }`}>
                {prediction["Predicted Disease"]}
              </h4>
              <div className="flex items-center space-x-2">
                <span className={`text-sm ${
                  darkMode ? 'text-purple-300' : 'text-purple-600'
                }`}>
                  Confidence:
                </span>
                <span className={`font-bold ${getConfidenceColor(prediction.Confidence)}`}>
                  {Math.round(prediction.Confidence * 100)}%
                </span>
              </div>
            </div>
          </div>

          {/* Confidence Bar */}
          <div className={`w-full h-3 rounded-full overflow-hidden ${
            darkMode ? 'bg-purple-800/50' : 'bg-purple-100'
          }`}>
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-1000 ease-out"
              style={{ width: `${prediction.Confidence * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Alternative Predictions */}
        <div className="mb-6">
          <button
            onClick={() => setExpandedPredictions(!expandedPredictions)}
            className={`flex items-center justify-between w-full p-4 rounded-xl transition-all duration-200 ${
              darkMode 
                ? 'bg-purple-900/30 hover:bg-purple-900/50 text-white' 
                : 'bg-purple-50 hover:bg-purple-100 text-purple-800'
            }`}
          >
            <span className="font-medium">Alternative Diagnoses</span>
            <div className="flex items-center space-x-2">
              <span className="text-sm bg-purple-500/20 px-2 py-1 rounded-full">
                {prediction["Top Predictions"].length - 1} more
              </span>
              <span className={`transform transition-transform duration-200 ${
                expandedPredictions ? 'rotate-180' : ''
              }`}>
                ⬇️
              </span>
            </div>
          </button>

          {expandedPredictions && (
            <div className="mt-4 space-y-3">
              {prediction["Top Predictions"].slice(1).map((pred, index) => (
                <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${
                  darkMode 
                    ? 'bg-purple-800/20 border border-purple-700/20' 
                    : 'bg-white/50 border border-purple-100'
                }`}>
                  <span className={`capitalize font-medium ${
                    darkMode ? 'text-purple-100' : 'text-purple-800'
                  }`}>
                    {pred[0]}
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm ${
                      darkMode ? 'text-purple-300' : 'text-purple-600'
                    }`}>
                      {Math.round(pred[1] * 100)}%
                    </span>
                    <div className={`w-16 h-2 rounded-full overflow-hidden ${
                      darkMode ? 'bg-purple-800/50' : 'bg-purple-100'
                    }`}>
                      <div 
                        className="h-full bg-gradient-to-r from-purple-400 to-pink-400"
                        style={{ width: `${pred[1] * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Precautions */}
        <div className={`p-6 rounded-xl ${
          darkMode 
            ? 'bg-green-900/20 border border-green-600/20' 
            : 'bg-green-50 border border-green-200'
        }`}>
          <h3 className={`text-lg font-semibold mb-4 flex items-center ${
            darkMode ? 'text-green-300' : 'text-green-800'
          }`}>
            <span className="mr-2">💊</span>
            Recommended Precautions
          </h3>
          
          <div className="grid gap-3">
            {prediction.Precautions.map((precaution, index) => (
              <div key={index} className={`flex items-start space-x-3 p-3 rounded-lg ${
                darkMode 
                  ? 'bg-green-800/20 border border-green-700/20' 
                  : 'bg-white/60 border border-green-100'
              }`}>
                <span className="text-lg flex-shrink-0">
                  {precautionEmojis[index % precautionEmojis.length]}
                </span>
                <span className={`capitalize font-medium ${
                  darkMode ? 'text-green-200' : 'text-green-800'
                }`}>
                  {precaution}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          <button className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
            darkMode 
              ? 'bg-blue-800/30 hover:bg-blue-700/40 text-blue-200 border border-blue-600/20' 
              : 'bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200'
          }`}>
            📋 Save Report
          </button>
          <button className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
            darkMode 
              ? 'bg-purple-800/30 hover:bg-purple-700/40 text-purple-200 border border-purple-600/20' 
              : 'bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200'
          }`}>
            👨‍⚕️ Find Doctor
          </button>
        </div>

        {/* Disclaimer */}
        <div className={`mt-6 p-4 rounded-lg border-l-4 ${
          darkMode 
            ? 'bg-orange-900/20 border-orange-500 text-orange-300' 
            : 'bg-orange-50 border-orange-400 text-orange-700'
        }`}>
          <p className="text-sm">
            ⚠️ <strong>Medical Disclaimer:</strong> This is an AI-powered analysis and should not replace professional medical advice. Please consult with a healthcare provider for proper diagnosis and treatment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PredictionCard;