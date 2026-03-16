import AnimatedSection from './AnimatedSection.jsx'
import Card3D from './Card3D.jsx'

const DIMS = [
  { icon:'🧠', label:'Philosophy & Consciousness', desc:'Mapping dimensions of human behaviour and what lies beyond'     },
  { icon:'🌍', label:'Geopolitics & Macro AI',     desc:'ZAI Oracle — crisis simulation, market regimes, world models'  },
  { icon:'🔓', label:'Security & OSINT',           desc:'39+ tools, location tracking, system exploitation'             },
  { icon:'🎮', label:'Game & Simulation',          desc:"Hacker's Legacy RPG — reality as a game engine"               },
  { icon:'📱', label:'Systems & Mobile',           desc:'Kotlin consciousness diary, independent AI frameworks'          },
  { icon:'🔭', label:'Independent Research',       desc:"Building what shouldn't be possible — just to see if it can be"},
]

export default function About({ user, ghUser }) {
  return (
    <section id="about" style={{ padding:'80px 24px', maxWidth:'1100px', margin:'0 auto' }}>
      <AnimatedSection direction="left">
        <div style={{marginBottom:'48px'}}>
          <div style={{fontFamily:'var(--font-mono)',fontSize:'10px',letterSpacing:'5px',
            color:'var(--rose)',textTransform:'uppercase',marginBottom:'14px',
            textShadow:'0 0 12px rgba(255,45,78,0.6)'}}>// about</div>
          <h2 style={{fontFamily:'var(--font-display)',
            fontSize:'clamp(28px,6vw,60px)',fontWeight:300,
            color:'rgba(255,255,255,0.95)',letterSpacing:'3px',marginBottom:'18px',lineHeight:1.1}}>
            The{' '}
            <span style={{fontStyle:'italic',color:'rgba(255,255,255,0.20)',
              textDecoration:'line-through',textDecorationColor:'rgba(255,45,78,0.7)'}}>Developer</span>
            {' '}Wanderer
          </h2>
          <p style={{fontFamily:'var(--font-sans)',fontWeight:300,
            fontSize:'clamp(14px,3.5vw,18px)',color:'rgba(255,255,255,0.72)',
            lineHeight:1.9,maxWidth:'580px',marginBottom:'10px'}}>
            Not interested in jobs. Not defined by a title. A researcher building weapons of understanding — philosophy, AI, geopolitics, consciousness.
          </p>
          <p style={{fontFamily:'var(--font-sans)',fontWeight:300,
            fontSize:'clamp(13px,3vw,15px)',color:'rgba(255,255,255,0.40)',
            lineHeight:1.9,maxWidth:'500px',fontStyle:'italic'}}>
            IT is just the tool I mastered to control everything else.
          </p>
        </div>

        {/* Responsive grid — stacks on mobile */}
        <div style={{
          display:'grid',
          gridTemplateColumns:'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          gap:'32px', alignItems:'start',
        }}>

          {/* Avatar card */}
          <Card3D glowColor="var(--rose)" intensity={12} style={{
            background:'rgba(8,4,4,0.75)',
            border:'1px solid rgba(255,45,78,0.18)',
            borderRadius:'8px', padding:'32px 24px',
            display:'flex', flexDirection:'column', alignItems:'center', gap:'18px',
            backdropFilter:'blur(16px)',
            boxShadow:'0 20px 50px rgba(0,0,0,0.5), 0 0 35px rgba(255,45,78,0.05)',
          }}>
            <div style={{position:'relative'}}>
              <div style={{position:'absolute',inset:'-4px',borderRadius:'50%',
                background:'conic-gradient(var(--rose),var(--gold),var(--rose))',
                animation:'spin 5s linear infinite'}}/>
              <img src={user?.avatar_url||`https://github.com/${ghUser}.png`}
                alt={ghUser}
                style={{width:'120px',height:'120px',borderRadius:'50%',
                  objectFit:'cover',position:'relative',
                  border:'4px solid rgba(3,3,6,1)',
                  filter:'grayscale(0.2) brightness(0.9)'}}/>
              <div style={{position:'absolute',bottom:'6px',right:'6px',
                width:'13px',height:'13px',borderRadius:'50%',
                background:'#34c759',border:'3px solid rgba(3,3,6,1)',
                boxShadow:'0 0 8px #34c759'}}/>
            </div>
            <div style={{textAlign:'center'}}>
              <div style={{fontFamily:'var(--font-display)',fontSize:'clamp(20px,5vw,26px)',
                fontWeight:400,color:'#fff',letterSpacing:'2px'}}>
                {user?.name||ghUser}
              </div>
              <div style={{fontFamily:'var(--font-mono)',fontSize:'11px',
                letterSpacing:'3px',color:'var(--rose)',marginTop:'4px',opacity:0.8}}>
                @{ghUser}
              </div>
              <div style={{fontFamily:'var(--font-mono)',fontSize:'9px',
                letterSpacing:'2px',color:'rgba(255,255,255,0.28)',marginTop:'10px',
                padding:'4px 12px',border:'1px solid rgba(255,255,255,0.07)',
                borderRadius:'20px',display:'inline-block'}}>
                typeof self === "undefined"
              </div>
            </div>
            <div style={{width:'100%',padding:'10px 14px',
              background:'rgba(255,60,0,0.06)',
              border:'1px solid rgba(255,60,0,0.15)',
              borderRadius:'4px',textAlign:'center'}}>
              <div style={{fontFamily:'var(--font-mono)',fontSize:'9px',
                letterSpacing:'3px',color:'rgba(255,120,60,0.7)',textTransform:'uppercase'}}>
                ⚠ access level: wanderer
              </div>
            </div>
          </Card3D>

          {/* Dimension cards */}
          <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
            {DIMS.map((d,i)=>(
              <AnimatedSection key={d.label} direction="right" delay={i*0.06}>
                <div style={{
                  background:'rgba(8,4,4,0.65)',
                  border:'1px solid rgba(255,45,78,0.10)',
                  borderRadius:'6px', padding:'13px 16px',
                  display:'flex', gap:'13px', alignItems:'flex-start',
                  backdropFilter:'blur(12px)',
                  transition:'border-color 0.2s, transform 0.2s',
                  cursor:'default',
                }}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(255,45,78,0.28)';e.currentTarget.style.transform='translateX(4px)'}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,45,78,0.10)';e.currentTarget.style.transform='none'}}
                >
                  <span style={{fontSize:'15px',flexShrink:0,marginTop:'1px'}}>{d.icon}</span>
                  <div style={{minWidth:0}}>
                    <div style={{fontFamily:'var(--font-mono)',fontSize:'11px',
                      letterSpacing:'1px',color:'rgba(255,120,80,0.92)',
                      marginBottom:'3px',whiteSpace:'nowrap',overflow:'hidden',
                      textOverflow:'ellipsis'}}>{d.label}</div>
                    <div style={{fontFamily:'var(--font-sans)',fontSize:'12px',
                      color:'rgba(255,255,255,0.45)',lineHeight:1.55,fontWeight:300}}>
                      {d.desc}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

        </div>
      </AnimatedSection>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </section>
  )
}
