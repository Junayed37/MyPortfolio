'use client';

import Link from 'next/link';
import { Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from './Icons';

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Full-Stack Developer</h3>
            <p className="text-xs text-zinc-500">
              Built with Next.js (App Router), React, NestJS, Prisma & PostgreSQL
            </p>
          </div>

          <div className="flex items-center gap-4 text-zinc-600 dark:text-zinc-400">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition"
              aria-label="GitHub"
            >
              <GithubIcon size={18} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition"
              aria-label="LinkedIn"
            >
              <LinkedinIcon size={18} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition"
              aria-label="Twitter"
            >
              <TwitterIcon size={18} />
            </a>
            <Link
              href="/contact"
              className="p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition"
              aria-label="Email"
            >
              <Mail size={18} />
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-zinc-200/60 dark:border-zinc-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500">
          <p>© 2026 All rights reserved.</p>
          <div className="flex gap-4 mt-2 sm:mt-0">
            <Link href="/" className="hover:underline">Home</Link>
            <Link href="/projects" className="hover:underline">Projects</Link>
            <Link href="/blog" className="hover:underline">Dev Notes</Link>
            <Link href="/admin" className="hover:underline">Admin CMS</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
