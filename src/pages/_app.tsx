import React from 'react';
import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
import Navbar from '@/components/global/navbar';
import Footer from '@/components/global/footer';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isDashboardRoute = router.pathname.includes('dashboard');
  return (
    <React.Fragment>
      {!isDashboardRoute && <Navbar />}
      <NextNProgress color={'#ff5277'} />
      <Component {...pageProps} />
      {!isDashboardRoute && <Footer />}
    </React.Fragment>
  );
}
