import { useEffect, useState } from "react";
import SplashScreen from "./components/SplashScreen";
import Home from "./components/Home";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 4500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen w-screen">
      {showSplash ? (
        <div className=" w-full h-full flex justify-center items-center">
          <SplashScreen />
        </div>
      ) : (
       <Home/>
      )}
    </div>
  );
}

export default App;
