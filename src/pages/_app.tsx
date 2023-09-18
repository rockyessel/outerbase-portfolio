import React from 'react';
import '@/styles/globals.scss';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
import { SessionProvider } from 'next-auth/react';
import Navbar from '@/components/global/native/navbar';
import Footer from '@/components/global/native/footer';

export default function App({Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter();
  const isDashboardRoute = router.pathname.includes('dashboard');
  
  return (
    <React.Fragment>
      <SessionProvider session={session}>
        {!isDashboardRoute && <Navbar />}
        <NextNProgress color={'#ff5277'} />
        <Component {...pageProps} />
        {!isDashboardRoute && <Footer />}
      </SessionProvider>
    </React.Fragment>
  );
}
