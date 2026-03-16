export default function Contact({ user, ghUser }) {
  return (
    <section id="contact" style={{padding:'100px 48px',maxWidth:'700px',margin:'0 auto',textAlign:'center'}}>
      <div style={{fontFamily:'var(--font-mono)',fontSize:'10px',letterSpacing:'5px',
        color:'var(--rose)',textTransform:'uppercase',marginBottom:'16px',
        textShadow:'0 0 12px rgba(255,45,78,0.6)'}}>// transmission</div>
      <h2 style={{fontFamily:'var(--font-display)',fontSize:'clamp(32px,5vw,60px)',
        fontWeight:300,color:'#fff',letterSpacing:'3px',marginBottom:'24px'}}>Open Channel</h2>
      <p style={{fontFamily:'var(--font-sans)',fontSize:'15px',fontWeight:300,
        color:'rgba(255,255,255,0.62)',lineHeight:1.9,marginBottom:'14px'}}>
        Not looking for jobs.<br/>
        Open to experiments, collaborations,<br/>
        and conversations about things that shouldn't be possible.
      </p>
      <div style={{fontFamily:'var(--font-mono)',fontSize:'10px',letterSpacing:'2px',
        color:'rgba(255,80,0,0.55)',marginBottom:'44px',padding:'10px 16px',
        border:'1px solid rgba(255,80,0,0.12)',borderRadius:'4px',display:'inline-block',
        background:'rgba(255,40,0,0.04)'}}>
        ⚠ if you have a job offer — respectfully, no
      </div>
      <div style={{display:'flex',gap:'14px',justifyContent:'center',flexWrap:'wrap'}}>
        {[
          {label:'GitHub ↗',  href:`https://github.com/${ghUser}`,       bg:'var(--rose)',fg:'#fff'},
          {label:'Twitter ↗', href:'https://twitter.com/Kh4nZawwar',     bg:'transparent',fg:'rgba(255,255,255,0.6)',border:'rgba(255,255,255,0.12)'},
          {label:'Email ↗',   href:'mailto:zawwarsami16@gmail.com',       bg:'transparent',fg:'rgba(255,255,255,0.6)',border:'rgba(255,255,255,0.12)'},
        ].map(b=>(
          <a key={b.label} href={b.href} target={b.href.startsWith('http')?'_blank':undefined}
            rel="noopener noreferrer"
            style={{fontFamily:'var(--font-mono)',fontSize:'10px',letterSpacing:'3px',
              textTransform:'lowercase',background:b.bg,color:b.fg,
              padding:'13px 28px',borderRadius:'2px',
              border:b.border?`1px solid ${b.border}`:'none',transition:'all 0.25s'}}
            onMouseEnter={e=>{const el=e.currentTarget;if(b.border){el.style.borderColor='var(--rose)';el.style.color='var(--rose)'};el.style.transform='translateY(-3px)'}}
            onMouseLeave={e=>{const el=e.currentTarget;if(b.border){el.style.borderColor=b.border;el.style.color=b.fg};el.style.transform='none'}}
          >{b.label}</a>
        ))}
      </div>
    </section>
  )
}
