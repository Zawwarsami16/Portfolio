// Petals.jsx — MORE petals, FASTER fall, FOREGROUND z:50

import { useEffect, useRef } from 'react'
import { IMG_PETAL } from '../assets.js'

export default function Petals() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const isMobile = window.innerWidth < 768 || /Android|iPhone|iPad/i.test(navigator.userAgent)
    const FRAME_MS = isMobile ? 33 : 16
    const COUNT    = isMobile ? 28 : 45   // MORE!

    const state = { W:0, H:0, raf:null, lastT:0, img:null, loaded:false, cache:null, petals:[] }

    function buildCache(img) {
      const sizes = isMobile ? [20,30,42,56] : [26,38,54,72]
      state.cache = sizes.map(s=>{
        const oc=document.createElement('canvas')
        oc.width=s; oc.height=Math.round(s*(img.height/img.width))
        oc.getContext('2d').drawImage(img,0,0,oc.width,oc.height)
        return oc
      })
    }

    function buildPetals(W, H) {
      state.petals = Array.from({length:COUNT}, (_,i) => ({
        x:   (Math.random()*1.3-0.15)*W,
        y:   -30 - (i/COUNT)*H*1.2,
        vy:  0.8+Math.random()*1.4,      // FASTER: was 0.3-0.8
        vx:  (Math.random()-0.5)*0.5,
        rot: Math.random()*Math.PI*2,
        vRot:(Math.random()-0.5)*0.028,  // more spin
        sw:  Math.random()*Math.PI*2,
        swS: 0.004+Math.random()*0.006,
        swA: 0.20+Math.random()*0.35,
        sc:  isMobile ? 0.22+Math.random()*0.30 : 0.28+Math.random()*0.38,
        al:  0.72+Math.random()*0.26,    // more visible
      }))
    }

    function resize() {
      const dpr=isMobile?Math.min(window.devicePixelRatio||1,2):1
      state.W=window.innerWidth; state.H=window.innerHeight
      canvas.width=state.W*dpr; canvas.height=state.H*dpr
      canvas.style.width=state.W+'px'; canvas.style.height=state.H+'px'
      ctx.scale(dpr,dpr)
      buildPetals(state.W,state.H)
    }

    const img=new Image()
    img.onload=()=>{ state.img=img; state.loaded=true; buildCache(img) }
    img.src=IMG_PETAL
    window.addEventListener('resize',resize)
    resize()

    function tick(now) {
      state.raf=requestAnimationFrame(tick)
      if(now-state.lastT<FRAME_MS) return
      state.lastT=now
      const {W,H}=state
      ctx.clearRect(0,0,W,H)
      if(!state.loaded||!state.cache) return

      state.petals.forEach(p=>{
        p.sw+=p.swS
        p.x +=p.vx+Math.sin(p.sw)*p.swA
        p.y +=p.vy
        p.rot+=p.vRot
        if(p.y>H+60){p.y=-30-Math.random()*80;p.x=Math.random()*W}
        if(p.x<-80) p.x=W+40
        if(p.x>W+80) p.x=-40
        const tW=state.img.width*p.sc
        const c=state.cache.reduce((a,b)=>Math.abs(a.width-tW)<Math.abs(b.width-tW)?a:b)
        ctx.save()
        ctx.globalAlpha=p.al
        ctx.translate(p.x,p.y); ctx.rotate(p.rot)
        ctx.drawImage(c,-c.width/2,-c.height/2)
        ctx.restore()
      })
    }
    state.raf=requestAnimationFrame(tick)
    return()=>{ cancelAnimationFrame(state.raf); window.removeEventListener('resize',resize) }
  },[])

  return <canvas ref={canvasRef} style={{position:'fixed',inset:0,zIndex:50,pointerEvents:'none',willChange:'transform',transform:'translateZ(0)'}}/>
}
