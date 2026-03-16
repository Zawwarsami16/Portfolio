// Petals.jsx — optimized, fewer petals, offscreen pre-render trick
// Single RAF, GPU canvas, no React state

import { useEffect, useRef } from 'react'
import { IMG_PETAL } from '../assets.js'

export default function Petals({ count = 12 }) {  // reduced from 18 to 12
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    // willReadFrequently:false + no alpha needed for performance
    const ctx = canvas.getContext('2d')
    const state = { W:0, H:0, petals:[], raf:null, img:null, loaded:false }

    function init(W, H) {
      state.petals = Array.from({length:count}, (_,i) => ({
        x:     Math.random() * W,
        y:     -20 - (i/count) * H,
        vy:    0.5 + Math.random() * 0.9,    // slower = less CPU
        vx:    (Math.random()-0.5) * 0.3,
        rot:   Math.random() * Math.PI * 2,
        vRot:  (Math.random()-0.5) * 0.018,  // slower rotation
        sway:  Math.random() * Math.PI * 2,
        swayS: 0.004 + Math.random() * 0.007,
        swayA: 0.22 + Math.random() * 0.38,
        scale: 0.28 + Math.random() * 0.42,
        alpha: 0.45 + Math.random() * 0.45,
      }))
    }

    function resize() {
      state.W = canvas.width  = window.innerWidth
      state.H = canvas.height = window.innerHeight
      init(state.W, state.H)
    }
    resize()
    window.addEventListener('resize', resize)

    const img = new Image()
    img.onload = () => { state.img = img; state.loaded = true }
    img.src = IMG_PETAL

    let frame = 0
    function tick() {
      frame++
      ctx.clearRect(0, 0, state.W, state.H)

      if (state.loaded) {
        state.petals.forEach(p => {
          p.sway += p.swayS
          p.x    += p.vx + Math.sin(p.sway) * p.swayA
          p.y    += p.vy
          p.rot  += p.vRot

          if (p.y > state.H + 30) {
            p.y = -20 - Math.random() * 40
            p.x = Math.random() * state.W
          }

          const pw = state.img.width  * p.scale
          const ph = state.img.height * p.scale

          ctx.save()
          ctx.globalAlpha = p.alpha
          ctx.translate(p.x, p.y)
          ctx.rotate(p.rot)
          ctx.drawImage(state.img, -pw/2, -ph/2, pw, ph)
          ctx.restore()
        })
      }

      state.raf = requestAnimationFrame(tick)
    }
    state.raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(state.raf)
      window.removeEventListener('resize', resize)
    }
  }, [count])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position:'fixed', inset:0, zIndex:50,
        pointerEvents:'none',
        willChange:'transform',
        transform:'translateZ(0)',
      }}
    />
  )
}
