// Petals.jsx — FOREGROUND z:50
// More petals, front of everything, mindblowing surprise:
// 🎆 On load: petals EXPLODE from center then settle into falling shower

import { useEffect, useRef } from 'react'
import { IMG_PETAL } from '../assets.js'

export default function Petals() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')   // alpha:true — needs transparency
    const isMobile = window.innerWidth < 768 || /Android|iPhone|iPad/i.test(navigator.userAgent)
    const TARGET_FPS = isMobile ? 30 : 60
    const FRAME_MS   = 1000 / TARGET_FPS
    const COUNT      = isMobile ? 22 : 35  // more petals!

    const state = {
      W:0, H:0, raf:null, lastT:0,
      img:null, loaded:false, cache:null,
      petals:[], burst:true, burstTimer:0,
    }

    function buildCache(img) {
      // Pre-render at multiple sizes
      const sizes = isMobile ? [18,26,36,48] : [22,34,48,64]
      state.cache = sizes.map(s=>{
        const oc=document.createElement('canvas')
        oc.width=s; oc.height=Math.round(s*(img.height/img.width))
        oc.getContext('2d').drawImage(img,0,0,oc.width,oc.height)
        return oc
      })
    }

    function buildPetals(W, H) {
      state.petals = Array.from({length:COUNT}, (_,i) => {
        const isBurst = i < COUNT * 0.4  // 40% start as burst
        return {
          // Normal falling props
          x:   isBurst ? W/2 : (Math.random()*1.2-0.1)*W,
          y:   isBurst ? H/2 : -40-(i/COUNT)*H*1.5,
          vy:  isBurst ? -(4+Math.random()*6) : 0.30+Math.random()*0.55,
          vx:  isBurst ? (Math.random()-0.5)*8 : (Math.random()-0.5)*0.28,
          rot: Math.random()*Math.PI*2,
          vRot:(Math.random()-0.5)*0.02,
          sw:  Math.random()*Math.PI*2,
          swS: 0.003+Math.random()*0.005,
          swA: 0.14+Math.random()*0.28,
          sc:  isMobile ? 0.20+Math.random()*0.28 : 0.26+Math.random()*0.36,
          al:  0.70+Math.random()*0.28,
          // Burst physics
          burst: isBurst,
          gravity: 0.08+Math.random()*0.06,
        }
      })
    }

    function resize() {
      const dpr = isMobile ? Math.min(window.devicePixelRatio||1,2) : 1
      state.W=window.innerWidth; state.H=window.innerHeight
      canvas.width=state.W*dpr; canvas.height=state.H*dpr
      canvas.style.width=state.W+'px'; canvas.style.height=state.H+'px'
      ctx.scale(dpr,dpr)
      buildPetals(state.W,state.H)
    }

    const img = new Image()
    img.onload = ()=>{ state.img=img; state.loaded=true; buildCache(img) }
    img.src = IMG_PETAL
    window.addEventListener('resize', resize)
    resize()

    function tick(now) {
      state.raf=requestAnimationFrame(tick)
      if(now-state.lastT<FRAME_MS) return
      state.lastT=now
      state.burstTimer+=0.016
      const {W,H} = state

      ctx.clearRect(0,0,W,H)
      if (!state.loaded||!state.cache) return

      state.petals.forEach(p=>{
        if (p.burst && state.burstTimer < 3.0) {
          // Burst physics — gravity pulls down
          p.vy += p.gravity
          p.x  += p.vx
          p.y  += p.vy
          p.rot+= p.vRot * 3
          // Once petal falls to normal range, switch to shower mode
          if (p.y > -20 && p.vy > 0) {
            p.burst=false
            p.vy=0.35+Math.random()*0.50
            p.vx=(Math.random()-0.5)*0.28
            p.vRot=(Math.random()-0.5)*0.016
          }
        } else {
          // Normal shower
          p.sw+=p.swS
          p.x +=p.vx+Math.sin(p.sw)*p.swA
          p.y +=p.vy
          p.rot+=p.vRot
          if(p.y>H+50){p.y=-40-Math.random()*60;p.x=Math.random()*W}
          if(p.x<-80) p.x=W+40
          if(p.x>W+80) p.x=-40
        }

        // Pick closest cached size
        const tW=state.img.width*p.sc
        const c=state.cache.reduce((a,b)=>Math.abs(a.width-tW)<Math.abs(b.width-tW)?a:b)

        ctx.save()
        ctx.globalAlpha=p.al
        ctx.translate(p.x,p.y)
        ctx.rotate(p.rot)
        ctx.drawImage(c,-c.width/2,-c.height/2)
        ctx.restore()
      })
    }
    state.raf=requestAnimationFrame(tick)
    return ()=>{ cancelAnimationFrame(state.raf); window.removeEventListener('resize',resize) }
  },[])

  return <canvas ref={canvasRef} style={{
    position:'fixed',inset:0,
    zIndex:50,           // FRONT of everything
    pointerEvents:'none',
    willChange:'transform',
    transform:'translateZ(0)',
  }}/>
}
