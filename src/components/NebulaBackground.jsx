// NebulaBackground.jsx — COMPLETE FINAL
// • Nebula heartbeat (72bpm) + mouse parallax
// • Real rose petal shower (visible, graceful)
// • ZAI PARTICLE EXPLOSION on load — particles form "ZAI" in crimson red
// • Phone optimized — fewer petals, no mouse events on mobile
// • Single RAF loop — minimum CPU

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

    const PETAL_COUNT = isMobile ? 8 : 15
    const STAR_COUNT  = isMobile ? 28 : 48
    const STAR_SKIP   = isMobile ? 4  : 3

    const state = {
      W:0, H:0,
      mx:0.5, my:0.5, tmx:0.5, tmy:0.5,
      time:0, zaiTime:0,
      raf:null, frame:0,
      nebula:null, nebulaLoaded:false,
      petal:null,  petalLoaded:false,
      petalCache:null,
      stars:[], petals:[],
      zaiParticles:[], zaiReady:false,
    }

    // ── Stars ──
    function buildStars(W, H) {
      state.stars = Array.from({length:STAR_COUNT}, () => ({
        x:Math.random()*W, y:Math.random()*H,
        r:0.4+Math.random()*1.0,
        sp:0.003+Math.random()*0.005,
        ph:Math.random()*Math.PI*2,
        red:Math.random()<0.65,
      }))
    }

    // ── Petals ──
    function buildPetals(W, H) {
      state.petals = Array.from({length:PETAL_COUNT}, (_,i) => ({
        x:   (Math.random()*1.2-0.1)*W,
        y:   -50-(i/PETAL_COUNT)*H*1.6,
        vy:  0.30+Math.random()*0.50,
        vx:  (Math.random()-0.5)*0.30,
        rot: Math.random()*Math.PI*2,
        vRot:(Math.random()-0.5)*0.016,
        sw:  Math.random()*Math.PI*2,
        swS: 0.003+Math.random()*0.004,
        swA: 0.14+Math.random()*0.26,
        sc:  isMobile ? 0.18+Math.random()*0.22 : 0.24+Math.random()*0.30,
        al:  0.65+Math.random()*0.32,   // more visible!
      }))
    }

    // ── Pre-cache petal at 3 sizes ──
    function buildPetalCache(img) {
      const sizes = isMobile ? [20,28,38] : [26,38,52]
      state.petalCache = sizes.map(s => {
        const oc = document.createElement('canvas')
        oc.width  = s
        oc.height = Math.round(s * (img.height/img.width))
        oc.getContext('2d').drawImage(img, 0, 0, oc.width, oc.height)
        return oc
      })
    }

    // ── ZAI particle setup ──
    function buildZaiParticles(W, H) {
      const off = document.createElement('canvas')
      const fontSize = Math.floor(Math.min(W * 0.28, 200))
      off.width  = Math.min(W * 0.7, 600)
      off.height = fontSize * 1.4

      const oc = off.getContext('2d')
      oc.fillStyle = '#fff'
      oc.font = `300 ${fontSize}px 'Cormorant Garamond', Georgia, serif`
      oc.textAlign = 'center'
      oc.textBaseline = 'middle'
      oc.fillText('ZAI', off.width/2, off.height/2)

      const imgData = oc.getImageData(0, 0, off.width, off.height)
      const pts = []
      const step = isMobile ? 5 : 3
      for (let y=0; y<off.height; y+=step) {
        for (let x=0; x<off.width; x+=step) {
          if (imgData.data[(y*off.width+x)*4+3] > 100) pts.push({x, y})
        }
      }

      // Center on screen
      const offX = (W - off.width)  / 2
      const offY = (H - off.height) / 2

      state.zaiParticles = pts.map(p => ({
        // Target — where particle ends up
        tx: p.x + offX,
        ty: p.y + offY,
        // Start — random scatter across screen
        x:  W/2 + (Math.random()-0.5)*W*0.9,
        y:  H/2 + (Math.random()-0.5)*H*0.8,
        r:  isMobile ? 1.0+Math.random()*1.4 : 1.2+Math.random()*1.8,
        hue:   340 + Math.floor(Math.random()*30),
        sat:   65  + Math.floor(Math.random()*30),
        light: 40  + Math.floor(Math.random()*30),
      }))
      state.zaiReady = true
    }

    function resize() {
      state.W = canvas.width  = window.innerWidth
      state.H = canvas.height = window.innerHeight
      buildStars(state.W, state.H)
      buildPetals(state.W, state.H)
    }

    // Load images
    const nImg = new Image()
    nImg.onload = () => { state.nebula = nImg; state.nebulaLoaded = true }
    nImg.src = IMG_NEBULA

    const pImg = new Image()
    pImg.onload = () => {
      state.petal = pImg
      state.petalLoaded = true
      buildPetalCache(pImg)
    }
    pImg.src = IMG_PETAL

    // Mouse
    const onMouse = (e) => {
      state.tmx = e.clientX/window.innerWidth
      state.tmy = e.clientY/window.innerHeight
    }
    if (!isMobile) window.addEventListener('mousemove', onMouse, {passive:true})
    window.addEventListener('resize', resize)
    resize()

    // Build ZAI after fonts likely loaded
    setTimeout(() => buildZaiParticles(state.W, state.H), 300)

    // ── MAIN RAF LOOP ──
    function tick() {
      state.frame++
      state.time    += 0.015
      state.zaiTime += 0.015
      const {W, H, time, frame} = state

      if (!isMobile) {
        state.mx += (state.tmx-state.mx)*0.04
        state.my += (state.tmy-state.my)*0.04
      }

      // 1. Base
      ctx.fillStyle = '#030306'
      ctx.fillRect(0,0,W,H)

      // 2. Nebula
      if (state.nebulaLoaded) {
        const hb    = Math.sin(time*7.54)*0.5+0.5
        const pulse = 0.40+hb*0.20
        const mx    = (state.mx-0.5)*16
        const my    = (state.my-0.5)*10
        const zoom  = 1+hb*0.012
        const dW=W*zoom, dH=H*zoom
        ctx.save()
        ctx.globalAlpha = pulse
        ctx.drawImage(state.nebula,(W-dW)/2+mx,(H-dH)/2+my,dW,dH)
        ctx.restore()
        const gi=0.035+hb*0.08
        const gr=ctx.createRadialGradient(W*.5,H*.4,0,W*.5,H*.4,W*.5)
        gr.addColorStop(0,`rgba(120,0,0,${gi})`)
        gr.addColorStop(1,'rgba(0,0,0,0)')
        ctx.fillStyle=gr; ctx.fillRect(0,0,W,H)
      }

      // 3. Vignette
      const vg=ctx.createRadialGradient(W*.5,H*.5,H*.08,W*.5,H*.5,W*.9)
      vg.addColorStop(0,'rgba(3,3,6,0)')
      vg.addColorStop(0.5,'rgba(3,3,6,0.13)')
      vg.addColorStop(1,'rgba(3,3,6,0.82)')
      ctx.fillStyle=vg; ctx.fillRect(0,0,W,H)

      // 4. Stars
      if (frame%STAR_SKIP===0) {
        state.stars.forEach(s => {
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

      // 5. ZAI PARTICLE EXPLOSION (first 5 seconds)
      const zt = state.zaiTime
      if (state.zaiReady && zt < 5.2) {
        state.zaiParticles.forEach(p => {
          let x, y, alpha, glow=false

          if (zt < 0.6) {
            // Phase 1: scatter outward from center
            const prog = zt/0.6
            x = W/2 + (p.x-W/2)*prog*1.8
            y = H/2 + (p.y-H/2)*prog*1.8
            alpha = prog*0.7
          } else if (zt < 2.8) {
            // Phase 2: fly to target (ease out cubic)
            const prog = (zt-0.6)/2.2
            const ease = 1-Math.pow(1-prog, 3)
            x = p.x + (p.tx-p.x)*ease
            y = p.y + (p.ty-p.y)*ease
            alpha = 0.75+ease*0.15
          } else if (zt < 4.2) {
            // Phase 3: hold + crimson pulse glow
            x=p.tx; y=p.ty
            alpha = 0.80+Math.sin(zt*9)*0.18
            glow = true
          } else {
            // Phase 4: fade out + drift up
            const prog=(zt-4.2)/1.0
            x=p.tx; y=p.ty-prog*30
            alpha=Math.max(0,0.9-prog)
          }

          ctx.save()
          ctx.globalAlpha=alpha
          ctx.beginPath()
          ctx.arc(x,y,p.r,0,Math.PI*2)
          ctx.fillStyle=`hsl(${p.hue},${p.sat}%,${p.light}%)`
          if (glow) {
            ctx.shadowBlur=8
            ctx.shadowColor='rgba(255,30,60,0.9)'
          }
          ctx.fill()
          ctx.restore()
        })

        // ZAI glow text when formed
        if (zt>2.2 && zt<4.5) {
          const fi=Math.min(1,(zt-2.2)/0.6)
          const fo=zt>4.0?Math.max(0,(4.5-zt)/0.5):1
          ctx.save()
          ctx.globalAlpha=fi*fo*0.22
          ctx.font=`300 ${Math.floor(W*0.22)}px 'Cormorant Garamond',Georgia,serif`
          ctx.textAlign='center'; ctx.textBaseline='middle'
          ctx.fillStyle='rgba(255,40,80,1)'
          ctx.shadowBlur=70; ctx.shadowColor='rgba(255,0,40,0.95)'
          ctx.fillText('ZAI',W/2,H/2)
          ctx.restore()
        }
      }

      // 6. Petal shower — real PNG
      if (state.petalLoaded && state.petalCache) {
        state.petals.forEach(p => {
          p.sw+=p.swS
          p.x +=p.vx+Math.sin(p.sw)*p.swA
          p.y +=p.vy
          p.rot+=p.vRot
          if (p.y>H+50) { p.y=-50-Math.random()*60; p.x=Math.random()*W }
          if (p.x<-80)   p.x=W+40
          if (p.x>W+80)  p.x=-40

          const targetW=state.petal.width*p.sc
          const cache=state.petalCache.reduce((a,b)=>
            Math.abs(a.width-targetW)<Math.abs(b.width-targetW)?a:b)

          ctx.save()
          ctx.globalAlpha=p.al
          ctx.translate(p.x,p.y)
          ctx.rotate(p.rot)
          ctx.drawImage(cache,-cache.width/2,-cache.height/2)
          ctx.restore()
        })
      }

      state.raf=requestAnimationFrame(tick)
    }
    state.raf=requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(state.raf)
      if (!isMobile) window.removeEventListener('mousemove',onMouse)
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
