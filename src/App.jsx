import { useEffect, useState } from 'react'

const systems = [
  {
    name: 'Anteroom Oracle',
    type: 'Intelligence Terminal',
    description: 'Macro and geopolitical research system for market context, historical parallels, scenario summaries, and risk signals.',
    stack: ['Python', 'Market Data', 'Geo Risk', 'Terminal UI'],
    repo: 'https://github.com/anteroom-studio/anteroom-oracle',
  },
  {
    name: 'Crypto Terminal',
    type: 'Live Market Interface',
    description: 'Institutional-style crypto interface for liquidity, execution quality, liquidation pressure, and live market reads.',
    stack: ['React', 'Vite', 'Live Data', 'GitHub Pages'],
    repo: 'https://github.com/anteroom-studio/Anteroom-Crypto-Terminal',
    live: 'https://anteroom-studio.github.io/Anteroom-Crypto-Terminal/',
  },
  {
    name: 'World Model',
    type: 'Research Engine',
    description: 'Historical macro engine for cross-asset relationships, stress-period comparison, and regime research.',
    stack: ['Python', 'Macro Data', 'Correlation', 'Research'],
    repo: 'https://github.com/anteroom-studio/anteroom-world-model',
  },
  {
    name: 'Data Model',
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
  'markets', 'restaurants', 'interfaces', 'research', 'motion', 'signals', 'systems', 'websites',
  'dashboards', 'studio', 'experiments', 'data', 'ops', 'founder', 'terminals', 'clients',
  'macro', 'crypto', 'design', 'software'
]

const principles = [
  'I am not attached to one category.',
  'A market terminal and a restaurant dashboard can come from the same instinct.',
  'The label changes. The structure stays.',
  'Anteroom is one expression — not the limit.',
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
        const ring = index % 2 === 0 ? 1 : 1.18
        const baseX = 50 + Math.cos(angle) * 31 * ring
        const baseY = 50 + Math.sin(angle) * 24 * ring
        const dx = baseX - mouse.x
        const dy = baseY - mouse.y
        const distance = Math.max(Math.sqrt(dx * dx + dy * dy), 1)
        const force = Math.max(0, 22 - distance) / 22
        const pushX = (dx / distance) * force * 32
        const pushY = (dy / distance) * force * 24
        const scale = 1 + force * 0.25

        return (
          <span
            key={word}
            className="creature-word"
            style={{
              left: `${baseX}%`,
              top: `${baseY}%`,
              transform: `translate(${pushX}px, ${pushY}px) rotate(${Math.sin(index * 1.7) * 12}deg) scale(${scale})`,
              animationDelay: `${index * -0.28}s`,
            }}
          >
            {word}
          </span>
        )
      })}
    </div>
  )
}

function ExclusionStatement() {
  return (
    <section className="exclusion-section" aria-label="builder statement">
      <div className="exclusion-wrap">
        <div className="shape-left" aria-hidden="true"></div>
        <div className="shape-right" aria-hidden="true"></div>
        <p className="eyebrow">Shape of the Work</p>
        <p className="exclusion-copy">
          I move between domains because the work underneath is the same. A trading terminal, a restaurant dashboard, a research model, and a client website are all different surfaces over one deeper instinct: organize chaos into something people can use. The tools change. The structure does not. Anteroom is one room in that architecture — not the building.
        </p>
      </div>
    </section>
  )
}

export default function App() {
  return (
    <main className="site-shell">
      <nav className="nav">
        <a className="brand" href="#top" aria-label="Zawwar Sami home">
          <span className="brand-mark">ZS</span>
          <span>
            <strong>Zawwar Sami</strong>
            <small>Independent Systems Builder</small>
          </span>
        </a>
        <div className="nav-links">
          <a href="#systems">Systems</a>
          <a href="#studio">Beyond</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section id="top" className="hero hero-centered">
        <LivingField />
        <div className="hero-core">
          <p className="eyebrow">Founder of Anteroom · Builder beyond it</p>
          <h1>Systems before labels.</h1>
          <p className="vision-line">Markets. Operations. Research. Websites. Interfaces that move.</p>
          <p className="lede">
            I build across domains — taking loose ideas, messy signals, and raw workflows, then shaping them into software that feels alive and useful.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#systems">Enter the Work</a>
            <a className="button" href="https://github.com/Zawwarsami16" target="_blank" rel="noreferrer">GitHub</a>
            <a className="button" href="https://github.com/anteroom-studio" target="_blank" rel="noreferrer">Anteroom</a>
          </div>
        </div>
      </section>

      <ExclusionStatement />

      <section id="systems" className="systems-section">
        <div className="section-heading">
          <p className="eyebrow">Selected Work</p>
          <h2>Different domains. Same instinct.</h2>
          <p>Research systems, terminals, dashboards, and client websites — some under Anteroom, some beyond it.</p>
        </div>
        <div className="project-grid">
          {systems.map((project, index) => <ProjectCard key={project.name} project={project} index={index} />)}
        </div>
      </section>

      <section id="studio" className="studio-section beyond-section">
        <div className="beyond-copy">
          <p className="eyebrow">Beyond the Studio</p>
          <h2>Anteroom is not the ceiling. It is one room.</h2>
          <p className="lede compact">
            My work is not tied to one industry or one label. The pattern is the same: find the signal, build the structure, make the interface feel inevitable.
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
        <span>Zawwar Sami / Beyond Anteroom</span>
        <span>Systems · Interfaces · Motion</span>
      </footer>
    </main>
  )
}
