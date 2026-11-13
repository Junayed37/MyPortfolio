import { ExternalLink } from "lucide-react";
import { Github } from "@/components/icons";
import { Project } from "@/data/portfolio";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/50 p-6 transition hover:border-emerald-500/50">
      <div>
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-semibold text-white">{project.title}</h3>
          <div className="flex items-center gap-3 text-slate-400">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Repository"
              className="transition hover:text-white"
            >
              <Github className="h-5 w-5" />
            </a>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Live Demo"
                className="transition hover:text-emerald-400"
              >
                <ExternalLink className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-slate-400">
          {project.description}
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.tech.map((item) => (
          <span
            key={item}
            className="rounded-md bg-slate-800 px-2.5 py-1 text-xs font-medium text-emerald-300"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
