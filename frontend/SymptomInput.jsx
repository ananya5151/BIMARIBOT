import React, { useState, useEffect, useRef } from 'react';

const SymptomInput = ({ onSubmit, loading, darkMode }) => {
  const [symptoms, setSymptoms] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [placeholder, setPlaceholder] = useState('');
  const textareaRef = useRef(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const placeholderTexts = [
    "I have fever and sore throat...",
    "I'm experiencing headache and nausea...",
    "I have stomach pain and diarrhea...",
    "I feel dizzy and have chest pain...",
    "I have difficulty breathing...",
    "I'm having back pain and fatigue..."
  ];

  useEffect(() => {
    let currentIndex = 0;
    let currentText = '';
    let isDeleting = false;
    
    const typeWriter = () => {
      const fullText = placeholderTexts[currentIndex];
      
      if (isDeleting) {
        currentText = fullText.substring(0, currentText.length - 1);
      } else {
        currentText = fullText.substring(0, currentText.length + 1);
      }
      
      setPlaceholder(currentText);
      
      let typeSpeed = isDeleting ? 30 : 100;
      
      if (!isDeleting && currentText === fullText) {
        typeSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && currentText === '') {
        isDeleting = false;
        currentIndex = (currentIndex + 1) % placeholderTexts.length;
        typeSpeed = 500;
      }
      
      setTimeout(typeWriter, typeSpeed);
    };
    
    typeWriter();
  }, [placeholderTexts]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (symptoms.trim() && !loading) {
      onSubmit(symptoms.trim());
    }
  };

  const handleInputChange = (e) => {
    setSymptoms(e.target.value);
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 1000);
  };

  const quickSymptoms = [
    '🤒 Fever', '😷 Cough', '🤧 Cold', '😵 Headache', 
    '🤢 Nausea', '😰 Fatigue', '💔 Chest Pain', '🦵 Body Ache'
  ];

  const addQuickSymptom = (symptom) => {
    const cleanSymptom = symptom.split(' ').slice(1).join(' ');
    setSymptoms(prev => prev ? `${prev}, ${cleanSymptom}` : cleanSymptom);
    textareaRef.current?.focus();
  };

  return (
    <div className={`p-6 rounded-2xl transition-all duration-300 ${
      darkMode 
        ? 'bg-purple-800/30 border border-purple-600/20 backdrop-blur-lg' 
        : 'bg-white/80 border border-purple-200 shadow-xl backdrop-blur-sm'
    }`}>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div className="text-center">
          <h2 className={`text-2xl font-bold mb-2 ${
            darkMode ? 'text-white' : 'text-purple-900'
          }`}>
            Describe Your Symptoms
          </h2>
          <p className={`text-sm ${
            darkMode ? 'text-purple-200' : 'text-purple-600'
          }`}>
            Tell me what you're experiencing, and I'll help analyze it
          </p>
        </div>

        {/* Main Input */}
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={symptoms}
            onChange={handleInputChange}
            placeholder={placeholder + '|'}
            className={`w-full h-32 p-4 rounded-xl resize-none transition-all duration-300 focus:outline-none focus:ring-2 ${
              darkMode 
                ? 'bg-purple-900/50 border border-purple-600/30 text-white placeholder-purple-300 focus:ring-purple-500 focus:border-purple-500' 
                : 'bg-white border border-purple-200 text-purple-900 placeholder-purple-400 focus:ring-purple-500 focus:border-purple-500 shadow-inner'
            } ${isTyping ? 'scale-105' : ''}`}
            disabled={loading}
          />
          
          {/* Character Counter */}
          <div className={`absolute bottom-2 right-2 text-xs ${
            darkMode ? 'text-purple-300' : 'text-purple-500'
          }`}>
            {symptoms.length}/500
          </div>

          {/* Typing Indicator */}
          {isTyping && (
            <div className="absolute -bottom-6 left-0 flex items-center space-x-1">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
              <span className={`text-xs ml-2 ${
                darkMode ? 'text-purple-300' : 'text-purple-600'
              }`}>
                Processing...
              </span>
            </div>
          )}
        </div>

        {/* Quick Symptoms */}
        <div>
          <p className={`text-sm font-medium mb-3 ${
            darkMode ? 'text-purple-200' : 'text-purple-700'
          }`}>
            Quick Add:
          </p>
          <div className="flex flex-wrap gap-2">
            {quickSymptoms.map((symptom, index) => (
              <button
                key={index}
                type="button"
                onClick={() => addQuickSymptom(symptom)}
                className={`px-3 py-1 rounded-full text-sm transition-all duration-200 ${
                  darkMode 
                    ? 'bg-purple-700/50 hover:bg-purple-600/60 text-purple-100 border border-purple-600/30' 
                    : 'bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200'
                } hover:scale-105`}
                disabled={loading}
              >
                {symptom}
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!symptoms.trim() || loading}
          className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
            !symptoms.trim() || loading
              ? darkMode 
                ? 'bg-purple-800/30 text-purple-400 cursor-not-allowed' 
                : 'bg-purple-100 text-purple-400 cursor-not-allowed'
              : darkMode
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Analyzing Symptoms...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <span>🔍</span>
              <span>Get Diagnosis</span>
              <span>🩺</span>
            </div>
          )}
        </button>

        {/* Helper Text */}
        <p className={`text-xs text-center ${
          darkMode ? 'text-purple-300' : 'text-purple-500'
        }`}>
          💡 Be as detailed as possible for better accuracy. Include duration, severity, and related symptoms.
        </p>
      </form>
    </div>
  );
};

export default SymptomInput;