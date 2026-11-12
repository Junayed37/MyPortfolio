import Link from 'next/link';
import { ArrowRight, Code, Database, Globe, Layers, Server, Sparkles } from 'lucide-react';
import { fetchProjects, fetchBlogs } from '@/lib/api';
import { ProjectCard } from '@/components/ProjectCard';
import { BlogCard } from '@/components/BlogCard';
import { ContactForm } from '@/components/ContactForm';

export const instant = false;

const techStack = [
  { name: 'Next.js', category: 'Frontend', icon: Globe },
  { name: 'React', category: 'Frontend', icon: Code },
  { name: 'NestJS', category: 'Backend', icon: Server },
  { name: 'Node.js', category: 'Runtime', icon: Layers },
  { name: 'Express', category: 'Backend', icon: Server },
  { name: 'PostgreSQL', category: 'Database', icon: Database },
  { name: 'Prisma ORM', category: 'ORM', icon: Database },
  { name: 'TypeScript', category: 'Language', icon: Code },
];

export default async function HomePage() {
  const [projects, blogs] = await Promise.all([
    fetchProjects(true),
    fetchBlogs(),
  ]);

  const featuredProjects = projects.length > 0 ? projects.slice(0, 3) : [
    {
      id: 'demo-1',
      title: 'Enterprise Cloud Microservices',
      slug: 'enterprise-cloud-microservices',
      summary: 'High-throughput event-driven microservice system built with NestJS, RabbitMQ, PostgreSQL and Next.js management portal.',
      description: 'Case study of a distributed microservice architecture handling 10,000+ RPS.',
      techStack: ['NestJS', 'PostgreSQL', 'Prisma', 'Next.js', 'Docker'],
      liveUrl: 'https://demo.app',
      githubUrl: 'https://github.com',
      featured: true,
      createdAt: '2026-01-01T00:00:00.000Z',
      updatedAt: '2026-01-01T00:00:00.000Z',
    },
    {
      id: 'demo-2',
      title: 'CMS-Driven Interactive Portfolio',
      slug: 'cms-portfolio',
      summary: 'Dynamic personal portfolio with custom NestJS REST API, Swagger docs, JWT admin dashboard, and Next.js frontend.',
      description: 'The exact architecture powering this website.',
      techStack: ['Next.js 15', 'React 19', 'NestJS', 'Prisma', 'PostgreSQL'],
      liveUrl: 'http://localhost:3000',
      githubUrl: 'https://github.com',
      featured: true,
      createdAt: '2026-01-01T00:00:00.000Z',
      updatedAt: '2026-01-01T00:00:00.000Z',
    },
  ];

  const recentBlogs = blogs.length > 0 ? blogs.slice(0, 2) : [
    {
      id: 'demo-blog-1',
      title: 'Building Clean Architectures with NestJS and Prisma',
      slug: 'clean-architecture-nestjs-prisma',
      excerpt: 'How to structure enterprise NestJS microservices and monolithic APIs with dependency injection, repository patterns, and Prisma.',
      content: 'Detailed article content...',
      tags: ['NestJS', 'Prisma', 'Backend'],
      published: true,
      createdAt: '2026-01-01T00:00:00.000Z',
      updatedAt: '2026-01-01T00:00:00.000Z',
    },
  ];

  return (
    <div className="space-y-24 py-12 md:py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 text-blue-600 dark:text-blue-400 text-xs font-semibold">
            <Sparkles size={14} />
            <span>Available for Full-Time Roles & High-Impact Projects</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 leading-[1.15]">
            Crafting scalable web systems with{' '}
            <span className="text-blue-600 dark:text-blue-500">modern full-stack</span> architecture.
          </h1>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
            I specialize in building production-ready web applications from frontend interactions with{' '}
            <strong>React & Next.js</strong> to robust, enterprise backends using{' '}
            <strong>NestJS, Express, Prisma, and PostgreSQL</strong>.
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
            <Link
              href="/projects"
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-sm transition flex items-center gap-2"
            >
              <span>Explore Projects</span>
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-xl border border-zinc-300 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 font-semibold text-sm text-zinc-800 dark:text-zinc-200 transition"
            >
              Get in Touch
            </Link>
          </div>
        </div>

        {/* Hero Code / Stats Card */}
        <div className="w-full md:w-80 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/40 backdrop-blur-md shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
            </div>
            <span className="text-xs font-mono text-zinc-400">backend/api</span>
          </div>
          <div className="space-y-2 text-xs font-mono text-zinc-600 dark:text-zinc-400">
            <p className="text-emerald-600 dark:text-emerald-400">✔ NestJS REST API ready</p>
            <p className="text-emerald-600 dark:text-emerald-400">✔ Prisma ORM connected</p>
            <p className="text-emerald-600 dark:text-emerald-400">✔ JWT Authentication active</p>
            <p className="text-emerald-600 dark:text-emerald-400">✔ Swagger OpenAPI docs enabled</p>
          </div>
        </div>
      </section>

      {/* Tech Stack Grid */}
      <section className="space-y-8">
        <div className="text-center md:text-left space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Core Technology Stack
          </h2>
          <p className="text-sm text-zinc-500">
            Selected for high developer velocity, type-safety, and production scalability.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {techStack.map((tech) => {
            const Icon = tech.icon;
            return (
              <div
                key={tech.name}
                className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 flex items-center gap-3 transition hover:border-zinc-400 dark:hover:border-zinc-700"
              >
                <div className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                  <Icon size={18} />
                </div>
                <div>
                  <p className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">{tech.name}</p>
                  <p className="text-[11px] text-zinc-500">{tech.category}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Projects */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Featured Projects
            </h2>
            <p className="text-sm text-zinc-500">
              Case studies and production web applications.
            </p>
          </div>
          <Link
            href="/projects"
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* Recent Dev Notes */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Dev Notes & Insights
            </h2>
            <p className="text-sm text-zinc-500">
              Deep dives on architecture, engineering, and web development.
            </p>
          </div>
          <Link
            href="/blog"
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            <span>View All Notes</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recentBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="space-y-8 pt-4">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Let&apos;s Build Something Together
          </h2>
          <p className="text-sm text-zinc-500">
            Have an opportunity, project, or question? Send a direct message and I&apos;ll get back to you.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
