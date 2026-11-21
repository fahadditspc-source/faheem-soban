import React, { useState, useEffect } from 'react'
import {
  personalInfo,
  projects,
  experienceTimeline,
  testimonials,
  principles,
  skillCategories,
  Project
} from './data'

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio-theme')
      if (saved) return saved === 'dark'
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return false
  })

  const [copied, setCopied] = useState(false)
  const [activeFilter, setActiveFilter] = useState<string>('All')
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [formSubmitted, setFormSubmitted] = useState(false)

  // Interactive micro-preview state for TaskFlow demo
  const [taskChecked, setTaskChecked] = useState<{ [key: string]: boolean }>({
    't1': true,
    't2': false,
    't3': true
  })

  // Interactive micro-preview state for SyntaxCraft demo
  const [demoVariant, setDemoVariant] = useState<'solid' | 'gradient' | 'outline'>('gradient')

  // Sync dark mode class with HTML document
  useEffect(() => {
    const root = document.documentElement
    if (darkMode) {
      root.classList.add('dark')
      localStorage.setItem('portfolio-theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('portfolio-theme', 'light')
    }
  }, [darkMode])

  const toggleTheme = () => setDarkMode(prev => !prev)

  const handleCopyEmail = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(personalInfo.email)
      } else {
        const textArea = document.createElement('textarea')
        textArea.value = personalInfo.email
        textArea.style.position = 'fixed'
        textArea.style.left = '-999999px'
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        document.execCommand('copy')
        textArea.remove()
      }
      setCopied(true)
      setTimeout(() => setCopied(false), 2400)
    } catch (err) {
      console.error('Failed to copy email:', err)
    }
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return

    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`)
    const body = encodeURIComponent(
      `Hi ${personalInfo.name},\n\n${formData.message}\n\nBest regards,\n${formData.name} (${formData.email})`
    )
    window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`

    setFormSubmitted(true)
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' })
      setFormSubmitted(false)
    }, 4500)
  }

  const filterCategories = ['All', 'Full-Stack', 'Productivity', 'Design System', 'Distributed Cloud']
  const filteredProjects = projects.filter((project: Project) => {
    if (activeFilter === 'All') return true
    return project.category.toLowerCase().includes(activeFilter.toLowerCase())
  })

  const getTagBadgeStyle = (tag: string) => {
    const lower = tag.toLowerCase()
    if (lower.includes('react') || lower.includes('vite')) {
      return 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border-cyan-500/20'
    }
    if (lower.includes('typescript') || lower.includes('docker')) {
      return 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20'
    }
    if (lower.includes('tailwind') || lower.includes('css')) {
      return 'bg-teal-500/10 text-teal-700 dark:text-teal-300 border-teal-500/20'
    }
    if (lower.includes('node') || lower.includes('prisma') || lower.includes('postgresql')) {
      return 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20'
    }
    if (lower.includes('next') || lower.includes('redis')) {
      return 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/20'
    }
    return 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-500/20'
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300 relative overflow-hidden bg-grid-pattern selection:bg-indigo-500 selection:text-white">
      {/* ATMOSPHERIC GLOWING GRADIENTS */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[650px] h-[550px] bg-gradient-to-tr from-blue-600/20 via-indigo-600/15 to-purple-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-[800px] right-0 translate-x-1/3 w-[700px] h-[600px] bg-gradient-to-bl from-pink-500/15 via-rose-500/10 to-amber-500/10 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-[600px] left-0 -translate-x-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-teal-500/15 via-cyan-500/10 to-indigo-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* 1. FLOATING MODERN NAVBAR */}
      <div className="sticky top-4 z-50 px-4 sm:px-6">
        <header className="max-w-[1080px] mx-auto rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800/90 shadow-xl shadow-slate-950/5 transition-all">
          <div className="px-5 h-16 flex items-center justify-between">
            {/* Logo Badge */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white font-black text-sm shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform duration-200">
                  FS
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {personalInfo.name}
                </span>
                <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 hidden sm:inline">
                  Lead Full-Stack Engineer
                </span>
              </div>
            </a>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 text-sm font-semibold text-slate-600 dark:text-slate-300">
              <a
                href="#work"
                className="px-3.5 py-1.5 rounded-xl hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50/80 dark:hover:bg-slate-800/70 transition-colors"
              >
                Work
              </a>
              <a
                href="#experience"
                className="px-3.5 py-1.5 rounded-xl hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50/80 dark:hover:bg-slate-800/70 transition-colors"
              >
                Experience
              </a>
              <a
                href="#skills"
                className="px-3.5 py-1.5 rounded-xl hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50/80 dark:hover:bg-slate-800/70 transition-colors"
              >
                Skills
              </a>
              <a
                href="#testimonials"
                className="px-3.5 py-1.5 rounded-xl hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50/80 dark:hover:bg-slate-800/70 transition-colors"
              >
                Reviews
              </a>
              <a
                href="#contact"
                className="px-3.5 py-1.5 rounded-xl hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50/80 dark:hover:bg-slate-800/70 transition-colors"
              >
                Contact
              </a>
            </nav>

            {/* Action Items */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-800/80 flex items-center justify-center text-slate-600 dark:text-amber-400 hover:scale-105 active:scale-95 transition-all shadow-sm"
              >
                {darkMode ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                )}
              </button>

              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-md shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>Book a Call</span>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        </header>
      </div>

      {/* MAIN CONTENT WRAPPER */}
      <main className="max-w-[1080px] mx-auto px-6 py-12 sm:py-20 space-y-28 sm:space-y-36">
        {/* 2. HERO SECTION */}
        <section className="space-y-8 pt-4 sm:pt-8">
          {/* Status Badges Row */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>{personalInfo.availability}</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700/80">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              <span>{personalInfo.location} ({personalInfo.timeZone})</span>
              <span className="text-slate-400 dark:text-slate-500">•</span>
              <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{personalInfo.responseTime}</span>
            </div>
          </div>

          {/* Main Headline */}
          <div className="space-y-6 max-w-4xl">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.08]">
              Architecting high-throughput full-stack platforms with{' '}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-300 dark:to-purple-400 bg-clip-text text-transparent">
                luminous, world-class UI.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl font-normal">
              {personalInfo.bio}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#work"
              className="inline-flex items-center justify-center px-7 py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              <span>Explore Selected Work</span>
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>

            <button
              type="button"
              onClick={handleCopyEmail}
              className={`inline-flex items-center justify-center px-6 py-4 rounded-xl border text-sm font-semibold transition-all duration-200 ${
                copied
                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 shadow-sm'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm'
              }`}
            >
              {copied ? (
                <>
                  <svg className="mr-2 w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Email Copied!</span>
                </>
              ) : (
                <>
                  <svg className="mr-2 w-4 h-4 text-slate-400 group-hover:text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span>Copy Direct Email</span>
                </>
              )}
            </button>

            {/* Social Channels */}
            <div className="flex items-center gap-2 pl-2">
              <a
                href={personalInfo.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-12 h-12 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white hover:border-indigo-400 hover:shadow-md transition-all"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>

              <a
                href={personalInfo.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-12 h-12 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-400 hover:shadow-md transition-all"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
            {personalInfo.stats.map((stat, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:border-indigo-400/50 dark:hover:border-indigo-500/50 hover:shadow-lg transition-all duration-200"
              >
                <span className={`text-3xl sm:text-4xl font-extrabold bg-gradient-to-r ${stat.accent} bg-clip-text text-transparent font-mono`}>
                  {stat.value}
                </span>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-2">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. SELECTED WORK / PROJECTS WITH INTERACTIVE PREVIEWS */}
        <section id="work" className="scroll-mt-28 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                Engineered Works
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Featured Case Studies
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Live production architectures focused on real-time responsiveness and high UX standards.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5">
              {filterCategories.map((cat, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveFilter(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-150 ${
                    activeFilter === cat
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-indigo-500/30'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project, idx) => (
              <article
                key={idx}
                className="group relative rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800/90 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 hover:border-indigo-400 dark:hover:border-indigo-500/50 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                {/* Glowing Accent Top Bar */}
                <div className={`h-2 w-full bg-gradient-to-r ${project.gradient}`} />

                <div className="p-7 space-y-6 flex-1">
                  {/* Category & Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <span className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold border ${project.accentBadge}`}>
                      {project.category}
                    </span>

                    <span className="text-xs font-mono font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md border border-slate-200/60 dark:border-slate-700/60">
                      {project.stats}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* INTERACTIVE LIVE MICRO-PREVIEW BOX */}
                  <div className="rounded-2xl bg-slate-100 dark:bg-slate-950 p-4 border border-slate-200/80 dark:border-slate-800 font-mono text-xs">
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                        <span className="ml-2 font-sans font-semibold text-slate-700 dark:text-slate-300">Live Micro-Preview</span>
                      </div>
                      <span className="text-emerald-500 font-semibold animate-pulse">● Active</span>
                    </div>

                    {/* Chart Preview */}
                    {project.previewType === 'chart' && (
                      <div className="space-y-3 font-sans">
                        <div className="flex items-baseline justify-between">
                          <div>
                            <span className="text-2xl font-black text-slate-900 dark:text-white font-mono">14,290</span>
                            <span className="text-xs text-slate-500 ml-1.5">events / sec</span>
                          </div>
                          <span className="text-xs font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded">
                            +24.8% spike
                          </span>
                        </div>
                        {/* CSS Sparkline bars */}
                        <div className="flex items-end gap-1.5 h-12 pt-2">
                          {[35, 45, 30, 60, 50, 75, 65, 80, 95, 85, 90, 100].map((val, bIdx) => (
                            <div
                              key={bIdx}
                              style={{ height: `${val}%` }}
                              className="flex-1 rounded-sm bg-gradient-to-t from-cyan-500 to-blue-600 opacity-80 hover:opacity-100 transition-opacity"
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Kanban Preview */}
                    {project.previewType === 'kanban' && (
                      <div className="space-y-2 font-sans">
                        {[
                          { id: 't1', title: 'Implement WebSocket presence layer', priority: 'High', color: 'text-rose-500' },
                          { id: 't2', title: 'Optimistic state sync with IndexedDB', priority: 'Urgent', color: 'text-amber-500' },
                          { id: 't3', title: 'Zero-latency markdown shortcut engine', priority: 'Normal', color: 'text-blue-500' },
                        ].map((task) => (
                          <div
                            key={task.id}
                            onClick={() => setTaskChecked({ ...taskChecked, [task.id]: !taskChecked[task.id] })}
                            className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 cursor-pointer hover:border-indigo-400 transition-colors"
                          >
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                readOnly
                                checked={!!taskChecked[task.id]}
                                className="w-3.5 h-3.5 accent-indigo-600 rounded"
                              />
                              <span className={`text-xs ${taskChecked[task.id] ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-800 dark:text-slate-200'}`}>
                                {task.title}
                              </span>
                            </div>
                            <span className={`text-[10px] font-bold ${task.color}`}>
                              {task.priority}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Component Preview */}
                    {project.previewType === 'component' && (
                      <div className="space-y-3 font-sans">
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-slate-500">Variant:</span>
                          {(['gradient', 'solid', 'outline'] as const).map((v) => (
                            <button
                              key={v}
                              type="button"
                              onClick={() => setDemoVariant(v)}
                              className={`px-2.5 py-1 rounded-md text-[11px] font-bold capitalize transition-all ${
                                demoVariant === v
                                  ? 'bg-amber-500 text-white'
                                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800'
                              }`}
                            >
                              {v}
                            </button>
                          ))}
                        </div>

                        <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center">
                          {demoVariant === 'gradient' && (
                            <button className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 shadow-md">
                              Interactive Design Token
                            </button>
                          )}
                          {demoVariant === 'solid' && (
                            <button className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-slate-900 dark:bg-slate-100 dark:text-slate-900 shadow">
                              Accessible Solid Token
                            </button>
                          )}
                          {demoVariant === 'outline' && (
                            <button className="px-4 py-2 rounded-lg text-xs font-bold border-2 border-amber-500 text-amber-600 dark:text-amber-400">
                              Outline Token (High Contrast)
                            </button>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Terminal Preview */}
                    {project.previewType === 'terminal' && (
                      <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 font-mono">
                        <div className="text-slate-400 dark:text-slate-500">// Distributed Gateway Router</div>
                        <div>
                          <span className="text-indigo-600 dark:text-indigo-400 font-bold">GET</span>{' '}
                          <span className="text-emerald-600 dark:text-emerald-400">/v2/telemetry/nodes</span>
                        </div>
                        <div className="text-slate-500 dark:text-slate-400">
                          Status: <span className="text-emerald-500 font-bold">200 OK</span> • Latency:{' '}
                          <span className="text-cyan-500 font-bold">11.4ms</span>
                        </div>
                        <div className="text-slate-400 text-[11px] truncate">
                          {`{"nodes": 48, "cache": "HIT", "rateLimit": "1000/1000"}`}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Highlights / Metrics */}
                  <div className="flex flex-wrap gap-2 text-xs">
                    {project.metrics.map((metric, mIdx) => (
                      <span
                        key={mIdx}
                        className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-semibold"
                      >
                        ✓ {metric}
                      </span>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className={`inline-block px-2.5 py-0.5 text-[11px] font-semibold rounded-md border ${getTagBadgeStyle(tag)}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="px-7 py-4 bg-slate-50/80 dark:bg-slate-950/60 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                  >
                    <span>Launch Live Demo</span>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                    <span>View Repository</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 4. CAREER & WORK HISTORY TIMELINE */}
        <section id="experience" className="scroll-mt-28 space-y-8">
          <div className="space-y-1.5 border-b border-slate-200 dark:border-slate-800 pb-5">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              Career Trajectory
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Work History & Leadership
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Track record of building and delivering high-impact products across agile engineering teams.
            </p>
          </div>

          <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-4 sm:ml-6 pl-6 sm:pl-8 space-y-10">
            {experienceTimeline.map((item, idx) => (
              <div key={idx} className="relative group">
                {/* Timeline Dot */}
                <div className="absolute -left-[33px] sm:-left-[41px] top-1.5 w-5 h-5 rounded-full bg-white dark:bg-slate-900 border-4 border-indigo-600 group-hover:scale-125 transition-transform" />

                <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-indigo-400 dark:hover:border-indigo-500 transition-all space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                        {item.role}
                      </h3>
                      <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                        {item.company}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${item.badgeColor}`}>
                        {item.badge}
                      </span>
                      <span className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                        {item.period}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.description}
                  </p>

                  <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                    {item.achievements.map((ach, aIdx) => (
                      <li key={aIdx} className="flex items-start gap-2">
                        <span className="text-emerald-500 font-bold mt-0.5">✦</span>
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                    {item.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2.5 py-0.5 text-[11px] font-semibold rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. SKILLS & MASTERY MATRIX */}
        <section id="skills" className="scroll-mt-28 space-y-8">
          <div className="space-y-1.5 border-b border-slate-200 dark:border-slate-800 pb-5">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              Technical Stack
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Skills & Mastery Levels
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Deep, production-tested fluency across frontend frameworks, cloud databases, and visual tooling.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {skillCategories.map((group, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-indigo-400 dark:hover:border-indigo-500 transition-all space-y-5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${group.gradient} flex items-center justify-center text-white shadow-md shadow-indigo-500/20`}>
                      {group.icon === 'layout' && (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                        </svg>
                      )}
                      {group.icon === 'database' && (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                        </svg>
                      )}
                      {group.icon === 'palette' && (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4 4 4 0 014-4c.725 0 1.45.2 2.003.553a1 1 0 001.378-.328 10.026 10.026 0 013.914-3.914 1 1 0 00-.328-1.378A3.997 3.997 0 0110 5a4 4 0 118 0c0 .725-.2 1.45-.553 2.003a1 1 0 00.328 1.378 10.026 10.026 0 013.914 3.914 1 1 0 001.378.328A3.997 3.997 0 0123 15a4 4 0 11-8 0c0-.725.2-1.45.553-2.003a1 1 0 00-.328-1.378 10.026 10.026 0 01-3.914-3.914 1 1 0 00-1.378-.328A3.997 3.997 0 018 7" />
                        </svg>
                      )}
                      {group.icon === 'terminal' && (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {group.category}
                    </h3>
                  </div>

                  <span className={`px-2.5 py-0.5 text-xs font-bold rounded-full border ${group.badgeBg}`}>
                    {group.items.length} Technologies
                  </span>
                </div>

                {/* Progress bars list */}
                <div className="space-y-3 pt-1">
                  {group.items.map((skill, sIdx) => (
                    <div key={sIdx} className="space-y-1">
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span className="text-slate-700 dark:text-slate-200">{skill.name}</span>
                        <span className="font-mono text-indigo-600 dark:text-indigo-400">{skill.proficiency}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <div
                          style={{ width: `${skill.proficiency}%` }}
                          className={`h-full rounded-full bg-gradient-to-r ${group.gradient} transition-all duration-500`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. ENGINEERING PHILOSOPHY */}
        <section className="space-y-8">
          <div className="space-y-1.5 border-b border-slate-200 dark:border-slate-800 pb-5">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              Core Philosophy
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Engineering with Obsessive Quality
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {principles.map((p, idx) => (
              <div
                key={idx}
                className="p-7 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500/50 shadow-sm transition-all duration-200 space-y-3"
              >
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${p.gradient} flex items-center justify-center text-white shadow-lg shadow-indigo-500/20`}>
                  {p.icon === 'bolt' && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  )}
                  {p.icon === 'sparkles' && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  )}
                  {p.icon === 'cube' && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {p.title}
                  </h3>
                  <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                    {p.tagline}
                  </p>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. CLIENT TESTIMONIALS & ENDORSEMENTS */}
        <section id="testimonials" className="scroll-mt-28 space-y-8">
          <div className="space-y-1.5 border-b border-slate-200 dark:border-slate-800 pb-5">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              Endorsements
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              What Leaders Say
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Feedback from CTOs, product directors, and founders who have partnered with me.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="p-7 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-indigo-400 dark:hover:border-indigo-500 transition-all flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, sIdx) => (
                      <span key={sIdx} className="text-base">★</span>
                    ))}
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed">
                    "{t.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${t.gradient} flex items-center justify-center text-white text-xs font-bold shadow-md`}>
                    {t.initials}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {t.name}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {t.role} • {t.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 8. CONTACT & INQUIRY FORM */}
        <section id="contact" className="scroll-mt-28 space-y-8">
          <div className="space-y-1.5 border-b border-slate-200 dark:border-slate-800 pb-5">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              Direct Engagement
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Initiate a Project Conversation
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Have an architecture to build, a team to scale, or a high-priority product sprint? Let's connect.
            </p>
          </div>

          <div className="p-[2px] rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-2xl shadow-indigo-500/15">
            <div className="rounded-[22px] bg-white dark:bg-slate-900 p-7 sm:p-11 space-y-8">
              {/* Quick Contact Chips */}
              <div className="flex flex-wrap items-center gap-4 text-sm font-semibold">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 hover:scale-[1.02] transition-transform"
                >
                  <svg className="w-4 h-4 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>{personalInfo.email}</span>
                </a>

                <a
                  href={personalInfo.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 hover:scale-[1.02] transition-transform"
                >
                  <span>Connect on LinkedIn</span>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>

                <a
                  href={personalInfo.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:scale-[1.02] transition-transform"
                >
                  <span>Follow on GitHub</span>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>

              {/* Form */}
              <form onSubmit={handleFormSubmit} className="space-y-5">
                {formSubmitted && (
                  <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-200 text-sm flex items-center gap-3">
                    <svg className="w-5 h-5 text-emerald-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Thank you! Your email client has been prepared. Looking forward to our conversation!</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      Your Name / Company
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. David Mitchell (PulseMetrics)"
                      className="w-full px-4 py-3.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      Work Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="david@pulsemetrics.com"
                      className="w-full px-4 py-3.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Project Scope & Timeline
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your product requirements, tech stack preferences, target timeline..."
                    className="w-full px-4 py-3.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-y"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <span>Send Project Inquiry</span>
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* 9. FOOTER */}
      <footer className="mt-28 border-t border-slate-200/80 dark:border-slate-800/80 py-10 px-6 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-[1080px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="flex items-center gap-1.5 font-medium">
            <span>© {new Date().getFullYear()} {personalInfo.name}. Engineered with React, TypeScript & Tailwind CSS.</span>
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold transition-colors"
          >
            <span>Back to top</span>
            <svg className="w-3.5 h-3.5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      </footer>
    </div>
  )
}
