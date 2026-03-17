// NebulaBackground — nebula + stars + ZAI explosion (background z:0)
// Petals moved to FOREGROUND (separate component, z:50)

import { useEffect, useRef } from 'react'
import { IMG_NEBULA } from '../assets.js'

export default function NebulaBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: false })
    const isMobile = window.innerWidth < 768 || /Android|iPhone|iPad/i.test(navigator.userAgent)
    const TARGET_FPS = isMobile ? 30 : 60
    const FRAME_MS   = 1000 / TARGET_FPS
    const STAR_COUNT = isMobile ? 24 : 48
    const STAR_SKIP  = isMobile ? 3 : 2
    const ZAI_STEP   = isMobile ? 4 : 2  // denser sampling for better A

    const state = {
      W:0, H:0, mx:0.5, my:0.5, tmx:0.5, tmy:0.5,
      time:0, zaiTime:0, raf:null, frame:0, lastT:0,
      nebula:null, nebulaLoaded:false,
      stars:[], zaiParticles:[], zaiReady:false,
    }

    function buildStars(W, H) {
      state.stars = Array.from({length:STAR_COUNT}, () => ({
        x:Math.random()*W, y:Math.random()*H,
        r:0.4+Math.random()*1.0,
        sp:0.003+Math.random()*0.005,
        ph:Math.random()*Math.PI*2,
        red:Math.random()<0.65,
      }))
    }

    function buildZai(W, H) {
      // Offscreen canvas — draw ZAI and sample pixels
      const off = document.createElement('canvas')
      // Make it BIG enough so 'A' renders properly
      const fs = Math.floor(Math.min(W * 0.30, isMobile ? 140 : 180))
      const OW = fs * 4   // wide enough for 3 chars
      const OH = fs * 1.5
      off.width = OW; off.height = OH

      const oc = off.getContext('2d')
      // Clear
      oc.clearRect(0,0,OW,OH)
      // Use a thick font weight so pixels are dense
      oc.fillStyle = '#ffffff'
      oc.font = `600 ${fs}px 'Cormorant Garamond', Georgia, serif`
      oc.textAlign = 'center'
      oc.textBaseline = 'alphabetic'
      // Baseline at 80% height for proper rendering
      oc.fillText('ZAI', OW/2, OH * 0.82)

      const id = oc.getImageData(0, 0, OW, OH)
      const pts = []
      for (let y=0; y<OH; y+=ZAI_STEP)
        for (let x=0; x<OW; x+=ZAI_STEP)
          if (id.data[(y*OW+x)*4+3] > 80) pts.push({x, y})

      // Center on screen
      const ox = (W - OW) / 2
      const oy = (H - OH) / 2

      state.zaiParticles = pts.map(p => ({
        tx: p.x + ox, ty: p.y + oy,
        x: W/2 + (Math.random()-0.5)*W*0.95,
        y: H/2 + (Math.random()-0.5)*H*0.85,
        r: isMobile ? 1.0+Math.random()*1.3 : 1.4+Math.random()*2.0,
        hue: 340+Math.floor(Math.random()*25),
        sat: 70+Math.floor(Math.random()*25),
        lgt: 45+Math.floor(Math.random()*25),
      }))
      state.zaiReady = true
    }

    function resize() {
      const dpr = isMobile ? Math.min(window.devicePixelRatio||1,2) : 1
      state.W = window.innerWidth; state.H = window.innerHeight
      canvas.width  = state.W*dpr; canvas.height = state.H*dpr
      canvas.style.width=state.W+'px'; canvas.style.height=state.H+'px'
      ctx.scale(dpr,dpr)
      buildStars(state.W, state.H)
    }

    const nImg = new Image()
    nImg.onload = () => { state.nebula=nImg; state.nebulaLoaded=true }
    nImg.src = IMG_NEBULA

    const onMouse = (e) => { state.tmx=e.clientX/window.innerWidth; state.tmy=e.clientY/window.innerHeight }
    const onTouch = (e) => { if(e.touches[0]){state.tmx=e.touches[0].clientX/window.innerWidth; state.tmy=e.touches[0].clientY/window.innerHeight} }
    window.addEventListener('mousemove', onMouse, {passive:true})
    window.addEventListener('touchmove', onTouch, {passive:true})
    window.addEventListener('resize', resize)
    resize()
    setTimeout(() => buildZai(state.W, state.H), 500)

    function tick(now) {
      state.raf = requestAnimationFrame(tick)
      if (now - state.lastT < FRAME_MS) return
      state.lastT = now
      state.frame++; state.time+=0.015; state.zaiTime+=0.015
      const {W,H,time,frame} = state
      state.mx+=(state.tmx-state.mx)*0.04
      state.my+=(state.tmy-state.my)*0.04

      ctx.fillStyle='#030306'; ctx.fillRect(0,0,W,H)

      // Nebula
      if (state.nebulaLoaded) {
        const hb=Math.sin(time*7.54)*0.5+0.5
        const dW=W*(1+hb*0.012), dH=H*(1+hb*0.012)
        ctx.save()
        ctx.globalAlpha=0.52+hb*0.22
        ctx.filter="contrast(1.15) saturate(1.3) brightness(1.1)"; ctx.drawImage(state.nebula,(W-dW)/2+(state.mx-0.5)*16,(H-dH)/2+(state.my-0.5)*10,dW,dH); ctx.filter="none"
        ctx.restore()
        const gr=ctx.createRadialGradient(W*.5,H*.4,0,W*.5,H*.4,W*.5)
        gr.addColorStop(0,`rgba(120,0,0,${0.05+hb*0.12})`); gr.addColorStop(1,'rgba(0,0,0,0)')
        ctx.fillStyle=gr; ctx.fillRect(0,0,W,H)
      }

      // Vignette
      const vg=ctx.createRadialGradient(W*.5,H*.5,H*.08,W*.5,H*.5,W*.9)
      vg.addColorStop(0,'rgba(3,3,6,0)'); vg.addColorStop(0.5,'rgba(3,3,6,0.13)'); vg.addColorStop(1,'rgba(3,3,6,0.82)')
      ctx.fillStyle=vg; ctx.fillRect(0,0,W,H)

      // Stars
      if (frame%STAR_SKIP===0) {
        state.stars.forEach(s=>{
          const tw=Math.sin(time*s.sp*60+s.ph)*0.5+0.5
          ctx.save(); ctx.globalAlpha=0.08+tw*0.55
          ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2)
          ctx.fillStyle=s.red?`rgb(255,${55+Math.floor(tw*40)},${25+Math.floor(tw*20)})`:`rgb(255,255,${180+Math.floor(tw*75)})`
          ctx.shadowBlur=s.r*2.5; ctx.shadowColor=s.red?'rgba(255,50,50,0.5)':'rgba(255,255,200,0.4)'
          ctx.fill(); ctx.restore()
        })
      }

      // ZAI EXPLOSION
      const zt=state.zaiTime
      if (state.zaiReady && zt<5.5) {
        state.zaiParticles.forEach(p=>{
          let x,y,alpha,glow=false
          if (zt<0.5) {
            const pr=zt/0.5; x=W/2+(p.x-W/2)*pr*2; y=H/2+(p.y-H/2)*pr*2; alpha=pr*0.8
          } else if (zt<3.0) {
            const pr=(zt-0.5)/2.5, ease=1-Math.pow(1-pr,3)
            x=p.x+(p.tx-p.x)*ease; y=p.y+(p.ty-p.y)*ease; alpha=0.8+ease*0.15
          } else if (zt<4.5) {
            x=p.tx; y=p.ty; alpha=0.85+Math.sin(zt*9)*0.12; glow=true
          } else {
            const pr=(zt-4.5)/1.0; x=p.tx; y=p.ty-pr*40; alpha=Math.max(0,0.9-pr)
          }
          ctx.save(); ctx.globalAlpha=alpha
          ctx.beginPath(); ctx.arc(x,y,p.r,0,Math.PI*2)
          ctx.fillStyle=`hsl(${p.hue},${p.sat}%,${p.lgt}%)`
          if(glow){ctx.shadowBlur=10;ctx.shadowColor='rgba(255,30,60,0.9)'}
          ctx.fill(); ctx.restore()
        })
        if (zt>2.5&&zt<4.8) {
          const fi=Math.min(1,(zt-2.5)/0.5), fo=zt>4.2?Math.max(0,(4.8-zt)/0.6):1
          ctx.save(); ctx.globalAlpha=fi*fo*0.20
          ctx.font=`300 ${Math.floor(W*0.22)}px 'Cormorant Garamond',Georgia,serif`
          ctx.textAlign='center'; ctx.textBaseline='middle'
          ctx.fillStyle='rgba(255,40,80,1)'; ctx.shadowBlur=80; ctx.shadowColor='rgba(255,0,40,0.95)'
          ctx.fillText('ZAI',W/2,H/2); ctx.restore()
        }
      }
    }
    state.raf=requestAnimationFrame(tick)
    return ()=>{ cancelAnimationFrame(state.raf); window.removeEventListener('mousemove',onMouse); window.removeEventListener('touchmove',onTouch); window.removeEventListener('resize',resize) }
  },[])

  return <canvas ref={canvasRef} style={{position:'fixed',inset:0,zIndex:0,pointerEvents:'none',willChange:'transform',transform:'translateZ(0)'}}/>
}
