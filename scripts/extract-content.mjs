import { readFile, writeFile, mkdir, cp } from 'node:fs/promises';
import vm from 'node:vm';
const source = await readFile(new URL('../design/app.js', import.meta.url),'utf8');
const albumLiteral = source.match(/const albums = (\[[\s\S]*?\n\]);/)?.[1];
const storyLiteral = source.match(/const stories = (\[[\s\S]*?\n\]);/)?.[1];
if (!albumLiteral || !storyLiteral) throw new Error('Design content could not be extracted.');
const albums = vm.runInNewContext(`(${albumLiteral})`);
const stories = vm.runInNewContext(`(${storyLiteral})`);
const root = new URL('../', import.meta.url);
await mkdir(new URL('src/content/',root),{recursive:true});
await mkdir(new URL('public/',root),{recursive:true});
await writeFile(new URL('src/content/seed.json',root),JSON.stringify({albums,stories},null,2)+'\n');
await cp(new URL('design/assets/',root),new URL('public/assets/',root),{recursive:true});
await cp(new URL('design/styles.css',root),new URL('src/app-design.css',root));
await cp(new URL('design/gothic.css',root),new URL('src/gothic-design.css',root));
for(const name of ['app-design.css','gothic-design.css']){
 const path=new URL(`src/${name}`,root);
 const css=await readFile(path,'utf8');
 await writeFile(path,css.replaceAll("url('assets/", "url('/assets/").replaceAll('url("assets/','url("/assets/'));
}
console.log(`Preserved design and imported ${albums.length} records and ${stories.length} stories.`);
