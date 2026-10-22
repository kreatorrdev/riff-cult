import { cp } from 'node:fs/promises';
const root=new URL('../',import.meta.url);
if(process.env.VERCEL==='1'){console.log('Vercel manages the deployment output; standalone staging skipped.');process.exit(0);}
for(const [source,target] of [['public/','.next/standalone/public/'],['.next/static/','.next/standalone/.next/static/'],['migrations/','.next/standalone/migrations/']])await cp(new URL(source,root),new URL(target,root),{recursive:true});
console.log('Production assets and migrations staged.');
