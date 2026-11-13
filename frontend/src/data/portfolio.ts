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
    github: "https://github.com/Junayed37",
    linkedin: "https://www.linkedin.com/in/junayed-rashid-7a8373330/",
    resumeUrl: "/resume.pdf", // public/resume.pdf ফাইলে আপনার সিভি রাখবেন
  },
  skills: {
    Frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML5/CSS3"],
    Backend: ["Node.js", "Express.js", "NestJS", "REST APIs", "Microservices"],
    Tools: ["Git & GitHub", "Docker", "Postman", "Vercel"],
  },
  projects: [
    {
      title: "Wingman Portfolio",
      description: "A full-stack portfolio website.",
      tech: ["Next.js", "NestJS", "TypeScript", "Tailwind CSS"],
      githubUrl: "https://github.com/Junayed37/Wingman_Portfolio.git",
      liveUrl: "https://wingman-portfolio.vercel.app",
    },
  ] as Project[],
};
