import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useProfileSkills } from "@/hooks/useGithub";
import { skillIconUrl, skillName } from "@/lib/github";

// Kept for StatsBar's Technologies count — the visible grid below is
// driven by useProfileSkills() (synced with the GitHub profile README).
export const skills = [
  { name: "React", icon: "⚛️" },
  { name: "TypeScript", icon: "TS" },
  { name: "Supabase", icon: "⚡" },
  { name: "PostgreSQL", icon: "🐘" },
  { name: "RBAC & Auth", icon: "🔐" },
  { name: "RLS", icon: "🛡️" },
  { name: "C", icon: "C" },
  { name: "C++", icon: "C++" },
  { name: "Java", icon: "☕" },
  { name: "Python", icon: "🐍" },
  { name: "JavaScript", icon: "JS" },
  { name: "Dart", icon: "🎯" },
  { name: "HTML", icon: "<>" },
  { name: "CSS", icon: "🎨" },
  { name: "MySQL", icon: "🗄️" },
  { name: "AI", icon: "🤖" },
];

// Mirrors the Frameworks & Tools shields on the GitHub profile README.
// Rarely changes — update both places together when it does.
const FRAMEWORK_CODES = ["react", "flutter", "tailwind", "supabase", "postgres", "mysql", "git", "vercel", "vscode"];

const SkillPill = ({ code, index }: { code: string; index: number }) => (
  <motion.span
    key={code}
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.04 }}
    className="glass-card rounded-full pl-2 pr-4 py-1.5 flex items-center gap-2 group cursor-default hover:glow-cyan transition-all duration-200"
  >
    <img
      src={skillIconUrl(code)}
      alt={skillName(code)}
      loading="lazy"
      className="w-5 h-5"
    />
    <span className="font-mono text-xs text-foreground">{skillName(code)}</span>
  </motion.span>
);

const SkillsSection = () => {
  const [highlightAll, setHighlightAll] = useState(false);
  const { skillCodes, isLive } = useProfileSkills();

  useEffect(() => {
    const onHighlight = () => {
      setHighlightAll(true);
      setTimeout(() => setHighlightAll(false), 1500);
    };
    const handleNavClick = (e: HashChangeEvent | Event) => {
      if (window.location.hash === "#skills") {
        setTimeout(onHighlight, 600);
      }
    };
    window.addEventListener("highlight-skills", onHighlight);
    window.addEventListener("hashchange", handleNavClick);
    return () => {
      window.removeEventListener("highlight-skills", onHighlight);
      window.removeEventListener("hashchange", handleNavClick);
    };
  }, []);

  return (
    <section id="skills" className="py-24 grid-bg relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
            Tech <span className="text-gradient">Stack</span>
          </h2>
          <div className="w-16 h-px bg-primary/50 mx-auto" />
        </motion.div>

        <div
          className={`max-w-3xl mx-auto space-y-8 transition-all duration-300 ${
            highlightAll ? "scale-[1.01]" : ""
          }`}
        >
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground text-center mb-4">
              Languages{" "}
              <span className="text-primary normal-case">
                · {isLive ? "synced with GitHub profile" : "offline snapshot"}
              </span>
            </p>
            <div className="flex flex-wrap justify-center gap-2.5">
              {skillCodes.map((code, i) => (
                <SkillPill key={code} code={code} index={i} />
              ))}
            </div>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground text-center mb-4">
              Frameworks & Tools
            </p>
            <div className="flex flex-wrap justify-center gap-2.5">
              {FRAMEWORK_CODES.map((code, i) => (
                <SkillPill key={code} code={code} index={i} />
              ))}
            </div>
          </div>

          <div className="flex justify-center pt-2">
            <div className="glass-card rounded-full px-6 py-3 font-mono text-sm flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Technical Consulting — <span className="text-primary">Core Service</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
