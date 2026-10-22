import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const assets = fileURLToPath(new URL('../design/assets/', import.meta.url));
await mkdir(`${assets}/fonts`, { recursive: true });
await mkdir(`${assets}/covers`, { recursive: true });
const fonts = [
  ['barlow-condensed-bold.ttf', 'barlowcondensed/BarlowCondensed-Bold.ttf'],
  ['barlow-regular.ttf', 'barlow/Barlow-Regular.ttf'],
  ['barlow-medium.ttf', 'barlow/Barlow-Medium.ttf'],
  ['BARLOW-OFL.txt', 'barlow/OFL.txt'],
  ['BARLOW-CONDENSED-OFL.txt', 'barlowcondensed/OFL.txt']
];
for (const [local, remote] of fonts) {
  const response = await fetch(`https://raw.githubusercontent.com/google/fonts/main/ofl/${remote}`);
  if (!response.ok) throw new Error(`Font fetch failed (${response.status}): ${remote}`);
  await writeFile(`${assets}/fonts/${local}`, Buffer.from(await response.arrayBuffer()));
}

const studies = [
  { id:'ride-the-lightning', artist:'METALLICA', title:'RIDE THE LIGHTNING', year:'1984', color:'#638595', dark:'#18252b', graphic:`<g fill="none" stroke="#dce6dd"><path d="M330 70L215 260h115L170 510l54-190H125z" stroke-width="3"/><path d="M340 95L230 269h115L189 484" stroke-width="1"/><circle cx="265" cy="292" r="146" opacity=".4"/><circle cx="265" cy="292" r="157" opacity=".2"/><path d="M0 380L600 190M0 395L600 205M0 410L600 220M0 425L600 235M0 440L600 250" opacity=".2"/></g>` },
  { id:'rust-in-peace', artist:'MEGADETH', title:'RUST IN PEACE', year:'1990', color:'#b29b56', dark:'#252b23', graphic:`<g fill="none" stroke="#d7ca90"><path d="M300 110v340M130 280h340" opacity=".35"/><circle cx="300" cy="280" r="150"/><circle cx="300" cy="280" r="125" stroke-width="15" opacity=".4"/><path d="M300 280l-85-98a130 130 0 0 1 170 0zM300 280l128-24a130 130 0 0 1-85 147zM300 280l-43 123a130 130 0 0 1-85-147z" fill="#cdbb71" stroke-width="2"/><circle cx="300" cy="280" r="28" fill="#252b23"/></g>` },
  { id:'powerslave', artist:'IRON MAIDEN', title:'POWERSLAVE', year:'1984', color:'#ad703f', dark:'#282720', graphic:`<g fill="none" stroke="#dfbc7c"><path d="M67 441L300 112l233 329z" stroke-width="3"/><path d="M133 441l167-235 167 235zM199 441l101-143 101 143zM266 441l34-48 34 48z"/><path d="M300 112v281M67 441h466"/><circle cx="300" cy="280" r="170" opacity=".3"/><path d="M0 470h600M0 487h600M0 504h600" opacity=".4"/></g>` },
  { id:'paranoid', artist:'BLACK SABBATH', title:'PARANOID', year:'1970', color:'#8b7a93', dark:'#211c27', graphic:`<g fill="none" stroke="#c2b3cc"><circle cx="300" cy="290" r="155" stroke-width="2"/><circle cx="300" cy="290" r="130" opacity=".6"/><circle cx="300" cy="290" r="100" opacity=".5"/><circle cx="300" cy="290" r="67" opacity=".5"/><circle cx="300" cy="290" r="30"/><path d="M115 450L440 105M130 475L468 115M145 500L498 125" stroke-width="13" opacity=".25"/></g>` },
  { id:'south-of-heaven', artist:'SLAYER', title:'SOUTH OF HEAVEN', year:'1988', color:'#b14a3e', dark:'#2b201f', graphic:`<g stroke="#dfb29b" fill="none"><path d="M300 115L490 445H110z" stroke-width="2"/><path d="M300 445L110 115h380z" stroke-width="2"/><circle cx="300" cy="280" r="124"/><path d="M270 110h60v290h-60zM220 185h160v55H220z" fill="#dfb29b" opacity=".6"/><path d="M90 470h420M90 485h420M90 500h420" opacity=".3"/></g>` },
  { id:'pleasure-to-kill', artist:'KREATOR', title:'PLEASURE TO KILL', year:'1986', color:'#7b886b', dark:'#20261e', graphic:`<g fill="none" stroke="#c4c5a3"><path d="M300 110l145 72v185l-145 86-145-86V182z" stroke-width="2"/><path d="M300 140l117 57v153l-117 70-117-70V197z"/><path d="M225 220l150 140M375 220L225 360" stroke-width="18" opacity=".6"/><circle cx="300" cy="284" r="105"/><path d="M100 120L500 470M100 470L500 120" opacity=".3"/></g>` }
];
for (const [index, s] of studies.entries()) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><defs><pattern id="lines" width="4" height="4" patternUnits="userSpaceOnUse"><path d="M0 0h4" stroke="#fff" stroke-opacity=".06"/></pattern><filter id="grain"><feTurbulence type="fractalNoise" baseFrequency=".75" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope=".15"/></feComponentTransfer><feBlend in="SourceGraphic" mode="soft-light"/></filter></defs><rect width="600" height="600" fill="${s.dark}"/><rect x="18" y="18" width="564" height="564" fill="none" stroke="${s.color}"/><rect x="30" y="30" width="540" height="540" fill="${s.color}" opacity=".1"/><g filter="url(#grain)">${s.graphic}</g><rect width="600" height="600" fill="url(#lines)"/><g fill="#e8e2d6" font-family="Arial,sans-serif"><text x="40" y="74" font-size="31" font-weight="900" letter-spacing="2">${s.artist}</text><text x="40" y="545" font-size="24" font-weight="700" letter-spacing="1">${s.title}</text><text x="40" y="565" font-size="9" letter-spacing="2">RIFF CULT / ORIGINAL SLEEVE STUDY / ${String(index+1).padStart(2,'0')}</text><text x="560" y="565" text-anchor="end" font-size="11">${s.year}</text></g></svg>`;
  await writeFile(`${assets}/covers/${s.id}.svg`, svg);
}
console.log('Self-hosted OFL fonts and six original vector sleeve studies prepared.');
