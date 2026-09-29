import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet, Link, createRootRouteWithContext, useRouter, HeadContent, Scripts, useLocation } from '@tanstack/react-router';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, type ReactNode } from 'react';
import appCss from '../styles.css?url';
import { reportLovableError } from '../lib/lovable-error-reporting';
import { Header, PageFooter, StoreProvider } from '@/components/brand/site';
import { Button } from '@/components/ui/button';
function NotFoundComponent(){return <main className="min-h-[70vh] flex flex-col justify-center items-center gap-7"><h1 className="font-orbitron text-5xl">404</h1><p>THIS PAGE IS OFF THE GRID.</p><Button asChild variant="brand"><Link to="/">GO HOME</Link></Button></main>}
function ErrorComponent({error,reset}:{error:Error;reset:()=>void}){const router=useRouter();useEffect(()=>{reportLovableError(error,{boundary:'tanstack_root_error_component'})},[error]);return <main className="min-h-[70vh] flex flex-col justify-center items-center gap-5"><h1 className="font-orbitron text-2xl">THIS PAGE DIDN’T LOAD</h1><Button variant="brand" onClick={()=>{router.invalidate();reset()}}>TRY AGAIN</Button></main>}
export const Route=createRootRouteWithContext<{queryClient:QueryClient}>()({head:()=>({meta:[{charSet:'utf-8'},{name:'viewport',content:'width=device-width, initial-scale=1'}],links:[{rel:'stylesheet',href:appCss},{rel:'stylesheet',href:'https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@500;600;700&family=Michroma&family=Orbitron:wght@600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap'},{rel:'icon',href:'/favicon.svg',type:'image/svg+xml'}]}),shellComponent:RootShell,component:RootComponent,notFoundComponent:NotFoundComponent,errorComponent:ErrorComponent});
function RootShell({children}:{children:ReactNode}){return <html lang="en"><head><HeadContent/></head><body>{children}<Scripts/></body></html>}
function AnimatedSite(){const location=useLocation();return <div className="min-h-screen flex flex-col"><Header/><AnimatePresence mode="wait"><motion.div key={location.pathname} className="flex-1 flex flex-col" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:.2}}><Outlet/></motion.div></AnimatePresence>{location.pathname!=='/'&&<PageFooter/>}</div>}
function RootComponent(){const {queryClient}=Route.useRouteContext();return <QueryClientProvider client={queryClient}><StoreProvider><AnimatedSite/></StoreProvider></QueryClientProvider>}
