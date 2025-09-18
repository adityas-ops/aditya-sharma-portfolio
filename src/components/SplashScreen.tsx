import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

const SplashScreen = () => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.set(".hexagon-stroke", { strokeDashoffset: 1000 });
      gsap.set(".letter-a", { opacity: 0, scale: 0 });

      const tl = gsap.timeline();

      tl.to(".hexagon-stroke", {
        strokeDashoffset: 0,
        duration: 5,
        ease: "power2.inOut",
      });
      tl.to(
        ".letter-a",
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
        },
        "2.5"
      );
      tl.to(
        ".hexagon-stroke, .hexagon-border, .letter-a",
        {
          opacity: 0,
          duration: 1,
          ease: "power2.in",
        },
        "3.5"
      );
    },
    { scope: container }
  );

  return (
    <div className=" w-screen h-screen bg-[#020C1B] flex justify-center items-center">
      <div
        ref={container}
        className="m-0 p-0 h-[200px] w-[200px] scale-[0.5] flex justify-center items-center"
      >
        <svg
          id="logo"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          viewBox="0 0 84 96"
          className="w-[100px] h-[130px]"
        >
          <g transform="translate(-8.000000, -2.000000)">
            <g transform="translate(11.000000, 5.000000)">
              {/* Background hexagon border */}
              <polygon
                className="hexagon-border"
                fill="none"
                stroke="#000"
                strokeWidth="2"
                points="39 0 0 22 0 67 39 90 78 68 78 23"
              ></polygon>

              {/* Animated hexagon stroke */}
              <polygon
                className="hexagon-stroke"
                fill="none"
                stroke="#000"
                strokeWidth="2"
                strokeDasharray="1000"
                strokeDashoffset="1000"
                points="39 0 0 22 0 67 39 90 78 68 78 23"
              ></polygon>

              {/* Letter A */}
              <g transform="">
                <text
                  className="letter-a"
                  x="48%"
                  y="50%"
                  font-size="48"
                  font-family="sans-serif"
                  font-weight="bold"
                  fill="#000"
                  text-anchor="middle"
                  dominant-baseline="middle"
                >
                  A
                </text>
              </g>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
};

export default SplashScreen;
