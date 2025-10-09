import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import './font.css'

// Enhanced debugging and cache management
const debugAndManageCache = () => {
  console.log('🚀 App starting...');
  console.log('📍 Current URL:', window.location.href);
  console.log('🕒 Timestamp:', new Date().toISOString());
  
  // Force cache busting for returning users
  const isReturningUser = localStorage.getItem('hasVisited') || sessionStorage.getItem('hasVisited');
  if (isReturningUser) {
    console.log('🔄 Returning user detected, forcing cache refresh...');
    
    // Add cache-busting parameter to force fresh load
    const url = new URL(window.location.href);
    if (!url.searchParams.has('v')) {
      url.searchParams.set('v', Date.now().toString());
      window.location.replace(url.toString());
      return;
    }
  }
  
  // Mark as visited
  localStorage.setItem('hasVisited', 'true');
  sessionStorage.setItem('hasVisited', 'true');
  
  try {
    // Log current storage state
    console.log('📦 localStorage keys:', Object.keys(localStorage));
    console.log('📦 sessionStorage keys:', Object.keys(sessionStorage));
    
    // Only clear specific problematic data, not everything
    const problematicKeys = ['visited', 'cache-version', 'app-state'];
    
    // Clear only problematic localStorage items
    problematicKeys.forEach(key => {
      if (localStorage.getItem(key)) {
        console.log('🗑️ Removing localStorage key:', key);
        localStorage.removeItem(key);
      }
    });
    
    // Clear only problematic sessionStorage items
    problematicKeys.forEach(key => {
      if (sessionStorage.getItem(key)) {
        console.log('🗑️ Removing sessionStorage key:', key);
        sessionStorage.removeItem(key);
      }
    });
    
    // Clear old caches that might cause issues
    if ('caches' in window) {
      caches.keys().then(cacheNames => {
        console.log('🗂️ Available caches:', cacheNames);
        cacheNames.forEach(cacheName => {
          // Only clear old cache versions, not current ones
          if (cacheName.includes('old') || cacheName.includes('v1') || cacheName.includes('legacy')) {
            console.log('🗑️ Deleting old cache:', cacheName);
            caches.delete(cacheName);
          }
        });
      });
    }
    
    // Unregister old service workers only
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then(registrations => {
        console.log('👷 Service workers:', registrations.length);
        registrations.forEach(registration => {
          // Only unregister if it's an old version
          if (registration.scope.includes('old') || registration.scope.includes('v1')) {
            console.log('🗑️ Unregistering old service worker:', registration.scope);
            registration.unregister();
          }
        });
      });
    }
    
    console.log('✅ Cache management completed');
  } catch (error) {
    console.error('❌ Cache management error:', error);
    // Don't reload on error, just log it
  }
};

// Execute debug and cache management
debugAndManageCache();

// Add error handling for the root element
const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('❌ Root element not found!');
  document.body.innerHTML = '<div style="padding: 20px; color: red;">Error: Root element not found!</div>';
} else {
  console.log('✅ Root element found, rendering app...');
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
