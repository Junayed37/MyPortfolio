'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  FolderPlus,
  Inbox,
  LogOut,
  Mail,
  Plus,
  Trash2,
  CheckCircle,
} from 'lucide-react';
import {
  ContactMessage,
  fetchContactMessages,
  markContactAsRead,
  deleteContactMessage,
  createProject,
  Project,
  fetchProjects,
} from '@/lib/api';
import { isAuthenticated, removeToken } from '@/lib/auth';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeTab, setActiveTab] = useState<'messages' | 'projects'>('messages');

  // New Project Form State
  const [projectForm, setProjectForm] = useState({
    title: '',
    slug: '',
    summary: '',
    description: '',
    techStack: 'Next.js, NestJS, PostgreSQL',
    liveUrl: '',
    githubUrl: '',
    featured: false,
  });

  const [formStatus, setFormStatus] = useState<string>('');

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/admin/login');
    } else {
      setAuthorized(true);
      loadData();
    }
  }, [router]);

  const loadData = async () => {
    const [msgs, projs] = await Promise.all([
      fetchContactMessages(),
      fetchProjects(),
    ]);
    setMessages(msgs);
    setProjects(projs);
  };

  const handleLogout = () => {
    removeToken();
    router.push('/admin/login');
  };

  const handleMarkRead = async (id: string) => {
    await markContactAsRead(id);
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isRead: true } : m)),
    );
  };

  const handleDeleteMsg = async (id: string) => {
    await deleteContactMessage(id);
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('Saving project...');
    try {
      const techArray = projectForm.techStack
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      await createProject({
        title: projectForm.title,
        slug: projectForm.slug,
        summary: projectForm.summary,
        description: projectForm.description,
        techStack: techArray,
        liveUrl: projectForm.liveUrl || undefined,
        githubUrl: projectForm.githubUrl || undefined,
        featured: projectForm.featured,
      });

      setFormStatus('Project created successfully!');
      setProjectForm({
        title: '',
        slug: '',
        summary: '',
        description: '',
        techStack: 'Next.js, NestJS, PostgreSQL',
        liveUrl: '',
        githubUrl: '',
        featured: false,
      });
      loadData();
    } catch {
      setFormStatus('Failed to create project.');
    }
  };

  if (!authorized) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-sm text-zinc-500">
        Checking authentication...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Dashboard Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Admin Dashboard
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Manage received inquiries, projects, and portfolio content.
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="self-start sm:self-auto flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-rose-600 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 hover:bg-rose-100 transition"
        >
          <LogOut size={14} />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('messages')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition ${
            activeTab === 'messages'
              ? 'bg-blue-600 text-white'
              : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
          }`}
        >
          <Inbox size={14} />
          <span>Inquiries ({messages.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('projects')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition ${
            activeTab === 'projects'
              ? 'bg-blue-600 text-white'
              : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
          }`}
        >
          <FolderPlus size={14} />
          <span>Projects ({projects.length})</span>
        </button>
      </div>

      {/* Tab: Inquiries */}
      {activeTab === 'messages' && (
        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="p-12 text-center rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40">
              <Mail size={32} className="mx-auto text-zinc-400 mb-2" />
              <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">No inquiries yet.</p>
              <p className="text-xs text-zinc-400 mt-1">Messages from your contact form will appear here.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-5 rounded-2xl border ${
                    msg.isRead
                      ? 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/30'
                      : 'border-blue-300 dark:border-blue-900 bg-blue-50/40 dark:bg-blue-950/20'
                  } space-y-3`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="font-bold text-sm text-zinc-900 dark:text-zinc-100">{msg.name}</span>
                      <span className="text-xs text-zinc-500 ml-2">({msg.email})</span>
                    </div>
                    <span className="text-xs text-zinc-400">
                      {new Date(msg.createdAt).toLocaleString()}
                    </span>
                  </div>

                  {msg.subject && (
                    <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                      Subject: {msg.subject}
                    </p>
                  )}

                  <p className="text-sm text-zinc-600 dark:text-zinc-400 whitespace-pre-wrap">
                    {msg.message}
                  </p>

                  <div className="flex items-center gap-3 pt-2">
                    {!msg.isRead && (
                      <button
                        onClick={() => handleMarkRead(msg.id)}
                        className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 font-medium hover:underline"
                      >
                        <CheckCircle size={13} />
                        <span>Mark as read</span>
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteMsg(msg.id)}
                      className="flex items-center gap-1 text-xs text-rose-600 font-medium hover:underline"
                    >
                      <Trash2 size={13} />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab: Projects */}
      {activeTab === 'projects' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* New Project Form */}
          <div className="lg:col-span-1 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <Plus size={16} />
              <span>Add New Project</span>
            </h2>

            {formStatus && (
              <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">{formStatus}</p>
            )}

            <form onSubmit={handleCreateProject} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  required
                  value={projectForm.title}
                  onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                  placeholder="e.g. Distributed Task Queue"
                  className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Slug
                </label>
                <input
                  type="text"
                  required
                  value={projectForm.slug}
                  onChange={(e) => setProjectForm({ ...projectForm, slug: e.target.value })}
                  placeholder="e.g. distributed-task-queue"
                  className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Summary
                </label>
                <input
                  type="text"
                  required
                  value={projectForm.summary}
                  onChange={(e) => setProjectForm({ ...projectForm, summary: e.target.value })}
                  placeholder="Short tagline or summary"
                  className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Description
                </label>
                <textarea
                  required
                  rows={3}
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  placeholder="Detailed case study..."
                  className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Tech Stack (comma separated)
                </label>
                <input
                  type="text"
                  value={projectForm.techStack}
                  onChange={(e) => setProjectForm({ ...projectForm, techStack: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Live URL
                </label>
                <input
                  type="url"
                  value={projectForm.liveUrl}
                  onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  GitHub URL
                </label>
                <input
                  type="url"
                  value={projectForm.githubUrl}
                  onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                  placeholder="https://github.com/..."
                  className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="featured"
                  checked={projectForm.featured}
                  onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })}
                  className="rounded text-blue-600"
                />
                <label htmlFor="featured" className="font-semibold text-zinc-700 dark:text-zinc-300">
                  Featured Project
                </label>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
              >
                Create Project
              </button>
            </form>
          </div>

          {/* Project List */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              Existing Projects ({projects.length})
            </h2>

            {projects.length === 0 ? (
              <p className="text-xs text-zinc-500">No custom projects added to database yet.</p>
            ) : (
              <div className="grid gap-3">
                {projects.map((p) => (
                  <div
                    key={p.id}
                    className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 flex items-center justify-between"
                  >
                    <div>
                      <p className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">{p.title}</p>
                      <p className="text-xs text-zinc-500">{p.slug}</p>
                    </div>
                    <span className="text-xs font-mono text-zinc-400">
                      {p.techStack.join(', ')}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
