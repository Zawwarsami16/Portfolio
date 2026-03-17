import { useGitHub }       from './hooks/useGitHub.js'
import NebulaBackground    from './components/NebulaBackground.jsx'
import Petals              from './components/Petals.jsx'
import Nav                 from './components/Nav.jsx'
import Hero                from './components/Hero.jsx'
import About               from './components/About.jsx'
import Repos               from './components/Repos.jsx'
import Activity            from './components/Activity.jsx'
import Skills              from './components/Skills.jsx'
import Contact             from './components/Contact.jsx'
import AIChat              from './components/AIChat.jsx'
import AnimatedSection     from './components/AnimatedSection.jsx'

function Divider() {
  return (
    <div className="zai-divider" style={{maxWidth:'1100px',margin:'0 auto',padding:'0 24px'}}>
      <div style={{height:'1px',background:'linear-gradient(90deg,transparent,rgba(255,45,78,0.22),rgba(255,100,50,0.12),transparent)',position:'relative'}}>
        <div style={{position:'absolute',left:'50%',top:'50%',transform:'translate(-50%,-50%)',width:'4px',height:'4px',borderRadius:'50%',background:'var(--rose)',boxShadow:'0 0 8px var(--rose)'}}/>
      </div>
    </div>
  )
}

export default function App() {
  const {user,repos,events,loading,totalStars,totalForks,ghUser} = useGitHub()
  return (
    <div style={{position:'relative',minHeight:'100vh',background:'var(--black)'}}>
      {/* z:0 — nebula + stars + ZAI explosion */}
      <NebulaBackground/>
      {/* z:50 — petals in FRONT of everything */}
      <Petals/>
      {/* z:1 — content */}
      <div style={{position:'relative',zIndex:1}}>
        <Nav ghUser={ghUser}/>
        {loading ? (
          <div style={{minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'20px'}}>
            <div style={{fontFamily:'var(--font-display)',fontSize:'clamp(50px,12vw,110px)',fontWeight:300,letterSpacing:'12px',color:'var(--rose)',animation:'pulse 2s ease-in-out infinite',textShadow:'0 0 40px rgba(255,45,78,0.5)'}}>ZAI</div>
            <div style={{fontFamily:'var(--font-mono)',fontSize:'10px',letterSpacing:'4px',color:'var(--text4)',textTransform:'uppercase'}}>initializing…</div>
            <div style={{width:'100px',height:'1px',background:'rgba(255,255,255,0.05)',overflow:'hidden'}}>
              <div style={{height:'100%',background:'linear-gradient(90deg,var(--rose),var(--gold))',animation:'loadbar 1.5s ease-in-out infinite'}}/>
            </div>
          </div>
        ) : (
          <>
            <Hero user={user} totalStars={totalStars} totalForks={totalForks} ghUser={ghUser}/>
            <Divider/><About user={user} ghUser={ghUser}/>
            <Divider/><Repos repos={repos} ghUser={ghUser}/>
            <Divider/><Activity events={events} repos={repos} ghUser={ghUser}/>
            <Divider/><Skills repos={repos}/>
            <Divider/>
            <AnimatedSection direction="up"><Contact user={user} ghUser={ghUser}/></AnimatedSection>
            <footer style={{textAlign:'center',padding:'40px 24px',fontFamily:'var(--font-mono)',fontSize:'9px',letterSpacing:'3px',color:'var(--text4)',borderTop:'1px solid rgba(255,45,78,0.06)',marginTop:'40px'}}>
              <span style={{color:'var(--rose)'}}>ZAI</span>{' · '}{ghUser}{' · '}<span style={{fontStyle:'italic'}}>typeof self === "undefined"</span>{' · '}still wandering
            </footer>
          </>
        )}
        <AIChat user={user} repos={repos} ghUser={ghUser}/>
      </div>
    </div>
  )
}
