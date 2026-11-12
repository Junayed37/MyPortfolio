import { fetchBlogs } from '@/lib/api';
import { BlogCard } from '@/components/BlogCard';

export const instant = false;

export const metadata = {
  title: 'Dev Notes & Articles | Full-Stack Developer Portfolio',
  description: 'Articles and notes on system architecture, web performance, and engineering practices.',
};

export default async function BlogPage() {
  const blogs = await fetchBlogs();

  const fallbackBlogs = [
    {
      id: 'blog-1',
      title: 'Building Clean Architectures with NestJS and Prisma',
      slug: 'clean-architecture-nestjs-prisma',
      excerpt: 'How to structure enterprise NestJS microservices and monolithic APIs with dependency injection, repository patterns, and Prisma.',
      content: 'Detailed article content...',
      tags: ['NestJS', 'Prisma', 'Backend'],
      published: true,
      createdAt: '2026-01-01T00:00:00.000Z',
      updatedAt: '2026-01-01T00:00:00.000Z',
    },
    {
      id: 'blog-2',
      title: 'Next.js App Router: Full-Stack SSR & Performance Optimization',
      slug: 'nextjs-app-router-performance',
      excerpt: 'Insights into server components, streaming SSR, and edge rendering with Next.js and React 19.',
      content: 'Detailed article content...',
      tags: ['Next.js', 'React', 'Frontend'],
      published: true,
      createdAt: '2026-01-01T00:00:00.000Z',
      updatedAt: '2026-01-01T00:00:00.000Z',
    },
    {
      id: 'blog-3',
      title: 'Designing Resilient REST APIs with OpenAPI / Swagger',
      slug: 'resilient-rest-apis-swagger',
      excerpt: 'Why contract-first API design and automated OpenAPI documentation elevate team productivity and system maintainability.',
      content: 'Detailed article content...',
      tags: ['API Design', 'Swagger', 'Architecture'],
      published: true,
      createdAt: '2026-01-01T00:00:00.000Z',
      updatedAt: '2026-01-01T00:00:00.000Z',
    },
  ];

  const displayBlogs = blogs.length > 0 ? blogs : fallbackBlogs;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-12">
      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
          Dev Notes & Technical Articles
        </h1>
        <p className="text-base text-zinc-600 dark:text-zinc-400 max-w-2xl">
          Thoughts on scalable software design, web architecture, and full-stack engineering challenges.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayBlogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
}
