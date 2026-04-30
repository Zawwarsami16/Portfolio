import { useEffect } from 'react'

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
    description: 'Crypto interface for liquidity, execution quality, liquidation pressure, and live market reads.',
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

const principles = [
  'I am not attached to one category.',
  'A market terminal and a restaurant dashboard can come from the same instinct.',
  'The label changes. The structure stays.',
  'Anteroom is one expression — not the limit.',
]

const layers = [
  { text: 'markets', speed: -0.18, x: '7%', y: '18%' },
  { text: 'restaurants', speed: 0.24, x: '68%', y: '16%' },
  { text: 'research', speed: -0.32, x: '12%', y: '66%' },
  { text: 'interfaces', speed: 0.18, x: '72%', y: '70%' },
  { text: 'systems', speed: -0.12, x: '42%', y: '9%' },
  { text: 'beyond', speed: 0.30, x: '46%', y: '82%' },
  { text: 'motion', speed: -0.26, x: '82%', y: '42%' },
  { text: 'structure', speed: 0.14, x: '5%', y: '45%' },
]

function Badge({ children }) {
  return <span className="badge">{children}</span>
}

function ProjectCard({ project, index }) {
  return (
    <article className="project-card parallax-card reveal" style={{ '--delay': `${index * 70}ms` }}>
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

function ParallaxController() {
  useEffect(() => {
    let raf = 0
    const root = document.documentElement

    const update = () => {
      const scroll = window.scrollY || 0
      const max = Math.max(1, document.body.scrollHeight - window.innerHeight)
      root.style.setProperty('--scroll', `${scroll}`)
      root.style.setProperty('--scroll-progress', `${scroll / max}`)
      raf = 0
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    const onMouseMove = event => {
      root.style.setProperty('--mx', `${event.clientX / window.innerWidth - 0.5}`)
      root.style.setProperty('--my', `${event.clientY / window.innerHeight - 0.5}`)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('mousemove', onMouseMove)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousemove', onMouseMove)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return null
}

function ParallaxHero() {
  return (
    <section id="top" className="hero hero-parallax">
      <div className="parallax-stage" aria-hidden="true">
        <div className="orb orb-one"></div>
        <div className="orb orb-two"></div>
        <div className="orb orb-three"></div>
        <div className="depth-grid"></div>
        <div className="depth-ring ring-one"></div>
        <div className="depth-ring ring-two"></div>
        {layers.map(layer => (
          <span
            key={layer.text}
            className="parallax-word"
            style={{ left: layer.x, top: layer.y, '--speed': layer.speed }}
          >
            {layer.text}
          </span>
        ))}
      </div>

      <div className="hero-center reveal strong-reveal">
        <p className="eyebrow">Zawwar Sami · Founder of Anteroom</p>
        <h1>Beyond one room.</h1>
        <p className="vision-line">I build across markets, restaurants, research, websites, and strange interfaces.</p>
        <p className="lede">
          Anteroom is one expression. The deeper work is turning messy ideas into systems people can actually use.
        </p>
        <div className="hero-actions">
          <a className="button primary" href="#systems">Enter the Work</a>
          <a className="button" href="https://github.com/Zawwarsami16" target="_blank" rel="noreferrer">GitHub</a>
          <a className="button" href="https://github.com/anteroom-studio" target="_blank" rel="noreferrer">Anteroom</a>
        </div>
      </div>
    </section>
  )
}

function ExclusionStatement() {
  return (
    <section className="exclusion-section reveal" aria-label="builder statement">
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
      <ParallaxController />
      <nav className="nav">
        <a className="brand" href="#top" aria-label="Zawwar Sami home">
          <span className="brand-mark">ZS</span>
          <span>
            <strong>Zawwar Sami</strong>
            <small>Independent Builder</small>
          </span>
        </a>
        <div className="nav-links">
          <a href="#systems">Systems</a>
          <a href="#studio">Beyond</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <ParallaxHero />
      <ExclusionStatement />

      <section id="systems" className="systems-section parallax-section reveal">
        <div className="section-heading">
          <p className="eyebrow">Selected Work</p>
          <h2>Different domains. Same instinct.</h2>
          <p>Research systems, terminals, dashboards, and client websites — some under Anteroom, some beyond it.</p>
        </div>
        <div className="project-grid">
          {systems.map((project, index) => <ProjectCard key={project.name} project={project} index={index} />)}
        </div>
      </section>

      <section id="studio" className="studio-section beyond-section parallax-section reveal">
        <div className="beyond-copy">
          <p className="eyebrow">Beyond the Studio</p>
          <h2>Anteroom is not the ceiling. It is one room.</h2>
          <p className="lede compact">
            My work is not tied to one industry or one label. The pattern is the same: find the signal, build the structure, make the interface feel inevitable.
          </p>
        </div>
        <div className="principles">
          {principles.map((item, index) => (
            <div className="principle parallax-card reveal" style={{ '--delay': `${index * 90}ms` }} key={item}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="contact-section parallax-section reveal">
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
