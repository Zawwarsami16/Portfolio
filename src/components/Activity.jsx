import AnimatedSection from './AnimatedSection.jsx'
import Card3D from './Card3D.jsx'
import { eventIcon, eventLabel, timeAgo } from '../utils/helpers.js'

export default function Activity({ events, repos, ghUser }) {
  const now  = new Date()
  const WEEKS = 26, DAYS = 7
  const actDates = new Set(repos.map(r=>new Date(r.updated_at).toDateString()))
  const cells = []
  for (let w=0;w<WEEKS;w++) for (let d=0;d<DAYS;d++) {
    const date = new Date(now)
    date.setDate(date.getDate()-((WEEKS-1-w)*7+(DAYS-1-d)))
    const active = actDates.has(date.toDateString())
    const level  = active?3+Math.floor(Math.random()*2):Math.random()<0.12?Math.floor(Math.random()*2)+1:0
    cells.push({level,date:date.toLocaleDateString()})
  }

  return (
    <section id="activity" style={{ padding:'100px 48px',maxWidth:'1100px',margin:'0 auto' }}>
      <AnimatedSection direction="right">
        <div style={{ marginBottom:'48px' }}>
          <div style={{ fontFamily:'var(--font-mono)',fontSize:'10px',letterSpacing:'5px',color:'var(--rose)',textTransform:'uppercase',marginBottom:'12px' }}>// activity</div>
          <h2 style={{ fontFamily:'var(--font-display)',fontSize:'clamp(28px,4vw,52px)',fontWeight:300,color:'#fff',letterSpacing:'3px' }}>GitHub Feed</h2>
        </div>

        <div style={{ display:'grid',gridTemplateColumns:'1fr 320px',gap:'40px',alignItems:'start' }}>
          {/* events */}
          <div style={{ display:'flex',flexDirection:'column',gap:'8px' }}>
            {events.slice(0,12).map((e,i)=>(
              <AnimatedSection key={i} direction="left" delay={i*0.04}>
                <div style={{ display:'flex',gap:'12px',alignItems:'flex-start',padding:'12px 16px',background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'4px',transition:'all 0.25s' }}
                  onMouseEnter={el=>{el.currentTarget.style.borderColor='rgba(232,82,106,0.3)';el.currentTarget.style.transform='translateX(4px)'}}
                  onMouseLeave={el=>{el.currentTarget.style.borderColor='var(--border)';el.currentTarget.style.transform='none'}}>
                  <span style={{ width:'30px',height:'30px',borderRadius:'4px',background:'var(--surface2)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'var(--font-mono)',fontSize:'13px',color:'var(--gold)',flexShrink:0 }}>
                    {eventIcon(e.type)}
                  </span>
                  <div style={{ flex:1,minWidth:0 }}>
                    <div style={{ fontFamily:'var(--font-sans)',fontSize:'13px',color:'var(--text2)',lineHeight:1.4 }}>
                      <span style={{ color:'var(--gold)',textTransform:'capitalize' }}>{eventLabel(e.type)}</span> →{' '}
                      <a href={`https://github.com/${e.repo.name}`} target="_blank" rel="noopener noreferrer"
                        style={{ color:'var(--text)',transition:'color 0.2s' }}
                        onMouseEnter={el=>el.target.style.color='var(--gold)'}
                        onMouseLeave={el=>el.target.style.color='var(--text)'}>
                        {e.repo.name.split('/')[1]}
                      </a>
                    </div>
                    <div style={{ fontFamily:'var(--font-mono)',fontSize:'10px',color:'var(--text3)',marginTop:'2px' }}>{timeAgo(e.created_at)}</div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* sidebar */}
          <div style={{ display:'flex',flexDirection:'column',gap:'16px' }}>
            <Card3D glowColor="var(--rose)" intensity={8} style={{ background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'6px',padding:'22px' }}>
              <div style={{ fontFamily:'var(--font-mono)',fontSize:'9px',letterSpacing:'3px',color:'var(--text3)',textTransform:'uppercase',marginBottom:'14px' }}>
                Contribution Activity
              </div>
              <div style={{ display:'flex',gap:'3px',overflowX:'auto',paddingBottom:'4px' }}>
                {Array.from({length:WEEKS},(_,w)=>(
                  <div key={w} style={{ display:'flex',flexDirection:'column',gap:'3px' }}>
                    {Array.from({length:DAYS},(_,d)=>{
                      const cell=cells[w*DAYS+d]
                      return (
                        <div key={d} title={cell?.date} style={{ width:'10px',height:'10px',borderRadius:'2px',flexShrink:0,cursor:'default',transition:'transform 0.15s',
                          background:cell?.level===4?'#2ea043':cell?.level===3?'#26a641':cell?.level===2?'#006d32':cell?.level===1?'#0e4429':'#161b22' }}
                          onMouseEnter={e=>e.target.style.transform='scale(1.5)'}
                          onMouseLeave={e=>e.target.style.transform='scale(1)'}
                        />
                      )
                    })}
                  </div>
                ))}
              </div>
              <div style={{ display:'flex',alignItems:'center',gap:'4px',marginTop:'10px',fontFamily:'var(--font-mono)',fontSize:'9px',color:'var(--text3)' }}>
                <span>Less</span>
                {['#161b22','#0e4429','#006d32','#26a641','#2ea043'].map(c=>(
                  <div key={c} style={{ width:'10px',height:'10px',background:c,borderRadius:'2px' }}/>
                ))}
                <span>More</span>
              </div>
            </Card3D>

            <Card3D glowColor="var(--gold)" intensity={8} style={{ background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'6px',padding:'24px',textAlign:'center' }}>
              <div style={{ fontFamily:'var(--font-display)',fontSize:'52px',fontWeight:300,color:'var(--gold)',lineHeight:1,textShadow:'0 0 20px rgba(212,168,83,0.4)' }}>
                {repos.length}
              </div>
              <div style={{ fontFamily:'var(--font-mono)',fontSize:'9px',letterSpacing:'3px',color:'var(--text3)',textTransform:'uppercase',marginTop:'8px' }}>
                Public Repositories
              </div>
            </Card3D>
          </div>
        </div>
      </AnimatedSection>
      <style>{`@media(max-width:900px){#activity section>div>div:last-child>div{grid-template-columns:1fr!important}#activity{padding:60px 24px!important}}`}</style>
    </section>
  )
}
