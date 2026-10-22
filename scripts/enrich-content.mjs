import { readFile,writeFile } from 'node:fs/promises';
const file=new URL('../src/content/seed.json',import.meta.url);
const seed=JSON.parse(await readFile(file,'utf8'));
const lookups=[['black-metal','1436231855',11],['powerslave','1713861278',8],['seventh-son-of-a-seventh-son','1716093955',8],['agent-orange','1675512622',9],['coma-of-souls','1439115702',10],['kill','129322268',13],['once','1460471435',11]];
const evidence=[];
for(const [id,providerId,count] of lookups){
 const record=seed.albums.find(a=>a.id===id);
 const source=`https://itunes.apple.com/lookup?id=${providerId}&entity=song`;
 const response=await fetch(source);if(!response.ok)throw new Error(`Track lookup failed: ${id}`);
 const result=await response.json();
 const album=result.results.find(a=>a.wrapperType==='collection');
 if(album?.artistName!==record.band)throw new Error(`Unexpected artist for ${id}`);
 const tracks=result.results.filter(t=>t.wrapperType==='track'&&t.discNumber===1).sort((a,b)=>a.trackNumber-b.trackNumber).slice(0,count).map(t=>t.trackName);
 if(tracks.length!==count)throw new Error(`Track count mismatch for ${id}`);
 record.tracks=tracks;evidence.push({id,source,originalSequenceLength:count});console.log(`${record.band}: ${tracks.length} tracks`);
}
await writeFile(file,JSON.stringify(seed,null,2)+'\n');
await writeFile(new URL('../docs/TRACK_METADATA_SOURCES.json',import.meta.url),JSON.stringify(evidence,null,2)+'\n');
