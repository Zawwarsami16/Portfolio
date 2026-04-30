import { useEffect, useRef } from 'react'

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

function ParticleTextCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d', { alpha: true })
    const particles = []
    const mouse = { x: -9999, y: -9999, active: false }
    let width = 0
    let height = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let animationId

    const phrases = ['SYSTEMS', 'BEFORE', 'LABELS']

    const buildParticles = () => {
      const rect = canvas.parentElement.getBoundingClientRect()
      width = Math.max(320, rect.width)
      height = Math.max(420, rect.height)
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const off = document.createElement('canvas')
      const offCtx = off.getContext('2d')
      off.width = Math.floor(width)
      off.height = Math.floor(height)
      offCtx.clearRect(0, 0, width, height)
      offCtx.textAlign = 'center'
      offCtx.textBaseline = 'middle'
      offCtx.fillStyle = '#ffffff'
      offCtx.font = `900 ${Math.max(42, Math.min(width * 0.135, 118))}px Inter, system-ui, sans-serif`
      const lineHeight = Math.max(54, Math.min(width * 0.145, 126))
      const startY = height * 0.43 - lineHeight
      phrases.forEach((text, index) => offCtx.fillText(text, width / 2, startY + index * lineHeight))

      const imageData = offCtx.getImageData(0, 0, off.width, off.height).data
      const step = width < 640 ? 7 : 6
      particles.length = 0
      for (let y = 0; y < off.height; y += step) {
        for (let x = 0; x < off.width; x += step) {
          const alpha = imageData[(y * off.width + x) * 4 + 3]
          if (alpha > 80) {
            particles.push({
              x: Math.random() * width,
              y: Math.random() * height,
              tx: x,
              ty: y,
              vx: 0,
              vy: 0,
              r: Math.random() * 1.35 + 0.55,
              gold: Math.random() > 0.72,
              drift: Math.random() * Math.PI * 2,
            })
          }
        }
      }
    }

    const draw = time => {
      ctx.clearRect(0, 0, width, height)
      ctx.globalCompositeOperation = 'lighter'

      for (const p of particles) {
        const dx = p.tx - p.x
        const dy = p.ty - p.y
        p.vx += dx * 0.012
        p.vy += dy * 0.012

        if (mouse.active) {
          const mx = p.x - mouse.x
          const my = p.y - mouse.y
          const dist = Math.sqrt(mx * mx + my * my)
          const radius = 128
          if (dist < radius) {
            const force = (radius - dist) / radius
            p.vx += (mx / (dist || 1)) * force * 7.5
            p.vy += (my / (dist || 1)) * force * 7.5
          }
        }

        p.vx *= 0.82
        p.vy *= 0.82
        p.x += p.vx + Math.cos(time * 0.001 + p.drift) * 0.045
        p.y += p.vy + Math.sin(time * 0.001 + p.drift) * 0.045

        ctx.beginPath()
        ctx.fillStyle = p.gold ? 'rgba(198,169,107,.82)' : 'rgba(230,232,236,.62)'
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.globalCompositeOperation = 'source-over'
      animationId = requestAnimationFrame(draw)
    }

    const pointerMove = event => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = event.clientX - rect.left
      mouse.y = event.clientY - rect.top
      mouse.active = true
    }
    const pointerLeave = () => { mouse.active = false }

    buildParticles()
    animationId = requestAnimationFrame(draw)
    window.addEventListener('resize', buildParticles)
    canvas.addEventListener('pointermove', pointerMove)
    canvas.addEventListener('pointerleave', pointerLeave)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', buildParticles)
      canvas.removeEventListener('pointermove', pointerMove)
      canvas.removeEventListener('pointerleave', pointerLeave)
    }
  }, [])

  return <canvas ref={canvasRef} className="particle-canvas" aria-hidden="true" />
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

      <section id="top" className="hero hero-canvas">
        <ParticleTextCanvas />
        <div className="hero-overlay">
          <p className="eyebrow">Founder of Anteroom · Builder beyond it</p>
          <p className="vision-line">Markets. Operations. Research. Websites. Interfaces that move.</p>
          <p className="lede">
            I build across domains — turning loose signals and raw workflows into software that feels alive and useful.
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
