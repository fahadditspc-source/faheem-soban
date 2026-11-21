export interface Project {
  title: string;
  category: string;
  description: string;
  tags: string[];
  demoUrl: string;
  githubUrl: string;
  gradient: string;
  accentBadge: string;
  stats?: string;
  featured?: boolean;
}

export interface SkillCategory {
  category: string;
  icon: string;
  accentColor: string;
  badgeBg: string;
  gradient: string;
  items: string[];
}

export interface StatItem {
  label: string;
  value: string;
  accent: string;
}

export interface Principle {
  title: string;
  description: string;
  icon: string;
  gradient: string;
}

export interface PersonalInfo {
  name: string;
  role: string;
  location: string;
  headline: string;
  bio: string;
  email: string;
  stats: StatItem[];
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
  headline: "Building high-performance digital experiences with bold design & crisp code.",
  bio: "I craft responsive web applications, modern APIs, and accessible user interfaces. Driven by vibrant aesthetics, performance, and clean architecture.",
  email: "faheemsoban@example.com",
  stats: [
    { label: "Years Experience", value: "4+", accent: "from-blue-500 to-cyan-500" },
    { label: "Projects Shipped", value: "20+", accent: "from-purple-500 to-pink-500" },
    { label: "Core Tech Stack", value: "12+", accent: "from-amber-500 to-orange-500" },
    { label: "Code Quality", value: "100%", accent: "from-emerald-500 to-teal-500" },
  ],
  socials: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://x.com",
  },
};

export const projects: Project[] = [
  {
    title: "PulseAnalytics",
    category: "Full-Stack & Data",
    description: "A real-time analytics dashboard with privacy-focused visitor tracking, instant metric breakdowns, and zero bloat.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Chart.js"],
    demoUrl: "https://example.com/demo1",
    githubUrl: "https://github.com/example/pulse-analytics",
    gradient: "from-cyan-500 via-teal-500 to-blue-600",
    accentBadge: "text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/40 border-cyan-200 dark:border-cyan-800",
    stats: "10k+ Events/sec",
    featured: true,
  },
  {
    title: "TaskFlow Workspace",
    category: "Productivity & SaaS",
    description: "Minimalist collaborative task management platform featuring offline sync, keyboard shortcuts, and markdown support.",
    tags: ["TypeScript", "Next.js", "Tailwind CSS", "Prisma"],
    demoUrl: "https://example.com/demo2",
    githubUrl: "https://github.com/example/taskflow",
    gradient: "from-purple-500 via-indigo-500 to-violet-600",
    accentBadge: "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800",
    stats: "Offline-Ready",
    featured: true,
  },
  {
    title: "SyntaxCraft UI",
    category: "Design System",
    description: "An ultra-lightweight component library and design system documentation built for lightning-fast web experiences.",
    tags: ["React", "Tailwind CSS", "Vite", "Storybook"],
    demoUrl: "https://example.com/demo3",
    githubUrl: "https://github.com/example/syntaxcraft-ui",
    gradient: "from-amber-500 via-orange-500 to-rose-600",
    accentBadge: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800",
    stats: "35+ Components",
    featured: true,
  },
  {
    title: "CloudPulse API Engine",
    category: "Backend & Cloud",
    description: "High-throughput microservices gateway featuring rate limiting, JWT authentication, and distributed Redis caching.",
    tags: ["Node.js", "Express", "Redis", "Docker", "PostgreSQL"],
    demoUrl: "https://example.com/demo4",
    githubUrl: "https://github.com/example/cloudpulse-api",
    gradient: "from-emerald-500 via-green-500 to-teal-600",
    accentBadge: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800",
    stats: "<12ms Latency",
    featured: false,
  },
];

export const principles: Principle[] = [
  {
    title: "Speed & Performance",
    description: "Zero bloat, lightning fast loads, responsive asset optimization, and smooth 60fps animations.",
    icon: "bolt",
    gradient: "from-amber-400 to-orange-500",
  },
  {
    title: "Vibrant & Human UI",
    description: "Harmonious color schemes, accessible contrast, delightful micro-interactions, and visual hierarchy.",
    icon: "sparkles",
    gradient: "from-pink-500 to-purple-600",
  },
  {
    title: "Clean Architecture",
    description: "Strict TypeScript types, modular component structures, and maintainable production patterns.",
    icon: "cube",
    gradient: "from-blue-500 to-indigo-600",
  },
];

export const aboutParagraph =
  "I'm a full-stack developer with a passion for bold visual design and software ergonomics. Over the past 4+ years, I've designed and shipped scalable web platforms, interactive tools, and design systems. I believe modern software should be both technically bulletproof and visually captivating—delivering fast, intuitive, and memorable digital experiences.";

export const skillCategories: SkillCategory[] = [
  {
    category: "Frontend & UI",
    icon: "layout",
    accentColor: "text-blue-500",
    badgeBg: "bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400",
    gradient: "from-blue-500 via-indigo-500 to-cyan-500",
    items: ["React 18", "TypeScript", "Next.js", "Tailwind CSS", "HTML5 / CSS3", "Vite", "Responsive Design"],
  },
  {
    category: "Backend & Systems",
    icon: "database",
    accentColor: "text-emerald-500",
    badgeBg: "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400",
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    items: ["Node.js", "Express.js", "RESTful APIs", "PostgreSQL", "Prisma ORM", "Redis", "JWT Auth"],
  },
  {
    category: "UI/UX & Creative",
    icon: "palette",
    accentColor: "text-fuchsia-500",
    badgeBg: "bg-fuchsia-500/10 border-fuchsia-500/20 text-fuchsia-600 dark:text-fuchsia-400",
    gradient: "from-fuchsia-500 via-pink-500 to-rose-500",
    items: ["Design Systems", "Figma", "Micro-Interactions", "Color Theory", "Typography", "Accessibility (WCAG)"],
  },
  {
    category: "DevOps & Tooling",
    icon: "terminal",
    accentColor: "text-amber-500",
    badgeBg: "bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400",
    gradient: "from-amber-500 via-orange-500 to-red-500",
    items: ["Git / GitHub", "GitHub Actions CI/CD", "Docker Basics", "Vercel / Netlify", "Performance Tuning"],
  },
];
