export interface Project {
  title: string;
  description: string;
  tags: string[];
  demoUrl: string;
  githubUrl: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface PersonalInfo {
  name: string;
  role: string;
  location: string;
  headline: string;
  bio: string;
  email: string;
  socials: {
    github: string;
    linkedin: string;
    twitter?: string;
  };
}

// =============================================================================
// PERSONAL PORTFOLIO DATA
// Easily edit your profile details, projects, and skills below.
// =============================================================================

export const personalInfo: PersonalInfo = {
  name: "Faheem Soban",
  role: "Full-Stack Developer & UI Designer",
  location: "Srinagar / Bengaluru, India",
  headline: "Building fast, purposeful digital products with crisp code and human-centered design.",
  bio: "I craft responsive web applications, modern APIs, and accessible user interfaces. Driven by simplicity, performance, and clean architecture.",
  email: "faheemsoban@example.com",
  socials: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://x.com",
  },
};

export const projects: Project[] = [
  {
    title: "PulseAnalytics",
    description: "A real-time analytics dashboard with privacy-focused visitor tracking, instant metric breakdowns, and zero bloat.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Chart.js"],
    demoUrl: "https://example.com/demo1",
    githubUrl: "https://github.com/example/pulse-analytics",
  },
  {
    title: "TaskFlow Workspace",
    description: "Minimalist collaborative task management platform featuring offline sync, keyboard shortcuts, and markdown support.",
    tags: ["TypeScript", "Next.js", "Tailwind CSS", "Prisma"],
    demoUrl: "https://example.com/demo2",
    githubUrl: "https://github.com/example/taskflow",
  },
  {
    title: "SyntaxCraft UI",
    description: "An ultra-lightweight component library and design system documentation built for lightning-fast web experiences.",
    tags: ["React", "Tailwind CSS", "Vite", "Storybook"],
    demoUrl: "https://example.com/demo3",
    githubUrl: "https://github.com/example/syntaxcraft-ui",
  },
];

export const aboutParagraph =
  "I'm a full-stack developer with a strong eye for visual design and software ergonomics. Over the past 4+ years, I've designed and shipped scalable web platforms, interactive tools, and design systems. I believe the best software is fast, intuitive, and unobtrusive—built with rock-solid foundations and zero unnecessary dependencies.";

export const skillCategories: SkillCategory[] = [
  {
    category: "Frontend",
    items: ["React", "TypeScript", "JavaScript (ESNext)", "HTML5 / CSS3", "Tailwind CSS", "Vite"],
  },
  {
    category: "Backend & Database",
    items: ["Node.js", "Express", "RESTful APIs", "PostgreSQL", "SQLite", "Prisma ORM"],
  },
  {
    category: "UI / UX Design",
    items: ["Design Systems", "Wireframing", "Figma", "Typography", "Responsive Layouts", "Accessibility (a11y)"],
  },
  {
    category: "Tools & Practices",
    items: ["Git & GitHub", "Clean Architecture", "CI/CD Basics", "Performance Tuning", "Vercel / Netlify"],
  },
];
