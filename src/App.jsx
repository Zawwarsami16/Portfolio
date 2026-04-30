import { useEffect, useState } from 'react'

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

const orbitWords = [
  'oracle', 'markets', 'systems', 'signals', 'research', 'interfaces', 'models', 'ops',
  'crypto', 'macro', 'dashboards', 'data', 'risk', 'terminal', 'clients', 'studio'
]

const principles = [
  'Useful before impressive.',
  'Dense when needed. Clear always.',
  'Research signals, not guaranteed predictions.',
  'Prototype fast. Refine into credible assets.',
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

function LivingField() {
  const [mouse, setMouse] = useState({ x: 50, y: 50 })

  useEffect(() => {
    const move = event => {
      setMouse({
        x: (event.clientX / window.innerWidth) * 100,
        y: (event.clientY / window.innerHeight) * 100,
      })
    }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [])

  return (
    <div className="living-field" aria-hidden="true">
      {orbitWords.map((word, index) => {
        const angle = (index / orbitWords.length) * Math.PI * 2
        const baseX = 50 + Math.cos(angle) * (28 + (index % 3) * 4)
        const baseY = 50 + Math.sin(angle) * (22 + (index % 4) * 3)
        const dx = baseX - mouse.x
        const dy = baseY - mouse.y
        const distance = Math.max(Math.sqrt(dx * dx + dy * dy), 1)
        const force = Math.max(0, 18 - distance) / 18
        const pushX = (dx / distance) * force * 24
        const pushY = (dy / distance) * force * 18

        return (
          <span
            key={word}
            className="creature-word"
            style={{
              left: `${baseX}%`,
              top: `${baseY}%`,
              transform: `translate(${pushX}px, ${pushY}px) rotate(${Math.sin(index) * 10}deg)`,
              animationDelay: `${index * -0.35}s`,
            }}
          >
            {word}
          </span>
        )
      })}
    </div>
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

      <section id="top" className="hero hero-centered">
        <LivingField />
        <div className="hero-core">
          <p className="eyebrow">Anteroom Studio · Systems Builder</p>
          <h1>Software with structure.</h1>
          <p className="vision-line">Signals into systems. Systems into products.</p>
          <p className="lede">
            I build intelligence terminals, research engines, operational dashboards, and client websites — with motion, discipline, and a little madness.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#systems">View Work</a>
            <a className="button" href="https://github.com/anteroom-studio" target="_blank" rel="noreferrer">Studio</a>
          </div>
        </div>
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
