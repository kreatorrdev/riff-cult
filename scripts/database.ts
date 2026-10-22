import { getDatabaseState,seedContent } from '../src/lib/db';
import { user } from '../src/lib/schema';
import { eq } from 'drizzle-orm';
import { albums,bands } from '../src/lib/schema';
import seed from '../src/content/seed.json';
try{process.loadEnvFile('.env.local');}catch(error){if((error as NodeJS.ErrnoException).code!=='ENOENT')throw error;}
const state=await getDatabaseState();
try{
 const action=process.argv[2];
 if(action==='grant'){
  const email=process.argv[3]?.toLowerCase();const role=process.argv[4]||'admin';
  if(!email||!['admin','editor','reader'].includes(role))throw new Error('Usage: npm run admin:grant -- email@example.com [admin|editor|reader]. Create the account through the site first.');
  const changed=await state.db.update(user).set({role,updatedAt:new Date()}).where(eq(user.email,email)).returning({id:user.id});
  if(!changed.length)throw new Error('Create this account through the site first.');
  console.log(`Account access updated to ${role}.`);
 }else if(action==='complete-content'){
  for(const record of seed.albums){
   const [existing]=await state.db.select().from(albums).where(eq(albums.id,record.id));
   if(existing&&!existing.tracks.length)await state.db.update(albums).set({tracks:record.tracks}).where(eq(albums.id,record.id));
  }
  for(const band of await state.db.select().from(bands))if(band.bio.startsWith('Start with the records.')){
   const bio=seed.bandIntroductions[band.name as keyof typeof seed.bandIntroductions];
   if(bio)await state.db.update(bands).set({bio}).where(eq(bands.id,band.id));
  }
  console.log('Missing seed track lists and initial band introductions completed. Existing editorial changes preserved.');
 }else if(action==='seed'){await seedContent(state.db);console.log('Missing seed content added; existing edits preserved.');}
 else console.log('Database migrations are current.');
}finally{await state.close();}
