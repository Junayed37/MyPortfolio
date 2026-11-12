import { ContactForm } from '@/components/ContactForm';
import { Mail, MapPin, MessageSquare } from 'lucide-react';

export const metadata = {
  title: 'Contact | Full-Stack Developer Portfolio',
  description: 'Get in touch for new projects, engineering roles, and technical consultations.',
};

export default function ContactPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-12">
      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
          Get in Touch
        </h1>
        <p className="text-base text-zinc-600 dark:text-zinc-400 max-w-2xl">
          Interested in working together or discussing full-stack software development? Fill out the form or reach out directly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="space-y-8 lg:col-span-1">
          <div className="flex items-start gap-4 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50">
            <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
              <Mail size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">Direct Email</h3>
              <p className="text-xs text-zinc-500 mt-0.5">contact@portfolio.dev</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50">
            <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400">
              <MapPin size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">Location</h3>
              <p className="text-xs text-zinc-500 mt-0.5">Remote / Worldwide</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50">
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
              <MessageSquare size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">Availability</h3>
              <p className="text-xs text-zinc-500 mt-0.5">Open for Full-Time Roles & Consulting</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
