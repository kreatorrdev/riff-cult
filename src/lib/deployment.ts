/** Vercel without a provisioned database is the explicitly documented portfolio demo. */
export function isDemoMode(){
  if(process.env.DEMO_MODE==='false')return false;
  return process.env.DEMO_MODE==='true'||(process.env.VERCEL==='1'&&!process.env.DATABASE_URL);
}
export function siteOrigin(){
  if(process.env.BETTER_AUTH_URL)return new URL(process.env.BETTER_AUTH_URL).origin;
  const hostname=(process.env.VERCEL_ENV==='production'?process.env.VERCEL_PROJECT_PRODUCTION_URL:undefined)||process.env.VERCEL_URL;
  if(hostname)return `https://${hostname}`;
  return 'http://127.0.0.1:4318';
}
