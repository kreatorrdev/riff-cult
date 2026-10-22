import { and, eq, inArray } from 'drizzle-orm';
import { getDb } from '@/lib/db';
import * as schema from '@/lib/schema';
import { albumInput,bandInput,storyInput,placementInput } from '@/lib/validation';
import { sameOrigin,identity,jsonBody,failure,HttpError } from '@/lib/http';
import { z } from 'zod';
import { stat } from 'node:fs/promises';
import { resolve } from 'node:path';
export async function POST(request:Request,context:{params:Promise<{resource:string}>}){try{
  sameOrigin(request);const person=await identity(request,true);const {resource}=await context.params;
  const body=await jsonBody(request);const db=await getDb();
  if(resource==='albums'){
    const input=albumInput.parse(body);
    if(input.artwork.startsWith('/assets/')){try{await stat(resolve('public',input.artwork.slice(1)));}catch{throw new HttpError(400,'This cover is not in the archive. Choose an existing cover or a credited HTTPS image.');}}
    if(!(await db.select().from(schema.bands).where(eq(schema.bands.id,input.bandId))).length)throw new HttpError(400,'Create or select a band first.');
    if(input.status==='draft'){
      const placements=await db.select().from(schema.placements);
      const publishedStories=await db.select().from(schema.stories).where(eq(schema.stories.status,'published'));
      if(placements.some(p=>p.albumIds.includes(input.id))||publishedStories.some(s=>s.albumIds.includes(input.id)))throw new HttpError(409,'Remove this record from featured selections and published writing before unpublishing it.');
    }
    await db.insert(schema.albums).values(input).onConflictDoUpdate({target:schema.albums.id,set:{...input,updatedAt:new Date()}});
  }else if(resource==='bands'){
    const input=bandInput.parse(body);await db.insert(schema.bands).values(input).onConflictDoUpdate({target:schema.bands.id,set:input});
  }else if(resource==='stories'){
    const input=storyInput.parse(body);
    const records=await db.select().from(schema.albums).where(inArray(schema.albums.id,input.albumIds));
    if(records.length!==new Set(input.albumIds).size||new Set(input.albumIds).size!==input.albumIds.length)throw new HttpError(400,'Select existing, distinct records.');
    if(input.status==='published'&&records.some(a=>a.status!=='published'))throw new HttpError(400,'Publish every linked album first.');
    const [previous]=await db.select().from(schema.stories).where(eq(schema.stories.id,input.id));
    const values={...input,publishedAt:input.status==='published'?(previous?.publishedAt||new Date()):previous?.publishedAt||null};
    await db.insert(schema.stories).values(values).onConflictDoUpdate({target:schema.stories.id,set:{...values,updatedAt:new Date()}});
  }else if(resource==='placements'){
    const input=placementInput.parse(body);const records=await db.select().from(schema.albums).where(and(inArray(schema.albums.id,input.albumIds),eq(schema.albums.status,'published')));
    if(records.length!==input.albumIds.length)throw new HttpError(400,'Feature published records only.');
    await db.insert(schema.placements).values(input).onConflictDoUpdate({target:schema.placements.id,set:{albumIds:input.albumIds}});
  }else if(resource==='roles'){
    if(person.role!=='admin')throw new HttpError(403,'Only administrators can manage access.');
    const input=z.object({userId:z.string().min(1),role:z.enum(['reader','editor','admin'])}).strict().parse(body);
    if(input.userId===person.id&&input.role!=='admin')throw new HttpError(409,'Keep your own administrator access. Another administrator can change it.');
    const changed=await db.update(schema.user).set({role:input.role,updatedAt:new Date()}).where(eq(schema.user.id,input.userId)).returning({id:schema.user.id});
    if(!changed.length)throw new HttpError(404,'This account was not found.');
  }else throw new HttpError(404,'This editorial section does not exist.');
  return Response.json({saved:true});
}catch(error){return failure(error);}}
