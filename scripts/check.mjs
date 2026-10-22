import { readFile, stat } from 'node:fs/promises';
import assert from 'node:assert/strict';
const root = new URL('../',import.meta.url);
const app = await readFile(new URL('design/app.js',root),'utf8');
const html = await readFile(new URL('design/index.html',root),'utf8');
const css = await readFile(new URL('design/styles.css',root),'utf8');
const sources = JSON.parse(await readFile(new URL('design/assets/albums/sources.json',root),'utf8'));
const albumBlock = app.match(/const albums = \[([\s\S]*?)\n\];/)?.[1] || '';
const albumIds = [...albumBlock.matchAll(/\{\s*id:'([^']+)'/g)].map(match => match[1]);
assert(albumIds.length > 0,'The sample catalog must contain records.');
assert.equal(new Set(albumIds).size,albumIds.length,'Album IDs must be unique.');
assert.deepEqual(sources.map(source=>source.id).sort(),[...albumIds].sort(),'Every sample album needs exactly one artwork source record.');
for(const source of sources){
 const file=await stat(new URL(`design/${source.local}`,root));
 assert(file.size>1000,`Missing or empty artwork: ${source.id}`);
 assert(source.source.startsWith('https://'),'Artwork source must have a source-page URL.');
 assert(source.permission,'Artwork must record its publication review status.');
 assert(app.includes(`id:'${source.id}'`),`Artwork is not associated with a catalog record: ${source.id}`);
}
for(const asset of ['assets/fonts/barlow-condensed-bold.ttf','assets/fonts/barlow-regular.ttf','assets/fonts/barlow-medium.ttf','assets/fonts/grenze-gotisch-variable.ttf','assets/fonts/BARLOW-OFL.txt','assets/fonts/BARLOW-CONDENSED-OFL.txt','assets/fonts/GRENZE-GOTISCH-OFL.txt','assets/favicon.svg','assets/gothic-abbey.png']) await stat(new URL(`design/${asset}`,root));
for(const local of [...html.matchAll(/(?:src|href)="([^"#][^"]*)"/g)].map(m=>m[1]).filter(s=>!/^https?:/.test(s))) await stat(new URL(`design/${local}`,root));
assert(css.includes('prefers-reduced-motion'),'Sleeve interactions require a reduced-motion alternative.');
assert(html.includes('name="robots" content="noindex, nofollow"'),'The design study must be marked as unpublished.');
assert(!app.includes('assets/covers/'),'Superseded vector sleeve studies must not be used in revision 02.');
assert(!app.includes('underground-stage.png'),'The revised design must use actual albums as the visual lead.');

function luminance(hex){const c=hex.match(/\w\w/g).map(v=>parseInt(v,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);return c[0]*.2126+c[1]*.7152+c[2]*.0722;}
for(const [front,back,label] of [['e8e2d6','111110','Bone on carbon'],['e8e2d6','781f2b','Bone on oxblood'],['b9b2a5','191918','Ash on raised carbon'],['625b51','e0d9cb','Muted text on warm paper'],['e58172','111110','Signal on carbon']]){
 const values=[luminance(front),luminance(back)].sort((a,b)=>b-a);
 const ratio=(values[0]+.05)/(values[1]+.05);
 assert(ratio>=4.5,`${label} is below the normal-text AA contrast threshold.`);
 console.log(`${label}: ${ratio.toFixed(2)}:1`);
}
console.log(`${sources.length} album sources, local assets, study metadata and core text contrast pairs verified. Browser checks are documented separately.`);

const currentSeed=JSON.parse(await readFile(new URL('src/content/seed.json',root),'utf8'));
const currentSources=JSON.parse(await readFile(new URL('src/content/artwork-sources.json',root),'utf8'));
const currentSelections=JSON.parse(await readFile(new URL('src/content/selections.json',root),'utf8'));
const currentIds=currentSeed.albums.map(record=>record.id);
assert.deepEqual(currentSources.map(source=>source.id).sort(),[...currentIds].sort(),'The current catalog must have matching artwork provenance.');
assert.equal(new Set(currentSelections.hero).size,3,'The carousel needs three unique records.');
for(const id of [...currentSelections.hero,...currentSelections.rotation])assert(currentIds.includes(id),`Unknown selected record: ${id}`);
for(const source of currentSources)await stat(new URL(`public/${source.local}`,root));
console.log(`${currentIds.length} current application covers and shared carousel/rotation selections verified.`);
