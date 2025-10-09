import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import './font.css'

// Safe cache management - only clear problematic caches without forcing reloads
const safeCacheManagement = () => {
  try {
    // Only clear specific problematic data, not everything
    const problematicKeys = ['visited', 'cache-version', 'app-state'];
    
    // Clear only problematic localStorage items
    problematicKeys.forEach(key => {
      localStorage.removeItem(key);
    });
    
    // Clear only problematic sessionStorage items
    problematicKeys.forEach(key => {
      sessionStorage.removeItem(key);
    });
    
    // Clear old caches that might cause issues
    if ('caches' in window) {
      caches.keys().then(cacheNames => {
        cacheNames.forEach(cacheName => {
          // Only clear old cache versions, not current ones
          if (cacheName.includes('old') || cacheName.includes('v1') || cacheName.includes('legacy')) {
            caches.delete(cacheName);
          }
        });
      });
    }
    
    // Unregister old service workers only
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then(registrations => {
        registrations.forEach(registration => {
          // Only unregister if it's an old version
          if (registration.scope.includes('old') || registration.scope.includes('v1')) {
            registration.unregister();
          }
        });
      });
    }
    
    console.log('Safe cache management completed');
  } catch (error) {
    console.log('Cache management error:', error);
    // Don't reload on error, just log it
  }
};

// Execute safe cache management
safeCacheManagement();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
