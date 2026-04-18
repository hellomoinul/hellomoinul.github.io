import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

// 📍 Importing data from your sections
import { projects } from "./ProjectsSection"; 
import { skills } from "./SkillsSection"; // 📍 Now importing skills too

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
  // 📍 Full Dynamic Counts
  const projectCount = projects?.length || 0;
  const techCount = skills?.length || 0; 

  const stats = [
    { value: projectCount, suffix: "+", label: "Projects Completed" },
    { value: techCount, suffix: "+", label: "Technologies" },
    { value: 2, suffix: "+", label: "Years Learning" },
    { value: 100, suffix: "%", label: "Commitment" },
  ];

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
