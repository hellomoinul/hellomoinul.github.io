// Single source of truth for content that stays curated.
// Projects with cover images stay in ProjectsSection.tsx (needs image imports).
// GitHub-tagged repos + live stats come from useGithub() — no edit needed.

export const blogPosts = [
  {
    title: "Why I Chose SQL for My First Backend Project",
    excerpt:
      "Exploring the fundamentals of relational databases and how building a Tax Management System taught me structured thinking.",
    date: "Coming Soon",
    tags: ["SQL", "Backend"],
  },
  {
    title: "Getting Started with Flutter as a CS Student",
    excerpt:
      "My journey into cross-platform mobile development and lessons learned building the Fantasy Cricket App.",
    date: "Coming Soon",
    tags: ["Flutter", "Mobile"],
  },
  {
    title: "The Art of Technical Consulting",
    excerpt:
      "How a structured approach to problem-solving can elevate any engineering project from concept to delivery.",
    date: "Coming Soon",
    tags: ["Consulting", "Career"],
  },
];

// Optional: set your Dev.to username to make Blog live.
// If empty, BlogSection falls back to blogPosts above.
export const DEVTO_USERNAME = "";
