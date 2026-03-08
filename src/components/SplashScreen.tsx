import { memo, lazy, Suspense } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef } from "react";

const SplashScene = lazy(() => import("./three/SplashScene"));

const SplashScreen = () => {
  const container = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!textRef.current) return;
      gsap.set(textRef.current, { opacity: 0, scale: 0.8 });

      gsap.to(textRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power2.out",
        delay: 1,
      });

      gsap.to(textRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
        delay: 3,
      });
    },
    { scope: container },
  );

  return (
    <div
      ref={container}
      className="w-screen h-screen bg-[#020C1B] flex justify-center items-center relative overflow-hidden"
    >
      <Suspense
        fallback={
          <div className="w-full h-full flex justify-center items-center">
            <div className="w-16 h-16 border-2 border-[#64ffda] border-t-transparent rounded-full animate-spin"></div>
          </div>
        }
      >
        <SplashScene />
      </Suspense>

      {/* Overlay text */}
      <div
        ref={textRef}
        className="absolute mt-[180px] inset-0 flex flex-col justify-center items-center z-10 pointer-events-none"
      >
        <p className="text-[#64ffda] font-SFMono-Regular text-lg tracking-[0.3em] uppercase">
          Aditya Sharma
        </p>
        <p className="text-[#8892b0] font-SFMono-Regular text-sm mt-2 tracking-widest">
          Software Engineer
        </p>
      </div>
    </div>
  );
};

export default memo(SplashScreen);
