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

function SnakeTextCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d', { alpha: true })
    let width = 0
    let height = 0
    let dpr = 1
    let raf
    let particles = []
    const mouse = { x: 0, y: 0, active: false }
    const snake = Array.from({ length: 46 }, () => ({ x: 0, y: 0 }))
    const phrase = 'ZAWWAR SAMI  SYSTEMS  MOTION  MARKETS  RESTAURANTS  RESEARCH  INTERFACES  BEYOND ANTEROOM  '

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect()
      width = Math.max(320, rect.width)
      height = Math.max(520, rect.height)
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      makeParticles()
      snake.forEach((node, i) => {
        node.x = width * 0.5 - i * 10
        node.y = height * 0.5
      })
    }

    const makeParticles = () => {
      particles = []
      const columns = width < 700 ? 20 : 34
      const rows = width < 700 ? 12 : 16
      const startX = width * 0.08
      const endX = width * 0.92
      const startY = height * 0.18
      const endY = height * 0.84
      let charIndex = 0

      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < columns; col += 1) {
          const char = phrase[charIndex % phrase.length]
          charIndex += 1
          if (char === ' ') continue
          const tx = startX + (col / Math.max(columns - 1, 1)) * (endX - startX)
          const ty = startY + (row / Math.max(rows - 1, 1)) * (endY - startY)
          particles.push({
            char,
            x: tx + (Math.random() - 0.5) * 80,
            y: ty + (Math.random() - 0.5) * 80,
            tx,
            ty,
            vx: 0,
            vy: 0,
            size: 11 + Math.random() * 8,
            tone: Math.random(),
          })
        }
      }
    }

    const pointerMove = event => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = event.clientX - rect.left
      mouse.y = event.clientY - rect.top
      mouse.active = true
    }
    const pointerLeave = () => { mouse.active = false }

    const drawSnake = time => {
      const targetX = mouse.active ? mouse.x : width * 0.5 + Math.cos(time * 0.0005) * width * 0.30
      const targetY = mouse.active ? mouse.y : height * 0.5 + Math.sin(time * 0.0007) * height * 0.25

      snake[0].x += (targetX - snake[0].x) * 0.07
      snake[0].y += (targetY - snake[0].y) * 0.07

      for (let i = 1; i < snake.length; i += 1) {
        const prev = snake[i - 1]
        const node = snake[i]
        const dx = prev.x - node.x
        const dy = prev.y - node.y
        const dist = Math.sqrt(dx * dx + dy * dy) || 1
        const spacing = 11
        node.x += (dx / dist) * (dist - spacing) * 0.48
        node.y += (dy / dist) * (dist - spacing) * 0.48
      }

      ctx.save()
      ctx.shadowBlur = 22
      ctx.shadowColor = 'rgba(198,169,107,.36)'
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'

      // Soft trail underneath
      ctx.beginPath()
      snake.forEach((node, i) => {
        if (i === 0) ctx.moveTo(node.x, node.y)
        else ctx.lineTo(node.x, node.y)
      })
      ctx.strokeStyle = 'rgba(198,169,107,.075)'
      ctx.lineWidth = 32
      ctx.stroke()

      // Segmented body with tapering scales
      for (let i = snake.length - 1; i >= 0; i -= 1) {
        const node = snake[i]
        const next = snake[Math.max(i - 1, 0)]
        const angle = Math.atan2(next.y - node.y, next.x - node.x)
        const taper = 1 - i / snake.length
        const wave = Math.sin(time * 0.006 + i * 0.65) * 2.2
        const bodyW = 4 + taper * 15
        const bodyH = 3 + taper * 9

        ctx.save()
        ctx.translate(node.x, node.y + wave)
        ctx.rotate(angle)
        ctx.fillStyle = i % 2 === 0 ? 'rgba(198,169,107,.58)' : 'rgba(230,232,236,.42)'
        ctx.strokeStyle = 'rgba(4,6,10,.45)'
        ctx.lineWidth = 0.8
        ctx.beginPath()
        ctx.ellipse(0, 0, bodyW, bodyH, 0, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()

        if (i % 4 === 0 && i > 2) {
          ctx.fillStyle = 'rgba(154,215,255,.20)'
          ctx.beginPath()
          ctx.arc(-bodyW * 0.15, -bodyH * 0.25, Math.max(1, bodyH * 0.22), 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.restore()
      }

      // Head, eyes, tongue
      const head = snake[0]
      const neck = snake[1]
      const headAngle = Math.atan2(head.y - neck.y, head.x - neck.x)
      ctx.save()
      ctx.translate(head.x, head.y)
      ctx.rotate(headAngle)
      ctx.shadowBlur = 18
      ctx.shadowColor = 'rgba(198,169,107,.45)'
      ctx.fillStyle = 'rgba(198,169,107,.96)'
      ctx.strokeStyle = 'rgba(255,255,255,.22)'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.ellipse(0, 0, 18, 12, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()

      ctx.fillStyle = '#05070c'
      ctx.beginPath(); ctx.arc(6, -4, 2.4, 0, Math.PI * 2); ctx.fill()
      ctx.beginPath(); ctx.arc(6, 4, 2.4, 0, Math.PI * 2); ctx.fill()

      const flick = Math.sin(time * 0.018) * 5
      ctx.strokeStyle = 'rgba(232,131,147,.92)'
      ctx.lineWidth = 1.4
      ctx.beginPath()
      ctx.moveTo(16, 0)
      ctx.lineTo(28 + flick, -5)
      ctx.moveTo(16, 0)
      ctx.lineTo(28 + flick, 5)
      ctx.stroke()
      ctx.restore()

      ctx.restore()
    }

    const tick = time => {
      ctx.clearRect(0, 0, width, height)
      ctx.globalCompositeOperation = 'source-over'
      drawSnake(time)

      for (const p of particles) {
        let repelX = 0
        let repelY = 0
        let strongest = 0

        for (let i = 0; i < snake.length; i += 3) {
          const node = snake[i]
          const dx = p.x - node.x
          const dy = p.y - node.y
          const dist = Math.sqrt(dx * dx + dy * dy) || 1
          const radius = 96 - i * 0.65
          if (dist < radius) {
            const force = (radius - dist) / radius
            repelX += (dx / dist) * force * 8
            repelY += (dy / dist) * force * 8
            strongest = Math.max(strongest, force)
          }
        }

        p.vx += (p.tx - p.x) * 0.018 + repelX
        p.vy += (p.ty - p.y) * 0.018 + repelY
        p.vx *= 0.78
        p.vy *= 0.78
        p.x += p.vx
        p.y += p.vy

        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate((p.vx + p.vy) * 0.015)
        ctx.font = `700 ${p.size + strongest * 7}px Inter, system-ui, sans-serif`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillStyle = p.tone > 0.78
          ? `rgba(198,169,107,${0.34 + strongest * 0.48})`
          : `rgba(230,232,236,${0.18 + strongest * 0.52})`
        ctx.fillText(p.char, 0, 0)
        ctx.restore()
      }

      raf = requestAnimationFrame(tick)
    }

    resize()
    raf = requestAnimationFrame(tick)
    window.addEventListener('resize', resize)
    canvas.addEventListener('pointermove', pointerMove)
    canvas.addEventListener('pointerleave', pointerLeave)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('pointermove', pointerMove)
      canvas.removeEventListener('pointerleave', pointerLeave)
    }
  }, [])

  return <canvas ref={canvasRef} className="snake-canvas" aria-hidden="true" />
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
            <small>Independent Builder</small>
          </span>
        </a>
        <div className="nav-links">
          <a href="#systems">Systems</a>
          <a href="#studio">Beyond</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section id="top" className="hero hero-snake">
        <SnakeTextCanvas />
        <div className="hero-overlay personal-overlay">
          <p className="eyebrow">Zawwar Sami · Founder of Anteroom</p>
          <h1>Beyond one room.</h1>
          <p className="vision-line">Markets. Restaurants. Research. Websites. Strange interfaces.</p>
          <p className="lede">
            I build whatever the idea demands — tools that crawl, react, organize, and become useful.
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
