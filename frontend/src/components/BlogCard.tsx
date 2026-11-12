import Link from 'next/link';
import { Calendar, Tag } from 'lucide-react';
import { Blog } from '@/lib/api';

interface BlogCardProps {
  blog: Blog;
}

export function BlogCard({ blog }: BlogCardProps) {
  const formattedDate = new Date(blog.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <article className="group rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:border-zinc-400 dark:hover:border-zinc-700">
      <div>
        <div className="flex items-center gap-2 text-xs text-zinc-500 mb-2">
          <Calendar size={13} />
          <span>{formattedDate}</span>
        </div>

        <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
          {blog.title}
        </h3>

        <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3 leading-relaxed mb-4">
          {blog.excerpt}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-1.5 pt-4 border-t border-zinc-100 dark:border-zinc-800/80">
        <Tag size={12} className="text-zinc-400 mr-1" />
        {blog.tags?.map((tag) => (
          <span
            key={tag}
            className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
          >
            #{tag}
          </span>
        ))}
      </div>
    </article>
  );
}
