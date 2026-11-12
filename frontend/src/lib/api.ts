import axios from 'axios';
import { getToken } from './auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface Project {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

// Projects API
export async function fetchProjects(featured?: boolean): Promise<Project[]> {
  try {
    const res = await apiClient.get('/projects', {
      params: featured !== undefined ? { featured } : {},
    });
    return res.data;
  } catch {
    return [];
  }
}

export async function fetchProjectBySlug(slugOrId: string): Promise<Project | null> {
  try {
    const res = await apiClient.get(`/projects/${slugOrId}`);
    return res.data;
  } catch {
    return null;
  }
}

export async function createProject(data: Partial<Project>): Promise<Project> {
  const res = await apiClient.post('/projects', data);
  return res.data;
}

export async function updateProject(id: string, data: Partial<Project>): Promise<Project> {
  const res = await apiClient.patch(`/projects/${id}`, data);
  return res.data;
}

export async function deleteProject(id: string): Promise<void> {
  await apiClient.delete(`/projects/${id}`);
}

// Blogs API
export async function fetchBlogs(includeUnpublished = false): Promise<Blog[]> {
  try {
    const res = await apiClient.get('/blogs', {
      params: includeUnpublished ? { all: 'true' } : {},
    });
    return res.data;
  } catch {
    return [];
  }
}

export async function fetchBlogBySlug(slugOrId: string): Promise<Blog | null> {
  try {
    const res = await apiClient.get(`/blogs/${slugOrId}`);
    return res.data;
  } catch {
    return null;
  }
}

export async function createBlog(data: Partial<Blog>): Promise<Blog> {
  const res = await apiClient.post('/blogs', data);
  return res.data;
}

export async function updateBlog(id: string, data: Partial<Blog>): Promise<Blog> {
  const res = await apiClient.patch(`/blogs/${id}`, data);
  return res.data;
}

export async function deleteBlog(id: string): Promise<void> {
  await apiClient.delete(`/blogs/${id}`);
}

// Contact API
export async function submitContact(data: { name: string; email: string; subject?: string; message: string }) {
  const res = await apiClient.post('/contact', data);
  return res.data;
}

export async function fetchContactMessages(): Promise<ContactMessage[]> {
  try {
    const res = await apiClient.get('/contact');
    return res.data;
  } catch {
    return [];
  }
}

export async function markContactAsRead(id: string): Promise<void> {
  await apiClient.patch(`/contact/${id}/read`);
}

export async function deleteContactMessage(id: string): Promise<void> {
  await apiClient.delete(`/contact/${id}`);
}

// Auth API
export async function adminLogin(credentials: { email: string; password: string }): Promise<{ access_token: string }> {
  const res = await apiClient.post('/auth/login', credentials);
  return res.data;
}
