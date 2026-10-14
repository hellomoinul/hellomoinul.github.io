import { motion } from "framer-motion";
import { Database, Smartphone, Network, Github, ExternalLink, Cpu, Star, GitFork, Code2 } from "lucide-react"; // 📍 Added 'Cpu' icon import
import { useGithubRepos } from "@/hooks/useGithub";

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

// Repo names already covered by the curated cards above (lowercase).
// Live repos matching these are hidden to avoid duplicates.
export const featuredGithubRepoNames = ["tax-management-system", "fantasy_cricket_app"];

const ProjectsSection = () => {
  const { showcaseRepos, isLoading, isError } = useGithubRepos();
  const liveOnly = showcaseRepos.filter(
    (r) => !featuredGithubRepoNames.includes(r.name.toLowerCase())
  );
  const showLive = !isError && (isLoading || liveOnly.length > 0);

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

        {/* Featured grid: curated cards + GitHub showcase repos in the same style */}
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
          {/* Live GitHub repos (topic: showcase) render as native cards in the same grid */}
          {showLive &&
            (isLoading
              ? [0, 1].map((i) => (
                  <div
                    key={`skeleton-${i}`}
                    className="glass-card rounded-xl overflow-hidden flex flex-col h-full animate-pulse"
                  >
                    <div className="aspect-video bg-muted/40" />
                    <div className="p-6 space-y-3">
                      <div className="h-4 bg-muted rounded w-2/3" />
                      <div className="h-3 bg-muted rounded w-full" />
                      <div className="h-3 bg-muted rounded w-5/6" />
                    </div>
                  </div>
                ))
              : liveOnly.map((repo, j) => {
                  const idx = projects.length + j;
                  const displayTags = [
                    ...(repo.language ? [repo.language] : []),
                    ...repo.topics.filter((t) => t !== "showcase").slice(0, 3),
                  ];
                  return (
                    <motion.div
                      key={repo.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: (idx % 4) * 0.15, duration: 0.5 }}
                      className="glass-card rounded-xl overflow-hidden group relative flex flex-col h-full"
                    >
                      <div className="aspect-video overflow-hidden relative bg-gradient-to-br from-primary/20 via-muted to-card flex items-center justify-center">
                        <div className="flex flex-col items-center gap-2 text-muted-foreground">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                            <Code2 size={22} className="text-primary" />
                          </div>
                          <span className="font-mono text-[11px] uppercase tracking-widest">
                            {repo.language || "GitHub"}
                          </span>
                        </div>
                        <div className="absolute top-3 right-3 flex items-center gap-2 font-mono text-[11px] text-muted-foreground bg-black/50 rounded-full px-2.5 py-1">
                          <span className="flex items-center gap-1">
                            <Star size={12} />
                            {repo.stargazers_count}
                          </span>
                          <span className="flex items-center gap-1">
                            <GitFork size={12} />
                            {repo.forks_count}
                          </span>
                        </div>
                        <div className="absolute inset-0 bg-black/70 z-20 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 p-4">
                          <a
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 w-44 justify-center py-2.5 rounded-full bg-secondary text-secondary-foreground font-semibold text-xs transition-all hover:scale-105 border border-white/10"
                          >
                            <Github size={14} /> View Code
                          </a>
                          {repo.homepage && (
                            <a
                              href={repo.homepage}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 w-44 justify-center py-2.5 rounded-full bg-primary text-primary-foreground font-semibold text-xs transition-all hover:scale-105"
                            >
                              <ExternalLink size={14} /> Visit Live
                            </a>
                          )}
                        </div>
                      </div>

                      <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
                              <Code2 size={16} className="text-primary" />
                            </div>
                            <h3 className="font-semibold text-lg tracking-tight line-clamp-1">
                              {repo.name.replace(/-/g, " ")}
                            </h3>
                          </div>
                          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                            {repo.description || "GitHub repository — open View Code for details."}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-2">
                          {displayTags.map((tag) => (
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
                  );
                }))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
