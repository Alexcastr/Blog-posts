import '../styles/globals.css'
import { SessionProvider } from "next-auth/react"
import Layout from '../components/Layout'
import Head from 'next/head'


export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
  <> 
    <Head>
      <title>Digital Marketing</title>
    </Head>
  
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      
    </SessionProvider>
  </>
   
  )
}