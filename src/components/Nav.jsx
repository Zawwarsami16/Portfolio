import { useState, useEffect } from 'react'

const links = [
  {label:'about',    href:'#about'},
  {label:'work',     href:'#repos'},
  {label:'activity', href:'#activity'},
  {label:'skills',   href:'#skills'},
  {label:'contact',  href:'#contact'},
]

export default function Nav({ ghUser }) {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', h, {passive:true})
    return () => window.removeEventListener('scroll', h)
  }, [])

  return (
    <>
      <nav style={{
        position:'fixed', top:0, left:0, right:0, zIndex:100,
        display:'flex', alignItems:'center', justifyContent:'space-between',
        padding:'14px 24px',
        background: scrolled ? 'rgba(3,3,6,0.94)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,45,78,0.10)' : '1px solid transparent',
        transition:'all 0.4s',
      }}>
        <a href="#hero" style={{fontFamily:'var(--font-display)',fontSize:'22px',fontWeight:600,
          letterSpacing:'6px',color:'var(--rose)',textShadow:'0 0 18px rgba(255,45,78,0.4)',
          flexShrink:0}}>ZAI</a>

        {/* Desktop links */}
        <div className="nav-desktop" style={{display:'flex',gap:'24px',alignItems:'center'}}>
          {links.map(l=>(
            <a key={l.href} href={l.href} style={{fontFamily:'var(--font-mono)',fontSize:'10px',
              letterSpacing:'2px',color:'var(--text3)',transition:'color 0.2s'}}
              onMouseEnter={e=>e.target.style.color='var(--rose)'}
              onMouseLeave={e=>e.target.style.color='var(--text3)'}
            >// {l.label}</a>
          ))}
          <a href={`https://github.com/${ghUser}`} target="_blank" rel="noopener noreferrer"
            style={{fontFamily:'var(--font-mono)',fontSize:'9px',letterSpacing:'2px',
              textTransform:'uppercase',color:'var(--rose)',
              border:'1px solid rgba(255,45,78,0.3)',padding:'6px 12px',
              borderRadius:'2px',transition:'all 0.2s',whiteSpace:'nowrap'}}
            onMouseEnter={e=>{e.target.style.background='var(--rose)';e.target.style.color='#fff'}}
            onMouseLeave={e=>{e.target.style.background='transparent';e.target.style.color='var(--rose)'}}
          >GitHub ↗</a>
        </div>

        {/* Hamburger */}
        <button
          className="nav-burger"
          onClick={() => setMenuOpen(v => !v)}
          style={{
            display:'none', background:'none', border:'none',
            color:'var(--rose)', fontSize:'22px', cursor:'pointer',
            padding:'4px', lineHeight:1,
          }}
        >{menuOpen ? '✕' : '☰'}</button>
      </nav>

      {/* Mobile dropdown */}
      <div style={{
        position:'fixed', top:'52px', left:0, right:0, zIndex:99,
        background:'rgba(3,3,6,0.97)', backdropFilter:'blur(16px)',
        borderBottom:'1px solid rgba(255,45,78,0.12)',
        maxHeight: menuOpen ? '400px' : '0',
        overflow:'hidden',
        transition:'max-height 0.35s ease',
      }}>
        <div style={{padding:'16px 24px',display:'flex',flexDirection:'column',gap:'4px'}}>
          {links.map(l=>(
            <a key={l.href} href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{fontFamily:'var(--font-mono)',fontSize:'13px',letterSpacing:'2px',
                color:'rgba(255,255,255,0.65)',padding:'12px 0',
                borderBottom:'1px solid rgba(255,255,255,0.05)',
                transition:'color 0.2s'}}
              onMouseEnter={e=>e.target.style.color='var(--rose)'}
              onMouseLeave={e=>e.target.style.color='rgba(255,255,255,0.65)'}
            >// {l.label}</a>
          ))}
          <a href={`https://github.com/${ghUser}`} target="_blank" rel="noopener noreferrer"
            style={{fontFamily:'var(--font-mono)',fontSize:'13px',letterSpacing:'2px',
              color:'var(--rose)',padding:'12px 0',marginTop:'4px'}}
          >GitHub ↗</a>
        </div>
      </div>

      <style>{`
        @media(max-width:768px){
          .nav-desktop { display:none !important; }
          .nav-burger  { display:block !important; }
        }
      `}</style>
    </>
  )
}
