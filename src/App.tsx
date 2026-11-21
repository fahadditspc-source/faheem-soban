import React, { useState, useEffect } from 'react'
import { personalInfo, projects, principles, aboutParagraph, skillCategories, Project } from './data'

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

  // Filter projects
  const filterCategories = ['All', 'Full-Stack', 'Productivity', 'Design System', 'Backend']
  const filteredProjects = projects.filter((project: Project) => {
    if (activeFilter === 'All') return true
    return project.category.toLowerCase().includes(activeFilter.toLowerCase())
  })

  // Get tag color badge based on tech
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
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] text-slate-800 dark:text-slate-100 transition-colors duration-300 relative overflow-hidden bg-grid-pattern selection:bg-indigo-500 selection:text-white">
      {/* ATMOSPHERIC GLOWING GRADIENT ORBS */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[550px] h-[450px] bg-gradient-to-tr from-blue-600/20 via-indigo-600/15 to-purple-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-[600px] right-0 translate-x-1/3 w-[600px] h-[500px] bg-gradient-to-bl from-pink-500/15 via-rose-500/10 to-amber-500/5 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-[400px] left-0 -translate-x-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-teal-500/15 via-cyan-500/10 to-indigo-500/5 rounded-full blur-[130px] pointer-events-none -z-10" />

      {/* 1. FLOATING MODERN NAVBAR */}
      <div className="sticky top-4 z-50 px-4 sm:px-6">
        <header className="max-w-[960px] mx-auto rounded-2xl bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800/90 shadow-lg shadow-slate-900/5 transition-all">
          <div className="px-5 h-16 flex items-center justify-between">
            {/* Logo Badge */}
            <a
              href="#"
              className="flex items-center gap-3 group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white font-black text-sm shadow-md shadow-indigo-500/30 group-hover:scale-105 transition-transform duration-200">
                FS
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {personalInfo.name}
                </span>
                <span className="text-[11px] font-medium text-slate-400 dark:text-slate-400 hidden sm:inline">
                  Portfolio
                </span>
              </div>
            </a>

            {/* Navigation Links */}
            <nav className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300">
              <a
                href="#projects"
                className="px-3 py-1.5 rounded-lg hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50/80 dark:hover:bg-slate-800/60 transition-colors"
              >
                Projects
              </a>
              <a
                href="#skills"
                className="px-3 py-1.5 rounded-lg hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50/80 dark:hover:bg-slate-800/60 transition-colors"
              >
                Skills
              </a>
              <a
                href="#about"
                className="px-3 py-1.5 rounded-lg hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50/80 dark:hover:bg-slate-800/60 transition-colors"
              >
                About
              </a>
              <a
                href="#contact"
                className="px-3 py-1.5 rounded-lg hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50/80 dark:hover:bg-slate-800/60 transition-colors"
              >
                Contact
              </a>
            </nav>

            {/* Action Buttons: Theme Toggle & Contact Pill */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-100/80 dark:bg-slate-800/80 flex items-center justify-center text-slate-600 dark:text-amber-400 hover:scale-105 active:scale-95 transition-all shadow-sm"
              >
                {darkMode ? (
                  /* Sun Icon */
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                ) : (
                  /* Moon Icon */
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
                className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-md shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-102 transition-all"
              >
                <span>Hire Me</span>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        </header>
      </div>

      {/* MAIN CONTAINER */}
      <main className="max-w-[960px] mx-auto px-6 py-12 sm:py-16 space-y-24 sm:space-y-32">
        {/* 2. HERO SECTION */}
        <section className="space-y-8 pt-6 sm:pt-10">
          {/* Status & Location Pill */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Available for new projects</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              <svg className="w-3.5 h-3.5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{personalInfo.location}</span>
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-5">
            <div className="space-y-2">
              <p className="text-sm font-semibold tracking-wider uppercase text-indigo-600 dark:text-indigo-400">
                {personalInfo.role}
              </p>
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
                Crafting modern web apps with{' '}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-300 dark:to-purple-400 bg-clip-text text-transparent">
                  vibrant aesthetics
                </span>{' '}
                & crisp code.
              </h1>
            </div>

            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              {personalInfo.bio}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#projects"
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              <span>Explore Featured Work</span>
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>

            <button
              type="button"
              onClick={handleCopyEmail}
              className={`inline-flex items-center justify-center px-5 py-3.5 rounded-xl border text-sm font-medium transition-all duration-200 ${
                copied
                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 shadow-sm'
                  : 'border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm'
              }`}
            >
              {copied ? (
                <>
                  <svg className="mr-2 w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Email Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <svg className="mr-2 w-4 h-4 text-slate-400 group-hover:text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span>Copy Email</span>
                </>
              )}
            </button>

            {/* Social Icons */}
            <div className="flex items-center gap-2 pl-2">
              <a
                href={personalInfo.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-11 h-11 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800/80 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white hover:border-indigo-400 hover:shadow-sm transition-all"
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
                className="w-11 h-11 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800/80 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-400 hover:shadow-sm transition-all"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Stats Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-4">
            {personalInfo.stats.map((stat, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm border border-slate-200/80 dark:border-slate-800 shadow-sm hover:border-indigo-300 dark:hover:border-indigo-600/50 hover:shadow-md transition-all duration-200"
              >
                <span className={`text-2xl sm:text-3xl font-black bg-gradient-to-r ${stat.accent} bg-clip-text text-transparent`}>
                  {stat.value}
                </span>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. FEATURED PROJECTS SECTION */}
        <section id="projects" className="scroll-mt-28 space-y-8">
          {/* Section Header with Category Filters */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                Portfolio Showcase
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Featured Projects
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                High-performance applications built with focus on speed, design, and user delight.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {filterCategories.map((cat, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveFilter(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                    activeFilter === cat
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm shadow-indigo-500/30'
                      : 'bg-white dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700/50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Project Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects.map((project, idx) => (
              <article
                key={idx}
                className="group relative rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800/90 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-300 dark:hover:border-indigo-500/50 hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                {/* Top Colorful Gradient Header Stripe */}
                <div className={`h-1.5 w-full bg-gradient-to-r ${project.gradient}`} />

                <div className="p-6 sm:p-7 space-y-4 flex-1">
                  {/* Category & Stats Badges */}
                  <div className="flex items-center justify-between gap-2">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-semibold border ${project.accentBadge}`}>
                      {project.category}
                    </span>

                    {project.stats && (
                      <span className="text-[11px] font-mono font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                        {project.stats}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technology Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className={`inline-block px-2.5 py-0.5 text-[11px] font-medium rounded-md border ${getTagBadgeStyle(tag)}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="px-6 py-4 bg-slate-50/70 dark:bg-slate-950/40 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                  >
                    <span>Live Preview</span>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
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
                    <span>Code</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 4. CORE PRINCIPLES & PHILOSOPHY */}
        <section className="space-y-6">
          <div className="space-y-1.5 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              Philosophy
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Engineering with Purpose
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {principles.map((p, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-600/50 shadow-sm transition-all duration-200 space-y-3"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${p.gradient} flex items-center justify-center text-white shadow-md shadow-indigo-500/20`}>
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
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {p.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. SKILLS MATRIX SECTION */}
        <section id="skills" className="scroll-mt-28 space-y-8">
          <div className="space-y-1.5 border-b border-slate-200 dark:border-slate-800 pb-5">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              Technical Stack
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Skills & Technologies
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              A comprehensive view of the tools, frameworks, and workflows I use daily.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {skillCategories.map((group, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-tr ${group.gradient} flex items-center justify-center text-white shadow-sm`}>
                      {group.icon === 'layout' && (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                        </svg>
                      )}
                      {group.icon === 'database' && (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                        </svg>
                      )}
                      {group.icon === 'palette' && (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4 4 4 0 014-4c.725 0 1.45.2 2.003.553a1 1 0 001.378-.328 10.026 10.026 0 013.914-3.914 1 1 0 00-.328-1.378A3.997 3.997 0 0110 5a4 4 0 118 0c0 .725-.2 1.45-.553 2.003a1 1 0 00.328 1.378 10.026 10.026 0 013.914 3.914 1 1 0 001.378.328A3.997 3.997 0 0123 15a4 4 0 11-8 0c0-.725.2-1.45.553-2.003a1 1 0 00-.328-1.378 10.026 10.026 0 01-3.914-3.914 1 1 0 00-1.378-.328A3.997 3.997 0 018 7" />
                        </svg>
                      )}
                      {group.icon === 'terminal' && (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {group.category}
                    </h3>
                  </div>

                  <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full border ${group.badgeBg}`}>
                    {group.items.length} Tech
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {group.items.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-3 py-1.5 text-xs font-medium rounded-xl bg-slate-100/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700/80 hover:border-indigo-400 dark:hover:border-indigo-500 hover:scale-105 transition-all duration-150"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. ABOUT SECTION */}
        <section id="about" className="scroll-mt-28 space-y-8">
          <div className="space-y-1.5 border-b border-slate-200 dark:border-slate-800 pb-5">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              Background
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              About Me
            </h2>
          </div>

          <div className="p-7 sm:p-9 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-indigo-500/30">
                FS
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {personalInfo.name}
                </h3>
                <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                  {personalInfo.role} • {personalInfo.location}
                </p>
              </div>
            </div>

            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
              {aboutParagraph}
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
              <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                🚀 Full-Cycle Product Delivery
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                🎨 Modern UI / UX Design
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                ⚡ Performance & SEO Optimization
              </span>
            </div>
          </div>
        </section>

        {/* 7. CONTACT & GET IN TOUCH */}
        <section id="contact" className="scroll-mt-28 space-y-8">
          <div className="space-y-1.5 border-b border-slate-200 dark:border-slate-800 pb-5">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              Get In Touch
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Let's Build Something Memorable
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Have an idea, project, or open role? Drop a message and let's talk.
            </p>
          </div>

          {/* Contact Card with Vibrant Border Gradient */}
          <div className="p-[1.5px] rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-xl shadow-indigo-500/10">
            <div className="rounded-[22px] bg-white dark:bg-slate-900 p-6 sm:p-10 space-y-8">
              {/* Direct channels */}
              <div className="flex flex-wrap items-center gap-4 text-sm font-semibold">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 hover:scale-102 transition-transform"
                >
                  <svg className="w-4 h-4 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>{personalInfo.email}</span>
                </a>

                <a
                  href={personalInfo.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:text-indigo-600 dark:hover:text-white transition-colors"
                >
                  <span>GitHub Profile</span>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>

                <a
                  href={personalInfo.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 hover:scale-102 transition-transform"
                >
                  <span>LinkedIn</span>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>

              {/* Contact Form */}
              <form onSubmit={handleFormSubmit} className="space-y-4">
                {formSubmitted && (
                  <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-sm flex items-center gap-3">
                    <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Thank you! Your default email client has been prepared. Looking forward to speaking!</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      Your Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Morgan"
                      className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/70 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      Your Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@company.com"
                      className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/70 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project, timeline, or idea..."
                    className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/70 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-y"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-md shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-102 active:scale-98 transition-all"
                >
                  <span>Send Message</span>
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* 8. FOOTER & BACK TO TOP */}
      <footer className="mt-20 border-t border-slate-200/80 dark:border-slate-800/80 py-8 px-6 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-[960px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="flex items-center gap-1.5">
            <span>© {new Date().getFullYear()} {personalInfo.name}. Crafted with</span>
            <span className="text-rose-500">♥</span>
            <span>in React & Tailwind CSS</span>
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <span>Back to top</span>
            <svg className="w-3.5 h-3.5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      </footer>
    </div>
  )
}
