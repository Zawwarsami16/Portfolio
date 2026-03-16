// Card3D.jsx
// A card that tilts in 3D as you hover over it.
// The mouse position drives rotateX and rotateY.
// Roses that fall on top of it will "stick" briefly.

import { useRef, useState } from 'react'

export default function Card3D({ children, style = {}, glowColor = 'var(--gold)', intensity = 12 }) {
  const cardRef  = useRef(null)
  const [tilt,   setTilt]   = useState({ x: 0, y: 0 })
  const [shine,  setShine]  = useState({ x: 50, y: 50, opacity: 0 })
  const [lifted, setLifted] = useState(false)

  function onMouseMove(e) {
    const card   = cardRef.current
    if (!card) return
    const rect   = card.getBoundingClientRect()
    const cx     = rect.left + rect.width  / 2
    const cy     = rect.top  + rect.height / 2
    const dx     = (e.clientX - cx) / (rect.width  / 2)   // -1 to 1
    const dy     = (e.clientY - cy) / (rect.height / 2)   // -1 to 1

    setTilt({ x: -dy * intensity, y: dx * intensity })

    // shine position
    const sx = ((e.clientX - rect.left) / rect.width)  * 100
    const sy = ((e.clientY - rect.top)  / rect.height) * 100
    setShine({ x: sx, y: sy, opacity: 0.12 })
  }

  function onMouseLeave() {
    setTilt({ x: 0, y: 0 })
    setShine(s => ({ ...s, opacity: 0 }))
    setLifted(false)
  }

  function onMouseEnter() {
    setLifted(true)
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
      style={{
        position:        'relative',
        transformStyle:  'preserve-3d',
        transform:       `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${lifted ? 'translateZ(12px) scale(1.02)' : 'translateZ(0)'}`,
        transition:      lifted ? 'transform 0.1s ease' : 'transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)',
        boxShadow:       lifted
          ? `0 24px 60px rgba(0,0,0,0.6), 0 0 30px ${glowColor}22`
          : `0 8px 24px rgba(0,0,0,0.4)`,
        cursor:          'default',
        ...style,
      }}
    >
      {/* children */}
      {children}

      {/* shine overlay — follows mouse */}
      <div style={{
        position:      'absolute',
        inset:         0,
        borderRadius:  'inherit',
        pointerEvents: 'none',
        background:    `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(255,255,255,${shine.opacity * 1.5}), transparent 60%)`,
        transition:    'opacity 0.3s',
        zIndex:        5,
      }} />

      {/* edge glow when lifted */}
      {lifted && (
        <div style={{
          position:      'absolute',
          inset:         '-1px',
          borderRadius:  'inherit',
          border:        `1px solid ${glowColor}44`,
          pointerEvents: 'none',
          zIndex:        4,
        }} />
      )}
    </div>
  )
}
