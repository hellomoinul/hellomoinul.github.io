import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

// 📍 Importing data from your sections (fallback when offline / rate-limited)
import { projects } from "./ProjectsSection"; 
import { skills } from "./SkillsSection"; // 📍 Now importing skills too
import { useGithubRepos, useGithubUser } from "@/hooks/useGithub";

const AnimatedNumber = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
    const step = Math.max(1, Math.ceil(target / (duration / 30)));
    const interval = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(start);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [inView, target]);

  return (
    <span ref={ref} className="text-3xl md:text-4xl font-bold tracking-tighter text-gradient tabular-nums font-mono">
      {count}{suffix}
    </span>
  );
};

const StatsBar = () => {
  // 📍 Live GitHub numbers, fallback to static when API fails
  const { data: user } = useGithubUser();
  const { showcaseCount, totalStars, totalRepos } = useGithubRepos();

  const projectCount = showcaseCount > 0 ? showcaseCount : projects?.length || 0;
  const techCount = skills?.length || 0;
  const followerCount = user?.followers ?? 0;
  const starCount = totalStars;

  const stats = [
    { value: projectCount, suffix: "+", label: "Showcase Projects" },
    { value: techCount, suffix: "+", label: "Technologies" },
    // Live values replace the old hardcoded "2+ Years" / "100% Commitment":
    // followers + stars prove real activity better than a static claim.
    { value: followerCount, suffix: "", label: "GitHub Followers" },
    { value: starCount, suffix: "", label: "Stars Earned" },
  ];

  // Keep total repo count available for screen readers / future use
  void totalRepos;

  return (
    <section className="py-16 relative border-y border-border/30 bg-card/10 backdrop-blur-sm">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center space-y-2 group"
            >
              <div className="transition-transform duration-300 group-hover:scale-110">
                <AnimatedNumber target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="font-mono text-[10px] md:text-xs text-muted-foreground uppercase tracking-widest">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
