import seed from '../content/seed.json';
import selections from '../content/selections.json';
import type { Album,Story } from './data';
const slug=(name:string)=>name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const date=new Date('2026-10-21T12:00:00Z');
export const demoAlbums:Album[]=seed.albums.map(record=>({id:record.id,bandId:slug(record.band),band:record.band,bandSlug:slug(record.band),country:record.country,title:record.title,year:record.year,genre:record.genre,note:record.note,description:record.description,source:record.source,artwork:`/assets/albums/${record.id}.jpg`,credit:`${record.band} / respective album artwork rights holders. Source linked below.`,tracks:record.tracks,status:'published',updatedAt:date}));
export const demoBands=Object.entries(seed.bandIntroductions).map(([name,bio])=>{const record=seed.albums.find(a=>a.band===name)!;return {id:slug(name),name,country:record.country,bio,source:record.source};});
export const demoStories:Story[]=seed.stories.map(story=>({id:story.id,kind:story.id==='after-dark'?'list':'review',title:story.title,deck:story.deck,author:'RIFF CULT Editorial',body:story.paragraphs,albumIds:story.id==='after-dark'?selections.hero:[story.album],status:'published',publishedAt:date,updatedAt:date}));
export const demoPlacements=selections;
