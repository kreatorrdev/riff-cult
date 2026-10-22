import { spawn } from 'node:child_process';
import { resolve } from 'node:path';
try{process.loadEnvFile('.env.local');}catch(error){if(error.code!=='ENOENT')throw error;}
const port=process.env.PORT||'4318';
const child=spawn(process.execPath,['.next/standalone/server.js'],{stdio:'inherit',env:{...process.env,PORT:port,HOSTNAME:process.env.BIND_ADDRESS||'127.0.0.1',PGLITE_DIR:resolve(process.env.PGLITE_DIR||'.data/postgres')},windowsHide:true});
child.on('exit',code=>process.exit(code||0));
for(const signal of ['SIGTERM','SIGINT'])process.on(signal,()=>child.kill(signal));
