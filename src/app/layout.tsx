import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { catalog,personFromHeaders,vault } from '@/lib/data';
import { Runtime } from '@/components/runtime';
import { Shell } from '@/components/ui';
import { isDemoMode,siteOrigin } from '@/lib/deployment';
import '../app-design.css';
import '../gothic-design.css';
import './globals.css';
import '../carousel.css';
export const dynamic='force-dynamic';
export const metadata:Metadata={metadataBase:new URL(siteOrigin()),title:{default:'RIFF CULT — Independent metal culture',template:'%s — RIFF CULT'},description:'An independent metal journal. Find your next record, read between the riffs, and build your personal vault.',icons:{icon:'/assets/favicon.svg'},robots:{index:process.env.PUBLIC_INDEXING==='true',follow:process.env.PUBLIC_INDEXING==='true'}};
export default async function Layout({children}:{children:React.ReactNode}){
 const person=await personFromHeaders(await headers());const records=await catalog();const entries=person?await vault(person.id):[];
 const demo=isDemoMode();
 return <html lang="en"><body data-direction="gothic-editorial" data-page="front" data-motion="paused"><a className="skip-link" href="#main">Skip to content</a><div className="ambient-scene" aria-hidden="true"><div className="scene-art"/><div className="scene-moonlight"/><div className="scene-fog scene-fog-far"/><div className="scene-fog scene-fog-near"/><div className="scene-shade"/></div><div id="app"><Runtime person={person} albums={records} initialEntries={entries} demo={demo}><Shell person={person} demo={demo}>{children}</Shell></Runtime></div></body></html>;
}
