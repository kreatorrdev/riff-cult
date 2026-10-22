import { betterAuth } from 'better-auth/minimal';
import { drizzleAdapter } from '@better-auth/drizzle-adapter';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { randomBytes } from 'node:crypto';
import { resolve } from 'node:path';
import { getDb } from './db';
import * as schema from './schema';
import { siteOrigin } from './deployment';
async function secret(){
  if(process.env.BETTER_AUTH_SECRET)return process.env.BETTER_AUTH_SECRET;
  if(process.env.NODE_ENV==='production')throw new Error('BETTER_AUTH_SECRET must be configured for production.');
  await mkdir('.data',{recursive:true});
  const path=resolve('.data/auth-secret');
  try{return await readFile(path,'utf8');}catch(error){if((error as NodeJS.ErrnoException).code!=='ENOENT')throw error;}
  const value=randomBytes(48).toString('base64url');
  try{await writeFile(path,value,{flag:'wx',mode:0o600});return value;}catch(error){if((error as NodeJS.ErrnoException).code==='EEXIST')return readFile(path,'utf8');throw error;}
}
async function createAuth(){return betterAuth({
  appName:'RIFF CULT',baseURL:siteOrigin(),secret:await secret(),
  database:drizzleAdapter(await getDb(),{provider:'pg',schema}),
  emailAndPassword:{enabled:true,minPasswordLength:12,maxPasswordLength:128},
  user:{additionalFields:{role:{type:'string',defaultValue:'reader',input:false}}},
  session:{expiresIn:60*60*24*7,updateAge:60*60*24},
  rateLimit:{enabled:true,window:60,max:60,customRules:{'/sign-in/email':{window:60,max:10},'/sign-up/email':{window:60,max:5}}},
  advanced:{useSecureCookies:siteOrigin().startsWith('https://')}
});}
const authState=globalThis as typeof globalThis & {riffAuth?:ReturnType<typeof createAuth>};
export function getAuth(){return authState.riffAuth??=createAuth();}
