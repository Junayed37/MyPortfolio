export interface Project {
  title: string;
  description: string;
  tech: string[];
  githubUrl: string;
  liveUrl?: string;
}

export const portfolioData = {
  personal: {
    name: "Junayed Rashid",
    role: "Full-Stack Web Developer",
    bio: "I build fast, scalable, and user-centric web applications using modern JavaScript ecosystems—from React & Next.js on the frontend to Node.js, Express, and NestJS on the backend.",
    email: "junayedrashid.dev@gmail.com",
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    resumeUrl: "/resume.pdf", // public/resume.pdf ফাইলে আপনার সিভি রাখবেন
  },
  skills: {
    Frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML5/CSS3"],
    Backend: ["Node.js", "Express.js", "NestJS", "REST APIs", "Microservices"],
    Tools: [
      "Git & GitHub",
      "Docker",
      "Postman",
      "Linux / PowerShell",
      "Vercel",
    ],
  },
  projects: [
    {
      title: "E-Commerce API & Storefront",
      description:
        "A full-stack shopping platform featuring server-side rendering, cart state management, and modular REST API architecture.",
      tech: ["Next.js", "NestJS", "TypeScript", "Tailwind CSS"],
      githubUrl: "https://github.com/yourusername/ecommerce-app",
      liveUrl: "https://ecommerce-demo.vercel.app",
    },
    {
      title: "Real-Time Task Manager",
      description:
        "Collaborative task board with instant status updates, clean drag-and-drop UI, and role-based API validation.",
      tech: ["React", "Node.js", "Express", "WebSockets"],
      githubUrl: "https://github.com/yourusername/task-manager",
      liveUrl: "https://task-demo.vercel.app",
    },
    {
      title: "Developer Portfolio & Mailer",
      description:
        "Lightweight personal portfolio powered by Next.js App Router and a decoupled NestJS backend for handling contact inquiries.",
      tech: ["Next.js", "NestJS", "Express", "Nodemailer"],
      githubUrl: "https://github.com/yourusername/MyPortfolio",
    },
  ] as Project[],
};
