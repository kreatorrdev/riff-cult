import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
const folder=fileURLToPath(new URL('../design/assets/fonts/',import.meta.url));
for(const [filename,remote] of [
 ['grenze-gotisch-variable.ttf','https://raw.githubusercontent.com/google/fonts/main/ofl/grenzegotisch/GrenzeGotisch%5Bwght%5D.ttf'],
 ['GRENZE-GOTISCH-OFL.txt','https://raw.githubusercontent.com/google/fonts/main/ofl/grenzegotisch/OFL.txt']
]){
 const response=await fetch(remote);
 if(!response.ok)throw new Error(`Gothic font download failed: ${response.status}`);
 await writeFile(`${folder}/${filename}`,Buffer.from(await response.arrayBuffer()));
 console.log(`Saved ${filename}`);
}
