// Hero.jsx — undefined identity, nebula bg, no loot crate

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Hero({ user, totalStars, totalForks, ghUser }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo('[data-hero]',
        { opacity:0, y:50, rotateX:12 },
        { opacity:1, y:0,  rotateX:0, duration:1.3, stagger:0.12, ease:'power3.out', delay:0.3 }
      )
    }, ref)
    return () => ctx.revert()
  }, [user])

  const stats = [
    { label:'repos',     value:user?.public_repos ?? '—', color:'var(--gold)' },
    { label:'followers', value:user?.followers    ?? '—', color:'var(--rose)' },
    { label:'stars',     value:totalStars          ?? '—', color:'#ff6b6b'   },
    { label:'forks',     value:totalForks          ?? '—', color:'var(--gold)'},
  ]

  return (
    <section id="hero" ref={ref} style={{
      minHeight:'100vh', display:'flex', flexDirection:'column',
      alignItems:'center', justifyContent:'center',
      textAlign:'center', padding:'140px 40px 100px',
      position:'relative', overflow:'hidden',
    }}>

      {/* badge */}
      <div data-hero style={{
        display:'inline-flex', alignItems:'center', gap:'10px',
        fontFamily:'var(--font-mono)', fontSize:'10px', letterSpacing:'4px',
        textTransform:'uppercase', color:'rgba(255,255,255,0.55)',
        border:'1px solid rgba(255,255,255,0.12)', padding:'7px 20px',
        borderRadius:'2px', marginBottom:'32px',
        background:'rgba(0,0,0,0.3)', backdropFilter:'blur(8px)',
        position:'relative', overflow:'hidden',
      }}>
        <span style={{position:'absolute',inset:0,background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.04),transparent)',animation:'shimmer 3s infinite'}}/>
        <span style={{width:'6px',height:'6px',borderRadius:'50%',background:'var(--rose)',boxShadow:'0 0 10px var(--rose)',display:'inline-block',animation:'pulse 1.8s infinite'}}/>
        identity.exe — not found
      </div>

      {/* ZAI */}
      <div data-hero style={{position:'relative',marginBottom:'8px'}}>
        <h1 style={{
          fontFamily:'var(--font-display)',
          fontSize:'clamp(80px,17vw,200px)',
          fontWeight:300, letterSpacing:'18px', lineHeight:1,
          background:'linear-gradient(135deg,#fff 0%,var(--gold) 28%,#fff 50%,var(--rose) 76%,#fff 100%)',
          backgroundSize:'250% auto',
          WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
          filter:'drop-shadow(0 0 50px rgba(255,45,78,0.3))',
          userSelect:'none', animation:'shimmerText 5s linear infinite',
        }}>ZAI</h1>
        <h1 aria-hidden style={{
          position:'absolute',inset:0,
          fontFamily:'var(--font-display)',
          fontSize:'clamp(80px,17vw,200px)',
          fontWeight:300,letterSpacing:'18px',lineHeight:1,
          WebkitTextFillColor:'var(--rose)',opacity:0.10,
          transform:'translate(-3px,2px)',userSelect:'none',pointerEvents:'none',
          animation:'glitch 9s infinite 4s',
        }}>ZAI</h1>
      </div>

      {/* typeof */}
      <div data-hero style={{
        fontFamily:'var(--font-mono)', fontSize:'clamp(12px,1.5vw,15px)',
        letterSpacing:'6px', marginBottom:'14px', color:'rgba(255,255,255,0.50)',
      }}>
        <span style={{color:'var(--gold)'}}>typeof </span>
        <span style={{color:'var(--rose)'}}>ZAI</span>
        <span style={{color:'rgba(255,255,255,0.28)'}}> === </span>
        <span style={{color:'rgba(255,255,255,0.82)',fontStyle:'italic',animation:'flicker 7s infinite'}}>"undefined"</span>
      </div>

      {/* tagline */}
      <p data-hero style={{
        fontFamily:'var(--font-sans)', fontSize:'clamp(13px,1.4vw,17px)',
        fontWeight:300, color:'rgba(255,255,255,0.60)',
        maxWidth:'460px', lineHeight:1.9, marginBottom:'52px',
        letterSpacing:'0.3px', fontStyle:'italic',
      }}>
        just wandering through dimensions that shouldn't exist
      </p>

      {/* stats */}
      <div data-hero style={{display:'flex',gap:'36px',flexWrap:'wrap',justifyContent:'center',marginBottom:'52px'}}>
        {stats.map(s => (
          <div key={s.label} style={{textAlign:'center'}}>
            <div style={{
              fontFamily:'var(--font-display)', fontSize:'clamp(28px,4vw,52px)',
              fontWeight:400, color:s.color, lineHeight:1,
              textShadow:`0 0 24px ${s.color}88`,
            }}>{s.value}</div>
            <div style={{
              fontFamily:'var(--font-mono)', fontSize:'9px', letterSpacing:'2px',
              color:'var(--text4)', textTransform:'uppercase', marginTop:'4px',
            }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* CTAs */}
      <div data-hero style={{display:'flex',gap:'14px',flexWrap:'wrap',justifyContent:'center'}}>
        <a href="#repos" style={{
          fontFamily:'var(--font-mono)',fontSize:'11px',letterSpacing:'3px',
          textTransform:'lowercase',background:'var(--rose)',color:'#fff',
          padding:'13px 30px',borderRadius:'2px',fontWeight:500,
          transition:'all 0.25s',boxShadow:'0 0 28px rgba(255,45,78,0.4)',
        }}
          onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-4px)';e.currentTarget.style.boxShadow='0 10px 36px rgba(255,45,78,0.6)'}}
          onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow='0 0 28px rgba(255,45,78,0.4)'}}
        >// experiments</a>

        <a href={`https://github.com/${ghUser}`} target="_blank" rel="noopener noreferrer"
          style={{
            fontFamily:'var(--font-mono)',fontSize:'11px',letterSpacing:'3px',
            textTransform:'lowercase',background:'rgba(0,0,0,0.3)',
            backdropFilter:'blur(8px)',
            color:'rgba(255,255,255,0.65)',padding:'13px 30px',borderRadius:'2px',
            border:'1px solid rgba(255,255,255,0.15)',transition:'all 0.25s',
          }}
          onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--rose)';e.currentTarget.style.color='var(--rose)';e.currentTarget.style.transform='translateY(-4px)'}}
          onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,0.15)';e.currentTarget.style.color='rgba(255,255,255,0.65)';e.currentTarget.style.transform='none'}}
        >github ↗</a>
      </div>

      {/* scroll */}
      <div style={{
        position:'absolute',bottom:'28px',left:'50%',transform:'translateX(-50%)',
        fontFamily:'var(--font-mono)',fontSize:'9px',letterSpacing:'4px',
        color:'rgba(255,255,255,0.22)',textTransform:'uppercase',
        animation:'float 3s ease-in-out infinite',
      }}>scroll ↓</div>
    </section>
  )
}
