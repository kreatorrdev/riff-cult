const pages = [
  ['metallica','https://www.metallica.com/releases/albums/ride-the-lightning-album.html'],
  ['megadeth','https://www.megadeth.com/products/rust-in-peace'],
  ['maiden','https://www.ironmaiden.com/discography/studio-albums/'],
  ['sabbath','https://www.blacksabbath.com/discography.html'],
  ['slayer','https://www.slayer.net/products/south-of-heaven'],
  ['kreator','https://www.nuclearblast.com/pages/album/pleasure-to-kill']
];
for (const [artist,url] of pages) {
  try {
    const response=await fetch(url);
    const html=await response.text();
    const tags=[...html.matchAll(/<(?:meta|img)\b[^>]*>/gi)].map(m=>m[0]);
    const relevant=tags.filter(t=>artist==='kreator' ? /^<img/i.test(t) : /og:image|twitter:image|ride.?the.?lightning|powerslave|paranoid|south.?of.?heaven|rust.?in.?peace|seventh.?son/i.test(t));
    console.log(JSON.stringify({artist,status:response.status,tags:relevant.map(tag=>tag.length>700?tag.slice(0,700):tag).slice(0,artist==='kreator'?25:3)}));
  } catch(error) { console.log(JSON.stringify({artist,error:error.message})); }
}
for (const term of ['Kreator Pleasure to Kill']) {
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&entity=album&limit=5`;
  const response=await fetch(url);
  const data=await response.json();
  console.log(JSON.stringify({search:term,results:data.results.map(r=>({artist:r.artistName,title:r.collectionName,art:r.artworkUrl100,source:r.collectionViewUrl}))}));
}
