import { test } from 'node:test';
import assert from 'node:assert/strict';
import { randomBytes,randomUUID } from 'node:crypto';
import { eq } from 'drizzle-orm';
process.env.PGLITE_DIR='.data/test-'+randomUUID();
process.env.BETTER_AUTH_SECRET=randomBytes(48).toString('base64url');
process.env.BETTER_AUTH_URL='http://127.0.0.1:4320';
process.env.ALLOW_LOCAL_DATABASE='true';
process.env.DEMO_MODE='false';
const origin=process.env.BETTER_AUTH_URL;
test('R1 account, ownership, publication and access boundaries',async t=>{
 const {getAuth}=await import('../src/lib/auth');const {getDb,getDatabaseState}=await import('../src/lib/db');const schema=await import('../src/lib/schema');
 const vault=await import('../src/app/api/vault/route');const manage=await import('../src/app/api/manage/[resource]/route');const {safeReturn}=await import('../src/lib/validation');
 const auth=await getAuth();const db=await getDb();const password=randomBytes(24).toString('hex');
 async function account(name:string){const response=await auth.handler(new Request(origin+'/api/auth/sign-up/email',{method:'POST',headers:{Origin:origin,'Content-Type':'application/json'},body:JSON.stringify({name,email:name.toLowerCase()+'@example.test',password})}));const body=await response.json();assert.equal(response.status,200,JSON.stringify(body));const cookie=response.headers.getSetCookie().map(s=>s.split(';')[0]).join('; ');return {id:body.user.id,cookie};}
 const alice=await account('Alice');const bob=await account('Bob');
 const request=(path:string,method='GET',body?:unknown,cookie=alice.cookie,requestOrigin=origin)=>new Request(origin+path,{method,headers:{Origin:requestOrigin,Cookie:cookie,'Content-Type':'application/json'},...(body?{body:JSON.stringify(body)}:{})});
 const edit=(resource:string,body:unknown,cookie=alice.cookie)=>manage.POST(request('/api/manage/'+resource,'POST',body,cookie),{params:Promise.resolve({resource})});
 try{
 await t.test('anonymous saves are rejected',async()=>{assert.equal((await vault.PUT(request('/api/vault','PUT',{albumId:'reign-in-blood',status:'owned'},''))).status,401);});
 await t.test('cross-origin writes are rejected',async()=>{assert.equal((await vault.PUT(request('/api/vault','PUT',{albumId:'reign-in-blood',status:'owned'},alice.cookie,'https://unrelated.example'))).status,403);});
 await t.test('save and status update cannot duplicate a record',async()=>{for(const status of ['owned','wishlist','owned'])assert.equal((await vault.PUT(request('/api/vault','PUT',{albumId:'reign-in-blood',status}))).status,200);const result=await (await vault.GET(request('/api/vault'))).json();assert.equal(result.length,1);assert.equal(result[0].status,'owned');});
 await t.test('collection data is isolated by the authenticated user',async()=>{const result=await (await vault.GET(request('/api/vault','GET',undefined,bob.cookie))).json();assert.equal(result.length,0);await vault.DELETE(request('/api/vault?albumId=reign-in-blood','DELETE',undefined,bob.cookie));assert.equal((await (await vault.GET(request('/api/vault'))).json()).length,1);});
 await t.test('client-supplied user IDs and invalid statuses are rejected',async()=>{assert.equal((await vault.PUT(request('/api/vault','PUT',{albumId:'reign-in-blood',status:'owned',userId:bob.id}))).status,400);assert.equal((await vault.PUT(request('/api/vault','PUT',{albumId:'reign-in-blood',status:'admin'}))).status,400);});
 await t.test('readers cannot modify shared content or their own role',async()=>{assert.equal((await edit('placements',{id:'hero',albumIds:['reign-in-blood','black-metal','seven-churches']})).status,403);await auth.handler(request('/api/auth/update-user','POST',{role:'admin'}));const [record]=await db.select().from(schema.user).where(eq(schema.user.id,alice.id));assert.equal(record.role,'reader');});
 await db.update(schema.user).set({role:'editor'}).where(eq(schema.user.id,alice.id));
 const story={id:'test-draft',kind:'review',title:'A record revisited.',deck:'An original reading of the record.',author:'Test editor',body:['A complete first paragraph about listening.','A second paragraph with another angle.'],albumIds:['reign-in-blood'],status:'draft'};
 await t.test('editors can save drafts and publish, but cannot grant roles',async()=>{assert.equal((await edit('stories',story)).status,200);assert.equal((await db.select().from(schema.stories).where(eq(schema.stories.id,'test-draft')))[0].status,'draft');assert.equal((await edit('stories',{...story,status:'published'})).status,200);assert.equal((await edit('roles',{userId:bob.id,role:'admin'})).status,403);});
 await t.test('featured order requires exactly three unique published records',async()=>{assert.equal((await edit('placements',{id:'hero',albumIds:['reign-in-blood']})).status,400);assert.equal((await edit('placements',{id:'hero',albumIds:['reign-in-blood','reign-in-blood','black-metal']})).status,400);assert.equal((await edit('placements',{id:'hero',albumIds:['reign-in-blood','black-metal','seven-churches']})).status,200);});
 await t.test('removal and undo restore the same entry',async()=>{const removed=await (await vault.DELETE(request('/api/vault?albumId=reign-in-blood','DELETE'))).json();assert.equal(removed.removed.status,'owned');assert.equal((await (await vault.GET(request('/api/vault'))).json()).length,0);assert.equal((await vault.PUT(request('/api/vault','PUT',{albumId:removed.removed.albumId,status:removed.removed.status}))).status,200);});
 await t.test('return URLs cannot redirect to an external origin',()=>{for(const bad of ['https://evil.example','//evil.example','/\\evil.example','/\n/evil.example'])assert.equal(safeReturn(bad),'/the-vault');assert.equal(safeReturn('/albums/reign-in-blood?save=1'),'/albums/reign-in-blood?save=1');});
 await t.test('administrator access is enforced independently of editor access',async()=>{await db.update(schema.user).set({role:'admin'}).where(eq(schema.user.id,alice.id));assert.equal((await edit('roles',{userId:bob.id,role:'editor'})).status,200);assert.equal((await edit('roles',{userId:alice.id,role:'reader'})).status,409);});
 await t.test('sign-out invalidates the session',async()=>{const response=await auth.handler(request('/api/auth/sign-out','POST',{}));assert.equal(response.status,200);assert.equal((await vault.GET(request('/api/vault'))).status,401);});
 }finally{await (await getDatabaseState()).close();}
});
