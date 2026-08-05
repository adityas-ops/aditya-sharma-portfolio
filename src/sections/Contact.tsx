import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [statusMsg, setStatusMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hasTyped = useRef(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-label", {
        y: 20,
        opacity: 0,
        duration: 0.5,
        scrollTrigger: { trigger: ".contact-section", start: "top 75%" },
      });
      gsap.from(".contact-heading", {
        y: 50,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: ".contact-section", start: "top 75%" },
      });
      gsap.from(".contact-sub", {
        y: 20,
        opacity: 0,
        duration: 0.5,
        delay: 0.15,
        scrollTrigger: { trigger: ".contact-section", start: "top 70%" },
      });
      gsap.from(".terminal-block", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        delay: 0.25,
        scrollTrigger: {
          trigger: ".contact-section",
          start: "top 70%",
          onEnter: () => {
            if (hasTyped.current) return;
            hasTyped.current = true;
            // Typewriter for the command line
            const fullText = "./send-message";
            const el = document.getElementById("typed-cmd");
            if (!el) return;
            el.textContent = "";
            let i = 0;
            const timer = setInterval(() => {
              if (i < fullText.length) {
                el.textContent += fullText[i];
                i++;
              } else {
                clearInterval(timer);
              }
            }, 70);
          },
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setStatusMsg("[ERROR] Please enter both name and message.");
      return;
    }

    setIsSubmitting(true);
    setStatusMsg("[SENDING] Dispatching to mailer...");

    setTimeout(() => {
      setIsSubmitting(false);
      setStatusMsg("[SUCCESS] Launching mail client...");

      const mailtoUrl = `mailto:sharmaaditya.co@gmail.com?subject=Portfolio%20Inquiry%20from%20${encodeURIComponent(
        name,
      )}&body=${encodeURIComponent(message)}`;

      window.location.href = mailtoUrl;
    }, 800);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      data-bg="#0A0A0F"
      className="contact-section relative w-full bg-[#0A0A0F] py-28 md:py-36 text-white overflow-hidden"
    >
      <div className="max-w-[900px] mx-auto px-6 md:px-12">
        {/* Header — matching Experience section styling */}
        <div className="mb-6">
          <span className="contact-label font-mono-accent text-xs md:text-sm font-bold text-[var(--accent)] tracking-wider uppercase mb-2 block">
            04. What's Next?
          </span>
          <h2 className="contact-heading font-syne text-3xl md:text-5xl font-bold text-white">
            Get In Touch.
          </h2>
        </div>

        {/* Subtext */}
        <p className="contact-sub font-inter text-[15px] text-[#8A8A9E] leading-relaxed mb-10 max-w-[520px]">
          Whether you have a question, a project idea, or just want to say hi —
          my inbox is always open.
        </p>

        {/* Terminal UI Form */}
        <form onSubmit={handleSubmit} className="terminal-block">
          {/* Terminal Chrome Header */}
          <div className="flex items-center gap-2 px-4 py-3 bg-white/[0.03] border-b border-white/[0.06]">
            <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <span className="w-3 h-3 rounded-full bg-[#28C840]" />
            <span className="ml-3 font-mono-accent text-[11px] text-white/30">
              contact.sh
            </span>
          </div>

          {/* Terminal Body */}
          <div className="p-5 md:p-6 font-mono-accent text-sm space-y-5">
            {/* Static command line with typewriter */}
            <div className="flex items-center gap-2">
              <span className="text-[var(--accent)] flex-shrink-0">
                visitor@aditya:~$
              </span>
              <span className="text-white/90" id="typed-cmd" />
              <span className="animate-pulse text-[var(--accent)] text-xs">
                ▋
              </span>
            </div>

            {/* Name input */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-white/40 flex-shrink-0">
                Enter your name:
              </span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                required
                className="flex-1 min-w-[180px] bg-transparent border-b border-white/10 text-white/90 text-sm font-mono-accent py-1.5 px-1 outline-none focus:border-[var(--accent)] transition-colors placeholder-white/15"
              />
            </div>

            {/* Message input */}
            <div className="flex items-start gap-2 flex-wrap">
              <span className="text-white/40 flex-shrink-0 pt-1.5">
                Your message:
              </span>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="I have a project for you..."
                rows={3}
                required
                className="flex-1 min-w-[180px] bg-transparent border-b border-white/10 text-white/90 text-sm font-mono-accent py-1.5 px-1 outline-none focus:border-[var(--accent)] transition-colors resize-none placeholder-white/15"
              />
            </div>

            {/* Status message */}
            {statusMsg && (
              <div
                className={`text-xs ${
                  statusMsg.includes("SUCCESS")
                    ? "text-[#28C840]"
                    : statusMsg.includes("ERROR")
                      ? "text-[#FF5F57]"
                      : "text-[var(--accent)]"
                }`}
              >
                {statusMsg}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full text-left px-4 py-3 border border-[var(--accent)]/30 rounded text-[var(--accent)] text-[13px] hover:bg-[var(--accent)]/8 hover:border-[var(--accent)]/60 transition-all disabled:opacity-50"
            >
              <span className="text-[var(--accent)]">$</span>{" "}
              {isSubmitting
                ? "sending..."
                : "send_message --to=sharmaaditya.co@gmail.com"}
            </button>
          </div>
        </form>

        {/* Direct email fallback */}
        <div className="mt-8 text-center">
          <a
            href="mailto:sharmaaditya.co@gmail.com"
            className="font-mono-accent text-xs text-white/30 hover:text-[var(--accent)] transition-colors underline underline-offset-4"
          >
            Or send directly: sharmaaditya.co@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
}

export default Contact;
