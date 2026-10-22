import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
const destination = fileURLToPath(new URL('../design/assets/albums/', import.meta.url));
await mkdir(destination,{recursive:true});
const assets = JSON.parse(await readFile(new URL('../design/assets/albums/sources.json', import.meta.url), 'utf8'));
for (const asset of assets) {
  const response=await fetch(asset.url);
  if (!response.ok || !response.headers.get('content-type')?.startsWith('image/')) throw new Error(`Image fetch failed: ${asset.id} (${response.status})`);
  const body=Buffer.from(await response.arrayBuffer());
  await writeFile(`${destination}/${asset.id}.jpg`,body);
  asset.local=`assets/albums/${asset.id}.jpg`;
  asset.bytes=body.length;
  asset.use='Local, unpublished design reference requested by the owner.';
  asset.permission='No publication license asserted. Confirm image use and complete credits before public release.';
  console.log(`${asset.id}: ${body.length} bytes`);
}
await writeFile(`${destination}/sources.json`,JSON.stringify(assets,null,2)+'\n');
