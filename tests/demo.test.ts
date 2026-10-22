import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseDemoVault } from '../src/lib/demo-vault';
process.env.DEMO_MODE='true';
process.env.VERCEL='1';
process.env.VERCEL_ENV='preview';
process.env.VERCEL_URL='riff-demo-test.vercel.app';
delete process.env.DATABASE_URL;
delete process.env.BETTER_AUTH_SECRET;
delete process.env.BETTER_AUTH_URL;
test('portfolio demo renders complete content without a database or auth secret',async()=>{
 const {catalog,writing,featured,bandCatalog,personFromHeaders}=await import('../src/lib/data');
 assert.equal((await catalog()).length,9);assert.equal((await writing()).length,3);assert.equal((await bandCatalog()).length,7);
 assert.deepEqual((await featured()).hero,['reign-in-blood','black-metal','seven-churches']);
 assert(!(await catalog()).some(record=>['exorkizein','once','paranoid'].includes(record.id)));
 assert(!/Nightwish|Black Sabbath|Possession/.test(JSON.stringify(await writing())));
 assert.equal(await personFromHeaders(new Headers()),null);
 const {GET}=await import('../src/app/api/health/route');const response=await GET();assert.equal(response.status,200);assert.equal((await response.json()).mode,'portfolio-demo');
});
test('public demo cannot register accounts, change shared content or write server collections',async()=>{
 const origin='https://riff-demo-test.vercel.app';
 const request=(path:string)=>new Request(origin+path,{method:'POST',headers:{origin,'Content-Type':'application/json'},body:JSON.stringify({id:'hero',albumIds:['reign-in-blood','black-metal','seven-churches']})});
 const auth=await import('../src/app/api/auth/[...all]/route');assert.equal((await auth.POST(request('/api/auth/sign-up/email'))).status,403);
 const manage=await import('../src/app/api/manage/[resource]/route');assert.equal((await manage.POST(request('/api/manage/placements'),{params:Promise.resolve({resource:'placements'})})).status,403);
 const vault=await import('../src/app/api/vault/route');assert.equal((await vault.PUT(request('/api/vault'))).status,403);
});
test('demo storage discards invalid and foreign entries',()=>{
 assert.deepEqual(parseDemoVault('{"reign-in-blood":"owned","unknown":"owned","black-metal":"admin"}',['reign-in-blood','black-metal']),{'reign-in-blood':'owned'});
 for(const input of ['null','[]','broken','"value"'])assert.deepEqual(parseDemoVault(input,['reign-in-blood']),{});
});
test('explicit full-application mode never silently falls back to demo',async()=>{
 const {isDemoMode,siteOrigin}=await import('../src/lib/deployment');
 assert.equal(isDemoMode(),true);assert.equal(siteOrigin(),'https://riff-demo-test.vercel.app');
 process.env.DEMO_MODE='false';assert.equal(isDemoMode(),false);process.env.DEMO_MODE='true';
 delete process.env.DEMO_MODE;assert.equal(isDemoMode(),true);
 process.env.DATABASE_URL='postgres://configured-test';assert.equal(isDemoMode(),false);delete process.env.DATABASE_URL;
 process.env.VERCEL_ENV='production';assert.equal(siteOrigin(),'https://riff-demo-test.vercel.app');
 process.env.VERCEL_PROJECT_PRODUCTION_URL='riff-production-test.vercel.app';assert.equal(siteOrigin(),'https://riff-production-test.vercel.app');
 delete process.env.VERCEL_PROJECT_PRODUCTION_URL;process.env.VERCEL_ENV='preview';process.env.DEMO_MODE='true';
});
