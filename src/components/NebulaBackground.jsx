// NebulaBackground.jsx — FIXED full page, no scroll shift
// GPU accelerated, heartbeat pulse, mouse tilt, twinkling stars
// NO scrollY tracking — purely fixed background

import { useEffect, useRef } from 'react'
import { IMG_NEBULA } from '../assets.js'

export default function NebulaBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: false }) // alpha:false = faster
    const state = {
      W:0, H:0,
      mouseX:0.5, mouseY:0.5,
      targetMX:0.5, targetMY:0.5, // smooth mouse
      time:0, raf:null,
      img:null, imgLoaded:false,
      stars:[],
    }

    function buildStars(W, H) {
      state.stars = Array.from({length:80}, () => ({
        x:     Math.random() * W,
        y:     Math.random() * H,
        r:     0.4 + Math.random() * 1.2,
        speed: 0.004 + Math.random() * 0.007,
        phase: Math.random() * Math.PI * 2,
        red:   Math.random() < 0.65,
      }))
    }

    function resize() {
      state.W = canvas.width  = window.innerWidth
      state.H = canvas.height = window.innerHeight
      buildStars(state.W, state.H)
    }

    // Load nebula image
    const img = new Image()
    img.onload = () => { state.img = img; state.imgLoaded = true }
    img.src = IMG_NEBULA

    // Smooth mouse — lerp, not direct set
    const onMouse = (e) => {
      state.targetMX = e.clientX / window.innerWidth
      state.targetMY = e.clientY / window.innerHeight
    }

    window.addEventListener('mousemove', onMouse, {passive:true})
    window.addEventListener('resize', resize)
    resize()

    function tick() {
      state.time += 0.015
      const {W, H, time} = state

      // Smooth mouse lerp
      state.mouseX += (state.targetMX - state.mouseX) * 0.04
      state.mouseY += (state.targetMY - state.mouseY) * 0.04

      // Fill base
      ctx.fillStyle = '#030306'
      ctx.fillRect(0,0,W,H)

      if (state.imgLoaded) {
        // Heartbeat ~72bpm = 1.2Hz → 7.54 rad/s
        const hb    = Math.sin(time * 7.54) * 0.5 + 0.5
        const pulse = 0.42 + hb * 0.20   // opacity 0.42–0.62

        // Mouse parallax only (NO scroll shift)
        const mx   = (state.mouseX - 0.5) * 22
        const my   = (state.mouseY - 0.5) * 14
        const zoom = 1 + hb * 0.016      // subtle zoom on beat

        const dW = W * zoom
        const dH = H * zoom
        const ox = (W - dW) / 2 + mx
        const oy = (H - dH) / 2 + my

        ctx.save()
        ctx.globalAlpha = pulse
        ctx.drawImage(state.img, ox, oy, dW, dH)
        ctx.restore()

        // Red heartbeat glow overlay
        const gi = 0.05 + hb * 0.12
        const gr = ctx.createRadialGradient(W*.5,H*.4,0, W*.5,H*.4, W*.55)
        gr.addColorStop(0, `rgba(160,0,0,${gi})`)
        gr.addColorStop(0.55, `rgba(60,0,0,${gi*.4})`)
        gr.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.save()
        ctx.fillStyle = gr
        ctx.fillRect(0,0,W,H)
        ctx.restore()
      }

      // Vignette — darker edges
      const vg = ctx.createRadialGradient(W*.5,H*.5,H*.1, W*.5,H*.5,W*.9)
      vg.addColorStop(0, 'rgba(3,3,6,0)')
      vg.addColorStop(0.5, 'rgba(3,3,6,0.18)')
      vg.addColorStop(1, 'rgba(3,3,6,0.80)')
      ctx.fillStyle = vg
      ctx.fillRect(0,0,W,H)

      // Stars — only redraw every 2 frames for perf
      if (Math.floor(state.time * 60) % 2 === 0) {
        state.stars.forEach(s => {
          const tw  = Math.sin(time * s.speed * 60 + s.phase) * 0.5 + 0.5
          const alp = 0.12 + tw * 0.70
          ctx.save()
          ctx.globalAlpha = alp
          ctx.beginPath()
          ctx.arc(s.x, s.y, s.r, 0, Math.PI*2)
          ctx.fillStyle = s.red
            ? `rgb(255,${70+Math.floor(tw*50)},${40+Math.floor(tw*30)})`
            : `rgb(255,255,${195+Math.floor(tw*60)})`
          ctx.shadowBlur = s.r * 4
          ctx.shadowColor = s.red ? 'rgba(255,50,50,0.7)' : 'rgba(255,255,200,0.5)'
          ctx.fill()
          ctx.restore()
        })
      }

      state.raf = requestAnimationFrame(tick)
    }

    state.raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(state.raf)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        willChange: 'transform',        // GPU layer hint
        transform: 'translateZ(0)',     // force GPU composite
      }}
    />
  )
}
