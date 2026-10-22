import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {PGlite} from '@electric-sql/pglite';
import seed from '../src/content/seed.json';

test('catalog revision updates an existing archive without deleting private saved records',async()=>{
 const db=new PGlite();
 try{
  await db.exec(await readFile('migrations/0001_initial.sql','utf8'));
  const legacy=[...seed.albums.filter(a=>a.id!=='seven-churches'),...['exorkizein','once','paranoid'].map(id=>({...seed.albums[0],id,band:id,title:id}))];
  for(const album of legacy){
   const bandId=album.band.toLowerCase().replaceAll(' ','-');
   await db.query('INSERT INTO bands(id,name,country,bio,source) VALUES($1,$2,$3,$4,$5) ON CONFLICT DO NOTHING',[bandId,album.band,album.country,'Fixture',album.source]);
   await db.query("INSERT INTO albums(id,band_id,title,year,genre,note,description,source,artwork,credit,tracks,status) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,'Fixture',$10::jsonb,'published')",[album.id,bandId,album.title,album.year,album.genre,album.note,album.description,album.source,'/fixture.jpg',JSON.stringify(album.tracks)]);
  }
  await db.exec(`INSERT INTO "user"(id,name,email) VALUES('fixture','Fixture','fixture@example.test'); INSERT INTO collections(user_id,album_id,status) VALUES('fixture','once','owned'); INSERT INTO placements(id,album_ids) VALUES('hero','["reign-in-blood","black-metal","exorkizein"]'),('rotation','["once"]'); INSERT INTO stories(id,kind,title,deck,author,body,album_ids,status) VALUES('weight-of-the-riff','review','Old review','Fixture','Fixture','[]','["paranoid"]','published'),('after-dark','list','Listening list','Old selection','Fixture','[]','["exorkizein"]','published');`);
  await db.exec(await readFile('migrations/0002_curated_rotation.sql','utf8'));
  assert.equal((await db.query("SELECT id FROM albums WHERE status='published'")).rows.length,9);
  const added=await db.query<{tracks:string[]}>("SELECT tracks FROM albums WHERE id='seven-churches'");
  assert.equal(added.rows[0]?.tracks.length,10);
  assert.equal((await db.query('SELECT * FROM collections')).rows.length,1);
  assert.deepEqual((await db.query<{album_ids:string[]}>("SELECT album_ids FROM placements WHERE id='hero'")).rows[0].album_ids,['reign-in-blood','black-metal','seven-churches']);
  assert.equal((await db.query<{status:string}>("SELECT status FROM stories WHERE id='weight-of-the-riff'")).rows[0].status,'draft');
  assert.equal((await db.query("SELECT id FROM stories WHERE id='seven-churches' AND status='published'")).rows.length,1);
 }finally{await db.close();}
});
