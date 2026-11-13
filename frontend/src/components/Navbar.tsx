import Link from "next/link";
import { portfolioData } from "@/data/portfolio";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="#" className="text-lg font-bold tracking-tight text-white">
          {portfolioData.personal.name.split(" ")[0]}
          <span className="text-emerald-400">.dev</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm text-slate-300">
          <a href="#skills" className="transition hover:text-emerald-400">
            Skills
          </a>
          <a href="#projects" className="transition hover:text-emerald-400">
            Projects
          </a>
          <a
            href="#contact"
            className="rounded-lg bg-emerald-500 px-4 py-2 font-medium text-slate-950 transition hover:bg-emerald-400"
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
