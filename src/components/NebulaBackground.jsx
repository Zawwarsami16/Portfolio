// NebulaBackground — FINAL OPTIMIZED
// Mobile: portrait nebula, 30fps, cover scaling (no stretch)
// Desktop: full quality 60fps
// ZAI explosion + heartbeat + mouse/touch parallax

import { useEffect, useRef } from 'react'
import { IMG_NEBULA } from '../assets.js'

export default function NebulaBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: false })
    const mob = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || window.innerWidth < 768
    const FPS = mob ? 30 : 60
    const MS  = 1000 / FPS
    const SC  = mob ? 22 : 48
    const SS  = mob ? 4  : 2
    const ZS  = mob ? 5  : 2

    const S = {
      W:0, H:0, mx:.5, my:.5, tmx:.5, tmy:.5,
      t:0, zt:0, raf:null, f:0, lt:0,
      img:null, ok:false, stars:[], zp:[], zr:false,
    }

    function mkStars(W,H){
      S.stars=Array.from({length:SC},()=>({
        x:Math.random()*W,y:Math.random()*H,
        r:.4+Math.random()*.9,sp:.003+Math.random()*.005,
        ph:Math.random()*Math.PI*2,red:Math.random()<.65
      }))
    }

    function mkZai(W,H){
      const off=document.createElement('canvas')
      const fs=Math.floor(Math.min(W*.30,mob?150:185))
      const OW=fs*4,OH=Math.ceil(fs*1.5)
      off.width=OW;off.height=OH
      const oc=off.getContext('2d')
      oc.fillStyle='#fff'
      oc.font=`700 ${fs}px Arial,sans-serif`  // Arial renders more reliably than serif
      oc.textAlign='center'
      oc.textBaseline='alphabetic'
      oc.fillText('ZAI',OW/2,OH*.82)
      const id=oc.getImageData(0,0,OW,OH),pts=[]
      for(let y=0;y<OH;y+=ZS)
        for(let x=0;x<OW;x+=ZS)
          if(id.data[(y*OW+x)*4+3]>100) pts.push({x,y})
      const ox=(W-OW)/2,oy=(H-OH)/2
      S.zp=pts.map(p=>({
        tx:p.x+ox,ty:p.y+oy,
        x:W/2+(Math.random()-.5)*W*.95,
        y:H/2+(Math.random()-.5)*H*.85,
        r:mob?1+Math.random()*1.3:1.4+Math.random()*2,
        h:340+Math.floor(Math.random()*25),
        s:70+Math.floor(Math.random()*25),
        l:45+Math.floor(Math.random()*25),
      }))
      S.zr=true
    }

    // Draw nebula with COVER scaling — never stretches
    function drawNebula(img,W,H,ox,oy,scale,alpha){
      // Cover: scale image to fill canvas maintaining aspect ratio
      const iw=img.width,ih=img.height
      const scaleX=W/iw,scaleY=H/ih
      const sc=Math.max(scaleX,scaleY)*scale  // cover = max, contain = min
      const dw=iw*sc,dh=ih*sc
      // Center + parallax offset
      const dx=(W-dw)/2+ox
      const dy=(H-dh)/2+oy
      ctx.save()
      ctx.globalAlpha=alpha
      ctx.filter='contrast(1.18) saturate(1.35) brightness(1.12)'
      ctx.drawImage(img,dx,dy,dw,dh)
      ctx.filter='none'
      ctx.restore()
    }

    function resize(){
      const dpr=mob?Math.min(window.devicePixelRatio||1,2):1
      S.W=window.innerWidth;S.H=window.innerHeight
      canvas.width=S.W*dpr;canvas.height=S.H*dpr
      canvas.style.width=S.W+'px';canvas.style.height=S.H+'px'
      ctx.scale(dpr,dpr)
      mkStars(S.W,S.H)
    }

    const im=new Image()
    im.onload=()=>{S.img=im;S.ok=true}
    im.src=IMG_NEBULA

    const onM=(e)=>{S.tmx=e.clientX/window.innerWidth;S.tmy=e.clientY/window.innerHeight}
    const onT=(e)=>{if(e.touches[0]){S.tmx=e.touches[0].clientX/window.innerWidth;S.tmy=e.touches[0].clientY/window.innerHeight}}
    window.addEventListener('mousemove',onM,{passive:true})
    window.addEventListener('touchmove',onT,{passive:true})
    window.addEventListener('resize',resize)
    resize()
    setTimeout(()=>mkZai(S.W,S.H),400)

    function tick(now){
      S.raf=requestAnimationFrame(tick)
      if(now-S.lt<MS)return
      S.lt=now;S.f++;S.t+=.015;S.zt+=.015
      const{W,H,t,f}=S
      S.mx+=(S.tmx-S.mx)*.04;S.my+=(S.tmy-S.my)*.04

      // Base
      ctx.fillStyle='#030306';ctx.fillRect(0,0,W,H)

      // Nebula — COVER, no stretch
      if(S.ok){
        const hb=Math.sin(t*7.54)*.5+.5
        const px=(S.mx-.5)*18,py=(S.my-.5)*12
        const zoom=1+hb*.012
        drawNebula(S.img,W,H,px,py,zoom,.50+hb*.22)
        const gr=ctx.createRadialGradient(W*.5,H*.4,0,W*.5,H*.4,W*.5)
        gr.addColorStop(0,`rgba(120,0,0,${.04+hb*.10})`)
        gr.addColorStop(1,'rgba(0,0,0,0)')
        ctx.fillStyle=gr;ctx.fillRect(0,0,W,H)
      }

      // Vignette
      const vg=ctx.createRadialGradient(W*.5,H*.5,H*.08,W*.5,H*.5,W*.9)
      vg.addColorStop(0,'rgba(3,3,6,0)')
      vg.addColorStop(.5,'rgba(3,3,6,.12)')
      vg.addColorStop(1,'rgba(3,3,6,.82)')
      ctx.fillStyle=vg;ctx.fillRect(0,0,W,H)

      // Stars every N frames
      if(f%SS===0){
        S.stars.forEach(s=>{
          const tw=Math.sin(t*s.sp*60+s.ph)*.5+.5
          ctx.save();ctx.globalAlpha=.08+tw*.55
          ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2)
          ctx.fillStyle=s.red?`rgb(255,${55+Math.floor(tw*40)},${25+Math.floor(tw*20)})`:`rgb(255,255,${180+Math.floor(tw*75)})`
          ctx.shadowBlur=s.r*2.5;ctx.shadowColor=s.red?'rgba(255,50,50,.5)':'rgba(255,255,200,.4)'
          ctx.fill();ctx.restore()
        })
      }

      // ZAI explosion
      const zt=S.zt
      if(S.zr&&zt<5.5){
        S.zp.forEach(p=>{
          let x,y,al,gl=false
          if(zt<.5){const pr=zt/.5;x=W/2+(p.x-W/2)*pr*2;y=H/2+(p.y-H/2)*pr*2;al=pr*.8}
          else if(zt<3){const pr=(zt-.5)/2.5,e=1-Math.pow(1-pr,3);x=p.x+(p.tx-p.x)*e;y=p.y+(p.ty-p.y)*e;al=.8+e*.15}
          else if(zt<4.5){x=p.tx;y=p.ty;al=.85+Math.sin(zt*9)*.12;gl=true}
          else{const pr=(zt-4.5)/1;x=p.tx;y=p.ty-pr*40;al=Math.max(0,.9-pr)}
          ctx.save();ctx.globalAlpha=al
          ctx.beginPath();ctx.arc(x,y,p.r,0,Math.PI*2)
          ctx.fillStyle=`hsl(${p.h},${p.s}%,${p.l}%)`
          if(gl){ctx.shadowBlur=10;ctx.shadowColor='rgba(255,30,60,.9)'}
          ctx.fill();ctx.restore()
        })
        if(zt>2.5&&zt<4.8){
          const fi=Math.min(1,(zt-2.5)/.5),fo=zt>4.2?Math.max(0,(4.8-zt)/.6):1
          ctx.save();ctx.globalAlpha=fi*fo*.20
          ctx.font=`300 ${Math.floor(W*.22)}px 'Cormorant Garamond',Georgia,serif`
          ctx.textAlign='center';ctx.textBaseline='middle'
          ctx.fillStyle='rgba(255,40,80,1)';ctx.shadowBlur=80;ctx.shadowColor='rgba(255,0,40,.95)'
          ctx.fillText('ZAI',W/2,H/2);ctx.restore()
        }
      }
    }
    S.raf=requestAnimationFrame(tick)
    return()=>{
      cancelAnimationFrame(S.raf)
      window.removeEventListener('mousemove',onM)
      window.removeEventListener('touchmove',onT)
      window.removeEventListener('resize',resize)
    }
  },[])

  return <canvas ref={canvasRef} style={{position:'fixed',inset:0,zIndex:0,pointerEvents:'none',willChange:'transform',transform:'translateZ(0)'}}/>
}
