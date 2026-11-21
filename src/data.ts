export interface Project {
  title: string;
  category: string;
  description: string;
  tags: string[];
  demoUrl: string;
  githubUrl: string;
  gradient: string;
  accentBadge: string;
  stats: string;
  metrics: string[];
  previewType: 'chart' | 'kanban' | 'component' | 'terminal';
  featured: boolean;
}

export interface SkillCategory {
  category: string;
  icon: string;
  accentColor: string;
  badgeBg: string;
  gradient: string;
  items: { name: string; proficiency: number }[];
}

export interface StatItem {
  label: string;
  value: string;
  accent: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  badge: string;
  badgeColor: string;
  description: string;
  achievements: string[];
  skills: string[];
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  initials: string;
  gradient: string;
}

export interface Principle {
  title: string;
  tagline: string;
  description: string;
  icon: string;
  gradient: string;
}

export interface PersonalInfo {
  name: string;
  role: string;
  location: string;
  timeZone: string;
  availability: string;
  responseTime: string;
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
// PROFESSIONAL PORTFOLIO DATA
// =============================================================================

export const personalInfo: PersonalInfo = {
  name: "Faheem Soban",
  role: "Senior Full-Stack Engineer & UI Architect",
  location: "Srinagar & Bengaluru, India",
  timeZone: "IST (UTC+5:30)",
  availability: "Available for select Q4 contracts & senior roles",
  responseTime: "Typically replies in < 2 hours",
  headline: "Architecting high-throughput full-stack platforms with luminous, world-class UI.",
  bio: "Specializing in React, TypeScript, Next.js, and resilient Node.js backends. Over 4+ years of translating complex business requirements into sleek, sub-second web applications with obsession over speed, accessibility, and pixel-level ergonomics.",
  email: "faheemsoban@example.com",
  stats: [
    { label: "Years Experience", value: "4+", accent: "from-blue-500 via-indigo-500 to-cyan-400" },
    { label: "Production Apps", value: "20+", accent: "from-purple-500 via-pink-500 to-rose-400" },
    { label: "P99 Core Latency", value: "<45ms", accent: "from-amber-400 via-orange-500 to-rose-500" },
    { label: "Code Coverage / a11y", value: "100%", accent: "from-emerald-400 via-teal-500 to-cyan-500" },
  ],
  socials: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://x.com",
  },
};

export const projects: Project[] = [
  {
    title: "PulseAnalytics Enterprise",
    category: "Full-Stack & Telemetry",
    description: "Real-time telemetry and privacy-preserving visitor analytics suite with distributed ingest pipelines, custom query builders, and zero third-party cookies.",
    tags: ["React 18", "TypeScript", "Tailwind CSS", "Chart.js", "Redis"],
    demoUrl: "https://example.com/demo1",
    githubUrl: "https://github.com/example/pulse-analytics",
    gradient: "from-cyan-500 via-teal-500 to-blue-600",
    accentBadge: "text-cyan-700 dark:text-cyan-300 bg-cyan-500/10 border-cyan-500/20",
    stats: "10k+ Events/sec",
    metrics: ["< 42ms Query P99", "99.99% Uptime", "Zero-Cookie"],
    previewType: "chart",
    featured: true,
  },
  {
    title: "TaskFlow Collaborative Workspace",
    category: "Productivity & SaaS",
    description: "High-cadence task orchestrator featuring optimistic offline updates, live multi-cursor presence, bidirectional markdown notes, and instant keyboard shortcuts.",
    tags: ["TypeScript", "Next.js", "Tailwind CSS", "Prisma", "WebSockets"],
    demoUrl: "https://example.com/demo2",
    githubUrl: "https://github.com/example/taskflow",
    gradient: "from-purple-500 via-indigo-500 to-violet-600",
    accentBadge: "text-purple-700 dark:text-purple-300 bg-purple-500/10 border-purple-500/20",
    stats: "Live Presence",
    metrics: ["Optimistic UI", "End-to-End Encryption", "Offline Cache"],
    previewType: "kanban",
    featured: true,
  },
  {
    title: "SyntaxCraft Design System",
    category: "Design System & UI",
    description: "A battle-tested component framework and visual token specification engineered for accessible, high-speed enterprise application frontends.",
    tags: ["React", "Tailwind CSS", "Vite", "Storybook", "TypeScript"],
    demoUrl: "https://example.com/demo3",
    githubUrl: "https://github.com/example/syntaxcraft-ui",
    gradient: "from-amber-500 via-orange-500 to-rose-600",
    accentBadge: "text-amber-700 dark:text-amber-300 bg-amber-500/10 border-amber-500/20",
    stats: "40+ Components",
    metrics: ["WCAG 2.1 AA Compliant", "< 11kB Gzipped", "Theme Engine"],
    previewType: "component",
    featured: true,
  },
  {
    title: "CloudPulse High-Throughput Gateway",
    category: "Distributed Cloud Systems",
    description: "Fault-tolerant microservices API routing layer providing distributed Redis rate limiting, asymmetric token auth, and real-time health diagnostics.",
    tags: ["Node.js", "Express", "Redis", "Docker", "PostgreSQL"],
    demoUrl: "https://example.com/demo4",
    githubUrl: "https://github.com/example/cloudpulse-api",
    gradient: "from-emerald-500 via-green-500 to-teal-600",
    accentBadge: "text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 border-emerald-500/20",
    stats: "< 12ms Latency",
    metrics: ["Automated Failover", "Structured Logging", "Dockerized"],
    previewType: "terminal",
    featured: false,
  },
];

export const experienceTimeline: ExperienceItem[] = [
  {
    role: "Senior Full-Stack Engineer & UI Architect",
    company: "Synthetix Labs",
    period: "2024 — Present",
    badge: "Current Position",
    badgeColor: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30",
    description: "Lead the architectural design and implementation of customer-facing telemetry dashboards and mission-critical cloud management interfaces.",
    achievements: [
      "Boosted Lighthouse Performance & Core Web Vitals across all platforms from 74 to 99/100.",
      "Engineered an automated micro-frontend deployment pipeline reducing sprint delivery times by 40%.",
      "Standardized corporate UI component library across 4 cross-functional development teams."
    ],
    skills: ["React 18", "TypeScript", "Next.js", "Redis", "Tailwind CSS", "Docker"],
  },
  {
    role: "Frontend Engineering Specialist",
    company: "Vanguard Digital Systems",
    period: "2022 — 2024",
    badge: "2 Years",
    badgeColor: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/30",
    description: "Spearheaded frontend development for real-time fintech analytics tools and collaborative workflow apps.",
    achievements: [
      "Integrated live WebSocket streaming supporting 25,000 simultaneous client sockets with zero dropped frames.",
      "Architected automated end-to-end testing with Playwright, decreasing production regression defects by 65%.",
      "Mentored junior and mid-level engineers on modern TypeScript patterns and accessibility standards."
    ],
    skills: ["TypeScript", "React", "REST APIs", "Playwright", "Storybook", "Figma"],
  },
  {
    role: "UI / Web Application Developer",
    company: "Apex Core Technologies",
    period: "2021 — 2022",
    badge: "1.5 Years",
    badgeColor: "bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/30",
    description: "Developed and maintained interactive client-facing web applications, responsive component suites, and REST APIs.",
    achievements: [
      "Shipped 14 high-converting enterprise landing pages and web apps with fluid custom animations.",
      "Optimized legacy database queries and client asset bundling, slashing initial load times by 55%."
    ],
    skills: ["JavaScript (ES6+)", "Node.js", "React", "PostgreSQL", "CSS3 / Sass"],
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "David Mitchell",
    role: "Founder & CTO",
    company: "PulseMetrics Inc.",
    quote: "Faheem is that rare breed of engineer who doesn't just write rock-solid, type-safe code—he genuinely understands product design. He elevated our user experience from functional to world-class.",
    initials: "DM",
    gradient: "from-blue-600 to-cyan-500",
  },
  {
    name: "Sarah Lin",
    role: "VP of Product",
    company: "FlowState Collaborative",
    quote: "Working with Faheem was an absolute breeze. He delivered our real-time workspace ahead of schedule, with blazing speed and meticulous attention to accessibility and micro-interactions.",
    initials: "SL",
    gradient: "from-purple-600 to-pink-500",
  },
  {
    name: "Mark Henderson",
    role: "Director of Engineering",
    company: "NovaSys Global",
    quote: "Exceptional technical ownership and architectural clarity. His component design system and clean API architecture doubled our developer velocity in the very first quarter.",
    initials: "MH",
    gradient: "from-amber-500 to-rose-600",
  },
];

export const principles: Principle[] = [
  {
    title: "Sub-Second Latency",
    tagline: "Performance as a Feature",
    description: "Optimized bundle splitting, efficient tree-shaking, lightweight asset loading, and 60fps interaction budgets.",
    icon: "bolt",
    gradient: "from-amber-400 via-orange-500 to-rose-500",
  },
  {
    title: "Luminous & Purposeful UI",
    tagline: "Ergonomics & Vibrancy",
    description: "Harmonious color schemes, accessible WCAG 2.1 contrast, fluid micro-animations, and intuitive spatial hierarchy.",
    icon: "sparkles",
    gradient: "from-purple-500 via-pink-500 to-rose-500",
  },
  {
    title: "Bulletproof Architecture",
    tagline: "Type-Safety & Resilience",
    description: "Strict TypeScript discipline, modular domain-driven structures, idempotent APIs, and deterministic state flows.",
    icon: "cube",
    gradient: "from-blue-500 via-indigo-600 to-cyan-500",
  },
];

export const skillCategories: SkillCategory[] = [
  {
    category: "Frontend & UI Architecture",
    icon: "layout",
    accentColor: "text-blue-500",
    badgeBg: "bg-blue-500/10 border-blue-500/20 text-blue-700 dark:text-blue-400",
    gradient: "from-blue-500 via-indigo-500 to-cyan-400",
    items: [
      { name: "React 18 & 19", proficiency: 98 },
      { name: "TypeScript", proficiency: 96 },
      { name: "Next.js (App Router)", proficiency: 92 },
      { name: "Tailwind CSS v3/v4", proficiency: 98 },
      { name: "State Management (Zustand/Redux)", proficiency: 90 },
      { name: "Vite & Tooling", proficiency: 95 },
    ],
  },
  {
    category: "Backend & Distributed Systems",
    icon: "database",
    accentColor: "text-emerald-500",
    badgeBg: "bg-emerald-500/10 border-emerald-500/20 text-emerald-700 dark:text-emerald-400",
    gradient: "from-emerald-500 via-teal-500 to-cyan-400",
    items: [
      { name: "Node.js & Express", proficiency: 94 },
      { name: "PostgreSQL & Prisma", proficiency: 90 },
      { name: "RESTful & GraphQL APIs", proficiency: 92 },
      { name: "Redis In-Memory Caching", proficiency: 88 },
      { name: "Authentication (OAuth/JWT)", proficiency: 94 },
      { name: "Docker Containerization", proficiency: 85 },
    ],
  },
  {
    category: "Design Systems & Visual Craft",
    icon: "palette",
    accentColor: "text-fuchsia-500",
    badgeBg: "bg-fuchsia-500/10 border-fuchsia-500/20 text-fuchsia-700 dark:text-fuchsia-400",
    gradient: "from-fuchsia-500 via-pink-500 to-rose-400",
    items: [
      { name: "Figma & Token Systems", proficiency: 92 },
      { name: "Micro-Interactions & CSS", proficiency: 96 },
      { name: "Accessibility (a11y / WCAG)", proficiency: 95 },
      { name: "Responsive Typography", proficiency: 94 },
      { name: "Design System Architecture", proficiency: 93 },
    ],
  },
  {
    category: "Quality, DevOps & Workflows",
    icon: "terminal",
    accentColor: "text-amber-500",
    badgeBg: "bg-amber-500/10 border-amber-500/20 text-amber-700 dark:text-amber-400",
    gradient: "from-amber-400 via-orange-500 to-red-500",
    items: [
      { name: "Git & Advanced Workflows", proficiency: 95 },
      { name: "GitHub Actions CI/CD", proficiency: 92 },
      { name: "Performance Optimization", proficiency: 96 },
      { name: "Clean Architecture & Testing", proficiency: 90 },
      { name: "Vercel / Cloudflare Deployment", proficiency: 94 },
    ],
  },
];
