import { getAuth } from '@/lib/auth';
import { isDemoMode } from '@/lib/deployment';
export const runtime='nodejs';
export async function GET(request:Request){if(isDemoMode())return Response.json({error:'Accounts are disabled in this portfolio demo.'},{status:403});return (await getAuth()).handler(request);}
export async function POST(request:Request){if(isDemoMode())return Response.json({error:'Accounts are disabled in this portfolio demo.'},{status:403});return (await getAuth()).handler(request);}
