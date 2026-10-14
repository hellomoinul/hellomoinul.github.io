import { Github, ExternalLink, Star, GitFork, Code2, CalendarClock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export interface ProjectDetail {
  title: string;
  description: string;
  tags: string[];
  image?: string;
  liveLink?: string;
  githubLink?: string;
  language?: string | null;
  stars?: number;
  forks?: number;
  updatedAt?: string;
}

const Meta = ({ detail }: { detail: ProjectDetail }) => {
  const items = [
    detail.language && <span key="lang">{detail.language}</span>,
    detail.stars !== undefined && (
      <span key="stars" className="flex items-center gap-1">
        <Star size={12} /> {detail.stars}
      </span>
    ),
    detail.forks !== undefined && (
      <span key="forks" className="flex items-center gap-1">
        <GitFork size={12} /> {detail.forks}
      </span>
    ),
    detail.updatedAt && (
      <span key="updated" className="flex items-center gap-1">
        <CalendarClock size={12} /> Updated{" "}
        {new Date(detail.updatedAt).toLocaleDateString()}
      </span>
    ),
  ].filter(Boolean);
  if (items.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] text-muted-foreground">
      {items}
    </div>
  );
};

const ProjectModal = ({
  detail,
  onClose,
}: {
  detail: ProjectDetail | null;
  onClose: () => void;
}) => (
  <Dialog open={!!detail} onOpenChange={(open) => !open && onClose()}>
    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 gap-0">
      {detail && (
        <>
          <div className="aspect-video overflow-hidden relative bg-gradient-to-br from-primary/20 via-muted to-card flex items-center justify-center rounded-t-lg">
            {detail.image ? (
              <img
                src={detail.image}
                alt={detail.title}
                className="w-full h-full object-cover"
                style={{ filter: "grayscale(10%) contrast(105%)" }}
              />
            ) : (
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Code2 size={22} className="text-primary" />
                </div>
                <span className="font-mono text-[11px] uppercase tracking-widest">
                  {detail.language || "GitHub"}
                </span>
              </div>
            )}
          </div>

          <div className="p-6 space-y-4">
            <DialogHeader className="text-left space-y-2">
              <DialogTitle className="text-xl tracking-tight">
                {detail.title}
              </DialogTitle>
              <Meta detail={detail} />
            </DialogHeader>

            <p className="text-muted-foreground text-sm leading-relaxed">
              {detail.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {detail.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] uppercase px-2.5 py-1 rounded-md bg-muted text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              {detail.liveLink && (
                <a
                  href={detail.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold text-xs transition-all hover:scale-105"
                >
                  <ExternalLink size={14} />
                  {detail.title.includes("Embedded") ? "View Paper" : "Visit Live"}
                </a>
              )}
              {detail.githubLink && (
                <a
                  href={detail.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-secondary text-secondary-foreground font-semibold text-xs transition-all hover:scale-105 border border-white/10"
                >
                  <Github size={14} /> View Code
                </a>
              )}
            </div>
          </div>
        </>
      )}
    </DialogContent>
  </Dialog>
);

export default ProjectModal;
