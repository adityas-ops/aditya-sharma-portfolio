import { useEffect, useState, Suspense, lazy } from "react";
import SplashScreen from "./components/SplashScreen";
import ErrorBoundary from "./components/ErrorBoundary";
import DebugInfo from "./components/DebugInfo";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"
import PerformanceMonitor from "./components/PerformanceMonitor"

// Lazy load the main Home component
const Home = lazy(() => import("./components/Home"));

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    console.log('🎬 App component mounted');
    console.log('⏰ Starting splash screen timer...');
    
    const timer = setTimeout(() => {
      console.log('⏰ Splash screen timer completed, showing main app');
      setShowSplash(false);
    }, 4000);

    return () => {
      console.log('🧹 Cleaning up splash screen timer');
      clearTimeout(timer);
    };
  }, []);

  console.log('🔄 App component rendering, showSplash:', showSplash);

  return (
    <ErrorBoundary>
      <div className="h-screen w-screen">
        <DebugInfo />
        {showSplash ? (
          <div className=" w-full h-full flex justify-center items-center">
            <SplashScreen />
          </div>
        ) : (
          <Suspense fallback={
            <div className="w-full h-full flex justify-center items-center bg-[#020C1B]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#64ffda]"></div>
            </div>
          }>
            <Home/>
          </Suspense>
        )}
        <Analytics/>
        <SpeedInsights/>
        <PerformanceMonitor/>
      </div>
    </ErrorBoundary>
  );
}

export default App;
