import { useEffect, useRef } from 'react'
import AnimatedSection from './AnimatedSection.jsx'
import Card3D from './Card3D.jsx'
import { langColor } from '../utils/helpers.js'

export default function Skills({ repos }) {
  const barsRef = useRef(null)

  const counts = {}
  repos.forEach(r => { if (r.language) counts[r.language] = (counts[r.language]||0)+1 })
  const sorted = Object.entries(counts).sort((a,b)=>b[1]-a[1])
  const max    = sorted[0]?.[1]||1

  // animate bars when they enter viewport
  useEffect(() => {
    if (!barsRef.current) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        barsRef.current.querySelectorAll('[data-bar]').forEach((el, i) => {
          setTimeout(() => {
            el.style.width = el.dataset.bar
          }, i * 80)
        })
        obs.disconnect()
      }
    }, { threshold: 0.2 })
    obs.observe(barsRef.current)
    return () => obs.disconnect()
  }, [sorted.length])

  return (
    <section id="skills" style={{ padding:'100px 48px',maxWidth:'1100px',margin:'0 auto' }}>
      <AnimatedSection direction="scale">
        <div style={{ marginBottom:'48px' }}>
          <div style={{ fontFamily:'var(--font-mono)',fontSize:'10px',letterSpacing:'5px',color:'var(--rose)',textTransform:'uppercase',marginBottom:'12px' }}>// skills</div>
          <h2 style={{ fontFamily:'var(--font-display)',fontSize:'clamp(28px,4vw,52px)',fontWeight:300,color:'#fff',letterSpacing:'3px',marginBottom:'12px' }}>Languages & Tools</h2>
          <p style={{ fontFamily:'var(--font-mono)',fontSize:'11px',letterSpacing:'2px',color:'var(--text3)' }}>
            Auto-generated from GitHub repository data
          </p>
        </div>

        <div style={{ display:'grid',gridTemplateColumns:'2fr 1fr',gap:'48px',alignItems:'start' }}>
          {/* bar chart */}
          <div ref={barsRef} style={{ display:'flex',flexDirection:'column',gap:'14px' }}>
            {sorted.map(([lang,count])=>{
              const pct = `${((count/max)*100).toFixed(0)}%`
              return (
                <div key={lang} style={{ display:'flex',alignItems:'center',gap:'16px' }}>
                  <div style={{ fontFamily:'var(--font-mono)',fontSize:'11px',letterSpacing:'1px',color:'var(--text2)',width:'110px',flexShrink:0,display:'flex',alignItems:'center',gap:'7px' }}>
                    <span style={{ width:'8px',height:'8px',borderRadius:'50%',background:langColor(lang),display:'inline-block',boxShadow:`0 0 6px ${langColor(lang)}88`,flexShrink:0 }}/>
                    {lang}
                  </div>
                  <div style={{ flex:1,height:'4px',background:'rgba(255,255,255,0.05)',borderRadius:'2px',overflow:'hidden' }}>
                    <div
                      data-bar={pct}
                      style={{ height:'100%',width:'0%',background:langColor(lang),borderRadius:'2px',boxShadow:`0 0 6px ${langColor(lang)}66`,transition:'width 1s cubic-bezier(0.25,0.46,0.45,0.94)' }}
                    />
                  </div>
                  <div style={{ fontFamily:'var(--font-mono)',fontSize:'10px',color:'var(--text3)',width:'50px',textAlign:'right',flexShrink:0 }}>
                    {count} repo{count!==1?'s':''}
                  </div>
                </div>
              )
            })}
          </div>

          {/* top langs as 3D cards */}
          <div style={{ display:'flex',flexDirection:'column',gap:'10px' }}>
            {sorted.slice(0,5).map(([lang,count],i)=>(
              <Card3D key={lang} glowColor={langColor(lang)} intensity={12} style={{ background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'6px',padding:'14px 18px',display:'flex',alignItems:'center',gap:'12px' }}>
                <span style={{ width:'10px',height:'10px',borderRadius:'50%',background:langColor(lang),flexShrink:0,boxShadow:`0 0 8px ${langColor(lang)}` }}/>
                <span style={{ fontFamily:'var(--font-mono)',fontSize:'12px',color:'var(--text2)',flex:1 }}>{lang}</span>
                <span style={{ fontFamily:'var(--font-display)',fontSize:'20px',color:langColor(lang) }}>{count}</span>
              </Card3D>
            ))}
          </div>
        </div>
      </AnimatedSection>
      <style>{`@media(max-width:768px){#skills{padding:60px 24px!important}#skills section>div>div:last-child>div{grid-template-columns:1fr!important}}`}</style>
    </section>
  )
}
