'use client';

import { useEffect,useRef,useState } from 'react';
import type { Album } from '@/lib/data';

export function FeaturedCarousel({albums}:{albums:Album[]}){
 const [active,setActive]=useState(0);
 const [playing,setPlaying]=useState(true);
 const [manualChange,setManualChange]=useState(false);
 const [motionAllowed,setMotionAllowed]=useState(false);
 const [visible,setVisible]=useState(true);
 const gesture=useRef<{x:number,y:number}|null>(null);
 const swiped=useRef(false);
 const region=useRef<HTMLElement>(null);
 const count=albums.length;
 const current=albums[active%Math.max(count,1)];
 const move=(direction:number)=>{setManualChange(true);setActive(index=>(index+direction+count)%count);};

 useEffect(()=>{
  const preference=matchMedia('(prefers-reduced-motion: reduce)');
  const sync=()=>{setMotionAllowed(!preference.matches&&document.body.dataset.motion==='moving');setVisible(!document.hidden);};
  const observer=new MutationObserver(sync);
  observer.observe(document.body,{attributes:true,attributeFilter:['data-motion']});
  preference.addEventListener('change',sync);document.addEventListener('visibilitychange',sync);sync();
  return()=>{observer.disconnect();preference.removeEventListener('change',sync);document.removeEventListener('visibilitychange',sync);};
 },[]);
 useEffect(()=>{
  if(count<2||!playing||!motionAllowed||!visible)return;
  const timer=setInterval(()=>{if(region.current?.matches(':hover')||region.current?.contains(document.activeElement))return;setManualChange(false);setActive(index=>(index+1)%count);},6500);
  return()=>clearInterval(timer);
 },[count,playing,motionAllowed,visible,active]);
 if(!current)return null;

 return <section ref={region} className="featured-carousel" role="region" aria-roledescription="carousel" aria-label="Opening album selection"
  onKeyDown={event=>{if(count<2)return;if(event.key==='ArrowRight'){event.preventDefault();move(1);}else if(event.key==='ArrowLeft'){event.preventDefault();move(-1);}}}>
  <div className="carousel-heading"><span className="eyebrow">THREE RECORDS. ONE ROTATION.</span><span className="carousel-counter" aria-live="off">{String(active+1).padStart(2,'0')} / {String(count).padStart(2,'0')}</span></div>
  <div className="carousel-stage" data-count={count}
   onPointerDown={event=>{if(event.pointerType==='touch'){swiped.current=false;gesture.current={x:event.clientX,y:event.clientY};}}}
   onPointerCancel={()=>{gesture.current=null;}}
   onPointerUp={event=>{const start=gesture.current;gesture.current=null;if(!start||count<2)return;const dx=event.clientX-start.x,dy=event.clientY-start.y;if(Math.abs(dx)>40&&Math.abs(dx)>Math.abs(dy)){swiped.current=true;move(dx<0?1:-1);}}}
   onClickCapture={event=>{if(swiped.current){event.preventDefault();event.stopPropagation();swiped.current=false;}}}>
   {albums.map((album,index)=>{
    const offset=(index-active+count)%count;
    const position=offset===0?'active':offset===1?'next':'previous';
    return <article key={album.id} className="carousel-record" data-position={position} role="group" aria-roledescription="slide" aria-label={`${index+1} of ${count}: ${album.band} — ${album.title}`}>
     <span className="carousel-record-kicker">{position==='active'?'IN FOCUS':position==='next'?'UP NEXT':'IN ROTATION'} <span>/ {album.year}</span></span>
     <a className="carousel-sleeve" href={`/albums/${album.id}`} aria-label={`Explore ${album.band} — ${album.title}`}><img src={album.artwork} alt={`${album.band} — ${album.title} album cover`} width="600" height="600" loading="eager" draggable={false}/></a>
     <a className="carousel-caption" href={`/albums/${album.id}`}><span className="carousel-band">{album.band}</span><strong>{album.title}</strong><span className="carousel-link-arrow" aria-hidden="true">↗</span></a>
    </article>;
   })}
  </div>
  {count>1&&<div className="carousel-controls"><div className="carousel-arrows"><button aria-label="Previous featured album" onClick={()=>move(-1)}>←</button><button aria-label="Next featured album" onClick={()=>move(1)}>→</button></div><div className="carousel-dots" role="group" aria-label="Choose the featured album">{albums.map((album,index)=><button key={album.id} aria-label={`Feature ${album.band} — ${album.title}`} aria-pressed={active===index} onClick={()=>{setManualChange(true);setActive(index);}}><span/></button>)}</div><button className="carousel-play" disabled={!motionAllowed} onClick={()=>setPlaying(!playing)} aria-label={!motionAllowed?'Automatic rotation paused by motion preference':playing?'Pause automatic album rotation':'Resume automatic album rotation'}>{!motionAllowed?'Motion paused':playing?'Ⅱ Pause':'▷ Play'}</button></div>}
  <p className="carousel-now" aria-live={manualChange||!playing?'polite':'off'}><span className="eyebrow">IN FOCUS</span> {current.band} <span aria-hidden="true">/</span> {current.title}</p>
 </section>;
}
