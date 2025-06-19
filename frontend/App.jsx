import React, { useState, useEffect } from 'react';
import Header from './components/header';
import SymptomInput from './components/SymptomInput';
import PredictionCard from './components/PredictionCard';
import Loader from './components/Loader';
import Badges from './components/Badges';
import './App.css';

const healthFacts = [
  "🧠 Your brain uses 20% of your body's total energy!",
  "💖 Your heart beats about 100,000 times per day!",
  "🫁 You breathe about 20,000 times per day!",
  "🦴 Your bones are 4x stronger than concrete!",
  "👁️ Your eyes can distinguish 10 million colors!",
  "🩸 Your body produces 25 million new cells every second!",
  "🧬 You share 99.9% of your DNA with every other human!",
  "🌡️ Your body temperature is regulated to within 1°F!",
];

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [badges, setBadges] = useState([]);
  const [healthFact, setHealthFact] = useState('');
  const [consultationCount, setConsultationCount] = useState(0);

  useEffect(() => {
    // Load saved data from localStorage
    const savedBadges = JSON.parse(localStorage.getItem('bimaribot-badges') || '[]');
    const savedCount = parseInt(localStorage.getItem('bimaribot-consultations') || '0');
    setBadges(savedBadges);
    setConsultationCount(savedCount);
    
    // Show random health fact
    setHealthFact(healthFacts[Math.floor(Math.random() * healthFacts.length)]);
  }, []);

  const handlePrediction = async (symptoms) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ symptoms }),
      });

      if (!response.ok) {
        throw new Error('Failed to get prediction');
      }

      const data = await response.json();
      setPrediction(data);
      
      // Update consultation count and badges
      const newCount = consultationCount + 1;
      setConsultationCount(newCount);
      localStorage.setItem('bimaribot-consultations', newCount.toString());
      
      // Award badges based on usage
      const newBadges = [...badges];
      if (newCount === 1 && !badges.includes('first-consultation')) {
        newBadges.push('first-consultation');
      }
      if (newCount === 5 && !badges.includes('health-seeker')) {
        newBadges.push('health-seeker');
      }
      if (newCount === 10 && !badges.includes('wellness-warrior')) {
        newBadges.push('wellness-warrior');
      }
      if (data.Confidence > 0.8 && !badges.includes('confident-diagnosis')) {
        newBadges.push('confident-diagnosis');
      }
      
      setBadges(newBadges);
      localStorage.setItem('bimaribot-badges', JSON.stringify(newBadges));
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetPrediction = () => {
    setPrediction(null);
    setError(null);
    setHealthFact(healthFacts[Math.floor(Math.random() * healthFacts.length)]);
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      darkMode 
        ? 'bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900' 
        : 'bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50'
    }`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className={`text-4xl md:text-6xl font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-purple-900'
            }`}>
              Welcome to <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">BIMARIBOT</span>
            </h1>
            <p className={`text-lg md:text-xl mb-6 ${
              darkMode ? 'text-purple-200' : 'text-purple-700'
            }`}>
              Your AI-powered health companion for disease prediction and prevention
            </p>
            
            {/* Health Fact */}
            <div className={`inline-block p-4 rounded-full mb-8 ${
              darkMode 
                ? 'bg-purple-800/50 border border-purple-600/30' 
                : 'bg-white/80 border border-purple-200 shadow-lg'
            }`}>
              <p className={`text-sm font-medium ${
                darkMode ? 'text-purple-200' : 'text-purple-800'
              }`}>
                💡 {healthFact}
              </p>
            </div>
          </div>

          {/* Badges */}
          <Badges badges={badges} darkMode={darkMode} consultationCount={consultationCount} />

          {/* Main Content */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              <SymptomInput 
                onSubmit={handlePrediction} 
                loading={loading}
                darkMode={darkMode}
              />
              
              {error && (
                <div className={`p-4 rounded-xl border-l-4 ${
                  darkMode 
                    ? 'bg-red-900/50 border-red-500 text-red-200' 
                    : 'bg-red-50 border-red-500 text-red-700'
                }`}>
                  <p className="font-medium">Error: {error}</p>
                </div>
              )}
            </div>

            {/* Results Section */}
            <div>
              {loading && <Loader darkMode={darkMode} />}
              {prediction && !loading && (
                <PredictionCard 
                  prediction={prediction} 
                  darkMode={darkMode}
                  onReset={resetPrediction}
                />
              )}
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`p-6 rounded-2xl text-center ${
              darkMode 
                ? 'bg-purple-800/30 border border-purple-600/20' 
                : 'bg-white/60 border border-purple-200 shadow-lg'
            }`}>
              <div className="text-3xl mb-2">🏥</div>
              <div className={`text-2xl font-bold ${
                darkMode ? 'text-white' : 'text-purple-900'
              }`}>
                {consultationCount}
              </div>
              <div className={`text-sm ${
                darkMode ? 'text-purple-200' : 'text-purple-600'
              }`}>
                Consultations
              </div>
            </div>

            <div className={`p-6 rounded-2xl text-center ${
              darkMode 
                ? 'bg-purple-800/30 border border-purple-600/20' 
                : 'bg-white/60 border border-purple-200 shadow-lg'
            }`}>
              <div className="text-3xl mb-2">🏆</div>
              <div className={`text-2xl font-bold ${
                darkMode ? 'text-white' : 'text-purple-900'
              }`}>
                {badges.length}
              </div>
              <div className={`text-sm ${
                darkMode ? 'text-purple-200' : 'text-purple-600'
              }`}>
                Badges Earned
              </div>
            </div>

            <div className={`p-6 rounded-2xl text-center ${
              darkMode 
                ? 'bg-purple-800/30 border border-purple-600/20' 
                : 'bg-white/60 border border-purple-200 shadow-lg'
            }`}>
              <div className="text-3xl mb-2">🎯</div>
              <div className={`text-2xl font-bold ${
                darkMode ? 'text-white' : 'text-purple-900'
              }`}>
                {prediction?.Confidence ? `${Math.round(prediction.Confidence * 100)}%` : '--'}
              </div>
              <div className={`text-sm ${
                darkMode ? 'text-purple-200' : 'text-purple-600'
              }`}>
                Last Confidence
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;