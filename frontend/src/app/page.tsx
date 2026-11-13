import { FileText, Mail } from "lucide-react";
import { Github, Linkedin } from "@/components/icons";
import Navbar from "@/components/Navbar";
import ProjectCard from "@/components/ProjectCard";
import ContactForm from "@/components/ContactForm";
import { portfolioData } from "@/data/portfolio";

async function CurrentYear() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}

export default function Home() {
  const { personal, skills, projects } = portfolioData;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-emerald-500/30">
      <Navbar />

      <main className="mx-auto max-w-5xl px-6">
        {/* Hero Section */}
        <section className="py-24 sm:py-32">
          <p className="text-sm font-medium tracking-wider text-emerald-400 uppercase">
            Hi, I&apos;m {personal.name}
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-6xl">
            {personal.role}.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
            {personal.bio}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={personal.resumeUrl}
              target="_blank"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
            >
              <FileText className="h-4 w-4" />
              Resume
            </a>
            <a
              href={personal.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-4 py-3 text-sm font-medium text-slate-300 transition hover:border-slate-700 hover:text-white"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-4 py-3 text-sm font-medium text-slate-300 transition hover:border-slate-700 hover:text-white"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="border-t border-slate-800/80 py-20">
          <h2 className="text-2xl font-bold text-white">Tech Stack</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {Object.entries(skills).map(([category, items]) => (
              <div
                key={category}
                className="rounded-xl border border-slate-800 bg-slate-900/40 p-6"
              >
                <h3 className="text-sm font-semibold tracking-wider text-emerald-400 uppercase">
                  {category}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs text-slate-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="border-t border-slate-800/80 py-20">
          <h2 className="text-2xl font-bold text-white">Featured Projects</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="border-t border-slate-800/80 py-20">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-white">Get In Touch</h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-400">
                Have a project in mind or looking for a full-stack developer to
                join your team? Drop a message and I&apos;ll get back to you
                soon.
              </p>
              <div className="mt-6 flex items-center gap-3 text-sm text-slate-300">
                <Mail className="h-4 w-4 text-emerald-400" />
                <span>{personal.email}</span>
              </div>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-800/80 py-8 text-center text-xs text-slate-500">
        © <CurrentYear /> {personal.name}. Built with Next.js &
        NestJS.
      </footer>
    </div>
  );
}
