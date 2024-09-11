import { useEffect } from 'react';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import Head from 'next/head';

import EditModal from '@/components/modals/EditModal';
import LoginModal from '@/components/modals/LoginModal';
import RegisterModal from '@/components/modals/RegisterModal';
import '@/styles/globals.css';
import Layout from '../components/Layout';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Function to update the favicon based on theme preference
    const updateFavicon = (isDarkMode: boolean) => {
      const favicon = document.querySelector("link[rel='icon']");
      if (favicon) {
        favicon.setAttribute('href', isDarkMode ? '/Chirper-dark.svg' : '/Chirper-light.svg');
      } else {
        // If no favicon exists, create one
        const link = document.createElement('link');
        link.rel = 'icon';
        link.href = isDarkMode ? '/Chirper-dark.svg' : '/Chirper-light.svg';
        document.head.appendChild(link);
      }
    };

    // Check initial theme preference
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    updateFavicon(isDarkMode);

    // Listen for changes in theme preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (event: MediaQueryListEvent) => {
      updateFavicon(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    // Cleanup the event listener on component unmount
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <SessionProvider session={pageProps.session}>
      <Head>
        <title>Chirper</title>
      </Head>
      <Toaster />
      <EditModal />
      <RegisterModal />
      <LoginModal />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
