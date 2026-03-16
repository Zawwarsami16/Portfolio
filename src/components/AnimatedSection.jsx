// AnimatedSection.jsx
// Wraps any section in a scroll-triggered 3D entrance animation.
// Uses IntersectionObserver + CSS — no GSAP dependency needed,
// works everywhere, smooth 60fps.

import { useEffect, useRef, useState } from 'react'

export default function AnimatedSection({ children, delay = 0, direction = 'up' }) {
  const ref     = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el  = ref.current
    if (!el)  return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.unobserve(el) } },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const from = {
    up:    'translateY(50px) rotateX(8deg)',
    down:  'translateY(-50px) rotateX(-8deg)',
    left:  'translateX(-60px) rotateY(-8deg)',
    right: 'translateX(60px)  rotateY(8deg)',
    scale: 'scale(0.88) rotateX(6deg)',
  }[direction] || 'translateY(50px)'

  return (
    <div
      ref={ref}
      style={{
        opacity:          visible ? 1 : 0,
        transform:        visible ? 'none' : from,
        transition:       `opacity 0.9s ease ${delay}s, transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}s`,
        transformStyle:   'preserve-3d',
        willChange:       'opacity, transform',
      }}
    >
      {children}
    </div>
  )
}
