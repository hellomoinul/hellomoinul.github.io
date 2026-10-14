import { motion } from "framer-motion";
import { Database, Smartphone, Network, Github, ExternalLink, Cpu, Star, GitFork } from "lucide-react"; // 📍 Added 'Cpu' icon import
import { useGithubRepos } from "@/hooks/useGithub";
import { SHOWCASE_TOPIC } from "@/lib/github";

// Asset Imports
import taxImg from "@/assets/project-tax.jpg";
import cricketImg from "@/assets/project-cricket.jpg";
import voboghureImg from "@/assets/voboghure-hero.png.jpeg";
import circuitImg from "@/assets/circuit.jpg"; // 📍 Fixed image import from your assets path

// 📍 Exported for StatsBar dynamic counting
export const projects = [
  {
    title: "Voboghure - Multi-Community Ecosystem",
    description: "Architected and engineered a full-stack SaaS-style platform for multi-community management. Features Role-Based Access Control (RBAC), secure Supabase authentication, and real-time database-trigger notifications.",
    tags: ["React & TypeScript", "Supabase", "Auth", "RBAC", "Full Stack"],
    icon: Network, 
    liveLink: "https://voboghure.vercel.app/",
    image: voboghureImg,
  },
  {
    title: "Embedded Real-Time Alert System", // 📍 Shortened for UI consistency
    description: "Architected an IoT-based system using Arduino Uno and PIR sensors for academic integrity enforcement. Features real-time motion detection and automated visual alert triggers to monitor exam environments.",
    tags: ["Arduino", "Embedded Systems", "IoT", "PIR Sensors", "Hardware"],
    icon: Cpu, 
    liveLink: "https://www.overleaf.com/read/hhjsqfvznfxt#bc979a",
    image: circuitImg, // 📍 Using the imported variable
  },
  {
    title: "Tax Management System",
    description: "A robust backend system built with SQL. Features include complex CRUD operations, advanced relational database design, and optimized data querying for financial records.",
    tags: ["SQL", "Database Design", "CRUD", "Backend"],
    icon: Database,
    githubLink: "https://github.com/hellomoinul/Tax-Management-System",
    image: taxImg,
  },
  {
    title: "Fantasy Cricket App",
    description: "A cross-platform mobile application developed using Flutter and Dart, focusing on a seamless user interface and real-time data handling for sports enthusiasts.",
    tags: ["Flutter", "Dart", "Mobile", "UI/UX"],
    icon: Smartphone,
    githubLink: "https://github.com/hellomoinul/fantasy_cricket_app",
    image: cricketImg,
  },
];

const ProjectsSection = () => {
  const { showcaseRepos, isLoading, isError } = useGithubRepos();
  const showLive = !isError && (isLoading || showcaseRepos.length > 0);

  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <div className="w-16 h-px bg-primary/50 mx-auto" />
        </motion.div>

        {/* 📍 Grid optimized: 2 columns for better focus as you now have 4 projects */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-[1100px] mx-auto">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="glass-card rounded-xl overflow-hidden group relative flex flex-col h-full"
            >
              <div className="aspect-video overflow-hidden relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  style={{ filter: "grayscale(10%) contrast(105%)" }}
                />
                
                <div className="absolute inset-0 bg-black/70 z-20 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 p-4">
                  {project.liveLink && (
                    <a 
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 w-44 justify-center py-2.5 rounded-full bg-primary text-primary-foreground font-semibold text-xs transition-all hover:scale-105"
                    >
                      <ExternalLink size={14} /> 
                      {/* 📍 Smart text for research papers */}
                      {project.title.includes("Embedded") ? "View Paper" : "Visit Live"}
                    </a>
                  )}
                  {project.githubLink && (
                    <a 
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 w-44 justify-center py-2.5 rounded-full bg-secondary text-secondary-foreground font-semibold text-xs transition-all hover:scale-105 border border-white/10"
                    >
                      <Github size={14} /> View Code
                    </a>
                  )}
                </div>
              </div>

              <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
                      <project.icon size={16} className="text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg tracking-tight line-clamp-1">{project.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] uppercase px-2.5 py-1 rounded-md bg-muted text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 📍 Live from GitHub: repos YOU tag with topic "showcase" appear here automatically */}
        {showLive && (
          <div className="max-w-[1100px] mx-auto mt-20">
            <div className="text-center space-y-2 mb-8">
              <p className="font-mono text-xs text-primary uppercase tracking-widest flex items-center justify-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Live from GitHub
              </p>
              <h3 className="text-xl font-bold tracking-tight">More work, auto-synced</h3>
              <p className="font-mono text-[11px] text-muted-foreground">
                Add topic <span className="text-primary">“{SHOWCASE_TOPIC}”</span> on any repo to feature it here — no code edit.
              </p>
            </div>

            {isLoading ? (
              <div className="grid md:grid-cols-2 gap-6">
                {[0, 1].map((i) => (
                  <div key={i} className="glass-card rounded-xl p-6 space-y-3 animate-pulse">
                    <div className="h-4 bg-muted rounded w-2/3" />
                    <div className="h-3 bg-muted rounded w-full" />
                    <div className="h-3 bg-muted rounded w-5/6" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {showcaseRepos.map((repo, i) => (
                  <motion.div
                    key={repo.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (i % 4) * 0.1 }}
                    className="glass-card rounded-xl p-6 space-y-3 group hover:glow-accent transition-all"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="font-semibold text-sm tracking-tight line-clamp-1">{repo.name}</h4>
                      <div className="flex items-center gap-3 font-mono text-[11px] text-muted-foreground shrink-0">
                        <span className="flex items-center gap-1"><Star size={12} />{repo.stargazers_count}</span>
                        <span className="flex items-center gap-1"><GitFork size={12} />{repo.forks_count}</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2">
                      {repo.description || "No description yet — add one on GitHub to show it here."}
                    </p>
                    <div className="flex flex-wrap items-center gap-2">
                      {repo.language && (
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-primary/10 text-primary">{repo.language}</span>
                      )}
                      {repo.topics.slice(0, 3).map((t) => (
                        <span key={t} className="font-mono text-[10px] px-2 py-0.5 rounded bg-muted text-muted-foreground">{t}</span>
                      ))}
                    </div>
                    <div className="flex gap-3 pt-1">
                      <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="font-mono text-xs flex items-center gap-1.5 hover:text-primary transition-colors">
                        <Github size={13} /> Code
                      </a>
                      {repo.homepage && (
                        <a href={repo.homepage} target="_blank" rel="noopener noreferrer" className="font-mono text-xs flex items-center gap-1.5 hover:text-primary transition-colors">
                          <ExternalLink size={13} /> Live
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
