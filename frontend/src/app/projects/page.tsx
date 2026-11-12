import { fetchProjects } from '@/lib/api';
import { ProjectCard } from '@/components/ProjectCard';

export const instant = false;

export const metadata = {
  title: 'Projects | Full-Stack Developer Portfolio',
  description: 'Showcase of full-stack projects, production web apps, and system architectures.',
};

export default async function ProjectsPage() {
  const projects = await fetchProjects();

  const fallbackProjects = [
    {
      id: 'proj-1',
      title: 'Enterprise Cloud Microservices',
      slug: 'enterprise-cloud-microservices',
      summary: 'High-throughput event-driven microservice system built with NestJS, RabbitMQ, PostgreSQL and Next.js management portal.',
      description: 'Case study of a distributed microservice architecture handling 10,000+ RPS.',
      techStack: ['NestJS', 'PostgreSQL', 'Prisma', 'Next.js', 'Docker', 'Redis'],
      liveUrl: 'https://demo.app',
      githubUrl: 'https://github.com',
      featured: true,
      createdAt: '2026-01-01T00:00:00.000Z',
      updatedAt: '2026-01-01T00:00:00.000Z',
    },
    {
      id: 'proj-2',
      title: 'CMS-Driven Interactive Portfolio',
      slug: 'cms-portfolio',
      summary: 'Dynamic personal portfolio with custom NestJS REST API, Swagger docs, JWT admin dashboard, and Next.js frontend.',
      description: 'The exact architecture powering this website.',
      techStack: ['Next.js 15', 'React 19', 'NestJS', 'Prisma', 'PostgreSQL', 'Tailwind CSS'],
      liveUrl: 'http://localhost:3000',
      githubUrl: 'https://github.com',
      featured: true,
      createdAt: '2026-01-01T00:00:00.000Z',
      updatedAt: '2026-01-01T00:00:00.000Z',
    },
    {
      id: 'proj-3',
      title: 'E-Commerce Headless Storefront',
      slug: 'headless-ecommerce',
      summary: 'High performance headless shopping experience with real-time stock sync, Stripe payments, and admin analytics.',
      description: 'Modern storefront built for high conversions and sub-second page loads.',
      techStack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe'],
      liveUrl: 'https://storefront.demo',
      githubUrl: 'https://github.com',
      featured: false,
      createdAt: '2026-01-01T00:00:00.000Z',
      updatedAt: '2026-01-01T00:00:00.000Z',
    },
  ];

  const displayProjects = projects.length > 0 ? projects : fallbackProjects;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-12">
      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
          Projects & Case Studies
        </h1>
        <p className="text-base text-zinc-600 dark:text-zinc-400 max-w-2xl">
          A collection of full-stack applications, distributed services, and open-source contributions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
