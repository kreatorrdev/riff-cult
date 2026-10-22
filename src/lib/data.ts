import { eq, desc } from 'drizzle-orm';
import { getDb } from './db';
import * as schema from './schema';
import { isDemoMode } from './deployment';
import { demoAlbums,demoBands,demoStories,demoPlacements } from './demo-content';
export type Album = typeof schema.albums.$inferSelect & {band:string,country:string,bandSlug:string};
export type Story = typeof schema.stories.$inferSelect;
export type Person = {id:string,name:string,email:string,role:string};
export async function catalog(includeDrafts=false):Promise<Album[]>{
  if(isDemoMode())return [...demoAlbums];
  const db=await getDb();
  const rows=await db.select({record:schema.albums,band:schema.bands}).from(schema.albums).innerJoin(schema.bands,eq(schema.albums.bandId,schema.bands.id)).where(includeDrafts?undefined:eq(schema.albums.status,'published'));
  return rows.map(({record,band})=>({...record,band:band.name,country:band.country,bandSlug:band.id}));
}
export async function writing(includeDrafts=false){if(isDemoMode())return [...demoStories];return (await getDb()).select().from(schema.stories).where(includeDrafts?undefined:eq(schema.stories.status,'published')).orderBy(desc(schema.stories.publishedAt));}
export async function featured(){if(isDemoMode())return demoPlacements;return Object.fromEntries((await (await getDb()).select().from(schema.placements)).map(p=>[p.id,p.albumIds]));}
export async function bandCatalog(){if(isDemoMode())return [...demoBands];return (await getDb()).select().from(schema.bands);}
export async function vault(userId:string){if(isDemoMode())return [];return (await (await getDb()).select().from(schema.collections).where(eq(schema.collections.userId,userId)));}
export async function personFromHeaders(headers:Headers):Promise<Person|null>{
  if(isDemoMode())return null;
  const {getAuth}=await import('./auth');
  const session=await (await getAuth()).api.getSession({headers});
  if(!session)return null;
  const rows=await (await getDb()).select().from(schema.user).where(eq(schema.user.id,session.user.id)).limit(1);
  const person=rows[0];
  return person?{id:person.id,name:person.name,email:person.email,role:person.role}:null;
}
