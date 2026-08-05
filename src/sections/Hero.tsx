import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FiChevronDown,
  FiGithub,
  FiLinkedin,
  FiInstagram,
} from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showChevron, setShowChevron] = useState(true);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });
      tl.from(".hero-topline", { opacity: 0, y: -10, duration: 0.4 })
        .from(
          ".hero-first-name",
          { opacity: 0, y: 50, duration: 0.6, ease: "power3.out" },
          "-=0.1",
        )
        .from(
          ".hero-last-name",
          { opacity: 0, y: 50, duration: 0.6, ease: "power3.out" },
          "-=0.35",
        )
        .from(
          ".hero-socials a",
          { opacity: 0, y: 15, stagger: 0.08, duration: 0.4 },
          "-=0.3",
        )
        .from(
          ".hero-btns > *",
          { opacity: 0, y: 20, stagger: 0.1, duration: 0.4 },
          "-=0.2",
        )
        .from(
          ".hero-right-top",
          { opacity: 0, x: 60, duration: 0.6, ease: "power3.out" },
          "-=0.5",
        )
        .from(
          ".hero-right-bottom",
          { opacity: 0, x: 60, duration: 0.6, ease: "power3.out" },
          "-=0.4",
        );

      // Function to trigger a glitch burst
      const triggerGlitch = () => {
        const nameEls = document.querySelectorAll(".hero-glitch-text");
        nameEls.forEach((el) => el.classList.add("is-glitching"));

        // GSAP Twitch sequence
        const glitchTl = gsap.timeline({
          onComplete: () => {
            nameEls.forEach((el) => el.classList.remove("is-glitching"));
          },
        });

        glitchTl
          .to(".hero-glitch-text", {
            x: () => (Math.random() - 0.5) * 12,
            skewX: () => (Math.random() - 0.5) * 16,
            duration: 0.05,
          })
          .to(".hero-glitch-text", {
            x: () => (Math.random() - 0.5) * 8,
            skewX: () => (Math.random() - 0.5) * -10,
            duration: 0.05,
          })
          .to(".hero-glitch-text", {
            x: 0,
            skewX: 0,
            duration: 0.08,
          });
      };

      // Interval glitch every ~3 seconds
      const glitchInterval = setInterval(() => {
        if (Math.random() > 0.2) {
          triggerGlitch();
        }
      }, 2800);

      ScrollTrigger.create({
        start: "top top",
        end: "+=12%",
        onUpdate: (self) => setShowChevron(self.progress < 0.5),
      });

      return () => {
        clearInterval(glitchInterval);
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleTitleHover = () => {
    const nameEls = document.querySelectorAll(".hero-glitch-text");
    nameEls.forEach((el) => el.classList.add("is-glitching"));
    gsap.to(".hero-glitch-text", {
      x: () => (Math.random() - 0.5) * 14,
      skewX: () => (Math.random() - 0.5) * 18,
      duration: 0.06,
      repeat: 3,
      yoyo: true,
      onComplete: () => {
        gsap.set(".hero-glitch-text", { x: 0, skewX: 0 });
        nameEls.forEach((el) => el.classList.remove("is-glitching"));
      },
    });
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      data-bg="#0A0A0F"
      className="relative w-full h-screen min-h-[700px] bg-[#0A0A0F] overflow-hidden"
    >
      {/* ── Full-bleed 2-panel grid ── */}
      <div className="h-full grid grid-cols-1 lg:grid-cols-[1fr_20%] xl:grid-cols-[1fr_22%]">
        {/* ══ LEFT PANEL — Name & Content ══ */}
        <div className="flex flex-col justify-center px-6 sm:px-10 md:px-16 lg:px-20 xl:px-24 py-20 lg:py-0">
          {/* Designation tagline */}
          <p className="hero-topline font-mono-accent text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-white/90 mb-4 lg:mb-6">
            Frontend Developer · App Developer · 2024
          </p>

          {/* Giant Name with Cyberpunk Glitch */}
          <h1
            className="mb-1 select-none cursor-pointer group"
            onMouseEnter={handleTitleHover}
          >
            <span
              data-text="ADITYA"
              className="hero-first-name hero-glitch-text block font-syne font-extrabold text-white leading-[0.85] tracking-tight text-[clamp(2.8rem,7vw,6.2rem)]"
            >
              ADITYA
            </span>
            <span
              data-text="SHARMA"
              className="hero-last-name hero-glitch-text block font-syne font-extrabold leading-[0.85] tracking-tight text-[clamp(2.8rem,7vw,6.2rem)]"
            >
              SHARMA
            </span>
          </h1>

          {/* CTA Buttons */}
          <div className="hero-btns mt-6 flex flex-wrap items-center gap-4 z-20">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group inline-flex items-center gap-2 px-7 py-3.5 bg-[var(--accent)] text-white font-mono-accent text-xs sm:text-sm font-medium rounded hover:bg-[var(--accent-soft)] transition-colors duration-200"
            >
              VIEW WORK
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>

            <button
              onClick={() => {
                window.open(
                  "https://drive.google.com/file/d/1X5uA6JvE5g9Y8z-7P-N-Xq9eY7yL2/view?usp=sharing",
                  "_blank",
                );
              }}
              // target="_blank"
              // rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/30 text-white/80 font-mono-accent text-xs sm:text-sm font-medium rounded hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-200"
            >
              DOWNLOAD CV
              <span className="text-xs">↓</span>
            </button>
          </div>

          {/* Social Icons — Bottom Left Horizontal */}
          <div className="hero-socials hidden lg:flex absolute bottom-10 left-24 items-center gap-4 z-20">
            <button
              onClick={() => {
                window.open("https://github.com/adityas-ops", "_blank");
              }}
              // target="_blank"
              // rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-white/50 hover:text-[var(--accent)] hover:-translate-y-1 transition-all duration-100 text-2xl"
            >
              <FiGithub />
            </button>
            <button
              onClick={() => {
                window.open(
                  "https://www.linkedin.com/in/aditya-sharma-ops/",
                  "_blank",
                );
              }}
              // target="_blank"
              // rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-white/50 hover:text-[var(--accent)] hover:-translate-y-1 transition-all duration-100 text-2xl"
            >
              <FiLinkedin />
            </button>
            <button
              onClick={() => {
                window.open("https://www.instagram.com/aditya_ops/", "_blank");
              }}
              // target="_blank"
              // rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-white/50 hover:text-[var(--accent)] hover:-translate-y-1 transition-all duration-100 text-2xl"
            >
              <FiInstagram />
            </button>
          </div>
        </div>

        {/* ══ RIGHT PANEL — Full-height, edge-to-edge, split in two ══ */}
        <div className="hidden lg:flex flex-col h-full border-l-[0.5px] border-white/50">
          {/* Top Half — Orange accent card */}
          <div className="hero-right-top flex-1 flex flex-col justify-end bg-[var(--accent)]">
            <div className=" px-8 xl:px-10 py-6 xl:py-8">
              <span className="font-mono-accent text-[10px] tracking-[0.25em] uppercase text-black block mb-2">
                Currently
              </span>
              <h3 className="font-syne text-xl xl:text-2xl font-bold text-black leading-snug">
                Frontend Eng
                <br />
                <span className="text-black">@ Civil Guruji</span>
              </h3>
            </div>
          </div>

          {/* Bottom Half — Dark experience card */}
          <div className="hero-right-bottom flex-1 flex flex-col justify-end items-start  px-8 xl:px-10 py-6 xl:py-8 border-t border-white/5">
            <span className="font-mono-accent text-[10px] tracking-[0.25em] uppercase  text-white block mb-2">
              Experience
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl xl:text-5xl font-extrabold text-[var(--accent)]">
                2+
              </span>
              <span className="text-2xl xl:text-3xl font-bold text-white">
                yrs
              </span>
            </div>
            <p className="font-inter text-sm xl:text-base text-white/35 mt-2">
              Web & mobile apps
            </p>
          </div>
        </div>

        {/* ── Mobile cards (visible below lg) ── */}
      </div>

      {/* Mobile fallback cards */}
      <div className="lg:hidden px-6 sm:px-10 pb-12 grid grid-cols-2 gap-3">
        <div className="rounded-xl overflow-hidden">
          <div className="h-16 bg-[var(--accent)]" />
          <div className="bg-[#161620] px-4 py-3">
            <span className="font-mono-accent text-[9px] tracking-widest uppercase text-white/25 block mb-1">
              Currently
            </span>
            <p className="font-syne text-sm font-bold text-white leading-tight">
              Frontend Eng{" "}
              <span className="text-[var(--accent)]">@ Civil Guruji</span>
            </p>
          </div>
        </div>
        <div className="rounded-xl bg-[#161620] px-4 py-4 border border-white/5">
          <span className="font-mono-accent text-[9px] tracking-widest uppercase text-white/25 block mb-1">
            Experience
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="font-syne text-2xl font-extrabold text-[var(--accent)]">
              2+
            </span>
            <span className="font-syne text-base font-bold text-white">
              yrs
            </span>
          </div>
          <p className="font-inter text-xs text-white/30 mt-0.5">
            Web & mobile apps
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      {showChevron && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center animate-bounce pointer-events-none">
          <FiChevronDown className="text-lg text-white/20" />
        </div>
      )}
    </section>
  );
}

export default Hero;
