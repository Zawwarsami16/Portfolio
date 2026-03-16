import { useState } from 'react'
import AnimatedSection from './AnimatedSection.jsx'
import Card3D from './Card3D.jsx'
import { langColor, timeAgo } from '../utils/helpers.js'

export default function Repos({ repos, ghUser }) {
  const [filter, setFilter] = useState('all')
  const langs  = [...new Set(repos.map(r=>r.language).filter(Boolean))].slice(0,6)
  const sorted = repos
    .filter(r => filter==='all'?true:filter==='starred'?r.stargazers_count>0:r.language===filter)
    .sort((a,b)=>b.stargazers_count-a.stargazers_count)
    .slice(0,12)

  return (
    <section id="repos" style={{ padding:'100px 48px', maxWidth:'1100px', margin:'0 auto' }}>
      <AnimatedSection direction="up">
        <div style={{ marginBottom:'48px' }}>
          <div style={{ fontFamily:'var(--font-mono)',fontSize:'10px',letterSpacing:'5px',color:'var(--rose)',textTransform:'uppercase',marginBottom:'12px' }}>// repositories</div>
          <h2 style={{ fontFamily:'var(--font-display)',fontSize:'clamp(28px,4vw,52px)',fontWeight:300,color:'#fff',letterSpacing:'3px' }}>Live Projects</h2>
        </div>

        {/* filters */}
        <div style={{ display:'flex',gap:'8px',flexWrap:'wrap',marginBottom:'36px' }}>
          {['all','starred',...langs].map(f=>(
            <button key={f} onClick={()=>setFilter(f)} style={{ fontFamily:'var(--font-mono)',fontSize:'9px',letterSpacing:'2px',textTransform:'uppercase',background:filter===f?'var(--gold)':'transparent',color:filter===f?'#000':'var(--text3)',border:`1px solid ${filter===f?'var(--gold)':'rgba(255,255,255,0.1)'}`,padding:'5px 14px',borderRadius:'2px',cursor:'pointer',transition:'all 0.2s' }}>
              {f}
            </button>
          ))}
        </div>

        {/* 3D repo grid */}
        <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(310px,1fr))',gap:'16px' }}>
          {sorted.map((repo,i)=>(
            <AnimatedSection key={repo.id} direction="up" delay={i*0.05}>
              <Card3D glowColor={langColor(repo.language)} intensity={8} style={{ background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'6px',padding:'24px',height:'100%' }}>
                {/* language color top bar */}
                <div style={{ position:'absolute',top:0,left:0,right:0,height:'2px',background:`linear-gradient(90deg,${langColor(repo.language)},transparent)`,opacity:0.7,borderRadius:'6px 6px 0 0' }} />

                <a href={repo.html_url} target="_blank" rel="noopener noreferrer"
                  style={{ display:'flex',flexDirection:'column',gap:'10px',height:'100%',textDecoration:'none' }}>
                  <div style={{ fontFamily:'var(--font-mono)',fontSize:'13px',color:'var(--gold)',display:'flex',alignItems:'center',gap:'6px' }}>
                    ◈ {repo.name}
                    {repo.stargazers_count>0 && <span style={{ marginLeft:'auto',fontSize:'10px',color:'var(--text3)',display:'flex',alignItems:'center',gap:'3px' }}>★ {repo.stargazers_count}</span>}
                  </div>
                  <p style={{ fontFamily:'var(--font-sans)',fontSize:'12px',color:'var(--text2)',lineHeight:1.6,flex:1,fontWeight:300 }}>
                    {repo.description||'No description provided.'}
                  </p>
                  <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',fontFamily:'var(--font-mono)',fontSize:'10px',color:'var(--text3)' }}>
                    <div style={{ display:'flex',gap:'12px',alignItems:'center' }}>
                      {repo.language && <span style={{ display:'flex',alignItems:'center',gap:'4px' }}><span style={{ width:'7px',height:'7px',borderRadius:'50%',background:langColor(repo.language),display:'inline-block' }}/>{repo.language}</span>}
                      <span>⑂ {repo.forks_count}</span>
                    </div>
                    <span>{timeAgo(repo.updated_at)}</span>
                  </div>
                </a>
              </Card3D>
            </AnimatedSection>
          ))}
        </div>

        <div style={{ textAlign:'center',marginTop:'40px' }}>
          <a href={`https://github.com/${ghUser}?tab=repositories`} target="_blank" rel="noopener noreferrer"
            style={{ fontFamily:'var(--font-mono)',fontSize:'11px',letterSpacing:'3px',textTransform:'uppercase',color:'var(--text3)',transition:'color 0.2s' }}
            onMouseEnter={e=>e.target.style.color='var(--gold)'} onMouseLeave={e=>e.target.style.color='var(--text3)'}>
            View all on GitHub ↗
          </a>
        </div>
      </AnimatedSection>
      <style>{`@media(max-width:768px){#repos{padding:60px 24px!important}}`}</style>
    </section>
  )
}
