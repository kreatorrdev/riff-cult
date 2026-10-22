import { and, eq } from 'drizzle-orm';
import { getDb } from '@/lib/db';
import { albums,collections } from '@/lib/schema';
import { collectionInput } from '@/lib/validation';
import { sameOrigin,identity,jsonBody,failure,HttpError } from '@/lib/http';
export async function GET(request:Request){try{
  const person=await identity(request);
  return Response.json(await (await getDb()).select().from(collections).where(eq(collections.userId,person.id)),{headers:{'Cache-Control':'private, no-store'}});
}catch(error){return failure(error);}}
export async function PUT(request:Request){try{
  sameOrigin(request);const person=await identity(request);const input=collectionInput.parse(await jsonBody(request));const db=await getDb();
  if(!(await db.select().from(albums).where(and(eq(albums.id,input.albumId),eq(albums.status,'published')))).length)throw new HttpError(404,'This album is not currently available.');
  const [entry]=await db.insert(collections).values({userId:person.id,...input}).onConflictDoUpdate({target:[collections.userId,collections.albumId],set:{status:input.status,updatedAt:new Date()}}).returning();
  return Response.json(entry);
}catch(error){return failure(error);}}
export async function DELETE(request:Request){try{
  sameOrigin(request);const person=await identity(request);const albumId=new URL(request.url).searchParams.get('albumId');
  if(!albumId)throw new HttpError(400,'Choose an album to remove.');
  const [removed]=await (await getDb()).delete(collections).where(and(eq(collections.userId,person.id),eq(collections.albumId,albumId))).returning();
  return Response.json({removed:removed||null});
}catch(error){return failure(error);}}
