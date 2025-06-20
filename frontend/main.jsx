// main.jsx - Application entry point
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Error boundary component for better error handling
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // Log error to console in development
    if (import.meta.env.DEV) {
      console.error('React Error Boundary caught an error:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center">
            <div className="mb-6">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h2>
              <p className="text-gray-600 mb-6">
                BIMARIBOT encountered an unexpected error. Please refresh the page and try again.
              </p>
            </div>
            
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-6 rounded-2xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
            >
              🔄 Refresh Page
            </button>
            
            {import.meta.env.DEV && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-red-600 font-medium mb-2">
                  🐛 Error Details (Development)
                </summary>
                <pre className="bg-red-50 p-4 rounded-lg text-xs text-red-800 overflow-auto max-h-40">
                  {this.state.error && this.state.error.toString()}
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Performance monitoring (optional)
const logPerformanceMetrics = () => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0];
        if (perfData && import.meta.env.DEV) {
          console.log('🚀 BIMARIBOT Performance Metrics:', {
            'DOM Content Loaded': `${Math.round(perfData.domContentLoadedEventEnd - perfData.fetchStart)}ms`,
            'Page Load Complete': `${Math.round(perfData.loadEventEnd - perfData.fetchStart)}ms`,
            'First Paint': `${Math.round(performance.getEntriesByType('paint').find(entry => entry.name === 'first-paint')?.startTime || 0)}ms`,
            'First Contentful Paint': `${Math.round(performance.getEntriesByType('paint').find(entry => entry.name === 'first-contentful-paint')?.startTime || 0)}ms`
          });
        }
      }, 0);
    });
  }
};

// Initialize performance monitoring in development
if (import.meta.env.DEV) {
  logPerformanceMetrics();
}

// Service Worker registration (for future PWA features)
const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator && import.meta.env.PROD) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('✅ Service Worker registered successfully:', registration);
    } catch (error) {
      console.log('❌ Service Worker registration failed:', error);
    }
  }
};

// Initialize service worker
registerServiceWorker();

// Console welcome message
if (import.meta.env.DEV) {
  console.log(`
  🏥 BIMARIBOT - AI Disease Predictor
  ===================================
  
  🚀 Welcome to the development console!
  
  Built with:
  • ⚛️  React 18
  • 🎨 Tailwind CSS
  • 🔥 Vite
  • 🤖 FastAPI Backend
  
  For support, visit: https://github.com/yourusername/bimaribot
  `);
}

// Render the application
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
)