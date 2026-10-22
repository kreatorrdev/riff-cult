import { readFile, writeFile } from 'node:fs/promises';

const folder = new URL('../design/assets/albums/', import.meta.url);
const selections = [
  { id:'reign-in-blood', band:'Slayer', title:'Reign in Blood', source:'https://www.slayer.net/products/reign-in-blood' },
  { id:'agent-orange', band:'Sodom', title:'Agent Orange', appleId:'1675512622', source:'https://music.apple.com/us/album/agent-orange/1675512622' },
  { id:'coma-of-souls', band:'Kreator', title:'Coma of Souls', appleId:'1439115702', source:'https://music.apple.com/us/album/coma-of-souls/1439115702' },
  { id:'kill', band:'Cannibal Corpse', title:'Kill', appleId:'129322268', source:'https://music.apple.com/us/album/kill/129322268' },
  { id:'once', band:'Nightwish', title:'Once', appleId:'1460471435', source:'https://music.apple.com/us/album/once/1460471435' }
];

const sources = await Promise.all(selections.map(async selection => {
  let imageUrl;
  if (selection.appleId) {
    const response = await fetch(`https://itunes.apple.com/lookup?id=${selection.appleId}`);
    if (!response.ok) throw new Error(`Catalog lookup failed: ${selection.id}`);
    const catalog = await response.json();
    const record = catalog.results.find(item => item.artistName === selection.band && item.collectionName.toLowerCase().startsWith(selection.title.toLowerCase()));
    if (!record?.artworkUrl100) throw new Error(`Expected catalog record missing: ${selection.id}`);
    imageUrl = record.artworkUrl100.replace('100x100bb', '600x600bb');
  } else {
    const response = await fetch(selection.source);
    if (!response.ok) throw new Error(`Official release page unavailable: ${selection.id}`);
    const html = await response.text();
    const imageTag = [...html.matchAll(/<meta\b[^>]*>/gi)].map(match => match[0]).find(tag => /property="og:image"/.test(tag));
    const value = imageTag?.match(/content="([^"]+)"/)?.[1]?.replaceAll('&amp;', '&');
    const artwork = value && new URL(value, selection.source);
    if (artwork?.hostname === 'www.slayer.net') artwork.protocol = 'https:';
    imageUrl = artwork?.href;
    if (!imageUrl?.startsWith('https://www.slayer.net/cdn/')) throw new Error(`Unexpected Slayer artwork origin: ${imageUrl}`);
  }
  const response = await fetch(imageUrl);
  if (!response.ok || !response.headers.get('content-type')?.startsWith('image/')) throw new Error(`Artwork download failed: ${selection.id}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  await writeFile(new URL(`${selection.id}.jpg`, folder), bytes);
  console.log(`${selection.band} — ${selection.title}: ${bytes.length} bytes`);
  return {id:selection.id,url:imageUrl,source:selection.source,credit:`${selection.band} / album artwork rights holders. Complete creator credit before publication.`,local:`assets/albums/${selection.id}.jpg`,bytes:bytes.length,use:'Local, unpublished design reference requested by the owner.',permission:'No publication license asserted. Confirm image use and complete credits before public release.'};
}));
const previous = JSON.parse(await readFile(new URL('sources.json', folder), 'utf8'));
const replaced = new Set(['south-of-heaven', ...selections.map(selection => selection.id)]);
await writeFile(new URL('sources.json', folder), JSON.stringify([...previous.filter(source => !replaced.has(source.id)), ...sources], null, 2) + '\n');
