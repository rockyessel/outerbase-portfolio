import React from 'react';
import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
import Navbar from '@/components/global/navbar';
import Footer from '@/components/global/footer';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <Navbar />
      <NextNProgress color={'#ff5277'} />
      <Component {...pageProps} />
      <Footer />
    </React.Fragment>
  );
}
