// NebulaBackground.jsx — PHONE OPTIMIZED + FULL EXPERIENCE
// Mobile: smaller nebula, fewer particles, 30fps cap, GPU
// Desktop: full 60fps, full quality
// ZAI explosion + real petals — both devices

import { useEffect, useRef } from 'react'
import { IMG_NEBULA, IMG_PETAL } from '../assets.js'

export default function NebulaBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: false })

    const isMobile = window.innerWidth < 768 ||
      /Android|iPhone|iPad/i.test(navigator.userAgent)

    // Phone: 30fps cap to halve CPU
    const TARGET_FPS  = isMobile ? 30 : 60
    const FRAME_MS    = 1000 / TARGET_FPS
    const PETAL_COUNT = isMobile ? 7  : 15
    const STAR_COUNT  = isMobile ? 24 : 48
    const STAR_SKIP   = isMobile ? 3  : 2
    const ZAI_STEP    = isMobile ? 5  : 3

    const state = {
      W:0, H:0,
      mx:0.5, my:0.5, tmx:0.5, tmy:0.5,
      time:0, zaiTime:0,
      raf:null, frame:0, lastT:0,
      nebula:null, nebulaLoaded:false,
      petal:null,  petalLoaded:false,
      petalCache:null,
      stars:[], petals:[],
      zaiParticles:[], zaiReady:false,
    }

    function buildStars(W, H) {
      state.stars = Array.from({length:STAR_COUNT}, () => ({
        x:  Math.random()*W, y: Math.random()*H,
        r:  0.4+Math.random()*1.0,
        sp: 0.003+Math.random()*0.005,
        ph: Math.random()*Math.PI*2,
        red:Math.random()<0.65,
      }))
    }

    function buildPetals(W, H) {
      state.petals = Array.from({length:PETAL_COUNT}, (_,i) => ({
        x:   (Math.random()*1.2-0.1)*W,
        y:   -50-(i/PETAL_COUNT)*H*1.6,
        vy:  0.30+Math.random()*0.50,
        vx:  (Math.random()-0.5)*0.28,
        rot: Math.random()*Math.PI*2,
        vRot:(Math.random()-0.5)*0.016,
        sw:  Math.random()*Math.PI*2,
        swS: 0.003+Math.random()*0.004,
        swA: 0.14+Math.random()*0.26,
        sc:  isMobile ? 0.20+Math.random()*0.24 : 0.24+Math.random()*0.30,
        al:  0.62+Math.random()*0.32,
      }))
    }

    function buildPetalCache(img) {
      const sizes = isMobile ? [22,32,44] : [28,40,56]
      state.petalCache = sizes.map(s => {
        const oc = document.createElement('canvas')
        oc.width  = s
        oc.height = Math.round(s*(img.height/img.width))
        oc.getContext('2d').drawImage(img,0,0,oc.width,oc.height)
        return oc
      })
    }

    function buildZai(W, H) {
      const off = document.createElement('canvas')
      const fs  = Math.floor(Math.min(W*0.28, isMobile?160:200))
      off.width  = Math.min(W*0.7, 600)
      off.height = fs*1.4
      const oc = off.getContext('2d')
      oc.fillStyle = '#fff'
      oc.font = `300 ${fs}px 'Cormorant Garamond',Georgia,serif`
      oc.textAlign = 'center'
      oc.textBaseline = 'middle'
      oc.fillText('ZAI', off.width/2, off.height/2)
      const id = oc.getImageData(0,0,off.width,off.height)
      const pts = []
      for (let y=0;y<off.height;y+=ZAI_STEP)
        for (let x=0;x<off.width;x+=ZAI_STEP)
          if (id.data[(y*off.width+x)*4+3]>100) pts.push({x,y})
      const ox=(W-off.width)/2, oy=(H-off.height)/2
      state.zaiParticles = pts.map(p=>({
        tx:p.x+ox, ty:p.y+oy,
        x: W/2+(Math.random()-0.5)*W*0.9,
        y: H/2+(Math.random()-0.5)*H*0.8,
        r: isMobile?1.0+Math.random()*1.2:1.2+Math.random()*1.8,
        hue:340+Math.floor(Math.random()*30),
        sat:65+Math.floor(Math.random()*30),
        lgt:40+Math.floor(Math.random()*30),
      }))
      state.zaiReady=true
    }

    function resize() {
      // Use devicePixelRatio for crisp mobile rendering
      const dpr = isMobile ? Math.min(window.devicePixelRatio||1, 2) : 1
      state.W = window.innerWidth
      state.H = window.innerHeight
      canvas.width  = state.W * dpr
      canvas.height = state.H * dpr
      canvas.style.width  = state.W + 'px'
      canvas.style.height = state.H + 'px'
      ctx.scale(dpr, dpr)
      buildStars(state.W, state.H)
      buildPetals(state.W, state.H)
    }

    const nImg = new Image()
    nImg.onload = () => { state.nebula=nImg; state.nebulaLoaded=true }
    nImg.src = IMG_NEBULA

    const pImg = new Image()
    pImg.onload = () => {
      state.petal=pImg; state.petalLoaded=true
      buildPetalCache(pImg)
    }
    pImg.src = IMG_PETAL

    const onMouse = (e) => {
      state.tmx=e.clientX/window.innerWidth
      state.tmy=e.clientY/window.innerHeight
    }
    // Touch parallax for mobile
    const onTouch = (e) => {
      if (!e.touches[0]) return
      state.tmx=e.touches[0].clientX/window.innerWidth
      state.tmy=e.touches[0].clientY/window.innerHeight
    }
    window.addEventListener('mousemove', onMouse, {passive:true})
    window.addEventListener('touchmove', onTouch, {passive:true})
    window.addEventListener('resize', resize)
    resize()
    setTimeout(() => buildZai(state.W, state.H), 300)

    function tick(now) {
      state.raf = requestAnimationFrame(tick)

      // FPS cap
      if (now - state.lastT < FRAME_MS) return
      state.lastT = now

      state.frame++
      state.time    += 0.015 * (isMobile ? 1.0 : 1.0)
      state.zaiTime += 0.015
      const {W,H,time,frame} = state

      // Smooth input
      state.mx += (state.tmx-state.mx)*0.04
      state.my += (state.tmy-state.my)*0.04

      ctx.fillStyle='#030306'
      ctx.fillRect(0,0,W,H)

      // Nebula
      if (state.nebulaLoaded) {
        const hb    = Math.sin(time*7.54)*0.5+0.5
        const pulse = 0.40+hb*0.20
        const mx    = (state.mx-0.5)*16
        const my    = (state.my-0.5)*10
        const zoom  = 1+hb*0.012
        const dW=W*zoom, dH=H*zoom
        ctx.save()
        ctx.globalAlpha=pulse
        ctx.drawImage(state.nebula,(W-dW)/2+mx,(H-dH)/2+my,dW,dH)
        ctx.restore()
        const gi=0.035+hb*0.08
        const gr=ctx.createRadialGradient(W*.5,H*.4,0,W*.5,H*.4,W*.5)
        gr.addColorStop(0,`rgba(120,0,0,${gi})`)
        gr.addColorStop(1,'rgba(0,0,0,0)')
        ctx.fillStyle=gr; ctx.fillRect(0,0,W,H)
      }

      // Vignette
      const vg=ctx.createRadialGradient(W*.5,H*.5,H*.08,W*.5,H*.5,W*.9)
      vg.addColorStop(0,'rgba(3,3,6,0)')
      vg.addColorStop(0.5,'rgba(3,3,6,0.13)')
      vg.addColorStop(1,'rgba(3,3,6,0.82)')
      ctx.fillStyle=vg; ctx.fillRect(0,0,W,H)

      // Stars
      if (frame%STAR_SKIP===0) {
        state.stars.forEach(s=>{
          const tw=Math.sin(time*s.sp*60+s.ph)*0.5+0.5
          ctx.save()
          ctx.globalAlpha=0.08+tw*0.55
          ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2)
          ctx.fillStyle=s.red
            ?`rgb(255,${55+Math.floor(tw*40)},${25+Math.floor(tw*20)})`
            :`rgb(255,255,${180+Math.floor(tw*75)})`
          ctx.shadowBlur=s.r*2.5
          ctx.shadowColor=s.red?'rgba(255,50,50,0.5)':'rgba(255,255,200,0.4)'
          ctx.fill(); ctx.restore()
        })
      }

      // ZAI explosion
      const zt=state.zaiTime
      if (state.zaiReady && zt<5.2) {
        state.zaiParticles.forEach(p=>{
          let x,y,alpha,glow=false
          if (zt<0.6) {
            const pr=zt/0.6
            x=W/2+(p.x-W/2)*pr*1.8; y=H/2+(p.y-H/2)*pr*1.8; alpha=pr*0.7
          } else if (zt<2.8) {
            const pr=(zt-0.6)/2.2, ease=1-Math.pow(1-pr,3)
            x=p.x+(p.tx-p.x)*ease; y=p.y+(p.ty-p.y)*ease; alpha=0.75+ease*0.15
          } else if (zt<4.2) {
            x=p.tx; y=p.ty; alpha=0.80+Math.sin(zt*9)*0.18; glow=true
          } else {
            const pr=(zt-4.2)/1.0
            x=p.tx; y=p.ty-pr*30; alpha=Math.max(0,0.9-pr)
          }
          ctx.save()
          ctx.globalAlpha=alpha
          ctx.beginPath(); ctx.arc(x,y,p.r,0,Math.PI*2)
          ctx.fillStyle=`hsl(${p.hue},${p.sat}%,${p.lgt}%)`
          if (glow){ctx.shadowBlur=8; ctx.shadowColor='rgba(255,30,60,0.9)'}
          ctx.fill(); ctx.restore()
        })
        if (zt>2.2&&zt<4.5) {
          const fi=Math.min(1,(zt-2.2)/0.6), fo=zt>4.0?Math.max(0,(4.5-zt)/0.5):1
          ctx.save()
          ctx.globalAlpha=fi*fo*0.22
          ctx.font=`300 ${Math.floor(W*0.22)}px 'Cormorant Garamond',Georgia,serif`
          ctx.textAlign='center'; ctx.textBaseline='middle'
          ctx.fillStyle='rgba(255,40,80,1)'
          ctx.shadowBlur=70; ctx.shadowColor='rgba(255,0,40,0.95)'
          ctx.fillText('ZAI',W/2,H/2); ctx.restore()
        }
      }

      // Petals
      if (state.petalLoaded&&state.petalCache) {
        state.petals.forEach(p=>{
          p.sw+=p.swS; p.x+=p.vx+Math.sin(p.sw)*p.swA
          p.y+=p.vy; p.rot+=p.vRot
          if(p.y>H+50){p.y=-50-Math.random()*60;p.x=Math.random()*W}
          if(p.x<-80)p.x=W+40; if(p.x>W+80)p.x=-40
          const tW=state.petal.width*p.sc
          const c=state.petalCache.reduce((a,b)=>
            Math.abs(a.width-tW)<Math.abs(b.width-tW)?a:b)
          ctx.save()
          ctx.globalAlpha=p.al
          ctx.translate(p.x,p.y); ctx.rotate(p.rot)
          ctx.drawImage(c,-c.width/2,-c.height/2)
          ctx.restore()
        })
      }
    }
    state.raf=requestAnimationFrame(tick)

    return ()=>{
      cancelAnimationFrame(state.raf)
      window.removeEventListener('mousemove',onMouse)
      window.removeEventListener('touchmove',onTouch)
      window.removeEventListener('resize',resize)
    }
  },[])

  return (
    <canvas ref={canvasRef} style={{
      position:'fixed',inset:0,zIndex:0,
      pointerEvents:'none',
      willChange:'transform',
      transform:'translateZ(0)',
    }}/>
  )
}
