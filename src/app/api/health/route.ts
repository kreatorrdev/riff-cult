import { getDb } from '@/lib/db';
import { sql } from 'drizzle-orm';
import { isDemoMode } from '@/lib/deployment';
export async function GET(){try{if(isDemoMode())return Response.json({status:'ok',mode:'portfolio-demo'},{headers:{'Cache-Control':'no-store'}});await (await getDb()).execute(sql`SELECT 1`);return Response.json({status:'ok'},{headers:{'Cache-Control':'no-store'}});}catch{return Response.json({status:'unavailable'},{status:503});}}
