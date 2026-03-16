// Roses.jsx
// Blood red 3D roses falling in the FOREGROUND.
// Each rose is a CSS 3D object — petals built from divs,
// not a canvas — so they appear in front of content.
// Some roses drift slowly, some fall fast, all rotate in 3D.

import { useEffect, useRef, useState } from 'react'

// One rose = layered ellipse petals rotated in 3D
function Rose({ style, size = 1, opacity = 1 }) {
  const petals = [
    { rx: 0,   ry: 0   },
    { rx: 45,  ry: 0   },
    { rx: 90,  ry: 0   },
    { rx: 135, ry: 0   },
    { rx: 0,   ry: 45  },
    { rx: 0,   ry: 90  },
    { rx: 60,  ry: 30  },
    { rx: 120, ry: 60  },
  ]

  return (
    <div style={{
      position:        'absolute',
      width:           `${24 * size}px`,
      height:          `${24 * size}px`,
      transformStyle:  'preserve-3d',
      pointerEvents:   'none',
      opacity,
      ...style,
    }}>
      {/* center bud */}
      <div style={{
        position:     'absolute',
        width:        `${8 * size}px`,
        height:       `${8 * size}px`,
        borderRadius: '50%',
        background:   'radial-gradient(circle, #8b0000, #5c0000)',
        top:          '50%', left: '50%',
        transform:    'translate(-50%,-50%)',
        boxShadow:    `0 0 ${4*size}px rgba(139,0,0,0.8)`,
        zIndex:       10,
      }} />

      {/* petals */}
      {petals.map((p, i) => (
        <div key={i} style={{
          position:     'absolute',
          width:        `${20 * size}px`,
          height:       `${10 * size}px`,
          borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
          background:   `radial-gradient(ellipse at 40% 40%,
            #ff1a1a,
            #cc0000 40%,
            #8b0000 70%,
            #5c0000
          )`,
          top:          '50%', left: '50%',
          transformOrigin: '0% 50%',
          transform:    `translate(-10%, -50%) rotateX(${p.rx}deg) rotateY(${p.ry}deg) rotateZ(${i * 45}deg)`,
          boxShadow:    `inset 0 0 ${3*size}px rgba(0,0,0,0.4), 0 0 ${2*size}px rgba(139,0,0,0.5)`,
          opacity:      0.85 + Math.sin(i) * 0.15,
        }} />
      ))}

      {/* inner petals — tighter ring */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <div key={`inner-${i}`} style={{
          position:     'absolute',
          width:        `${12 * size}px`,
          height:       `${6 * size}px`,
          borderRadius: '50%',
          background:   `radial-gradient(ellipse, #ff3333, #aa0000)`,
          top:          '50%', left: '50%',
          transformOrigin: '0% 50%',
          transform:    `translate(-10%, -50%) rotateZ(${angle}deg) rotateX(${30 + i*10}deg)`,
          opacity:      0.9,
        }} />
      ))}
    </div>
  )
}

// Individual falling rose with physics
function FallingRose({ id, windowW, windowH, onLand }) {
  const [pos, setPos] = useState(() => ({
    x:      Math.random() * windowW,
    y:      -80 - Math.random() * 300,
    rotX:   Math.random() * 360,
    rotY:   Math.random() * 360,
    rotZ:   Math.random() * 360,
    size:   0.6 + Math.random() * 0.9,
    vy:     1.2 + Math.random() * 2.2,
    vx:     (Math.random() - 0.5) * 0.6,
    vRotX:  (Math.random() - 0.5) * 2.5,
    vRotY:  (Math.random() - 0.5) * 2.5,
    vRotZ:  (Math.random() - 0.5) * 1.8,
    sway:   Math.random() * Math.PI * 2,
    swayS:  0.01 + Math.random() * 0.015,
    swayA:  0.3 + Math.random() * 0.5,
    landed: false,
    opacity:1,
  }))

  useEffect(() => {
    if (pos.landed) return
    const raf = requestAnimationFrame(() => {
      setPos(p => {
        if (p.landed) return p
        const newSway = p.sway + p.swayS
        const newX    = p.x + p.vx + Math.sin(newSway) * p.swayA
        const newY    = p.y + p.vy

        // hit bottom or random element
        if (newY > windowH + 60) {
          return { ...p, x: Math.random() * windowW, y: -80, sway: 0 }
        }

        return {
          ...p,
          x:    newX,
          y:    newY,
          rotX: p.rotX + p.vRotX,
          rotY: p.rotY + p.vRotY,
          rotZ: p.rotZ + p.vRotZ,
          sway: newSway,
          // slow down vRotX/Y over time — settle
          vRotX: p.vRotX * 0.998,
          vRotY: p.vRotY * 0.998,
        }
      })
    })
    return () => cancelAnimationFrame(raf)
  }, [pos, windowH, windowW])

  return (
    <Rose
      size={pos.size}
      opacity={pos.opacity}
      style={{
        left:      pos.x,
        top:       pos.y,
        transform: `rotateX(${pos.rotX}deg) rotateY(${pos.rotY}deg) rotateZ(${pos.rotZ}deg)`,
        transition:'none',
        filter:    `drop-shadow(0 0 ${6*pos.size}px rgba(139,0,0,0.6))`,
      }}
    />
  )
}

export default function Roses({ count = 18 }) {
  const [dims, setDims] = useState({ w: window.innerWidth, h: window.innerHeight })

  useEffect(() => {
    const handler = () => setDims({ w: window.innerWidth, h: window.innerHeight })
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  return (
    <div style={{
      position:      'fixed',
      inset:         0,
      zIndex:        50,           // IN FRONT of content
      pointerEvents: 'none',
      overflow:      'hidden',
      perspective:   '600px',
      perspectiveOrigin: '50% 50%',
    }}>
      {Array.from({ length: count }, (_, i) => (
        <FallingRose
          key={i}
          id={i}
          windowW={dims.w}
          windowH={dims.h}
        />
      ))}
    </div>
  )
}
