const systems = [
  {
    name: 'Anteroom Oracle',
    type: 'Flagship Intelligence Terminal',
    description: 'Macro and geopolitical research terminal for market context, historical parallels, scenario summaries, and risk signals.',
    stack: ['Python', 'Market Data', 'Geo Risk', 'Terminal UI'],
    repo: 'https://github.com/anteroom-studio/anteroom-oracle',
  },
  {
    name: 'Anteroom Crypto Terminal',
    type: 'Live Market Interface',
    description: 'Institutional-style crypto interface for liquidity, execution quality, liquidation pressure, and live market reads.',
    stack: ['React', 'Vite', 'Live Data', 'GitHub Pages'],
    repo: 'https://github.com/anteroom-studio/Anteroom-Crypto-Terminal',
    live: 'https://anteroom-studio.github.io/Anteroom-Crypto-Terminal/',
  },
  {
    name: 'Anteroom World Model',
    type: 'Research Engine',
    description: 'Historical macro engine for cross-asset relationships, stress-period comparison, and regime research.',
    stack: ['Python', 'Macro Data', 'Correlation', 'Research'],
    repo: 'https://github.com/anteroom-studio/anteroom-world-model',
  },
  {
    name: 'Anteroom Data Model',
    type: 'Intelligence Core',
    description: 'Multi-source intelligence core with market data, world-event monitoring, local model support, and terminal review.',
    stack: ['Python', 'RSS', 'Local LLM', 'Market Data'],
    repo: 'https://github.com/anteroom-studio/anteroom-data-model-2',
  },
  {
    name: 'Restaurant Intelligence',
    type: 'Operations System',
    description: 'Private restaurant operations dashboard for stock movement, sales reporting, deliveries, and role-based workflows.',
    stack: ['React', 'Supabase', 'Inventory', 'Internal Tool'],
  },
  {
    name: 'Heritage Shawarma Website',
    type: 'Client Website',
    description: 'Responsive restaurant website built for menu discovery, local SEO, brand presence, and customer clarity.',
    stack: ['React', 'Vite', 'SEO', 'Client Work'],
  },
]

const principles = [
  'Useful before impressive.',
  'Dense when needed. Clear always.',
  'Research signals, not guaranteed predictions.',
  'Prototype fast. Refine into credible assets.',
]

const stats = [
  ['Studio', 'Anteroom'],
  ['Focus', 'Systems'],
  ['Stack', 'Python · React'],
  ['Base', 'Ontario'],
]

function Badge({ children }) {
  return <span className="badge">{children}</span>
}

function ProjectCard({ project, index }) {
  return (
    <article className="project-card">
      <div className="project-index">0{index + 1}</div>
      <div>
        <p className="eyebrow">{project.type}</p>
        <h3>{project.name}</h3>
        <p className="project-copy">{project.description}</p>
        <div className="stack-row">
          {project.stack.map(item => <Badge key={item}>{item}</Badge>)}
        </div>
        <div className="project-links">
          {project.repo && <a href={project.repo} target="_blank" rel="noreferrer">Repository</a>}
          {project.live && <a href={project.live} target="_blank" rel="noreferrer">Live</a>}
        </div>
      </div>
    </article>
  )
}

export default function App() {
  return (
    <main className="site-shell">
      <nav className="nav">
        <a className="brand" href="#top" aria-label="Zawwar Sami home">
          <span className="brand-mark">A</span>
          <span>
            <strong>Zawwar Sami</strong>
            <small>Systems Portfolio</small>
          </span>
        </a>
        <div className="nav-links">
          <a href="#systems">Systems</a>
          <a href="#studio">Vision</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section id="top" className="hero">
        <div className="hero-left">
          <p className="eyebrow">Anteroom Studio · Systems Builder</p>
          <h1>Software with structure.</h1>
          <p className="vision-line">Intelligence terminals. Research engines. Operational dashboards. Client websites.</p>
          <p className="lede">
            I build focused software systems that turn messy information into usable interfaces.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#systems">View Work</a>
            <a className="button" href="https://github.com/anteroom-studio" target="_blank" rel="noreferrer">Studio</a>
          </div>
        </div>

        <aside className="hero-panel">
          <div className="terminal-topline"><span></span><span></span><span></span></div>
          <p className="panel-label">Current Build Direction</p>
          <h2>One stack. Multiple systems.</h2>
          <p>Market intelligence, macro research, internal operations, and client-facing products under one studio direction.</p>
          <div className="stat-grid">
            {stats.map(([label, value]) => (
              <div className="stat" key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section id="systems" className="systems-section">
        <div className="section-heading">
          <p className="eyebrow">Selected Work</p>
          <h2>Systems, not scattered projects.</h2>
          <p>A curated stack of research tools, market terminals, operations software, and client-facing websites.</p>
        </div>
        <div className="project-grid">
          {systems.map((project, index) => <ProjectCard key={project.name} project={project} index={index} />)}
        </div>
      </section>

      <section id="studio" className="studio-section section-grid">
        <div>
          <p className="eyebrow">Vision</p>
          <h2>Build fast. Polish hard. Present clearly.</h2>
          <p className="lede compact">
            The work is moving from experiments into a coherent studio portfolio: cleaner names, safer configuration, better interfaces, and stronger positioning.
          </p>
        </div>
        <div className="principles">
          {principles.map((item, index) => (
            <div className="principle" key={item}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="contact-section">
        <p className="eyebrow">Contact</p>
        <h2>For serious builds, systems work, and product collaborations.</h2>
        <div className="contact-links">
          <a href="https://github.com/Zawwarsami16" target="_blank" rel="noreferrer">Personal GitHub</a>
          <a href="https://github.com/anteroom-studio" target="_blank" rel="noreferrer">Anteroom Studio</a>
          <a href="mailto:contact@anteroom.studio">contact@anteroom.studio</a>
        </div>
      </section>

      <footer>
        <span>ANTEROOM / Zawwar Sami</span>
        <span>Systems · Interfaces · Intelligence</span>
      </footer>
    </main>
  )
}
