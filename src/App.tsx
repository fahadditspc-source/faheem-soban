import React, { useState } from 'react'
import { personalInfo, projects, aboutParagraph, skillCategories } from './data'

export default function App() {
  const [copied, setCopied] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

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
      setTimeout(() => setCopied(false), 2200)
    } catch (err) {
      console.error('Failed to copy email:', err)
    }
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return

    // Open mailto as a reliable zero-backend method, while giving instant in-UI confirmation
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`)
    const body = encodeURIComponent(
      `Hi ${personalInfo.name},\n\n${formData.message}\n\nBest regards,\n${formData.name} (${formData.email})`
    )
    window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`

    setFormSubmitted(true)
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' })
      setFormSubmitted(false)
    }, 4000)
  }

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#0F172A] selection:bg-blue-100 selection:text-blue-900">
      {/* 1. TOP BAR */}
      <header className="sticky top-0 z-50 bg-[#FFFFFF]/90 backdrop-blur-sm border-b border-[#E2E8F0] transition-colors">
        <div className="max-w-[900px] mx-auto px-6 h-16 flex items-center justify-between">
          <a
            href="#"
            className="text-base font-bold tracking-tight text-[#0F172A] hover:text-[#2563EB] transition-colors duration-150"
          >
            {personalInfo.name}
          </a>

          <nav className="flex items-center gap-6 sm:gap-8 text-sm font-medium text-slate-600">
            <a
              href="#projects"
              className="hover:text-[#2563EB] transition-colors duration-150"
            >
              Projects
            </a>
            <a
              href="#about"
              className="hover:text-[#2563EB] transition-colors duration-150"
            >
              About
            </a>
            <a
              href="#contact"
              className="hover:text-[#2563EB] transition-colors duration-150"
            >
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* MAIN CONTENT CONTAINER (Max 900px Centered) */}
      <main className="max-w-[900px] mx-auto px-6 py-12 sm:py-20 space-y-24 sm:space-y-32">
        {/* 2. HERO SECTION */}
        <section className="space-y-8 pt-4 sm:pt-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-[#E2E8F0]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Available for new projects</span>
            <span className="text-slate-400">•</span>
            <span>{personalInfo.location}</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0F172A] leading-[1.15]">
              {personalInfo.headline}
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl">
              {personalInfo.bio}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#projects"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[#2563EB] text-white font-medium text-sm hover:bg-[#1D4ED8] transition-colors duration-150 shadow-sm"
            >
              View Projects
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </a>

            <button
              type="button"
              onClick={handleCopyEmail}
              className={`inline-flex items-center justify-center px-6 py-3 rounded-lg border font-medium text-sm transition-all duration-150 ${
                copied
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-700'
                  : 'border-[#E2E8F0] bg-white text-[#0F172A] hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              {copied ? (
                <>
                  <svg
                    className="mr-2 w-4 h-4 text-emerald-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg
                    className="mr-2 w-4 h-4 text-slate-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  Copy Email
                </>
              )}
            </button>
          </div>
        </section>

        {/* 3. PROJECTS SECTION */}
        <section id="projects" className="scroll-mt-24 space-y-8">
          <div className="space-y-2 border-b border-[#E2E8F0] pb-4">
            <h2 className="text-2xl font-bold tracking-tight text-[#0F172A]">Featured Projects</h2>
            <p className="text-sm text-slate-500">
              A curated selection of things I've built, focused on usability and architecture.
            </p>
          </div>

          <div className="space-y-6">
            {projects.map((project, idx) => (
              <article
                key={idx}
                className="group p-6 sm:p-8 rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] hover:border-slate-300 transition-colors duration-150 space-y-5"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <h3 className="text-xl font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors duration-150">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-4 text-xs font-semibold">
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#2563EB] hover:text-[#1D4ED8] transition-colors duration-150"
                    >
                      Live Demo
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                    <span className="text-slate-300">|</span>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-slate-600 hover:text-[#0F172A] transition-colors duration-150"
                    >
                      GitHub
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  {project.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="inline-block px-2.5 py-1 text-xs font-medium rounded-md bg-slate-100 text-slate-700 border border-[#E2E8F0]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 4. ABOUT & SKILLS SECTION */}
        <section id="about" className="scroll-mt-24 space-y-12">
          <div className="space-y-4">
            <div className="border-b border-[#E2E8F0] pb-4">
              <h2 className="text-2xl font-bold tracking-tight text-[#0F172A]">About & Background</h2>
            </div>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              {aboutParagraph}
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-bold text-[#0F172A]">Core Skills & Technologies</h3>
            <div className="space-y-6">
              {skillCategories.map((group, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-lg border border-[#E2E8F0] bg-[#FFFFFF] space-y-3"
                >
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
                    {group.category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-3 py-1 text-xs sm:text-sm font-medium rounded-md bg-slate-50 text-slate-800 border border-[#E2E8F0]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. CONTACT & FOOTER */}
        <section id="contact" className="scroll-mt-24 space-y-10 border-t border-[#E2E8F0] pt-12 sm:pt-16">
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A]">
              Let's Connect
            </h2>
            <p className="text-slate-600 text-base leading-relaxed max-w-xl">
              Whether you have an upcoming project, an inquiry, or just want to discuss software and design, feel free to drop a message.
            </p>
          </div>

          {/* Contact Details & Links */}
          <div className="flex flex-wrap items-center gap-6 text-sm font-medium">
            <a
              href={`mailto:${personalInfo.email}`}
              className="inline-flex items-center gap-2 text-[#2563EB] hover:text-[#1D4ED8] transition-colors duration-150"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>{personalInfo.email}</span>
            </a>

            <span className="text-slate-300 hidden sm:inline">•</span>

            <a
              href={personalInfo.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-[#0F172A] transition-colors duration-150"
            >
              GitHub
            </a>

            <span className="text-slate-300 hidden sm:inline">•</span>

            <a
              href={personalInfo.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-[#0F172A] transition-colors duration-150"
            >
              LinkedIn
            </a>

            {personalInfo.socials.twitter && (
              <>
                <span className="text-slate-300 hidden sm:inline">•</span>
                <a
                  href={personalInfo.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 hover:text-[#0F172A] transition-colors duration-150"
                >
                  X (Twitter)
                </a>
              </>
            )}
          </div>

          {/* Simple Contact Form */}
          <form
            onSubmit={handleFormSubmit}
            className="p-6 sm:p-8 rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] space-y-5"
          >
            <h3 className="text-lg font-bold text-[#0F172A]">Send a Message</h3>

            {formSubmitted ? (
              <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-3">
                <svg className="w-5 h-5 text-emerald-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
                <span>Thank you! Your email client has been prepared. Talk soon.</span>
              </div>
            ) : null}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="name" className="block text-xs font-semibold text-slate-700">
                  Your Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex Smith"
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#E2E8F0] bg-white text-[#0F172A] placeholder-slate-400 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="email" className="block text-xs font-semibold text-slate-700">
                  Your Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alex@example.com"
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#E2E8F0] bg-white text-[#0F172A] placeholder-slate-400 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="message" className="block text-xs font-semibold text-slate-700">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="What are you working on?"
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#E2E8F0] bg-white text-[#0F172A] placeholder-slate-400 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-colors resize-y"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-[#2563EB] text-white font-medium text-sm hover:bg-[#1D4ED8] transition-colors duration-150 shadow-sm"
            >
              Send Message
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </form>

          {/* Bottom Copyright */}
          <footer className="pt-8 text-center text-xs text-slate-400 border-t border-[#E2E8F0]">
            <p>
              © {new Date().getFullYear()} {personalInfo.name}. Designed with simplicity, speed, and clean code.
            </p>
          </footer>
        </section>
      </main>
    </div>
  )
}
