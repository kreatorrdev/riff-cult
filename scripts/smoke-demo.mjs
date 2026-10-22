import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';
const base=process.env.SMOKE_URL||'http://127.0.0.1:4319';
const cases=[['/',200],['/albums',200],['/albums?page=2',200],['/albums?genre=Symphonic&country=Finland',200],['/albums?q=missing-record-zz',200],['/albums/reign-in-blood',200],['/bands',200],['/bands/kreator',200],['/genres',200],['/genres/thrash',200],['/reviews',200],['/reviews/black-metal',200],['/lists',200],['/lists/after-dark',200],['/about',200],['/privacy',200],['/not-a-record',404],['/api/health',200],['/api/vault',403],['/the-vault',200],['/settings',200],['/sign-in',200],['/admin',200],['/assets/albums/reign-in-blood.jpg',200],['/assets/gothic-abbey.png',200]];
cases.push(['/albums/seven-churches',200],['/bands/possessed',200],['/reviews/seven-churches',200],['/assets/albums/seven-churches.jpg',200],['/albums/exorkizein',404],['/albums/once',404],['/albums/paranoid',404],['/bands/nightwish',404],['/bands/black-sabbath',404],['/bands/possession',404],['/reviews/weight-of-the-riff',404],['/genres/symphonic',404],['/genres/doom',404]);
const results=[];
for(const [path,expected] of cases){
 const response=await fetch(base+path);const body=Buffer.from(await response.arrayBuffer());
 assert.equal(response.status,expected,`${path}: unexpected status`);
 if(response.headers.get('content-type')?.includes('text/html'))assert(!body.includes('Application error: a server-side exception'),`${path}: server exception`);
 if(path==='/'){assert(body.includes('PORTFOLIO DEMO'),'The portfolio mode must be clearly identified.');assert(body.includes('Opening album selection')&&body.includes('Seven Churches'),'The revised carousel must render on the server.');assert(!/Nightwish|Black Sabbath|Possession|Exorkizein/.test(body.toString()),'Retired artists must not appear on the home page.');}
 if(path==='/privacy')assert(body.includes('stored in this browser'),'The demo privacy notice must describe browser storage.');
 if(path==='/admin')assert(body.includes('read-only'),'The editorial preview must state its limitations.');
 results.push({path,status:response.status,bytes:body.length});
}
for(const path of ['/api/vault','/api/manage/placements','/api/auth/sign-up/email']){
 const response=await fetch(base+path,{method:path==='/api/vault'?'PUT':'POST',headers:{'Content-Type':'application/json',origin:new URL(base).origin},body:'{}'});
 assert.equal(response.status,403,`${path}: demo must reject writes`);results.push({path,method:path==='/api/vault'?'PUT':'POST',status:response.status});
}
await writeFile(new URL('../docs/DEMO_HTTP_QA.json',import.meta.url),JSON.stringify({date:'2026-10-22',base,conditions:'Portfolio demo; sequential route, retired-content and write-boundary checks.',results},null,2)+'\n');
console.log(`${results.length} demo route, asset, privacy and blocked-write checks passed.`);
