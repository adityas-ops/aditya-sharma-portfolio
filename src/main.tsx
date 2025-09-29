import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import './font.css'

// Nuclear option - clear everything and reload if needed
const nuclearCacheClear = () => {
  try {
    // Clear localStorage
    localStorage.clear();
    
    // Clear sessionStorage
    sessionStorage.clear();
    
    // Clear all caches
    if ('caches' in window) {
      caches.keys().then(cacheNames => {
        cacheNames.forEach(cacheName => {
          caches.delete(cacheName);
        });
      });
    }
    
    // Unregister all service workers
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then(registrations => {
        registrations.forEach(registration => {
          registration.unregister();
        });
      });
    }
    
    // Force reload if this is not the first visit
    const isFirstVisit = !sessionStorage.getItem('visited');
    if (!isFirstVisit) {
      console.log('Force reloading to clear cache...');
      window.location.reload();
      return;
    }
    sessionStorage.setItem('visited', 'true');
    
    console.log('Nuclear cache clear completed');
  } catch (error) {
    console.log('Cache clearing error:', error);
    // If anything fails, reload the page
    window.location.reload();
  }
};

// Execute nuclear cache clear
nuclearCacheClear();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
