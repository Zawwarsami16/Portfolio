const systems = [
  {
    name: 'Anteroom Oracle',
    type: 'Flagship Intelligence Terminal',
    description: 'Macro and geopolitical research terminal combining market data, world-event signals, historical parallels, scenario summaries, and risk context.',
    stack: ['Python', 'Market Data', 'Geo Risk', 'Terminal UI'],
    repo: 'https://github.com/anteroom-studio/anteroom-oracle',
  },
  {
    name: 'Anteroom Crypto Terminal',
    type: 'Live Market Interface',
    description: 'Institutional-style crypto terminal for structure, liquidity, execution quality, market scans, liquidation pressure, and analyst reads.',
    stack: ['React', 'Vite', 'Live Data', 'GitHub Pages'],
    repo: 'https://github.com/anteroom-studio/Anteroom-Crypto-Terminal',
    live: 'https://anteroom-studio.github.io/Anteroom-Crypto-Terminal/',
  },
  {
    name: 'Anteroom World Model',
    type: 'Research Engine',
    description: 'Historical macro research system for cross-asset relationships, lead-lag behavior, stress-period comparison, and scenario analysis.',
    stack: ['Python', 'Macro Data', 'Correlation', 'Research'],
    repo: 'https://github.com/anteroom-studio/anteroom-world-model',
  },
  {
    name: 'Anteroom Data Model',
    type: 'Intelligence Core',
    description: 'Multi-source market and event intelligence system with local model support, news monitoring, hardware-aware execution, and terminal review.',
    stack: ['Python', 'RSS', 'Local LLM', 'Market Data'],
    repo: 'https://github.com/anteroom-studio/anteroom-data-model-2',
  },
  {
    name: 'Restaurant Intelligence',
    type: 'Operations System',
    description: 'Private multi-location restaurant operations dashboard for inventory movement, daily sales, delivery tracking, and role-based workflows.',
    stack: ['React', 'Supabase', 'Inventory', 'Internal Tool'],
  },
  {
    name: 'Heritage Shawarma Website',
    type: 'Client Website',
    description: 'Responsive restaurant website for Heritage Shawarma in Oshawa, built for menu discovery, local SEO, brand presence, and customer clarity.',
    stack: ['React', 'Vite', 'SEO', 'Client Work'],
  },
]

const principles = [
  'Build systems that feel useful before they feel impressive.',
  'Design interfaces with the density of tools and the clarity of products.',
  'Treat research output as signal context, not guaranteed prediction.',
  'Ship prototypes, then refine them into credible studio assets.',
]

const stats = [
  ['Studio', 'Anteroom'],
  ['Focus', 'Intelligence Systems'],
  ['Stack', 'Python · React · Vite'],
  ['Base', 'Toronto / Oshawa'],
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
          <a href="#studio">Studio</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section id="top" className="hero section-grid">
        <div className="hero-copy">
          <p className="eyebrow">Founder-minded builder · Anteroom Studio</p>
          <h1>Building intelligence systems, market terminals, and operational software with serious product discipline.</h1>
          <p className="lede">
            I design and build research tools, live dashboards, internal systems, and client-facing web experiences. My work sits between software engineering, interface design, market intelligence, and practical operations.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#systems">View Systems</a>
            <a className="button" href="https://github.com/Zawwarsami16" target="_blank" rel="noreferrer">GitHub</a>
            <a className="button" href="https://github.com/anteroom-studio" target="_blank" rel="noreferrer">Anteroom Studio</a>
          </div>
        </div>
        <aside className="hero-panel">
          <div className="terminal-topline">
            <span></span><span></span><span></span>
          </div>
          <p className="panel-label">Current Direction</p>
          <h2>Anteroom Stack</h2>
          <p>Macro research, crypto terminals, restaurant intelligence, and client websites — organized into one studio ecosystem.</p>
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
          <h2>Systems that form the Anteroom ecosystem.</h2>
          <p>Public research projects, live interfaces, private operational tools, and client work — presented as a coherent builder portfolio.</p>
        </div>
        <div className="project-grid">
          {systems.map((project, index) => <ProjectCard key={project.name} project={project} index={index} />)}
        </div>
      </section>

      <section id="studio" className="studio-section section-grid">
        <div>
          <p className="eyebrow">Design Philosophy</p>
          <h2>From experiments to credible software assets.</h2>
          <p className="lede compact">
            The goal is not to make projects look louder. It is to make them feel more intentional: better naming, cleaner structure, safer configuration, sharper interfaces, and stronger positioning.
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
        <h2>Open to serious builds, systems work, and studio collaborations.</h2>
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
