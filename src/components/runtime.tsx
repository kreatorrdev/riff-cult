'use client';
import { createContext,useContext,useEffect,useRef,useState } from 'react';
import { usePathname,useRouter } from 'next/navigation';
import type { Album,Person } from '@/lib/data';
import { DEMO_VAULT_KEY,parseDemoVault } from '@/lib/demo-vault';
type Entry={albumId:string,status:string};
type RuntimeContext={entries:Record<string,string>,open:(id:string)=>void,remove:(id:string)=>Promise<void>,notify:(text:string)=>void};
const Context=createContext<RuntimeContext|null>(null);
export function useVault(){const context=useContext(Context);if(!context)throw new Error('Missing vault context');return context;}
export function Runtime({person,initialEntries,albums,children,demo=false}:{person:Person|null,initialEntries:Entry[],albums:Album[],children:React.ReactNode,demo?:boolean}){
 const router=useRouter();const pathname=usePathname();
 const [entries,setEntries]=useState<Record<string,string>>(Object.fromEntries(initialEntries.map(e=>[e.albumId,e.status])));
 const [selected,setSelected]=useState<Album|null>(null);const [status,setStatus]=useState('owned');const [busy,setBusy]=useState(false);const [error,setError]=useState('');
 const [message,setMessage]=useState('');const [undo,setUndo]=useState<Entry|null>(null);const [moving,setMoving]=useState(false);const dialog=useRef<HTMLDialogElement>(null);const timer=useRef<ReturnType<typeof setTimeout>|undefined>(undefined);const consumedSave=useRef('');
 useEffect(()=>{if(!demo)setEntries(Object.fromEntries(initialEntries.map(e=>[e.albumId,e.status])));},[initialEntries,demo]);
 useEffect(()=>{
  if(!demo)return;
  const restore=()=>{try{setEntries(parseDemoVault(localStorage.getItem(DEMO_VAULT_KEY),albums.map(a=>a.id)));}catch{setEntries({});}};
  restore();window.addEventListener('storage',restore);return()=>window.removeEventListener('storage',restore);
 },[demo,albums]);
 useEffect(()=>{
  const preference=matchMedia('(prefers-reduced-motion: reduce)');
  const sync=()=>{const active=localStorage.getItem('riff-cult-atmosphere')!=='paused'&&!preference.matches;setMoving(active);document.body.dataset.motion=active&&!document.hidden?'moving':'paused';};
  try{sync();}catch{document.body.dataset.motion='paused';}
  preference.addEventListener('change',sync);document.addEventListener('visibilitychange',sync);window.addEventListener('riff-motion',sync);
  return()=>{preference.removeEventListener('change',sync);document.removeEventListener('visibilitychange',sync);window.removeEventListener('riff-motion',sync);};
 },[]);
 useEffect(()=>{
  document.body.dataset.page=pathname==='/'?'front':'inner';
  if(location.hash.startsWith('#/')){const target=location.hash.slice(1);location.replace(target);return;}
  const query=new URLSearchParams(location.search);
  if(query.has('save')&&person&&consumedSave.current!==pathname){consumedSave.current=pathname;const record=albums.find(a=>`/albums/${a.id}`===pathname);if(record){setSelected(record);setStatus(entries[record.id]||'owned');}query.delete('save');history.replaceState(null,'',pathname+(query.size?'?'+query:''));}
 },[pathname,person,albums]); // Save intent is consumed after authentication.
 useEffect(()=>{if(selected){dialog.current?.showModal();}else if(dialog.current?.open)dialog.current.close();},[selected]);
 function notify(text:string){clearTimeout(timer.current);setMessage(text);timer.current=setTimeout(()=>{setMessage('');setUndo(null);},15000);}
 async function persist(albumId:string,next:string){if(demo){const updated={...entries,[albumId]:next};try{localStorage.setItem(DEMO_VAULT_KEY,JSON.stringify(updated));}catch{throw new Error('Browser storage is unavailable. Allow site storage and try again.');}setEntries(updated);return;}const response=await fetch('/api/vault',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({albumId,status:next})});const result=await response.json();if(!response.ok)throw new Error(result.error||'Could not save this record. Try again.');setEntries(previous=>({...previous,[albumId]:next}));router.refresh();}
 function open(id:string){if(!person&&!demo){location.assign('/sign-in?returnTo='+encodeURIComponent(`/albums/${id}?save=1`));return;}setError('');setStatus(entries[id]||'owned');setSelected(albums.find(a=>a.id===id)||null);}
 async function remove(albumId:string){try{const previous=entries[albumId];if(demo){const updated={...entries};delete updated[albumId];localStorage.setItem(DEMO_VAULT_KEY,JSON.stringify(updated));setEntries(updated);}else{const response=await fetch('/api/vault?albumId='+encodeURIComponent(albumId),{method:'DELETE'});const result=await response.json();if(!response.ok)throw new Error(result.error);setEntries(current=>{const next={...current};delete next[albumId];return next;});router.refresh();}setUndo(previous?{albumId,status:previous}:null);notify('Record removed from your vault.');}catch(error){notify(error instanceof Error?error.message:'Could not remove this record. Try again.');}}
 return <Context.Provider value={{entries,open,remove,notify}}>{children}
  <dialog ref={dialog} className="vault-dialog" aria-labelledby="dialog-title" onCancel={()=>setSelected(null)} onClose={()=>setSelected(null)}>
   <button className="dialog-close" aria-label="Close vault dialog" onClick={()=>setSelected(null)}>×</button>
   {selected&&<><span className="eyebrow">Your personal archive</span><h2 id="dialog-title">Make room<br/>for this one.</h2><div className="dialog-record"><img src={selected.artwork} alt={`${selected.band} — ${selected.title}`} width="100" height="100"/><div><strong>{selected.band}</strong><p>{selected.title}</p></div></div>
   <form onSubmit={async event=>{event.preventDefault();setBusy(true);setError('');try{await persist(selected.id,status);setSelected(null);setUndo(null);notify(`${selected.title} saved to ${status==='owned'?'Owned':'Wishlist'}.`);}catch(error){setError(error instanceof Error?error.message:'Please try again.');}finally{setBusy(false);}}}>
    <fieldset><legend>Where does it belong?</legend>{['owned','wishlist'].map(value=><label className="status-option" key={value}><input type="radio" name="status" checked={status===value} onChange={()=>setStatus(value)}/><span><strong>{value==='owned'?'Owned':'Wishlist'}</strong><small>{value==='owned'?'Already part of your collection.':'On your radar. Not on your shelf. Yet.'}</small></span></label>)}</fieldset>
    {error&&<p className="form-error" role="alert">{error}</p>}<button className="button button-red full-width" disabled={busy}>{busy?'Saving…':'Save to vault →'}</button></form></>}
  </dialog>
  {message&&<div id="toast" className="visible" role="status"><span>{message}</span>{undo&&<button disabled={busy} onClick={async()=>{setBusy(true);try{await persist(undo.albumId,undo.status);setUndo(null);notify('Record restored to your vault.');}catch(error){notify(error instanceof Error?error.message:'Try again.');}finally{setBusy(false);}}}>Undo</button>}<button aria-label="Dismiss notification" onClick={()=>{setMessage('');setUndo(null);}}>×</button></div>}
 </Context.Provider>;
}
export function SaveButton({album,compact=false}:{album:Album,compact?:boolean}){const {entries,open}=useVault();return <button className={compact?'quick-save '+(entries[album.id]?'is-saved':''):'button button-red'} onClick={()=>open(album.id)} aria-label={compact?`${entries[album.id]?'Edit':'Add'} ${album.title} in vault`:undefined}>{compact?(entries[album.id]?'✓':'+'):(entries[album.id]?`✓ ${entries[album.id]==='owned'?'Owned':'On your wishlist'} · Edit`:'Add to vault +')}</button>;}
export function MotionControl(){const [moving,setMoving]=useState(false);const [reduced,setReduced]=useState(false);useEffect(()=>{const query=matchMedia('(prefers-reduced-motion: reduce)');const sync=()=>{setReduced(query.matches);try{setMoving(localStorage.getItem('riff-cult-atmosphere')!=='paused');}catch{setMoving(false);}};sync();query.addEventListener('change',sync);return()=>query.removeEventListener('change',sync);},[]);return <button className="atmosphere-control" aria-pressed={moving&&!reduced} disabled={reduced} onClick={()=>{const next=!moving;setMoving(next);try{localStorage.setItem('riff-cult-atmosphere',next?'moving':'paused');}catch{}window.dispatchEvent(new Event('riff-motion'));}}>{reduced?'Motion reduced':moving?'Ⅱ Motion on':'▷ Motion paused'}</button>;}
export function Menu(){const [open,setOpen]=useState(false);const pathname=usePathname();useEffect(()=>setOpen(false),[pathname]);return <><button className="menu-button" aria-expanded={open} aria-controls="primary-nav" onClick={()=>setOpen(!open)}>Menu <span aria-hidden="true">{open?'−':'+'}</span></button><nav id="primary-nav" className={open?'is-open':''} aria-label="Main navigation">{[['/','The Underground'],['/albums','Discover'],['/reviews','Reviews'],['/the-vault','The Vault']].map(([url,label])=><a key={url} href={url} aria-current={(url==='/'?pathname==='/':pathname.startsWith(url))?'page':undefined}>{label}</a>)}</nav></>;}
export function SignOut(){const [busy,setBusy]=useState(false);return <button className="text-button" disabled={busy} onClick={async()=>{setBusy(true);try{const response=await fetch('/api/auth/sign-out',{method:'POST',headers:{'Content-Type':'application/json'},body:'{}'});if(!response.ok)throw new Error();location.assign('/');}catch{setBusy(false);alert('Could not sign out. Please try again.');}}}>{busy?'Signing out…':'Sign out'}</button>;}
