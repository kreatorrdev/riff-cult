import { readFile,writeFile } from 'node:fs/promises';
import { randomBytes } from 'node:crypto';
const file=new URL('../.env.local',import.meta.url);
try{await readFile(file);console.log('Existing local environment preserved.');}catch(error){if(error.code!=='ENOENT')throw error;await writeFile(file,`BETTER_AUTH_URL=http://127.0.0.1:4318\nBETTER_AUTH_SECRET=${randomBytes(48).toString('base64url')}\nALLOW_LOCAL_DATABASE=true\n`,{flag:'wx',mode:0o600});console.log('Local environment created. The generated secret is stored only in the ignored environment file.');}
