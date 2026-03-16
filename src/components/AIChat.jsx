// AIChat.jsx — floating AI chat button + panel
// API key comes from .env (VITE_AI_KEY) or user can set it in the UI

import { useState, useRef, useEffect } from 'react'

const PROVIDERS = {
  openrouter: {
    url:   'https://openrouter.ai/api/v1/chat/completions',
    model: import.meta.env.VITE_AI_MODEL || 'meta-llama/llama-3.1-8b-instruct:free',
    headers: k => ({ 'Content-Type':'application/json', 'Authorization':'Bearer '+k }),
    parse:   d => d.choices?.[0]?.message?.content,
  },
  openai: {
    url:   'https://api.openai.com/v1/chat/completions',
    model: 'gpt-4o-mini',
    headers: k => ({ 'Content-Type':'application/json', 'Authorization':'Bearer '+k }),
    parse:   d => d.choices?.[0]?.message?.content,
  },
  groq: {
    url:   'https://api.groq.com/openai/v1/chat/completions',
    model: 'llama3-8b-8192',
    headers: k => ({ 'Content-Type':'application/json', 'Authorization':'Bearer '+k }),
    parse:   d => d.choices?.[0]?.message?.content,
  },
  anthropic: {
    url:   'https://api.anthropic.com/v1/messages',
    model: 'claude-haiku-4-5-20251001',
    headers: k => ({ 'Content-Type':'application/json', 'x-api-key':k, 'anthropic-version':'2023-06-01' }),
    parse:   d => d.content?.[0]?.text,
  },
}

export default function AIChat({ user, repos, ghUser }) {
  const [open,     setOpen]     = useState(false)
  const [messages, setMessages] = useState([])
  const [input,    setInput]    = useState('')
  const [loading,  setLoading]  = useState(false)
  const [showCfg,  setShowCfg]  = useState(false)
  const [provider, setProvider] = useState(import.meta.env.VITE_AI_PROVIDER || 'openrouter')
  const [apiKey,   setApiKeyState] = useState(import.meta.env.VITE_AI_KEY || localStorage.getItem('zai_ai_key') || '')
  // always read fresh — state can be stale after saveKey
  const getKey = () => import.meta.env.VITE_AI_KEY || localStorage.getItem('zai_ai_key') || apiKey
  const msgsRef = useRef(null)

  useEffect(() => {
    if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight
  }, [messages])

  const systemPrompt = `You are ${user?.name || ghUser}, a developer. Answer in first person, max 2 sentences, friendly. Bio: ${(user?.bio||'developer').slice(0,100)}.`

  async function send() {
    if (!input.trim() || loading) return
    const freshKey = getKey(); if (!freshKey) { setShowCfg(true); return }

    const userMsg = { role:'user', content:input.trim() }
    const history = [...messages, userMsg]
    setMessages(history)
    setInput('')
    setLoading(true)

    const apiKey = freshKey
    const p = PROVIDERS[provider] || PROVIDERS.openrouter
    try {
      // keep only last 6 messages to avoid token limits
      const trimmed = history.slice(-6)

      const body = provider === 'anthropic'
        ? { model:p.model, max_tokens:300, system:systemPrompt, messages:trimmed }
        : { model:p.model, max_tokens:300, messages:[{role:'system',content:systemPrompt},...trimmed] }

      const res  = await fetch(p.url, { method:'POST', headers:p.headers(apiKey), body:JSON.stringify(body) })
      const data = await res.json()

      // log the full response so we can debug in browser console
      console.log('[ZAI AI] status:', res.status, 'response:', data)

      if (!res.ok) {
        const errMsg = data?.error?.message || data?.message || `HTTP ${res.status}`
        setMessages([...history, { role:'assistant', content:`API error: ${errMsg}` }])
        setLoading(false)
        return
      }

      const reply = p.parse(data)
      setMessages([...history, { role:'assistant', content: reply || 'Got a response but could not parse it. Check console.' }])
    } catch(err) {
      console.error('[ZAI AI] fetch error:', err)
      setMessages([...history, { role:'assistant', content:`Connection error: ${err.message}` }])
    }
    setLoading(false)
  }

  function saveKey(k, prov) {
    setApiKeyState(k)
    setProvider(prov)
    localStorage.setItem('zai_ai_key',      k)
    localStorage.setItem('zai_ai_provider', prov)
    setShowCfg(false)
    setMessages([...messages, { role:'assistant', content:`Connected via ${prov}. Ask me anything about ${user?.name || ghUser}!` }])
  }

  // first greeting
  function onOpen() {
    setOpen(true)
    if (messages.length === 0) {
      setMessages([{ role:'assistant', content: `Hey! I'm ${user?.name || ghUser}'s AI. Ask me about my projects, skills, or anything else you're curious about.` }])
      if (!apiKey) setTimeout(() => setShowCfg(true), 600)
    }
  }

  return (
    <>
      {/* chat panel */}
      {open && (
        <div style={{
          position:     'fixed',
          bottom:       '92px',
          right:        '28px',
          width:        '360px',
          height:       '500px',
          background:   'rgba(10,10,16,0.97)',
          border:       '1px solid rgba(212,168,83,0.2)',
          borderRadius: '8px',
          display:      'flex',
          flexDirection:'column',
          overflow:     'hidden',
          boxShadow:    '0 0 60px rgba(0,0,0,0.9)',
          zIndex:       200,
          backdropFilter:'blur(20px)',
        }}>
          {/* header */}
          <div style={{ padding:'14px 18px', borderBottom:'1px solid rgba(255,255,255,0.06)', display:'flex', alignItems:'center', gap:'12px' }}>
            <div style={{ width:'34px', height:'34px', borderRadius:'50%', background:'linear-gradient(135deg,var(--gold),var(--rose))', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'16px', flexShrink:0 }}>
              ◈
            </div>
            <div>
              <div style={{ fontFamily:'var(--font-mono)', fontSize:'12px', color:'var(--gold)' }}>ZAI Assistant</div>
              <div style={{ fontFamily:'var(--font-mono)', fontSize:'10px', color:'var(--text3)', marginTop:'1px', display:'flex', alignItems:'center', gap:'4px' }}>
                <span style={{ width:'5px', height:'5px', borderRadius:'50%', background:'#34c759', display:'inline-block' }} />
                Ask me about {ghUser}
              </div>
            </div>
            <button onClick={()=>setShowCfg(!showCfg)} style={{ marginLeft:'auto', background:'none', border:'none', color:'var(--text3)', fontSize:'14px', cursor:'pointer', transition:'color 0.2s' }}
              onMouseEnter={e=>e.target.style.color='var(--gold)'} onMouseLeave={e=>e.target.style.color='var(--text3)'}>
              ⚙
            </button>
            <button onClick={()=>setOpen(false)} style={{ background:'none', border:'none', color:'var(--text3)', fontSize:'18px', cursor:'pointer', lineHeight:1, transition:'color 0.2s' }}
              onMouseEnter={e=>e.target.style.color='#fff'} onMouseLeave={e=>e.target.style.color='var(--text3)'}>
              ×
            </button>
          </div>

          {/* config */}
          {showCfg && (
            <ConfigPanel provider={provider} onSave={saveKey} />
          )}

          {/* messages */}
          <div ref={msgsRef} style={{ flex:1, overflowY:'auto', padding:'14px', display:'flex', flexDirection:'column', gap:'10px' }}>
            {messages.map((m, i) => (
              <div key={i} style={{
                maxWidth:     '88%',
                padding:      '9px 13px',
                borderRadius: '6px',
                fontFamily:   'var(--font-sans)',
                fontSize:     '13px',
                lineHeight:   1.6,
                fontWeight:   300,
                alignSelf:    m.role === 'user' ? 'flex-end' : 'flex-start',
                background:   m.role === 'user' ? 'rgba(232,82,106,0.1)' : 'rgba(212,168,83,0.07)',
                border:       `1px solid ${m.role === 'user' ? 'rgba(232,82,106,0.2)' : 'rgba(212,168,83,0.15)'}`,
                color:        'rgba(255,255,255,0.75)',
                borderBottomRightRadius: m.role === 'user' ? '2px' : '6px',
                borderBottomLeftRadius:  m.role === 'user' ? '6px' : '2px',
              }}>
                {m.content}
              </div>
            ))}
            {loading && (
              <div style={{ alignSelf:'flex-start', padding:'12px 14px', background:'rgba(212,168,83,0.05)', border:'1px solid rgba(212,168,83,0.1)', borderRadius:'6px' }}>
                <span style={{ display:'flex', gap:'4px' }}>
                  {[0,1,2].map(i => (
                    <span key={i} style={{ width:'5px', height:'5px', borderRadius:'50%', background:'var(--gold)', display:'inline-block', animation:`bounce 1.2s infinite ${i*0.2}s` }} />
                  ))}
                </span>
              </div>
            )}
          </div>

          {/* input */}
          <div style={{ padding:'10px 12px', borderTop:'1px solid rgba(255,255,255,0.06)', display:'flex', gap:'8px' }}>
            <input
              value={input}
              onChange={e=>setInput(e.target.value)}
              onKeyDown={e=>{ if(e.key==='Enter') send() }}
              placeholder="Ask about my work..."
              maxLength={200}
              style={{
                flex:1, background:'rgba(255,255,255,0.04)',
                border:'1px solid rgba(212,168,83,0.15)',
                borderRadius:'4px', padding:'8px 12px',
                color:'#fff', fontFamily:'var(--font-sans)',
                fontSize:'13px', outline:'none',
              }}
              onFocus={e=>e.target.style.borderColor='var(--gold)'}
              onBlur={e=>e.target.style.borderColor='rgba(212,168,83,0.15)'}
            />
            <button onClick={send} style={{
              width:'36px', height:'36px', borderRadius:'4px',
              background:'linear-gradient(135deg,var(--gold),var(--rose2))',
              border:'none', color:'#fff', fontSize:'14px',
              cursor:'pointer', transition:'transform 0.2s', flexShrink:0,
            }}
              onMouseEnter={e=>e.target.style.transform='scale(1.08)'}
              onMouseLeave={e=>e.target.style.transform='scale(1)'}
            >
              ↑
            </button>
          </div>
        </div>
      )}

      {/* toggle button */}
      <button
        onClick={open ? ()=>setOpen(false) : onOpen}
        style={{
          position:     'fixed',
          bottom:       '28px',
          right:        '28px',
          width:        '56px',
          height:       '56px',
          borderRadius: '50%',
          background:   'linear-gradient(135deg, var(--gold), var(--rose))',
          border:       'none',
          color:        '#fff',
          fontSize:     '22px',
          cursor:       'pointer',
          boxShadow:    '0 0 30px rgba(212,168,83,0.4)',
          zIndex:       201,
          transition:   'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)',
          display:      'flex',
          alignItems:   'center',
          justifyContent:'center',
        }}
        onMouseEnter={e=>e.currentTarget.style.transform='scale(1.1)'}
        onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}
      >
        {open ? '×' : '💬'}
      </button>

      <style>{`
        @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        @media(max-width:480px) { .chat-panel { width: calc(100vw - 56px) !important; right: -12px !important; } }
      `}</style>
    </>
  )
}

function ConfigPanel({ provider, onSave }) {
  const [prov, setProv] = useState(provider)
  const [key,  setKey]  = useState(localStorage.getItem('zai_ai_key') || '')

  return (
    <div style={{ padding:'12px 16px', background:'rgba(232,82,106,0.04)', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ fontFamily:'var(--font-mono)', fontSize:'9px', letterSpacing:'2px', color:'var(--rose)', textTransform:'uppercase', marginBottom:'8px' }}>
        ▸ Configure AI Provider
      </div>
      <select
        value={prov}
        onChange={e=>setProv(e.target.value)}
        style={{ width:'100%', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(212,168,83,0.2)', borderRadius:'3px', padding:'7px 10px', color:'#fff', fontFamily:'var(--font-mono)', fontSize:'11px', outline:'none', marginBottom:'6px' }}
      >
        <option value="openrouter">OpenRouter (free models available)</option>
        <option value="openai">OpenAI</option>
        <option value="groq">Groq</option>
        <option value="anthropic">Anthropic</option>
      </select>
      <input
        type="password"
        value={key}
        onChange={e=>setKey(e.target.value)}
        placeholder="Paste your API key..."
        style={{ width:'100%', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(212,168,83,0.2)', borderRadius:'3px', padding:'7px 10px', color:'#fff', fontFamily:'var(--font-mono)', fontSize:'11px', outline:'none', marginBottom:'8px' }}
        onFocus={e=>e.target.style.borderColor='var(--gold)'}
        onBlur={e=>e.target.style.borderColor='rgba(212,168,83,0.2)'}
      />
      <button
        onClick={()=>key && onSave(key, prov)}
        style={{ fontFamily:'var(--font-mono)', fontSize:'9px', letterSpacing:'2px', padding:'6px 16px', background:'var(--gold)', color:'#000', border:'none', borderRadius:'2px', textTransform:'uppercase', cursor:'pointer' }}
      >
        Save & Connect
      </button>
    </div>
  )
}
