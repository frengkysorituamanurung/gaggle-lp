'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import {
  ArrowUp,
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronRight,
  Circle,
  Database,
  Eye,
  FolderKanban,
  GitBranch,
  HardDrive,
  Layers,
  Lock,
  Menu,
  MessageSquare,
  Moon,
  Plug,
  Server,
  ShieldCheck,
  Sun,
  Terminal,
  X,
} from 'lucide-react'

const features = [
  {
    icon: HardDrive,
    title: 'Local-first by design',
    copy: 'Your projects and application data live on your machine by default. You choose how Gaggle connects to AI providers.',
  },
  {
    icon: FolderKanban,
    title: 'Built around your projects',
    copy: 'Work in real directories, explore files, and keep your AI sessions connected to the projects that matter.',
  },
  {
    icon: ShieldCheck,
    title: 'Permission-aware execution',
    copy: 'Define how tools operate and require approval for sensitive actions, with enforcement handled by the application.',
  },
  {
    icon: Terminal,
    title: 'A workflow developers understand',
    copy: 'Connect AI-assisted work with familiar development tasks, including file inspection, terminal operations, and Git review where supported.',
  },
  {
    icon: Plug,
    title: 'Flexible AI integrations',
    copy: 'Connect supported AI providers through a modular integration layer, without tying the entire application to one provider.',
  },
  {
    icon: GitBranch,
    title: 'Open source, built to evolve',
    copy: 'Explore the code, understand how it works, and help shape the future of a developer-focused AI assistant.',
  },
]

const securityPoints = [
  {
    icon: HardDrive,
    title: 'Local data by default',
    copy: 'Project metadata, conversations, and execution history are designed to be stored locally.',
  },
  {
    icon: Plug,
    title: 'You choose your AI provider',
    copy: 'When using a remote provider, requests and relevant context may leave your device. Understand what is sent and how the provider processes it.',
  },
  {
    icon: ShieldCheck,
    title: 'Actions with guardrails',
    copy: 'Use permission checks and explicit approvals for sensitive operations, backed by enforcement in the application.',
  },
  {
    icon: Eye,
    title: 'Visibility into agent activity',
    copy: 'Make it easy to inspect tool activity, execution status, and proposed changes.',
  },
]

const faqs = [
  {
    q: 'What is Gaggle?',
    a: 'Gaggle is an open-source, local-first AI assistant designed to work with your files, projects, and development workflows.',
  },
  {
    q: 'Does Gaggle run locally?',
    a: 'Gaggle is designed to run its application services and store application data locally. Using a remote AI provider can still send prompts and relevant context to that provider. Local model support depends on the integrations available in your version.',
  },
  {
    q: 'Which platforms does Gaggle support?',
    a: 'Gaggle targets macOS and Linux. Check the current installation documentation for the platforms and architectures verified for your release.',
  },
  {
    q: 'Do I need an AI API key?',
    a: 'That depends on the provider you choose. Remote providers may require their own API credentials, while local model integrations may have different requirements.',
  },
  {
    q: 'Is Gaggle open source?',
    a: 'Visit the Gaggle repository to review its license, source code, contribution guidelines, and current development status.',
  },
]

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('top')
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light'
    const stored = window.localStorage.getItem('theme')
    if (stored === 'light' || stored === 'dark') return stored
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useIsomorphicLayoutEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    try {
      window.localStorage.setItem('theme', theme)
    } catch {}
  }, [theme])
  const menuRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLElement>(null)

  // Close mobile menu on Escape / outside click
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    const onClick = (e: MouseEvent) => {
      const target = e.target as Node
      if (headerRef.current && !headerRef.current.contains(target)) setMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClick)
    }
  }, [menuOpen])

  // Scroll spy + back-to-top visibility
  useEffect(() => {
    const sections = ['top', 'product', 'features', 'security', 'how-it-works', 'technology', 'install', 'community', 'faq']
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id || 'top')
        })
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    )
    sections.forEach((s) => observer.observe(s))

    const onScroll = () => setShowBackToTop(window.scrollY > 500)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const navClass = (id: string) => (activeSection === id ? 'is-active' : '')

  const githubUrl = 'https://github.com/frengkysorituamanurung/gaggle'

  return (
    <div className="gaggle-site">
      <a className="skip-link" href="#top">Skip to main content</a>

      <div className="announcement-bar">
        <span>Open source. Local-first. Built for your workflow.</span>
        <a href={githubUrl} target="_blank" rel="noopener noreferrer">
          Explore Gaggle on GitHub →
        </a>
      </div>

      <header className="site-header" ref={headerRef}>
        <nav className="nav-shell" aria-label="Main navigation">
          <a className="brand" href="#top" aria-label="Gaggle home">
            <span className="brand-mark" aria-hidden="true">
              <Circle size={11} fill="currentColor" strokeWidth={0} />
              <Circle size={11} fill="currentColor" strokeWidth={0} />
            </span>
            <span>gaggle</span>
          </a>
          <button
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="main-menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
            <span className="sr-only">Toggle navigation</span>
          </button>
          <div id="main-menu" className={`nav-links ${menuOpen ? 'is-open' : ''}`} ref={menuRef}>
            <a href="#product" className={navClass('product')} aria-current={activeSection === 'product' ? 'page' : undefined} onClick={() => setMenuOpen(false)}>
              Product
            </a>
            <a href="#features" className={navClass('features')} aria-current={activeSection === 'features' ? 'page' : undefined} onClick={() => setMenuOpen(false)}>
              Features
            </a>
            <a href="#security" className={navClass('security')} aria-current={activeSection === 'security' ? 'page' : undefined} onClick={() => setMenuOpen(false)}>
              Security
            </a>
            <a href="#how-it-works" className={navClass('how-it-works')} aria-current={activeSection === 'how-it-works' ? 'page' : undefined} onClick={() => setMenuOpen(false)}>
              How it works
            </a>
            <a className="nav-github" href={`${githubUrl}/blob/main/README.md`} target="_blank" rel="noopener noreferrer">
              <BookOpen size={15} /> Docs <ArrowUpRight size={13} />
            </a>
            <a className="nav-github" href={githubUrl} target="_blank" rel="noopener noreferrer">
              <GitBranch size={15} /> GitHub <ArrowUpRight size={13} />
            </a>
            <a className="button button-small" href="#install" onClick={() => setMenuOpen(false)}>
              Get started <ChevronRight size={15} />
            </a>
            <button
              className="theme-toggle"
              onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
              aria-label="Toggle color theme"
              aria-pressed={theme === 'dark'}
              suppressHydrationWarning
            >
              <Sun size={18} className="icon-sun" />
              <Moon size={18} className="icon-moon" />
            </button>
          </div>
        </nav>
      </header>

      <main id="top">
        {/* Hero */}
        <section className="hero">
          <div className="hero-mark" aria-hidden="true">
            <Circle size={15} fill="currentColor" strokeWidth={0} />
            <Circle size={15} fill="currentColor" strokeWidth={0} />
          </div>
          <div className="eyebrow">YOUR WORKSPACE. YOUR AGENT. YOUR RULES.</div>
          <h1>
            An AI agent that works <em>where you do.</em>
          </h1>
          <p className="hero-copy">
            Gaggle is an open-source, local-first AI assistant built to work with your files, projects, and development workflows — right on your machine.
          </p>
          <div className="hero-actions">
            <a className="button" href={githubUrl} target="_blank" rel="noopener noreferrer">
              Explore on GitHub <ArrowUpRight size={17} />
            </a>
            <a className="text-link" href="#install">
              Get started <ChevronRight size={15} />
            </a>
          </div>
          <p className="hero-meta">Built for macOS and Linux · Open source · Local-first</p>
        </section>

        {/* Product */}
        <section id="product" className="intro section-wrap section-border">
          <div className="section-kicker">01 / The idea</div>
          <div>
            <h2>AI should fit your workflow. Not the other way around.</h2>
            <p>
              Working with AI should not require you to rethink how you work. Your projects already have context, and your tools already have a place in your workflow. Gaggle explores a more focused approach: bringing assistance closer to the environment where your work happens.
            </p>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="features section-wrap section-border">
          <div className="section-heading">
            <div>
              <div className="section-kicker">02 / What matters</div>
              <h2>Everything starts with the context that matters.</h2>
            </div>
            <p>Six design principles keep the assistant close to the work, without crowding it out.</p>
          </div>
          <div className="feature-grid">
            {features.map(({ icon: Icon, title, copy }) => (
              <article className="feature" key={title}>
                <div className="feature-icon">
                  <Icon size={19} strokeWidth={1.7} />
                </div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Product showcase */}
        <section className="showcase section-wrap section-border">
          <div className="showcase-copy">
            <div className="section-kicker">03 / The experience</div>
            <h2>More than a conversation.</h2>
            <p>
              From understanding your project to carrying out real work, Gaggle helps turn instructions into meaningful actions. This interface preview shows a workspace-centered flow: selected context, visible progress, and next steps you can review without losing your place.
            </p>
            <p className="showcase-note">
              Conceptual interface preview — illustrating the ideas behind a workspace-centered approach to AI assistance, not a screenshot of a finished product.
            </p>
            <a className="text-link" href="#how-it-works">
              See how it works <ArrowUpRight size={15} />
            </a>
          </div>
          <ProductDetail />
        </section>

        {/* Security / local-first */}
        <section id="security" className="security section-wrap section-border">
          <div className="section-kicker">04 / Privacy &amp; control</div>
          <h2>Your machine. Your projects. Your choice.</h2>
          <p className="section-lead">
            AI should work with your workflow without taking control away from you. Gaggle is designed to keep application data local by default while giving you control over provider connections and tool permissions.
          </p>
          <div className="security-grid">
            {securityPoints.map(({ icon: Icon, title, copy }) => (
              <article className="security-item" key={title}>
                <div className="security-icon">
                  <Icon size={19} strokeWidth={1.7} />
                </div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="steps section-wrap section-border">
          <div className="section-heading">
            <div>
              <div className="section-kicker">05 / The workflow</div>
              <h2>From your workspace to meaningful work.</h2>
            </div>
          </div>
          <div className="step-grid">
            {[
              ['01', 'Bring your project', 'Open a local workspace and give Gaggle the context it needs to help with your work.'],
              ['02', 'Describe what you want to do', 'Explain a problem, explore an idea, or ask for help with a development task in natural language.'],
              ['03', 'Review and move forward', 'Inspect the results, review proposed changes, and approve actions when required.'],
            ].map(([number, title, copy]) => (
              <article className="step" key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Technology */}
        <section id="technology" className="foundation section-wrap">
          <div className="foundation-card">
            <div className="section-kicker">06 / Built for developers</div>
            <h2>Thoughtful engineering. Open by design.</h2>
            <p>
              Gaggle is an open-source project built around local workflows, thoughtful engineering, and a community-driven future.
            </p>
            <div className="foundation-themes">
              <div>
                <span>Local application runtime</span>
                <p>A Rust desktop application with SQLite local persistence, with macOS and Linux in mind. The focus is a foundation that remains approachable as it grows.</p>
              </div>
              <div>
                <span>Agent and tool execution</span>
                <p>Built-in tools for filesystem, shell, memory, web, and browser access, plus MCP extensions, all routed through a permission engine.</p>
              </div>
              <div>
                <span>Provider integrations</span>
                <p>OpenAI-compatible model providers are supported through a modular adapter layer, with credentials stored in the OS keychain.</p>
              </div>
            </div>
            <div className="tech-row">
              <span>
                <Terminal size={14} /> Rust
              </span>
              <span>
                <Database size={14} /> SQLite
              </span>
              <span>
                <Server size={14} /> Axum
              </span>
              <span>
                <Plug size={14} /> OpenAI-compatible
              </span>
              <span>
                <Layers size={14} /> macOS + Linux
              </span>
            </div>
          </div>
        </section>

        {/* Install */}
        <section id="install" className="install section-wrap section-border">
          <div className="section-heading">
            <div>
              <div className="section-kicker">07 / Get started</div>
              <h2>Get started with Gaggle.</h2>
            </div>
            <p>Explore the source, set up your environment, and follow the installation guide for your platform.</p>
          </div>
          <div className="install-grid">
            <div>
              <p className="section-lead">
                Gaggle is built from source today. You will need a recent Rust toolchain and Git.
              </p>
              <div className="install-steps">
                <div className="install-step">
                  <h3>Prerequisites</h3>
                  <p>Rust toolchain supporting the 2024 edition (rustc 1.85+) and Git.</p>
                </div>
                <div className="install-step">
                  <h3>Build</h3>
                  <pre className="install-code">{`git clone https://github.com/frengkysorituamanurung/gaggle.git
cd gaggle
cargo build --workspace`}</pre>
                </div>
                <div className="install-step">
                  <h3>Run the server</h3>
                  <pre className="install-code">{`cargo run -p gaggle-cli -- serve --addr 127.0.0.1:4321`}</pre>
                  <p>Then open http://127.0.0.1:4321 in your browser.</p>
                </div>
              </div>
            </div>
            <div className="community-links">
              <a href={`${githubUrl}/blob/main/README.md`} target="_blank" rel="noopener noreferrer">
                <BookOpen size={20} />
                <span>
                  <strong>Read the documentation</strong>
                  <small>Installation, CLI usage, and API reference</small>
                </span>
                <ArrowUpRight size={16} />
              </a>
              <a href={`${githubUrl}/blob/main/ROADMAP.md`} target="_blank" rel="noopener noreferrer">
                <Layers size={20} />
                <span>
                  <strong>Explore the roadmap</strong>
                  <small>Current milestones and planned work</small>
                </span>
                <ArrowUpRight size={16} />
              </a>
              <a href={`${githubUrl}/releases`} target="_blank" rel="noopener noreferrer">
                <GitBranch size={20} />
                <span>
                  <strong>View releases</strong>
                  <small>Follow development milestones</small>
                </span>
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </section>

        {/* Community */}
        <section id="community" className="community section-wrap section-border">
          <div className="community-copy">
            <div className="section-kicker">08 / Built in the open</div>
            <h2>The future of Gaggle is built together.</h2>
            <p>
              Good tools get better when the people who use them can help shape them. Explore the code, share your ideas, report issues, and contribute to the next chapter of Gaggle.
            </p>
          </div>
          <div className="community-links">
            <a href={githubUrl} target="_blank" rel="noopener noreferrer">
              <GitBranch size={20} />
              <span>
                <strong>Explore the repository</strong>
                <small>See the project on GitHub</small>
              </span>
              <ArrowUpRight size={16} />
            </a>
            <a href={`${githubUrl}/blob/main/CONTRIBUTING.md`} target="_blank" rel="noopener noreferrer">
              <BookOpen size={20} />
              <span>
                <strong>Contribute on GitHub</strong>
                <small>Read the contributing guide</small>
              </span>
              <ArrowUpRight size={16} />
            </a>
            <a href={`${githubUrl}/issues`} target="_blank" rel="noopener noreferrer">
              <MessageSquare size={20} />
              <span>
                <strong>Report an issue</strong>
                <small>Open an issue on GitHub</small>
              </span>
              <ArrowUpRight size={16} />
            </a>
            <a href={`${githubUrl}/blob/main/ROADMAP.md`} target="_blank" rel="noopener noreferrer">
              <Layers size={20} />
              <span>
                <strong>Explore the roadmap</strong>
                <small>See what is planned next</small>
              </span>
              <ArrowUpRight size={16} />
            </a>
            <a href={`${githubUrl}/blob/main/SECURITY.md`} target="_blank" rel="noopener noreferrer">
              <Lock size={20} />
              <span>
                <strong>Security policy</strong>
                <small>Report vulnerabilities responsibly</small>
              </span>
              <ArrowUpRight size={16} />
            </a>
            <a href={`${githubUrl}/blob/main/CODE_OF_CONDUCT.md`} target="_blank" rel="noopener noreferrer">
              <ShieldCheck size={20} />
              <span>
                <strong>Code of conduct</strong>
                <small>Community expectations</small>
              </span>
              <ArrowUpRight size={16} />
            </a>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="faq section-wrap section-border">
          <div className="section-heading">
            <div>
              <div className="section-kicker">09 / FAQ</div>
              <h2>Questions, answered.</h2>
            </div>
          </div>
          <div className="faq-list">
            {faqs.map(({ q, a }) => (
              <details className="faq-item" key={q}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section id="get-started" className="final section-wrap">
          <div className="final-mark" aria-hidden="true">
            <Circle size={15} fill="currentColor" strokeWidth={0} />
            <Circle size={15} fill="currentColor" strokeWidth={0} />
          </div>
          <h2>
            Make your workspace <em>work harder.</em>
          </h2>
          <p>Meet an AI assistant built around your projects, your workflow, and your control.</p>
          <div className="hero-actions">
            <a className="button button-light" href={githubUrl} target="_blank" rel="noopener noreferrer">
              Explore Gaggle on GitHub <ArrowUpRight size={16} />
            </a>
            <a className="text-link" href={`${githubUrl}/blob/main/README.md`} target="_blank" rel="noopener noreferrer">
              Read the docs <ArrowUpRight size={15} />
            </a>
          </div>
        </section>
      </main>

      {showBackToTop && (
        <button className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">
          <ArrowUp size={18} />
        </button>
      )}

      <footer className="footer section-wrap">
        <div className="footer-brand">
          <a className="brand" href="#top">
            <span className="brand-mark" aria-hidden="true">
              <Circle size={11} fill="currentColor" strokeWidth={0} />
              <Circle size={11} fill="currentColor" strokeWidth={0} />
            </span>
            <span>gaggle</span>
          </a>
          <p>
            A local-first AI assistant
            <br />
            for your real work.
          </p>
        </div>
        <div className="footer-nav">
          <div>
            <span>Product</span>
            <a href="#features">Features</a>
            <a href="#security">Security</a>
            <a href="#how-it-works">How it works</a>
            <a href="#technology">Technology</a>
          </div>
          <div>
            <span>Developers</span>
            <a href={`${githubUrl}/blob/main/README.md`} target="_blank" rel="noopener noreferrer">
              Documentation <ArrowUpRight size={12} />
            </a>
            <a href={githubUrl} target="_blank" rel="noopener noreferrer">
              GitHub <ArrowUpRight size={12} />
            </a>
            <a href={`${githubUrl}/blob/main/CONTRIBUTING.md`} target="_blank" rel="noopener noreferrer">
              Contributing <ArrowUpRight size={12} />
            </a>
            <a href="#install">Get started</a>
          </div>
          <div>
            <span>Project</span>
            <a href={`${githubUrl}/blob/main/LICENSE`} target="_blank" rel="noopener noreferrer">
              License <ArrowUpRight size={12} />
            </a>
            <a href={`${githubUrl}/blob/main/SECURITY.md`} target="_blank" rel="noopener noreferrer">
              Security policy <ArrowUpRight size={12} />
            </a>
            <a href={`${githubUrl}/blob/main/CODE_OF_CONDUCT.md`} target="_blank" rel="noopener noreferrer">
              Code of conduct <ArrowUpRight size={12} />
            </a>
            <a href={`${githubUrl}/blob/main/ROADMAP.md`} target="_blank" rel="noopener noreferrer">
              Roadmap <ArrowUpRight size={12} />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Gaggle</span>
          <span>Open source · Apache 2.0</span>
        </div>
      </footer>
    </div>
  )
}

function ProductDetail() {
  return (
    <div className="detail-window">
      <div className="detail-head">
        <span className="detail-title">
          <span className="online-dot" /> Task progress
        </span>
        <span>Today, 10:42 AM</span>
      </div>
      <div className="detail-body">
        <div className="detail-row">
          <span className="detail-check">
            <Check size={13} />
          </span>
          <div>
            <strong>Read workspace context</strong>
            <small>atlas-web / package.json</small>
          </div>
          <span className="detail-time">0.4s</span>
        </div>
        <div className="detail-row">
          <span className="detail-check">
            <Check size={13} />
          </span>
          <div>
            <strong>Review navigation patterns</strong>
            <small>3 files inspected</small>
          </div>
          <span className="detail-time">1.2s</span>
        </div>
        <div className="detail-row pending">
          <span className="detail-check">
            <span className="spinner" />
          </span>
          <div>
            <strong>Prepare next steps</strong>
            <small>Working with selected context</small>
          </div>
          <span className="detail-time">•••</span>
        </div>
        <div className="detail-note">
          <span className="note-line" />
          The agent keeps you in the loop, without getting in the way.
        </div>
      </div>
    </div>
  )
}