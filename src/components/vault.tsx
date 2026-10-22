'use client';
import { useState } from 'react';
import type { Album } from '@/lib/data';
import { useVault,SaveButton } from './runtime';
import { Card } from './ui';
export function VaultView({albums}:{albums:Album[]}){
 const {entries,remove}=useVault();const [tab,setTab]=useState('all');const [view,setView]=useState('grid');const [removing,setRemoving]=useState('');
 const records=albums.filter(a=>entries[a.id]&&(tab==='all'||entries[a.id]===tab));
 return <section className="container vault-section"><div className="vault-toolbar"><div className="view-tabs" role="group" aria-label="Collection status">{['all','owned','wishlist'].map(value=><button key={value} aria-pressed={value===tab} className={value===tab?'active':''} onClick={()=>setTab(value)}>{value==='all'?'All':value==='owned'?'Owned':'Wishlist'} <span>{Object.values(entries).filter(status=>value==='all'||status===value).length}</span></button>)}</div><div className="view-tabs" role="group" aria-label="Collection view">{['grid','shelf'].map(value=><button key={value} className={value===view?'active':''} aria-pressed={value===view} onClick={()=>setView(value)}>{value==='grid'?'▦ Grid':'▥ Shelf'}</button>)}</div></div>{records.length?<div className={`album-grid vault-grid ${view==='shelf'?'shelf-view':''}`}>{records.map(album=><div key={album.id}><Card album={album}/><div className="vault-actions"><span>{entries[album.id]==='owned'?'Owned':'Wishlist'}</span><button className="text-button" onClick={async()=>{setRemoving(album.id);await remove(album.id);setRemoving('');}} disabled={removing===album.id}>Remove</button></div></div>)}</div>:<div className="empty-state"><h2>{tab==='all'?'Your next obsession starts here.':'Room for another record.'}</h2><p>{tab==='all'?'Explore the archive. Mark a record Owned, or put it on your Wishlist.':'No records have this status yet. Add a record or change its status.'}</p><a className="button button-red" href="/albums">Dig into the archive →</a></div>}</section>;
}
