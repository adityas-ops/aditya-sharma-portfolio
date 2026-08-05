import { FiGithub, FiLinkedin, FiInstagram } from "react-icons/fi";

const SOCIAL_LINKS = [
  { name: "GitHub", icon: FiGithub, url: "https://github.com/adityas-ops" },
  {
    name: "LinkedIn",
    icon: FiLinkedin,
    url: "https://www.linkedin.com/in/aditya-sharma-ops/",
  },
  {
    name: "Instagram",
    icon: FiInstagram,
    url: "https://www.instagram.com/aditya_ops/",
  },
];

export function SocialSidebar() {
  return (
    <>
      <div className="hidden md:flex fixed left-8 bottom-0 z-40 flex-col items-center gap-6">
        {SOCIAL_LINKS.map((link) => {
          const Icon = link.icon;
          return (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name}
              className="text-white/60 hover:text-[var(--accent)] hover:-translate-y-1 transition-all duration-200 text-xl"
            >
              <Icon />
            </a>
          );
        })}
        <div className="w-[1px] h-20 bg-white/20 mt-2" />
      </div>

      <div className="hidden md:flex fixed right-8 bottom-0 z-40 flex-col items-center gap-6">
        <a
          href="mailto:sharmaaditya.co@gmail.com"
          className="font-mono-accent text-xs tracking-wider text-white/50 hover:text-[var(--accent)] hover:-translate-y-1 transition-all duration-200 [writing-mode:vertical-rl]"
        >
          sharmaaditya.co@gmail.com
        </a>
        <div className="w-[1px] h-20 bg-white/20 mt-2" />
      </div>
    </>
  );
}

export default SocialSidebar;
