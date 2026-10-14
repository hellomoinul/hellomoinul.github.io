import { motion } from "framer-motion";
import { PenLine, ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { blogPosts, DEVTO_USERNAME } from "@/data/portfolio";

interface DevtoArticle {
  id: number;
  title: string;
  description: string;
  published_at: string;
  url: string;
  tag_list: string[];
}

const fetchDevto = async (username: string): Promise<DevtoArticle[]> => {
  const res = await fetch(`https://dev.to/api/articles?username=${username}&per_page=3`);
  if (!res.ok) throw new Error("dev.to failed");
  return res.json();
};

const BlogSection = () => {
  // 📍 Live blog: set DEVTO_USERNAME in src/data/portfolio.ts to auto-pull your latest 3 articles.
  // Falls back to curated blogPosts when empty/offline.
  const { data: live } = useQuery({
    queryKey: ["devto", DEVTO_USERNAME],
    queryFn: () => fetchDevto(DEVTO_USERNAME),
    enabled: DEVTO_USERNAME.length > 0,
    staleTime: 1000 * 60 * 60,
    retry: 1,
  });

  const posts =
    live && live.length > 0
      ? live.map((a) => ({
          title: a.title,
          excerpt: a.description,
          date: new Date(a.published_at).toLocaleDateString(),
          tags: a.tag_list.slice(0, 2),
          url: a.url,
        }))
      : blogPosts.map((p) => ({ ...p, url: undefined as string | undefined }));

  return (
    <section id="blog" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
            Blog & <span className="text-gradient">Articles</span>
          </h2>
          <div className="w-16 h-px bg-primary/50 mx-auto" />
          <p className="text-muted-foreground text-sm">Technical write-ups and learnings from my journey.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {posts.map((post, i) => {
            const Card = (
              <motion.article
                key={post.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-xl p-6 space-y-4 group hover:glow-accent transition-all duration-200 flex flex-col h-full"
              >
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
                  <PenLine size={14} className="text-primary" />
                </div>
                <span className="font-mono text-xs text-muted-foreground">{post.date}</span>
              </div>
              <h3 className="font-semibold text-sm tracking-tight leading-snug flex-1">{post.title}</h3>
              <p className="text-muted-foreground text-xs leading-relaxed">{post.excerpt}</p>
              <div className="flex items-center justify-between pt-2">
                <div className="flex gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="font-mono text-[10px] px-2 py-0.5 rounded bg-muted text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
                <ArrowRight size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              </motion.article>
            );
            return post.url ? (
              <a key={post.title} href={post.url} target="_blank" rel="noopener noreferrer" className="block h-full">
                {Card}
              </a>
            ) : (
              <div key={post.title} className="h-full">{Card}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
