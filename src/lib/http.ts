import { personFromHeaders } from './data';
import { isDemoMode,siteOrigin } from './deployment';
export class HttpError extends Error {constructor(public status:number,message:string){super(message);}}
export function sameOrigin(request:Request){
  const expected=siteOrigin();
  if(request.headers.get('origin')!==expected)throw new HttpError(403,'This request did not come from RIFF CULT. Refresh the page and try again.');
}
export async function identity(request:Request,staff=false){
  if(isDemoMode())throw new HttpError(403,'Portfolio demo: shared content and account APIs are read-only. Your demo vault is saved in your browser.');
  const person=await personFromHeaders(request.headers);
  if(!person)throw new HttpError(401,'Sign in to continue.');
  if(staff&&!['admin','editor'].includes(person.role))throw new HttpError(403,'Editorial access is required.');
  return person;
}
export async function jsonBody(request:Request){
  const text=await request.text();
  if(text.length>100000)throw new HttpError(413,'This submission is too large.');
  try{return JSON.parse(text);}catch{throw new HttpError(400,'The submitted data could not be read.');}
}
export function failure(error:unknown){
  if(error instanceof HttpError)return Response.json({error:error.message},{status:error.status});
  if(error&&typeof error==='object'&&'issues' in error)return Response.json({error:'Check the form fields.',details:(error as {issues:unknown}).issues},{status:400});
  console.error('RIFF CULT request failed:',error);
  return Response.json({error:'The change could not be saved. Please try again.'},{status:500});
}
