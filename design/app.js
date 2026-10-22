const directions = [
  { id: 'sleeve-notes', number: '01', name: 'Sleeve Notes', line: 'The records take the front row.', description: 'A dark music magazine built around a stack of actual album sleeves. Full-colour artwork, a smaller masthead and a direct route into the archive.', strengths: 'Actual covers · layered sleeves · dark editorial character' },
  { id: 'cover-stories', number: '02', name: 'Cover Stories', line: 'A closer look. A longer listen.', description: 'A warm paper editorial with one oversized Slayer cover, two supporting records and a quieter reading layout. Album artwork provides the colour.', strengths: 'Large album imagery · warm paper · clear reading hierarchy' },
  { id: 'heavy-rotation', number: '03', name: 'Heavy Rotation', line: 'For the records you live with.', description: 'A physical listening-room composition: actual album sleeves, an exposed vinyl disc, soft shadows and a liftable jacket. A record collection with magazine depth.', strengths: 'Physical record feel · sleeve interaction · collector details' }
];

const combinedDirection = { id:'gothic-editorial', number:'01 + 02', name:'Gothic Editorial', line:'The underground has a new home.', description:'An original moonlit Gothic abbey and slowly drifting mist, combined with the dark editorial structure of Sleeve Notes and the large, fully visible covers of Cover Stories.', strengths:'Gothic atmosphere · clear album artwork · quiet background motion' };
const allDirections = [combinedDirection, ...directions];

const albums = [
  { id:'black-metal', band:'Venom', title:'Black Metal', year:1982, genre:'Black / Speed', country:'United Kingdom', cover:true, note:'A raw edge. A darker kind of momentum.', description:'A rougher listening route into the archive. Follow the title track’s attack, then listen for the way the rhythm section keeps the songs moving beneath the distortion. Black Metal brings a coarse, direct energy to this selection beside Slayer’s tightly wound attack.', source:'https://music.apple.com/us/album/black-metal/1436231855', tracks:[] },
  { id:'exorkizein', band:'Possession', title:'Exorkizein', year:2017, genre:'Black / Death', country:'Belgium', cover:true, note:'Blackened force with a death-metal weight.', description:'The black/death branch of the front-page selection. Exorkizein adds a dense, abrasive counterpoint to Slayer and Venom. Follow the changes in weight and pace, rather than treating the record as one continuous rush.', source:'https://ironboneheadproductions.bandcamp.com/album/possession-exorkizein', tracks:['Intro','Sacerdotium','Infestation - Manifestation - Possession','Beast of Prey','In Vain','Take the Oath',"Preacher’s Death"] },
  { id:'powerslave', band:'Iron Maiden', title:'Powerslave', year:1984, genre:'Heavy', country:'United Kingdom', cover:true, note:'Galloping rhythms. A theatrical sense of scale.', description:'For a different kind of metal momentum, trade the clipped thrash attack for a galloping pulse and guitar lines that open out into melody. This is the heavy-metal branch of the sample archive: big arrangements without losing the push of a band playing together.', source:'https://www.ironmaiden.com/discography/studio-albums/', tracks:[] },
  { id:'paranoid', band:'Black Sabbath', title:'Paranoid', year:1970, genre:'Doom / Heavy', country:'United Kingdom', cover:true, note:'The riff is the architecture.', description:'Listen to the spaces around the guitar. Paranoid makes a useful counterweight to the faster records in this selection: a riff can feel enormous because of where the band leaves room, and the bass and drums carry as much of the weight as the distortion.', source:'https://www.blacksabbath.com/history.html', tracks:[] },
  { id:'reign-in-blood', band:'Slayer', title:'Reign in Blood', year:1986, genre:'Thrash', country:'United States', cover:true, note:'Relentless speed. Every riff cuts close.', description:'A concentrated burst of thrash at the front of the selection. Listen for the sharp changes between the guitar phrases, the sudden openings in the rhythm and the pressure that carries through to Raining Blood. Reign in Blood gives the archive a fierce point of entry.', source:'https://www.slayer.net/products/reign-in-blood', tracks:['Angel of Death','Piece by Piece','Necrophobic','Altar of Sacrifice','Jesus Saves','Criminally Insane','Reborn','Epidemic','Postmortem','Raining Blood'] },
  { id:'pleasure-to-kill', band:'Kreator', title:'Pleasure to Kill', year:1986, genre:'Thrash', country:'Germany', cover:true, note:'Raw edges, restless drums, no soft landing.', description:'A rougher edge in the wider archive. The guitars scrape rather than shine, while the drums keep tugging at the seams. Place this record beside the current front-page selection for another approach to attack and tension.', source:'https://axis.wmg.com/h/sellsheets/ADA_92223_92923.pdf', tracks:[] },
  { id:'seventh-son-of-a-seventh-son', band:'Iron Maiden', title:'Seventh Son of a Seventh Son', year:1988, genre:'Heavy', country:'United Kingdom', cover:true, note:'A wider canvas for melody and atmosphere.', description:'A second Iron Maiden entry makes room to explore how a band changes within the same archive. Move between this record and Powerslave to compare the sense of scale, the melodic shape and the use of atmosphere.', source:'https://www.ironmaiden.com/discography/studio-albums/', tracks:[] },
  { id:'agent-orange', band:'Sodom', title:'Agent Orange', year:1989, genre:'Thrash', country:'Germany', cover:true, note:'A serrated riff. A relentless forward drive.', description:'Follow the guitar through the hard turns of the title track, then stay with the rhythm section as the momentum shifts. Agent Orange adds another German thrash voice to the archive beside Kreator, with a different balance of drive and abrasion.', source:'https://music.apple.com/us/album/agent-orange/1675512622', tracks:[] },
  { id:'coma-of-souls', band:'Kreator', title:'Coma of Souls', year:1990, genre:'Thrash', country:'Germany', cover:true, note:'Sharp turns, darker melodies, no wasted motion.', description:'A second point of entry into Kreator. Place Coma of Souls beside Pleasure to Kill and follow how the guitar lines open out without losing their bite. This pairing makes room for a closer listen to attack, melody and arrangement.', source:'https://music.apple.com/us/album/coma-of-souls/1439115702', tracks:[] },
  { id:'kill', band:'Cannibal Corpse', title:'Kill', year:2006, genre:'Death', country:'United States', cover:true, note:'Dense rhythms. A direct, unyielding attack.', description:'The death-metal branch of the expanded selection. Listen beneath the vocal attack for the tightly interlocked guitar and drum patterns. Kill brings a different kind of density to a shelf that moves between thrash, black metal and orchestral scale.', source:'https://music.apple.com/us/album/kill/129322268', tracks:[] },
  { id:'once', band:'Nightwish', title:'Once', year:2004, genre:'Symphonic', country:'Finland', cover:true, note:'Orchestral scale. A melody that stays with you.', description:'A wider horizon at the end of the new selection. Follow the dialogue between voice, guitars and orchestral textures, from the immediate pull of Nemo to the longer sweep of Ghost Love Score. Once adds a symphonic route into the archive.', source:'https://www.nightwish.com/releases/once', tracks:[] }
];

const stories = [
  { id:'after-dark', type:'The listening list', title:'Metal, after dark.', deck:'Slayer. Venom. Possession. Three records, three different shades of darkness.', minutes:'2 min read', album:'reign-in-blood', paragraphs:[
    'Darkness in metal is not one sound. It can live in a tightly wound riff, a ragged guitar attack or a dense arrangement that seems to close in around the listener. These three records make a route through those different kinds of pressure.',
    'Start with Slayer’s Reign in Blood. Follow the sharp turns between phrases and notice how the rhythm section keeps the attack together. Return to Raining Blood at the end of the sequence and listen for the change in weight before the band drives forward again.',
    'Move to Venom’s Black Metal for a different edge. Follow the rhythm underneath the rough guitar sound, then hear how the vocal attack changes the shape of a phrase. Placed after Slayer, the contrast is as useful as the shared sense of menace.',
    'Finish with Possession’s Exorkizein. Its black/death weight brings another texture into the selection. Listen for the shifts between a forward push and a heavier passage, and for the moments when the arrangement makes room for a phrase to return.',
    'Keep the three together as a listening sequence rather than a ranking. Slayer, Venom and Possession offer different ways to build intensity; the changes between them are part of the point.'
  ] },
  { id:'black-metal', type:'Record reassessed', title:'The raw edge.', deck:'Venom’s Black Metal, and the pull of an unpolished attack.', minutes:'2 min read', album:'black-metal', paragraphs:[
    'A rough sound can be an invitation to listen closer. On Black Metal, follow the pulse before following the distortion. The rhythm gives the attack its shape, and the friction around it becomes part of the record’s character.',
    'The title track makes a direct point of entry. Listen to the way the guitar and vocal phrases pull against the beat, then return to the rhythm section. A busy surface does not mean that every part is trying to do the same thing.',
    'Place the record beside Reign in Blood in the current selection. Slayer’s tightly wound attack makes Venom’s coarse momentum easier to hear. The comparison is about different choices in attack and atmosphere, rather than a contest of speed.',
    'Let a second listen follow a different instrument. A collection becomes more useful when records can be revisited from another angle, and this is a good place to practice that habit.'
  ] },
  { id:'weight-of-the-riff', type:'From the foundations', title:'The weight of a single riff.', deck:'Black Sabbath, empty space, and why slower can feel heavier.', minutes:'2 min read', album:'paranoid', paragraphs:[
    'A heavy riff is not only a guitar sound. It is a relationship between attack and silence, bass and drums, repetition and the moment when a phrase finally moves. Paranoid offers a direct way to hear that relationship.',
    'On “War Pigs,” the pauses are part of the performance. Let the drums and bass lead your attention for a while, then return to the guitar. The parts support each other without having to move in the same way at every moment.',
    'The title track cuts a much shorter route. Place it beside the larger arrangements and its compact shape becomes another kind of statement. This is why a collection needs room for whole records: context can change the way a familiar song lands.',
    'Return to a faster record afterward. The point is not to rank the tempos, but to notice where each band places its weight. That small listening habit can open up an entire shelf.'
  ] }
];

const app = document.querySelector('#app');
const dialog = document.querySelector('#record-dialog');
const params = new URLSearchParams(location.search);
let direction = allDirections.some(d => d.id === params.get('direction')) ? params.get('direction') : 'gothic-editorial';
const embedded = params.get('embed') === '1';
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let atmospherePreference = readAtmospherePreference();
let lastDiscover = '#/albums';
let toastTimer;
let undoRemoval = null;
let vaultView = 'grid';
let vaultTab = 'all';
let collection = readCollection();

const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const arrow = '<span aria-hidden="true">↗</span>';
const chevron = '<span aria-hidden="true">→</span>';
const getAlbum = id => albums.find(album => album.id === id);
const meta = text => `<span class="eyebrow">${text}</span>`;

function readAtmospherePreference() {
  try { return localStorage.getItem('riff-cult-atmosphere') === 'paused' ? 'paused' : 'moving'; }
  catch { return 'moving'; }
}

function motionControl() {
  const moving = !reducedMotion.matches && atmospherePreference === 'moving';
  return `<button class="atmosphere-control" data-atmosphere aria-pressed="${moving}" aria-label="${reducedMotion.matches ? 'Background motion reduced by system preference' : moving ? 'Pause background motion' : 'Play background motion'}" ${reducedMotion.matches ? 'disabled' : ''}><span class="motion-icon" aria-hidden="true">${moving ? 'Ⅱ' : '▷'}</span><span class="motion-label">${reducedMotion.matches ? 'Motion reduced' : moving ? 'Motion on' : 'Motion paused'}</span></button>`;
}

function syncAtmosphere() {
  const moving = direction === combinedDirection.id && atmospherePreference === 'moving' && !reducedMotion.matches && !document.hidden && !embedded;
  document.body.dataset.motion = moving ? 'moving' : 'paused';
  const control = document.querySelector('[data-atmosphere]');
  if (control) {
    const enabled = atmospherePreference === 'moving' && !reducedMotion.matches;
    control.setAttribute('aria-pressed',String(enabled));
    control.setAttribute('aria-label',reducedMotion.matches ? 'Background motion reduced by system preference' : enabled ? 'Pause background motion' : 'Play background motion');
    control.disabled = reducedMotion.matches;
    control.querySelector('.motion-label').textContent = reducedMotion.matches ? 'Motion reduced' : enabled ? 'Motion on' : 'Motion paused';
    control.querySelector('.motion-icon').textContent = enabled ? 'Ⅱ' : '▷';
  }
}

function readCollection() {
  try {
    const raw = JSON.parse(localStorage.getItem('riff-cult-study-vault') || '{}');
    return Object.fromEntries(Object.entries(raw).filter(([id,status]) => albums.some(a => a.id === id) && ['owned','wishlist'].includes(status)));
  } catch { return {}; }
}

function persistCollection(next) {
  try {
    localStorage.setItem('riff-cult-study-vault', JSON.stringify(next));
    collection = next;
    return true;
  } catch {
    toast('Your browser could not save this record. Enable local storage and try again.');
    return false;
  }
}

function cover(album, className = '', eager = false) {
  return album.cover
    ? `<img class="cover ${className}" src="assets/albums/${album.id}.jpg" width="600" height="600" alt="${escapeHTML(album.band)} — ${escapeHTML(album.title)} album cover" loading="${eager ? 'eager' : 'lazy'}">`
    : `<div class="cover missing-cover ${className}" role="img" aria-label="Artwork unavailable for ${escapeHTML(album.title)}"><span class="eyebrow">RC / Archive</span><strong>${escapeHTML(album.band)}</strong><span>${escapeHTML(album.title)}</span><small>Artwork unavailable · ${album.year}</small></div>`;
}

function card(album, {vault = false} = {}) {
  return `<article class="album-card">
    <a class="album-art-link" href="#/albums/${album.id}">${cover(album)}</a>
    <div class="album-card-meta"><span>${album.year} / ${album.genre}</span><button class="quick-save ${collection[album.id] ? 'is-saved' : ''}" data-save="${album.id}" aria-label="${collection[album.id] ? 'Edit' : 'Add'} ${escapeHTML(album.title)} in vault">${collection[album.id] ? '✓' : '+'}</button></div>
    <a class="album-title-link" href="#/albums/${album.id}"><span class="band-name">${escapeHTML(album.band)}</span><h3>${escapeHTML(album.title)}</h3></a>
    <p>${escapeHTML(album.note)}</p>
    ${vault ? `<div class="vault-card-actions"><button class="text-button" data-save="${album.id}">${collection[album.id] === 'owned' ? 'Owned' : 'Wishlist'} ${chevron}</button><button class="text-button subdued" data-remove="${album.id}" aria-label="Remove ${escapeHTML(album.title)} from vault">Remove</button></div>` : ''}
  </article>`;
}

function lab() {
  if (embedded) return '';
  if (direction === combinedDirection.id) return `<aside class="design-bar combined-design-bar" aria-label="Design review"><a class="lab-brand" href="#/directions"><span class="status-dot"></span> DESIGN STUDY <span class="lab-version">/ REV. 03</span></a><span class="combined-label"><span>01 + 02</span> GOTHIC EDITORIAL</span><div class="combined-utilities">${motionControl()}<a class="compare-link" href="#/directions">Earlier studies ${arrow}</a></div></aside>`;
  return `<aside class="design-bar" aria-label="Design direction selector"><a class="lab-brand" href="#/directions"><span class="status-dot"></span> DESIGN STUDIES <span class="lab-version">/ REV. 02</span></a><div class="direction-tabs" role="group" aria-label="Choose a design direction">${directions.map(d => `<button data-direction="${d.id}" aria-pressed="${direction === d.id}"><span>${d.number}</span> ${d.name}</button>`).join('')}</div><a class="compare-link" href="#/directions">Compare ${arrow}</a></aside>`;
}

function header(route) {
  return `<header class="site-header container"><div class="utility"><span>Independent metal culture</span><span>Vol. 001 <span aria-hidden="true">/</span> October 2026</span><span class="utility-tag">Keep the underground alive.</span></div>
    <div class="identity"><a class="wordmark" href="#/" aria-label="RIFF CULT home">RIFF CULT<span class="brand-star" aria-hidden="true">✳</span></a><div class="identity-note">A journal for the loud.<br>An archive for the obsessed.</div><span class="identity-edition">THE<br>DARK<br>ISSUE <b>001</b></span></div>
    <div class="nav-row"><button class="menu-button" data-menu aria-expanded="false" aria-controls="primary-nav">Menu <span aria-hidden="true">+</span></button><nav id="primary-nav" aria-label="Main navigation">${[['/','The Underground'],['/albums','Discover'],['/reviews','Reviews'],['/the-vault','The Vault']].map(([path,label]) => `<a href="#${path}" ${path === '/' ? (route === '/' ? 'aria-current="page"' : '') : (route.startsWith(path) ? 'aria-current="page"' : '')}>${label}${path === '/the-vault' ? `<span class="vault-count">${Object.keys(collection).length.toString().padStart(2,'0')}</span>` : ''}</a>`).join('')}</nav><button class="search-trigger" data-search aria-label="Search the record archive"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></svg><span>Search the archive</span></button></div></header>`;
}

function sectionHeading(kicker, title, link, label) {
  return `<div class="section-heading"><div>${meta(kicker)}<h2>${title}</h2></div>${link ? `<a class="inline-link" href="${link}">${label} ${chevron}</a>` : ''}</div>`;
}

function sleeveStack() {
  return `<div class="sleeve-stack"><span class="stack-overline">THE ESSENTIALS / VOL. 001</span><a class="stack-album stack-back" href="#/albums/exorkizein" aria-label="Explore Possession — Exorkizein">${cover(albums[1],'',true)}</a><a class="stack-album stack-middle" href="#/albums/black-metal" aria-label="Explore Venom — Black Metal">${cover(albums[0],'',true)}</a><a class="stack-album stack-front" href="#/albums/reign-in-blood" aria-label="Explore Slayer — Reign in Blood">${cover(albums[4],'',true)}<span class="sleeve-edge" aria-hidden="true"></span></a><span class="stack-caption"><span class="red-square"></span> SLAYER / VENOM / POSSESSION<br><small>Real records. No substitutes.</small></span></div>`;
}

function gothicHero() {
  const featured = albums[4];
  return `<section class="gothic-hero container" aria-labelledby="gothic-title"><div class="gothic-lead">${meta('<span class="chapter-mark"></span> The listening list / Vol. 001')}<h1 id="gothic-title">Metal.<br><span>After dark.</span></h1><p class="gothic-deck">Slayer. Venom. Possession.<br>Three records. Three shades of darkness.<br>A listening route with no soft landing.</p><div class="gothic-actions"><a class="button button-red" href="#/reviews/after-dark">Read the selection ${arrow}</a><a class="inline-link" href="#/albums">Explore the archive ${chevron}</a></div><div class="gothic-folio"><span>RIFF CULT EDITORIAL</span><span>INDEPENDENT MINDS. UNREASONABLE VOLUME.</span></div></div><div class="gothic-records"><article class="gothic-featured-record">${meta('On the cover / 1986')}<a class="gothic-main-sleeve" href="#/albums/${featured.id}" aria-label="Explore Slayer — Reign in Blood">${cover(featured,'',true)}</a><a class="gothic-record-caption" href="#/albums/${featured.id}"><span><small>SLAYER</small><strong>Reign in Blood</strong></span>${arrow}</a></article><aside class="gothic-desk-records" aria-label="More records from the selection">${meta('Also on the desk')}${[albums[0],albums[1]].map(a=>`<a href="#/albums/${a.id}">${cover(a,'',true)}<span><small>${a.band}</small><strong>${a.title}</strong></span></a>`).join('')}</aside></div><span class="gothic-scene-caption">BENEATH THE SURFACE / AN INDEPENDENT METAL JOURNAL</span></section>`;
}

function latestStudy() {
  return `<section class="latest-study container">${meta('Latest study / Revision 03')}<h2>GOTHIC EDITORIAL.</h2><p>Your Gothic atmosphere reference, combined with the dark structure of 01 and the clear album presentation of 02.</p><button class="button button-red" data-open-direction="gothic-editorial">Open the combined direction ${arrow}</button></section>`;
}

function home() {
  const lead = `<div class="sleeve-lead">${meta('<span class="red-square"></span> Issue 001 / The dark selection')}<h1>METAL.<br>IN FULL<br><span>COLOUR.</span></h1><p>Slayer. Venom. Possession.<br>Three records that deserve more than a passing listen.</p><a class="button button-red" href="#/reviews/after-dark">Into the selection ${arrow}</a><a class="inline-link secondary-hero-link" href="#/albums">Or dig through the archive ${chevron}</a></div>`;
  let hero;
  if (direction === combinedDirection.id) {
    hero = gothicHero();
  } else if (direction === 'cover-stories') {
    hero = `<section class="hero hero-covers container"><div class="cover-story-copy">${meta('Cover story / Slayer, 1986')}<h1>REIGN<br>IN<br><span>BLOOD.</span></h1><p>Relentless speed. Every riff cuts close. A closer look at Reign in Blood.</p><a class="button button-red" href="#/albums/reign-in-blood">Open the record ${arrow}</a><span class="cover-story-folio">THE RECORD / 05<br>SLAYER — REIGN IN BLOOD</span></div><a class="cover-story-main" href="#/albums/reign-in-blood" aria-label="Slayer — Reign in Blood">${cover(albums[4],'',true)}</a><aside class="cover-story-aside">${meta('Also on the desk')}${[albums[0],albums[1]].map(a=>`<a href="#/albums/${a.id}">${cover(a,'',true)}<span>${a.band}<br><b>${a.title}</b></span></a>`).join('')}<a class="inline-link" href="#/albums">All records ${chevron}</a></aside></section>`;
  } else if (direction === 'heavy-rotation') {
    hero = `<section class="hero hero-rotation container"><div class="rotation-copy">${meta('On the turntable / Slayer, 1986')}<h1>REIGN IN<br>BLOOD.<br><span>REVISITED.</span></h1><p>Speed, tension and a relentless attack. A closer listen to <em>Reign in Blood</em>.</p><a class="button button-red" href="#/albums/reign-in-blood">Meet the record ${arrow}</a><a class="inline-link secondary-hero-link" href="#/reviews/after-dark">Read the selection ${chevron}</a></div><div class="record-object"><span class="object-index">RC—001 / 1986</span><div class="vinyl-disc" aria-hidden="true"><span>RIFF<br>CULT</span></div><a class="record-jacket" href="#/albums/reign-in-blood" aria-label="Open Reign in Blood">${cover(albums[4], '', true)}</a><span class="object-caption">SLAYER / REIGN IN BLOOD<br><span>Pull up a sleeve. Put the rest on hold.</span></span></div></section><div class="rotation-mini-row container">${[albums[4],albums[0],albums[1]].map(a=>`<a href="#/albums/${a.id}">${cover(a)}<span><small>${a.year} / ${a.genre}</small><strong>${a.band}</strong>${a.title}</span>${arrow}</a>`).join('')}</div>`;
  } else {
    hero = `<section class="hero hero-sleeves container">${lead}${sleeveStack()}</section>`;
  }
  return `${hero}<div class="issue-strip"><div class="container"><span class="eyebrow">Inside this issue</span><a href="#/albums?genre=Thrash">The thrash essentials ${chevron}</a><span aria-hidden="true">✳</span><a href="#/reviews/weight-of-the-riff">The weight of the riff ${chevron}</a><span aria-hidden="true">✳</span><a href="#/the-vault">A place for your records ${chevron}</a></div></div>
    <section class="record-section"><div class="container">${sectionHeading('Selected, not shuffled.','ON HEAVY ROTATION.','#/albums','Dig into the archive')}<div class="album-grid home-albums">${['agent-orange','coma-of-souls','kill','once','reign-in-blood','black-metal','exorkizein','pleasure-to-kill'].map(id => card(getAlbum(id))).join('')}</div><div class="artwork-note">Album artwork belongs to its respective rights holders. Sources are recorded for this local design study.</div></div></section>
    <section class="writing-section container">${sectionHeading('From the editorial desk','READ BETWEEN THE RIFFS.','#/reviews','All writing')}<div class="story-grid"><article class="feature-review"><a class="review-art" href="#/reviews/black-metal">${cover(albums[0])}<span class="review-art-type" aria-hidden="true">BEYOND<br>THE<br>SPEED.</span></a><div>${meta('Record reassessed / Venom')}<h3><a href="#/reviews/black-metal">The raw edge.</a></h3><p>Venom’s Black Metal, and the pull of an unpolished attack.</p><a class="inline-link" href="#/reviews/black-metal">Read the review ${arrow}</a></div></article><div class="short-stories"><article>${meta('From the foundations / Black Sabbath')}<h3><a href="#/reviews/weight-of-the-riff">THE WEIGHT OF<br>A SINGLE RIFF.</a></h3><p>Empty space. Slow burn. A different kind of heavy.</p><a class="inline-link" href="#/reviews/weight-of-the-riff">Read the story ${arrow}</a></article><article>${meta('Listening route / After dark')}<h3><a href="#/reviews/after-dark">THREE RECORDS.<br>NO SOFT LANDING.</a></h3><p>Follow the line from tight precision to raw attack.</p><a class="inline-link" href="#/reviews/after-dark">Open the list ${arrow}</a></article></div></div></section>
    <section class="genre-section container">${meta('Find your frequency')}<div class="genre-links">${['Thrash','Black','Death'].map((g,i) => `<a href="#/albums?genre=${g}"><span class="eyebrow">0${i+1}</span><span>${g.toUpperCase()}</span>${arrow}</a>`).join('')}</div></section>
    <section class="vault-invitation container"><span class="vault-emblem" aria-hidden="true">✳</span><div>${meta('Your taste. Your territory.')}<h2>KEEP WHAT<br>HITS HARD.</h2></div><div><p>A record for the shelf. A record for later.<br>Give your next obsession a home.</p><a class="button button-paper" href="#/the-vault">Enter the vault ${arrow}</a></div></section>`;
}

function discover(query) {
  const search = query.get('q') || '';
  const genre = query.get('genre') || '';
  const country = query.get('country') || '';
  const year = query.get('year') || '';
  const sort = query.get('sort') || 'selected';
  const view = query.get('view') || 'albums';
  let filtered = albums.filter(a => `${a.band} ${a.title}`.toLowerCase().includes(search.toLowerCase()) && (!genre || a.genre.includes(genre)) && (!country || a.country === country) && (!year || String(a.year) === year));
  if (sort === 'selected') {
    const priority = ['reign-in-blood','black-metal','exorkizein'];
    const position = id => priority.includes(id) ? priority.indexOf(id) : priority.length;
    filtered.sort((a,b) => position(a.id)-position(b.id));
  }
  if (sort === 'year-asc') filtered.sort((a,b) => a.year-b.year);
  if (sort === 'year-desc') filtered.sort((a,b) => b.year-a.year);
  if (sort === 'az') filtered.sort((a,b) => a.band.localeCompare(b.band) || a.title.localeCompare(b.title));
  const bands = [...new Set(filtered.map(a => a.band))];
  const resultCount = view === 'bands' ? bands.length : filtered.length;
  const resultLabel = view === 'bands' ? (resultCount === 1 ? 'band' : 'bands') : (resultCount === 1 ? 'record' : 'records');
  const changeView = new URLSearchParams(query);
  changeView.set('view', view === 'albums' ? 'bands' : 'albums');
  return `<section class="page-intro container">${meta('The record archive')}<h1>DIG DEEPER.</h1><p>Follow a name, a sound, a year. Find something worth turning up.</p></section><section class="catalog container"><form id="catalog-form" class="catalog-form"><input type="hidden" name="view" value="${escapeHTML(view)}"><div class="catalog-search"><label class="sr-only" for="catalog-query">Search albums and bands</label><input id="catalog-query" name="q" value="${escapeHTML(search)}" placeholder="Search albums or bands…" type="search"><button class="button button-red" type="submit">Search ${chevron}</button></div><details class="filter-panel" open><summary>Refine the records <span aria-hidden="true">+</span></summary><div class="filter-fields"><label>Genre<select name="genre"><option value="">All genres</option>${['Thrash','Black','Death','Speed','Heavy','Doom','Symphonic'].map(g => `<option ${genre === g ? 'selected' : ''}>${g}</option>`).join('')}</select></label><label>Country<select name="country"><option value="">All countries</option>${[...new Set(albums.map(a=>a.country))].sort().map(c => `<option ${country === c ? 'selected' : ''}>${c}</option>`).join('')}</select></label><label>Release year<select name="year"><option value="">All years</option>${[...new Set(albums.map(a => a.year))].sort().map(y => `<option ${year === String(y) ? 'selected' : ''}>${y}</option>`).join('')}</select></label><label>Sort by<select name="sort"><option value="selected">Editorial selection</option><option value="year-asc" ${sort === 'year-asc' ? 'selected' : ''}>Oldest first</option><option value="year-desc" ${sort === 'year-desc' ? 'selected' : ''}>Newest first</option><option value="az" ${sort === 'az' ? 'selected' : ''}>Band A–Z</option></select></label><div class="filter-buttons"><button class="button" type="submit">Apply</button><a class="text-button" href="#/albums">Clear</a></div></div></details></form><div class="results-bar"><span>${resultCount} ${resultLabel}${genre ? ` / ${escapeHTML(genre)}` : ''}${search ? ` / “${escapeHTML(search)}”` : ''}</span><div class="view-tabs"><a class="${view === 'albums' ? 'active' : ''}" href="${view === 'albums' ? '#/albums?'+query : '#/albums?'+changeView}">Albums</a><a class="${view === 'bands' ? 'active' : ''}" href="${view === 'bands' ? '#/albums?'+query : '#/albums?'+changeView}">Bands</a></div></div>${filtered.length ? (view === 'bands' ? `<div class="band-list">${bands.map(b => { const a = filtered.find(a => a.band === b); return `<a href="#/bands/${a.id}"><span class="band-list-name">${b}</span><span>${a.country} / ${a.genre}</span>${arrow}</a>`; }).join('')}</div>` : `<div class="album-grid catalog-grid">${filtered.map(a => card(a)).join('')}</div>`) : `<div class="empty-state"><span class="empty-symbol" aria-hidden="true">↳</span><h2>NOT IN THIS CRATE.</h2><p>Try another band name or remove a filter. This study contains ${albums.length} records.</p><a class="button button-red" href="#/albums">See all records ${chevron}</a></div>`}<p class="end-note">${filtered.length ? `You’ve reached the end of this ${albums.length}-record design sample.` : ''} Actual album artwork throughout.</p></section>`;
}

function albumPage(album) {
  const related = albums.filter(a => a.id !== album.id).slice(0,3);
  return `<div class="container"><a class="back-link" href="${escapeHTML(lastDiscover)}">← Back to the archive</a><section class="album-detail"><figure>${cover(album,'',true)}<figcaption>${album.cover ? 'Album artwork © its respective rights holders.' : 'Intentional artwork fallback.'}</figcaption></figure><div class="album-info">${meta(`${album.genre} / ${album.year} / ${album.country}`)}<a class="detail-band" href="#/bands/${album.id}">${escapeHTML(album.band)} ${arrow}</a><h1>${escapeHTML(album.title)}</h1><p class="detail-standfirst">${escapeHTML(album.note)}</p><p>${escapeHTML(album.description)}</p><button class="button button-red" data-save="${album.id}">${collection[album.id] ? `✓ ${collection[album.id] === 'owned' ? 'Owned' : 'On your wishlist'} · Edit` : 'Add to vault + '}</button><p class="local-note">Design preview · collection saved in this browser.</p><div class="detail-source"><span class="eyebrow">The details</span><dl><div><dt>Artist</dt><dd>${album.band}</dd></div><div><dt>Released</dt><dd>${album.year}</dd></div><div><dt>Editorial focus</dt><dd>${album.genre}</dd></div></dl><a class="inline-link" href="${album.source}" target="_blank" rel="noopener noreferrer">Metadata source ${arrow}</a></div></div></section><div class="record-reading"><section><h2>THE RECORD, IN ORDER.</h2>${album.tracks.length ? `<ol class="track-list">${album.tracks.map((track,index) => `<li><span class="eyebrow">${String(index+1).padStart(2,'0')}</span><span>${track}</span></li>`).join('')}</ol>` : `<p class="sparse-note">Track metadata has not been added to this sample. Visit the source above for the full release information.</p>`}</section><aside class="reading-aside">${meta('Go a little deeper')}<h3>${album.id === 'paranoid' ? 'The weight of a single riff.' : album.id === 'black-metal' ? 'The raw edge.' : 'Metal, after dark.'}</h3><p>An editorial route into the records.</p><a class="inline-link" href="#/reviews/${album.id === 'paranoid' ? 'weight-of-the-riff' : album.id === 'black-metal' ? 'black-metal' : 'after-dark'}">Read the feature ${arrow}</a></aside></div><section class="related-records">${sectionHeading('Keep the needle moving','ANOTHER WAY IN.')}<div class="album-grid related-grid">${related.map(a=>`<div>${card(a)}<p class="connection-note">${a.genre === album.genre ? 'Same editorial focus, a different approach to the riff.' : 'A change of pace from the same editorial selection.'}</p></div>`).join('')}</div></section></div>`;
}

function bandPage(album) {
  const records = albums.filter(a => a.band === album.band);
  return `<section class="page-intro container"><a class="back-link" href="${escapeHTML(lastDiscover)}">← Back to discovery</a>${meta(`${album.country} / ${album.genre}`)}<h1>${album.band.toUpperCase()}</h1><p>A curated starting point from the RIFF CULT sample archive.</p></section><section class="container band-start"><div>${cover(records[0])}</div><div>${meta('Start with this record')}<h2>${records[0].title}</h2><p>${records[0].description}</p><a class="button button-red" href="#/albums/${records[0].id}">Explore the record ${arrow}</a></div></section><section class="container related-records">${sectionHeading('In this archive','THE RECORDS.')}<div class="album-grid related-grid">${records.map(a=>card(a)).join('')}</div><p class="end-note">A curated design sample, not a complete discography.</p></section>`;
}

function reviewsPage() {
  return `<section class="page-intro container">${meta('The editorial desk')}<h1>WORDS WITH WEIGHT.</h1><p>Records worth returning to. Stories worth sitting with.</p></section><section class="container review-index">${stories.map(s=>`<article><a class="index-image" href="#/reviews/${s.id}">${cover(getAlbum(s.album))}</a><div>${meta(`${s.type} / ${s.minutes}`)}<h2><a href="#/reviews/${s.id}">${s.title}</a></h2><p>${s.deck}</p><a class="inline-link" href="#/reviews/${s.id}">Read the story ${arrow}</a></div></article>`).join('')}</section>`;
}

function storyPage(story) {
  const album = getAlbum(story.album);
  const list = story.id === 'after-dark';
  return `<article class="article-page container"><a class="back-link" href="#/reviews">← Back to the writing</a><header class="article-header">${meta(story.type)}<h1>${story.title}</h1><p class="standfirst">${story.deck}</p><div class="article-byline">RIFF CULT Editorial <span>/</span> 20 October 2026 <span>/</span> ${story.minutes}</div></header>${list ? `<figure class="article-album-strip">${[albums[4],albums[0],albums[1]].map(a=>`<a href="#/albums/${a.id}">${cover(a)}</a>`).join('')}<figcaption>Three records. Three different kinds of pressure.</figcaption></figure>` : ''}<div class="article-layout"><div class="article-body">${story.paragraphs.map(p=>`<p>${p}</p>`).join('')}<div class="editor-note">Design-study editorial copy. Written for this prototype; prepared for owner review.</div>${list ? `<h2>The listening sequence</h2><ol class="listening-list">${[albums[4],albums[0],albums[1]].map(a=>`<li><a href="#/albums/${a.id}"><span>${a.band} — ${a.title}</span>${arrow}</a><p>${a.note}</p></li>`).join('')}</ol>` : ''}</div><aside class="article-record">${meta(list ? 'From the selection' : 'The record')}${cover(album)}<h3>${album.band}<br><span>${album.title}</span></h3><a class="inline-link" href="#/albums/${album.id}">Explore the album ${arrow}</a><button class="button button-red" data-save="${album.id}">${collection[album.id] ? '✓ In your vault · Edit' : 'Add to vault +'}</button></aside></div></article>`;
}

function vaultPage() {
  const entries = albums.filter(a => collection[a.id] && (vaultTab === 'all' || collection[a.id] === vaultTab));
  const owned = Object.values(collection).filter(s=>s==='owned').length;
  const wishlist = Object.values(collection).filter(s=>s==='wishlist').length;
  return `<section class="page-intro container"><div class="vault-intro-row"><div>${meta('A place for your records')}<h1>THE VAULT.</h1></div><span class="vault-big-count">${String(Object.keys(collection).length).padStart(2,'0')}<small>RECORDS</small></span></div><p>What you own. What you’re chasing. All in one place.</p><p class="local-note">Local design demo · saved in this browser. Account-backed collections come after design approval.</p></section><section class="container vault-section"><div class="vault-toolbar"><div class="view-tabs" role="group" aria-label="Collection status">${[['all','All',owned+wishlist],['owned','Owned',owned],['wishlist','Wishlist',wishlist]].map(([id,label,count])=>`<button data-vault-tab="${id}" aria-pressed="${vaultTab===id}" class="${vaultTab===id?'active':''}">${label} <span>${count}</span></button>`).join('')}</div><div class="view-tabs" role="group" aria-label="Collection view"><button data-vault-view="grid" class="${vaultView==='grid'?'active':''}" aria-pressed="${vaultView==='grid'}">▦ Grid</button><button data-vault-view="shelf" class="${vaultView==='shelf'?'active':''}" aria-pressed="${vaultView==='shelf'}">▥ Shelf</button></div></div>${entries.length ? `<div class="album-grid vault-grid ${vaultView==='shelf'?'shelf-view':''}">${entries.map(a=>card(a,{vault:true})).join('')}</div>${vaultView==='shelf'?'<p class="end-note">Focus or hover a sleeve to lift it. Open a record by selecting its cover.</p>':''}<a class="inline-link vault-dig-link" href="#/albums">There’s always another record ${chevron}</a>` : `<div class="empty-state"><span class="empty-symbol" aria-hidden="true">▥</span><h2>${vaultTab==='all'?'YOUR NEXT OBSESSION<br>STARTS HERE.':'ROOM FOR ANOTHER RECORD.'}</h2><p>${vaultTab==='all'?'Find a record in the archive. Mark it Owned or add it to your Wishlist.':'No records have this status yet. Add a record or change its status.'}</p><a class="button button-red" href="#/albums">Dig into the archive ${arrow}</a></div>`}</section>`;
}

function comparePage() {
  return `<section class="page-intro container">${meta('One roadmap. Three expressions.')}<h1>FIND YOUR FREQUENCY.</h1><p>Compare the same magazine, archive and vault through three different lenses.</p></section><section class="direction-comparison container">${directions.map(d=>`<article class="direction-card"><div class="direction-card-heading"><span class="eyebrow">Direction ${d.number}</span><h2>${d.name}</h2></div><div class="direction-preview"><iframe src="?direction=${d.id}&embed=1#/" title="${d.name} front page preview" tabindex="-1" loading="lazy" aria-hidden="true"></iframe></div><h3>${d.line}</h3><p>${d.description}</p><span class="direction-strengths">${d.strengths}</span><button class="button button-red" data-open-direction="${d.id}">Explore ${d.number} ${arrow}</button></article>`).join('')}</section><section class="decision-note container"><span class="eyebrow">Built to be combined</span><p>Choose a complete direction, or mix a masthead, cover composition and record treatment. All three keep the same navigation and core journey.</p><div class="swatches"><span style="--swatch:#111110">Carbon</span><span style="--swatch:#e8e2d6">Bone</span><span style="--swatch:#781f2b">Oxblood</span></div></section>`;
}

function footer() {
  return `<footer class="site-footer container"><a class="footer-wordmark" href="#/">RIFF CULT<span aria-hidden="true">✳</span></a><div class="footer-middle"><p>Independent minds.<br>Unreasonable volume.</p><a href="#/albums">Explore the archive ${chevron}</a></div><div class="footer-small"><span>Made for the music.</span><span>Design study / October 2026</span><span>Album artwork © its respective rights holders.</span>${embedded?'':'<a href="#/directions">Compare the directions ↗</a>'}</div></footer>`;
}

function render(focus = false) {
  const [route, queryString=''] = (location.hash.slice(1) || '/').split('?');
  const query = new URLSearchParams(queryString);
  document.body.dataset.direction = direction;
  document.body.dataset.page = route === '/' ? 'front' : 'inner';
  document.body.classList.toggle('embedded',embedded);
  let content;
  if (route === '/') content = home();
  else if (route === '/albums') { lastDiscover = location.hash; content = discover(query); }
  else if (route === '/reviews') content = reviewsPage();
  else if (route === '/the-vault') content = vaultPage();
  else if (route === '/directions') content = latestStudy() + comparePage();
  else if (route.startsWith('/albums/') && getAlbum(route.split('/')[2])) content = albumPage(getAlbum(route.split('/')[2]));
  else if (route.startsWith('/bands/') && getAlbum(route.split('/')[2])) content = bandPage(getAlbum(route.split('/')[2]));
  else if (route.startsWith('/reviews/') && stories.find(s=>s.id===route.split('/')[2])) content = storyPage(stories.find(s=>s.id===route.split('/')[2]));
  else content = `<section class="container empty-state"><h1>OFF THE RECORD.</h1><p>That page is not part of this study.</p><a class="button button-red" href="#/">Back to the underground ${chevron}</a></section>`;
  app.innerHTML = `${lab()}${route === '/directions' ? '' : header(route)}<main id="main" tabindex="-1">${content}</main>${footer()}`;
  document.title = `RIFF CULT — ${allDirections.find(d=>d.id===direction).name} / ${route==='/the-vault'?'The Vault':route==='/albums'?'Discover':route==='/directions'?'Compare directions':'The Underground'}`;
  syncAtmosphere();
  if (focus) { window.scrollTo(0,0); document.querySelector('#main').focus({preventScroll:true}); }
}

function setDirection(id) {
  if (!allDirections.some(d=>d.id===id)) return;
  direction=id;
  const url = new URL(location.href);
  url.searchParams.set('direction',id);
  history.replaceState(null,'',url);
  render();
}

function openSave(id) {
  const album=getAlbum(id);
  if (!album) return;
  dialog.innerHTML=`<button class="dialog-close" data-close aria-label="Close vault dialog">×</button>${meta('Your personal archive')}<h2 id="dialog-title">MAKE ROOM<br>FOR THIS ONE.</h2><div class="dialog-record">${cover(album)}<div><strong>${album.band}</strong><p>${album.title}</p><span class="eyebrow">${album.year} / ${album.genre}</span></div></div><form id="save-form" data-album="${id}"><fieldset><legend>Where does it belong?</legend><label class="status-option"><input type="radio" name="status" value="owned" ${collection[id]!=='wishlist'?'checked':''}><span><strong>Owned</strong><small>Already part of your collection.</small></span></label><label class="status-option"><input type="radio" name="status" value="wishlist" ${collection[id]==='wishlist'?'checked':''}><span><strong>Wishlist</strong><small>On your radar. Not on your shelf. Yet.</small></span></label></fieldset><button class="button button-red full-width" type="submit">${collection[id]?'Update record':'Save to vault'} ${chevron}</button></form><p class="local-note">Design preview. Stored locally in this browser.</p>`;
  dialog.showModal();
}

function toast(message, undo=false) {
  clearTimeout(toastTimer);
  const target=document.querySelector('#toast');
  target.innerHTML=`<span>${escapeHTML(message)}</span>${undo?'<button data-undo>Undo</button>':''}<button data-dismiss aria-label="Dismiss notification">×</button>`;
  target.classList.add('visible');
  toastTimer=setTimeout(()=>target.classList.remove('visible'),undo?15000:7000);
}

document.addEventListener('click',event=>{
  const target=event.target.closest('button,a');
  if (!target) return;
  if (target.hasAttribute('data-atmosphere')) {
    if (reducedMotion.matches) return;
    atmospherePreference = atmospherePreference === 'moving' ? 'paused' : 'moving';
    try { localStorage.setItem('riff-cult-atmosphere',atmospherePreference); }
    catch { /* Keep the current page operable when browser storage is unavailable. */ }
    syncAtmosphere();
    return;
  }
  if (target.classList.contains('skip-link')) { event.preventDefault(); document.querySelector('#main').focus(); return; }
  if (target.dataset.direction) setDirection(target.dataset.direction);
  if (target.dataset.openDirection) { setDirection(target.dataset.openDirection); location.hash='/'; }
  if (target.hasAttribute('data-save')) openSave(target.dataset.save);
  if (target.hasAttribute('data-close')) dialog.close();
  if (target.hasAttribute('data-menu')) {
    const expanded=target.getAttribute('aria-expanded')==='true';
    target.setAttribute('aria-expanded',String(!expanded));
    document.querySelector('#primary-nav').classList.toggle('is-open',!expanded);
  }
  if (target.hasAttribute('data-search')) {
    dialog.innerHTML=`<button class="dialog-close" data-close aria-label="Close search">×</button>${meta('Find your next record')}<h2 id="dialog-title">IN THE ARCHIVE.</h2><form id="global-search"><label for="global-query">Search albums and bands</label><input id="global-query" name="q" type="search" placeholder="Try Slayer, Venom or Possession" required><button class="button button-red full-width" type="submit">Search ${chevron}</button></form>`;
    dialog.showModal();
    document.querySelector('#global-query').focus();
  }
  if (target.hasAttribute('data-vault-view')) { vaultView=target.dataset.vaultView; render(); document.querySelector(`[data-vault-view="${vaultView}"]`).focus(); }
  if (target.hasAttribute('data-vault-tab')) { vaultTab=target.dataset.vaultTab; render(); document.querySelector(`[data-vault-tab="${vaultTab}"]`).focus(); }
  if (target.hasAttribute('data-remove')) {
    const id=target.dataset.remove;
    const next={...collection};
    const status=next[id];
    delete next[id];
    if (persistCollection(next)) { undoRemoval={id,status}; render(); toast(`${getAlbum(id).title} removed.`,true); document.querySelector('#toast [data-undo]').focus(); }
  }
  if (target.hasAttribute('data-undo') && undoRemoval) {
    if (persistCollection({...collection,[undoRemoval.id]:undoRemoval.status})) { undoRemoval=null; render(); toast('Record restored to your vault.'); }
  }
  if (target.hasAttribute('data-dismiss')) document.querySelector('#toast').classList.remove('visible');
});

document.addEventListener('submit',event=>{
  const form=event.target;
  if (!['catalog-form','save-form','global-search'].includes(form.id)) return;
  event.preventDefault();
  const data=new FormData(form);
  if (form.id==='catalog-form' || form.id==='global-search') {
    const query=new URLSearchParams();
    for (const [key,value] of data) if (String(value).trim() && value!=='selected' && value!=='albums') query.set(key,String(value).trim());
    const hash=`#/albums${query.size?'?'+query:''}`;
    if (dialog.open) dialog.close();
    if (location.hash===hash) render(true); else location.hash=hash;
  }
  if (form.id==='save-form') {
    const id=form.dataset.album;
    const status=data.get('status');
    if (!['owned','wishlist'].includes(status)) return;
    if (persistCollection({...collection,[id]:status})) {
      dialog.close(); render(); toast(`${getAlbum(id).title} saved to ${status==='owned'?'Owned':'Wishlist'}.`);
      document.querySelector(`[data-save="${id}"]`)?.focus();
    }
  }
});

window.addEventListener('hashchange',()=>{if(dialog.open)dialog.close();render(true);});
window.addEventListener('popstate',()=>{
  const next=new URLSearchParams(location.search).get('direction');
  if (allDirections.some(d=>d.id===next)) direction=next;
});
window.addEventListener('storage',event=>{
  if(event.key==='riff-cult-study-vault'){collection=readCollection();render();}
  if(event.key==='riff-cult-atmosphere'){atmospherePreference=readAtmospherePreference();syncAtmosphere();}
});
reducedMotion.addEventListener('change',syncAtmosphere);
document.addEventListener('visibilitychange',syncAtmosphere);
render();
