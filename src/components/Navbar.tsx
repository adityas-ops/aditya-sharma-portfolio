import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiMenu, FiX } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const NAV_ITEMS = [
  { id: "about", label: "About", number: "01" },
  { id: "experience", label: "Experience", number: "02" },
  { id: "projects", label: "Work", number: "03" },
  { id: "contact", label: "Contact", number: "04" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      start: "top -80px",
      onUpdate: (self) => {
        setIsScrolled(self.scroll() > 80);
      },
    });

    const sections = NAV_ITEMS.map((item) =>
      document.getElementById(item.id),
    ).filter(Boolean);

    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -50% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((section) => section && observer.observe(section));

    return () => {
      trigger.kill();
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      if (overlayRef.current) {
        gsap.fromTo(
          overlayRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
        );
        gsap.fromTo(
          ".mobile-nav-item",
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.1,
            delay: 0.1,
            ease: "power3.out",
          },
        );
      }
    } else {
      document.body.style.overflow = "auto";
    }
  }, [menuOpen]);

  const scrollToSection = (id: string) => {
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#0A0A0F]/80 backdrop-blur-md border-b border-white/10 py-3 shadow-xl"
            : "bg-black py-3"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="group relative flex items-center justify-center w-12 h-12"
            aria-label="Aditya Sharma Home"
          >
            <p className="text-[var(--accent)] font-syne text-4xl font-bold">
              AS.
            </p>
          </a>

          <nav className="hidden md:flex items-center gap-8 font-mono-accent text-[13px]">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`group relative py-1 text-left transition-colors duration-200 ${
                    isActive
                      ? "text-[var(--accent)] font-medium"
                      : "text-[#E8E8E8] hover:text-[var(--accent)]"
                  }`}
                >
                  <span className="text-[var(--accent)] mr-1.5">
                    {item.number}.
                  </span>
                  <span>{item.label}</span>
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] bg-[var(--accent)] transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </button>
              );
            })}

            <a
              href="https://drive.google.com/file/d/1X5uA6JvE5g9Y8z-7P-N-Xq9eY7yL2/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 px-5 py-2 border-1.5 border-[var(--accent)] text-[var(--accent)] rounded font-mono-accent text-xs hover:bg-[var(--accent)] hover:text-white transition-all duration-200 hover:shadow-[0_0_15px_rgba(255,77,0,0.4)]"
            >
              Resume
            </a>
          </nav>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-2xl text-[var(--accent)] p-2 focus:outline-none z-50"
            aria-label="Toggle Navigation Menu"
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </header>

      {menuOpen && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-40 bg-[#0A0A0F]/95 backdrop-blur-xl flex flex-col justify-center items-center px-6"
        >
          <div className="flex flex-col items-center gap-8 text-center">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="mobile-nav-item font-syne text-3xl md:text-4xl font-bold text-white hover:text-[var(--accent)] transition-colors flex items-center gap-3"
              >
                <span className="font-mono-accent text-lg text-[var(--accent)]">
                  {item.number}.
                </span>
                <span>{item.label}</span>
              </button>
            ))}
            <a
              href="https://drive.google.com/file/d/1X5uA6JvE5g9Y8z-7P-N-Xq9eY7yL2/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-nav-item mt-4 px-8 py-3 border-2 border-[var(--accent)] text-[var(--accent)] rounded-lg font-mono-accent text-base hover:bg-[var(--accent)] hover:text-white transition-all"
            >
              Resume
            </a>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
