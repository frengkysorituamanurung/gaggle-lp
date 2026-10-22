'use client'

import { useState } from 'react'
import {
  ArrowUpRight,
  Check,
  ChevronRight,
  Circle,
  Command,
  GitBranch,
  Menu,
  MessageSquare,
  Moon,
  PanelLeft,
  ShieldCheck,
  Sparkles,
  Terminal,
  X,
  Zap,
} from 'lucide-react'

const features = [
  { icon: PanelLeft, title: 'Local-first by design', copy: 'A focused application experience built around your machine and the workspace context you choose to bring in.' },
  { icon: Command, title: 'Workspace-centered', copy: 'Keep conversations close to real work with a project view that gives each task a clear place to start.' },
  { icon: Terminal, title: 'Developer-friendly', copy: 'Clear interfaces and practical workflows that feel at home beside your editor and terminal.' },
  { icon: Zap, title: 'Lightweight desktop experience', copy: 'A responsive companion for the macOS and Linux direction, designed to stay out of your way.' },
  { icon: Sparkles, title: 'A foundation to extend', copy: 'An understandable open-source foundation for exploring new capabilities as the project evolves.' },
  { icon: ShieldCheck, title: 'Deliberate control', copy: 'Keep decisions about your environment and shared context visible instead of hidden behind the interface.' },
]

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="gaggle-site">
      <header className="site-header">
        <nav className="nav-shell" aria-label="Main navigation">
          <a className="brand" href="#top" aria-label="Gaggle home">
            <span className="brand-mark" aria-hidden="true"><Circle size={11} fill="currentColor" strokeWidth={0} /><Circle size={11} fill="currentColor" strokeWidth={0} /></span>
            <span>gaggle</span>
          </a>
          <button className="menu-toggle" aria-expanded={menuOpen} aria-controls="main-menu" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}<span className="sr-only">Toggle navigation</span>
          </button>
          <div id="main-menu" className={`nav-links ${menuOpen ? 'is-open' : ''}`}>
            <a href="#product" onClick={() => setMenuOpen(false)}>Product</a>
            <a href="#features" onClick={() => setMenuOpen(false)}>Features</a>
            <a href="#how-it-works" onClick={() => setMenuOpen(false)}>How it works</a>
            <a href="#community" onClick={() => setMenuOpen(false)}>Community</a>
            <a className="nav-github" href="https://github.com" target="_blank" rel="noreferrer"><GitBranch size={15} /> GitHub <ArrowUpRight size={13} /></a>
            <a className="button button-small" href="#get-started" onClick={() => setMenuOpen(false)}>Get started <ChevronRight size={15} /></a>
          </div>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-mark" aria-hidden="true"><Circle size={15} fill="currentColor" strokeWidth={0} /><Circle size={15} fill="currentColor" strokeWidth={0} /></div>
          <h1>Your AI.<br /><em>Your workspace.</em><br />Your rules.</h1>
          <p className="hero-copy">An open-source exploration of a more focused way to work with AI — built around your workspace, practical workflows, and a desktop-first experience.</p>
          <div className="hero-actions"><a className="button" href="#get-started">Get started <ChevronRight size={17} /></a><a className="text-link" href="https://github.com" target="_blank" rel="noreferrer"><GitBranch size={17} /> Explore on GitHub <ArrowUpRight size={15} /></a></div>
        </section>

        <section id="product" className="intro section-wrap section-border">
          <div className="section-kicker">01 / The idea</div>
          <div><h2>AI should fit your workflow. Not the other way around.</h2><p>Working with AI should not require you to rethink how you work. Your projects already have context, and your tools already have a place in your workflow. Gaggle explores a more focused approach: bringing assistance closer to the environment where your work happens.</p></div>
        </section>

        <section id="features" className="features section-wrap section-border">
          <div className="section-heading"><div><div className="section-kicker">02 / What matters</div><h2>Everything starts with the context that matters.</h2></div><p>Six design principles keep the assistant close to the work, without crowding it out.</p></div>
          <div className="feature-grid">{features.map(({ icon: Icon, title, copy }) => <article className="feature" key={title}><div className="feature-icon"><Icon size={19} strokeWidth={1.7} /></div><h3>{title}</h3><p>{copy}</p></article>)}</div>
        </section>

        <section className="showcase section-wrap section-border"><div className="showcase-copy"><div className="section-kicker">03 / The experience</div><h2>Less friction between an idea and the work.</h2><p>This interface preview shows the kind of workspace-centered flow Gaggle is exploring: selected context, visible progress, and next steps you can review without losing your place.</p><a className="text-link" href="#how-it-works">See how it works <ArrowUpRight size={15} /></a></div><ProductDetail /></section>

        <section id="how-it-works" className="steps section-wrap section-border"><div className="section-heading"><div><div className="section-kicker">04 / The workflow</div><h2>Start with context. Move with purpose.</h2></div></div><div className="step-grid">{[['01','Start with context','Begin with the workspace or project context supported by your current Gaggle setup.'],['02','Describe the task','Explain what you want to accomplish and provide the context the assistant needs.'],['03','Follow the workflow','Review the available progress information and examine the resulting output.']].map(([number,title,copy]) => <article className="step" key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></section>

        <section className="foundation section-wrap"><div className="foundation-card"><div className="section-kicker">05 / Under the hood</div><h2>Engineering choices worth understanding.</h2><p>Gaggle is being developed as a Rust desktop application with SQLite local persistence, with macOS and Linux in mind. The goal is a maintainable foundation that stays approachable as the project evolves.</p><div className="tech-row"><span><Terminal size={14} /> Rust</span><span><Circle size={9} fill="currentColor" /> SQLite</span><span><Command size={14} /> macOS + Linux</span></div></div></section>

        <section id="community" className="community section-wrap section-border"><div className="community-copy"><div className="section-kicker">06 / Built in the open</div><h2>Software is more interesting when you can explore how it works.</h2><p>Gaggle is an open-source project built to be explored, questioned, and improved. Whether you are interested in the architecture, the interface, or the direction of the project, the repository is the place to follow its development.</p></div><div className="community-links"><a href="https://github.com" target="_blank" rel="noreferrer"><GitBranch size={20} /> <span><strong>Explore the repository</strong><small>See the project on GitHub</small></span><ArrowUpRight size={16} /></a><a href="#get-started"><MessageSquare size={20} /> <span><strong>Start a conversation</strong><small>Share an idea or workflow</small></span><ChevronRight size={16} /></a></div></section>

        <section id="get-started" className="final section-wrap"><div className="final-mark" aria-hidden="true"><Circle size={15} fill="currentColor" strokeWidth={0} /><Circle size={15} fill="currentColor" strokeWidth={0} /></div><h2>Good tools should<br /><em>get out of the way.</em></h2><p>Explore Gaggle and follow an ongoing exploration of a more focused way to work with AI.</p><a className="button button-light" href="https://github.com" target="_blank" rel="noreferrer">View on GitHub <ArrowUpRight size={16} /></a></section>
      </main>

      <footer className="footer section-wrap"><div className="footer-brand"><a className="brand" href="#top"><span className="brand-mark" aria-hidden="true"><Circle size={11} fill="currentColor" strokeWidth={0} /><Circle size={11} fill="currentColor" strokeWidth={0} /></span><span>gaggle</span></a><p>A local-first AI assistant<br />for your real work.</p></div><div className="footer-nav"><div><span>Explore</span><a href="#product">Product</a><a href="#features">Features</a><a href="#how-it-works">How it works</a></div><div><span>Connect</span><a href="https://github.com" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={12} /></a><a href="#community">Community</a><a href="#get-started">Get started</a></div></div><div className="footer-bottom"><span>© 2026 Gaggle</span><span>Open-source, by design.</span></div></footer>
    </div>
  )
}

function ProductDetail() { return <div className="detail-window"><div className="detail-head"><span className="detail-title"><span className="online-dot" /> Task progress</span><span>Today, 10:42 AM</span></div><div className="detail-body"><div className="detail-row"><span className="detail-check"><Check size={13} /></span><div><strong>Read workspace context</strong><small>atlas-web / package.json</small></div><span className="detail-time">0.4s</span></div><div className="detail-row"><span className="detail-check"><Check size={13} /></span><div><strong>Review navigation patterns</strong><small>3 files inspected</small></div><span className="detail-time">1.2s</span></div><div className="detail-row pending"><span className="detail-check"><span className="spinner" /></span><div><strong>Prepare next steps</strong><small>Working with selected context</small></div><span className="detail-time">•••</span></div><div className="detail-note"><span className="note-line" />The agent keeps you in the loop, without getting in the way.</div></div></div> }
