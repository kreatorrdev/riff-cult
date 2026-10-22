import { PGlite } from '@electric-sql/pglite';
import { drizzle as pgliteDrizzle } from 'drizzle-orm/pglite';
import { drizzle as pgDrizzle } from 'drizzle-orm/node-postgres';
import type { PgDatabase } from 'drizzle-orm/pg-core';
import { Pool } from 'pg';
import { mkdir, readFile, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { sql } from 'drizzle-orm';
import * as schema from './schema';
import seed from '../content/seed.json';
import selections from '../content/selections.json';
type Database = PgDatabase<any,typeof schema>;
type DatabaseState = {db:Database,close:()=>Promise<void>};
const state = globalThis as typeof globalThis & { riffDatabase?:Promise<DatabaseState> };
export const slugify = (name:string) => name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
export async function getDatabaseState():Promise<DatabaseState> {
  if (!state.riffDatabase) state.riffDatabase = initialize().catch(error=>{state.riffDatabase=undefined;throw error;});
  return state.riffDatabase;
}
export async function getDb(){return (await getDatabaseState()).db;}
async function initialize():Promise<DatabaseState>{
  let db:Database;
  let execute:(query:string)=>Promise<unknown>;
  let close:()=>Promise<void>;
  if(process.env.DATABASE_URL){
    const pool=new Pool({connectionString:process.env.DATABASE_URL,max:5});
    db=pgDrizzle(pool,{schema}); execute=query=>pool.query(query); close=()=>pool.end();
  }else{
    if(process.env.NODE_ENV==='production' && process.env.ALLOW_LOCAL_DATABASE!=='true') throw new Error('Set DATABASE_URL for hosting, or explicitly enable ALLOW_LOCAL_DATABASE for a single-process local production preview.');
    const directory=resolve(process.env.PGLITE_DIR||'.data/postgres');
    await mkdir(directory,{recursive:true});
    const client=new PGlite(directory);
    await client.waitReady;
    db=pgliteDrizzle(client,{schema}); execute=query=>client.exec(query); close=()=>client.close();
  }
  await execute('CREATE TABLE IF NOT EXISTS riff_migrations (name text PRIMARY KEY, checksum text NOT NULL, applied_at timestamptz NOT NULL DEFAULT now())');
  for(const name of (await readdir(resolve('migrations'))).filter(name=>name.endsWith('.sql')).sort()){
    const migration=await readFile(resolve('migrations',name),'utf8');
    const checksum=createHash('sha256').update(migration).digest('hex');
    const previous=await db.execute(sql`SELECT checksum FROM riff_migrations WHERE name=${name}`);
    const rows=previous.rows as {checksum:string}[];
    if(rows[0]){if(rows[0].checksum!==checksum)throw new Error(`Previously applied migration changed: ${name}`);continue;}
    await execute(`BEGIN; ${migration}; INSERT INTO riff_migrations(name,checksum) VALUES ('${name.replaceAll("'","''")}','${checksum}'); COMMIT;`);
  }
  const existing=await db.select({id:schema.albums.id}).from(schema.albums).limit(1);
  if(!existing.length) await seedContent(db);
  return {db,close};
}
export async function seedContent(db:Database){
  await db.transaction(async tx=>{
    for(const record of seed.albums){
      const bandId=slugify(record.band);
      await tx.insert(schema.bands).values({id:bandId,name:record.band,country:record.country,bio:seed.bandIntroductions[record.band as keyof typeof seed.bandIntroductions]||record.description,source:record.source}).onConflictDoNothing();
      await tx.insert(schema.albums).values({id:record.id,bandId,title:record.title,year:record.year,genre:record.genre,note:record.note,description:record.description,source:record.source,artwork:`/assets/albums/${record.id}.jpg`,credit:`${record.band} / respective album artwork rights holders. Source linked below.`,tracks:record.tracks,status:'published'}).onConflictDoNothing();
    }
    for(const story of seed.stories){
      await tx.insert(schema.stories).values({id:story.id,kind:story.id==='after-dark'?'list':'review',title:story.title,deck:story.deck,author:'RIFF CULT Editorial',body:story.paragraphs,albumIds:story.id==='after-dark'?selections.hero:[story.album],status:'published',publishedAt:new Date('2026-10-21T12:00:00Z')}).onConflictDoNothing();
    }
    await tx.insert(schema.placements).values(Object.entries(selections).map(([id,albumIds])=>({id,albumIds}))).onConflictDoNothing();
  });
}
