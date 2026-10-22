import { mkdir, readdir, copyFile, cp, readFile, stat, realpath, rm } from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
const root=path.resolve(import.meta.dirname,'..');
const target=path.join(root,'tmp','riff-cult-demo');
await mkdir(target,{recursive:true});
const files=['package.json','package-lock.json','next.config.ts','next-env.d.ts','tsconfig.json','postcss.config.mjs','vercel.json','.vercelignore'];
const directories=['src','public','migrations','scripts'];
const actualTarget=await realpath(target);
assert(actualTarget.toLowerCase()===target.toLowerCase(),'The staging folder must not redirect outside the workspace.');
for(const item of await readdir(target))assert([...files,...directories,'.vercel','.next','node_modules'].includes(item)||item.endsWith('.tsbuildinfo'),`Unexpected staged root entry: ${item}`);
for(const name of files)await copyFile(path.join(root,name),path.join(target,name));
for(const name of directories){
 const destination=path.resolve(target,name);
 assert(destination.startsWith(actualTarget+path.sep),'Replacement must stay inside the staging folder.');
 await rm(destination,{recursive:true,force:true});
 await cp(path.join(root,name),destination,{recursive:true});
}
async function walk(directory,prefix=''){
 const result=[];
 for(const item of await readdir(directory,{withFileTypes:true})){
  if(['.vercel','.next','node_modules'].includes(item.name)||item.name.endsWith('.tsbuildinfo'))continue;
  const relative=path.posix.join(prefix,item.name);
  assert(!/^\.env(?:\.|$)/.test(item.name)&&item.name!=='.data','Private local data must never enter the package.');
  if(item.isDirectory())result.push(...await walk(path.join(directory,item.name),relative));
  else if(item.isFile())result.push({path:relative,bytes:(await stat(path.join(directory,item.name))).size});
  else throw new Error(`Unexpected source entry: ${relative}`);
 }
 return result;
}
const inventory=await walk(target);
const packageFile=JSON.parse(await readFile(path.join(target,'package.json'),'utf8'));
assert.equal(packageFile.name,'riff-cult');
console.log(JSON.stringify({target,files:inventory.length,bytes:inventory.reduce((sum,file)=>sum+file.bytes,0),excludes:['.env.local','.data','node_modules','.git'],inventory},null,2));
