import { ExternalLink } from 'lucide-react';
import { Project } from '@/lib/api';
import { GithubIcon } from './Icons';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:border-blue-500/50">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {project.title}
          </h3>
          {project.featured && (
            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              Featured
            </span>
          )}
        </div>

        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 line-clamp-3 leading-relaxed">
          {project.summary}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.techStack?.map((tech) => (
            <span
              key={tech}
              className="text-xs font-medium px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-800/80">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            <ExternalLink size={14} />
            <span>Live Demo</span>
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            <GithubIcon size={14} />
            <span>Source</span>
          </a>
        )}
      </div>
    </div>
  );
}
