// Petals.jsx — FINAL OPTIMIZED — foreground z:50
// Pre-cached sizes, single RAF, FPS cap, mobile portrait

import { useEffect, useRef } from 'react'
import { IMG_PETAL } from '../assets.js'

export default function Petals() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const mob = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || window.innerWidth < 768
    const MS  = mob ? 33 : 16
    const N   = mob ? 25 : 40

    const S = { W:0,H:0,raf:null,lt:0,img:null,ok:false,cache:null,p:[] }

    function mkCache(img){
      const sz=mob?[20,30,44,58]:[26,40,56,74]
      S.cache=sz.map(s=>{
        const o=document.createElement('canvas')
        o.width=s;o.height=Math.round(s*(img.height/img.width))
        o.getContext('2d').drawImage(img,0,0,o.width,o.height)
        return o
      })
    }

    function mkPetals(W,H){
      S.p=Array.from({length:N},(_,i)=>({
        x:(Math.random()*1.3-.15)*W,
        y:-30-(i/N)*H*1.3,
        vy:.7+Math.random()*1.2,      // fast
        vx:(Math.random()-.5)*.4,
        rot:Math.random()*Math.PI*2,
        vRot:(Math.random()-.5)*.025,
        sw:Math.random()*Math.PI*2,
        swS:.004+Math.random()*.005,
        swA:.18+Math.random()*.30,
        sc:mob?.22+Math.random()*.28:.28+Math.random()*.36,
        al:.72+Math.random()*.25,
      }))
    }

    function resize(){
      const dpr=mob?Math.min(window.devicePixelRatio||1,2):1
      S.W=window.innerWidth;S.H=window.innerHeight
      canvas.width=S.W*dpr;canvas.height=S.H*dpr
      canvas.style.width=S.W+'px';canvas.style.height=S.H+'px'
      ctx.scale(dpr,dpr)
      mkPetals(S.W,S.H)
    }

    const im=new Image()
    im.onload=()=>{S.img=im;S.ok=true;mkCache(im)}
    im.src=IMG_PETAL
    window.addEventListener('resize',resize)
    resize()

    function tick(now){
      S.raf=requestAnimationFrame(tick)
      if(now-S.lt<MS)return
      S.lt=now
      ctx.clearRect(0,0,S.W,S.H)
      if(!S.ok||!S.cache)return
      const{W,H}=S
      S.p.forEach(p=>{
        p.sw+=p.swS;p.x+=p.vx+Math.sin(p.sw)*p.swA
        p.y+=p.vy;p.rot+=p.vRot
        if(p.y>H+60){p.y=-30-Math.random()*80;p.x=Math.random()*W}
        if(p.x<-90)p.x=W+40;if(p.x>W+90)p.x=-40
        const tW=S.img.width*p.sc
        const c=S.cache.reduce((a,b)=>Math.abs(a.width-tW)<Math.abs(b.width-tW)?a:b)
        ctx.save();ctx.globalAlpha=p.al
        ctx.translate(p.x,p.y);ctx.rotate(p.rot)
        ctx.drawImage(c,-c.width/2,-c.height/2)
        ctx.restore()
      })
    }
    S.raf=requestAnimationFrame(tick)
    return()=>{cancelAnimationFrame(S.raf);window.removeEventListener('resize',resize)}
  },[])

  return <canvas ref={canvasRef} style={{position:'fixed',inset:0,zIndex:50,pointerEvents:'none',willChange:'transform',transform:'translateZ(0)'}}/>
}
