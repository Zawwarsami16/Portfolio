import { useState, useEffect } from 'react'
const links = [
  {label:'about',    href:'#about'},
  {label:'work',     href:'#repos'},
  {label:'activity', href:'#activity'},
  {label:'skills',   href:'#skills'},
  {label:'contact',  href:'#contact'},
]
export default function Nav({ ghUser }) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', h, {passive:true})
    return () => window.removeEventListener('scroll', h)
  }, [])
  return (
    <nav style={{
      position:'fixed',top:0,left:0,right:0,zIndex:100,
      display:'flex',alignItems:'center',justifyContent:'space-between',
      padding:'16px 48px',
      background: scrolled ? 'rgba(3,3,6,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,45,78,0.12)' : '1px solid transparent',
      transition:'all 0.4s',
    }}>
      <a href="#hero" style={{fontFamily:'var(--font-display)',fontSize:'24px',fontWeight:600,
        letterSpacing:'6px',color:'var(--rose)',textShadow:'0 0 20px rgba(255,45,78,0.4)'}}>ZAI</a>
      <div style={{display:'flex',gap:'28px',alignItems:'center'}}>
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
            border:'1px solid rgba(255,45,78,0.3)',padding:'6px 14px',
            borderRadius:'2px',transition:'all 0.2s'}}
          onMouseEnter={e=>{e.target.style.background='var(--rose)';e.target.style.color='#fff'}}
          onMouseLeave={e=>{e.target.style.background='transparent';e.target.style.color='var(--rose)'}}
        >GitHub ↗</a>
      </div>
    </nav>
  )
}
