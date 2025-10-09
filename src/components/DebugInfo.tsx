import { useEffect } from 'react';

const DebugInfo = () => {
  const debugInfo = {
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    url: window.location.href,
    localStorageKeys: Object.keys(localStorage),
    sessionStorageKeys: Object.keys(sessionStorage),
    performanceTiming: performance.timing ? {
      navigationStart: performance.timing.navigationStart,
      domContentLoaded: performance.timing.domContentLoadedEventEnd,
      loadComplete: performance.timing.loadEventEnd
    } : null
  };

  useEffect(() => {
    console.log('🔍 Debug Info:', debugInfo);
    
    // Log any failed resource loads
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === 'resource' && entry.name.includes('404')) {
          console.error('❌ Failed resource load:', entry.name);
        }
      });
    });
    
    observer.observe({ entryTypes: ['resource'] });
    
    return () => observer.disconnect();
  }, [debugInfo]);

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      background: 'rgba(0,0,0,0.8)',
      color: 'white',
      padding: '10px',
      fontSize: '12px',
      borderRadius: '5px',
      zIndex: 9999,
      maxWidth: '300px',
      display: import.meta.env.DEV ? 'block' : 'none'
    }}>
      <div>🕒 {debugInfo.timestamp}</div>
      <div>📍 {debugInfo.url}</div>
      <div>📦 Storage: {debugInfo.localStorageKeys.length + debugInfo.sessionStorageKeys.length} items</div>
      {debugInfo.performanceTiming && (
        <div>⚡ Load: {debugInfo.performanceTiming.loadComplete - debugInfo.performanceTiming.navigationStart}ms</div>
      )}
    </div>
  );
};

export default DebugInfo;
