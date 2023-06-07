import '@/styles/globals.css'
import { Storeprovider } from './store'
import { SessionProvider } from 'next-auth/react';

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
    <Storeprovider>
      <Component {...pageProps} />
    </Storeprovider>
  </SessionProvider>
    )
}

