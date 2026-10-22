'use client';
export default function ErrorPage({reset}:{reset:()=>void}){return <section className="container empty-state"><h1>A SKIP IN THE RECORD.</h1><p>This page could not be loaded. Please try again.</p><button className="button button-red" onClick={reset}>Try again →</button></section>;}
