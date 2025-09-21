import { useEffect, useState, Suspense, lazy } from "react";
import SplashScreen from "./components/SplashScreen";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"
import PerformanceMonitor from "./components/PerformanceMonitor"

// Lazy load the main Home component
const Home = lazy(() => import("./components/Home"));

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 4000); // Reduced from 4500ms to 2000ms for faster initial load

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen w-screen">
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
  );
}

export default App;
