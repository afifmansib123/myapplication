import '@/styles/globals.css'
import { Storeprovider } from './store'
import { SessionProvider,useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
    <Storeprovider>
      <PayPalScriptProvider deferLoading={true}>
      {Component.auth?(
        <Auth>
          <Component {...pageProps} />
        </Auth>
      ):(
      <Component {...pageProps} />
      )}
      </PayPalScriptProvider>
    </Storeprovider>
  </SessionProvider>
    )
}


function Auth({children}){
  const router = useRouter()
  const {status} = useSession({
    required: true,
    onUnauthenticated(){
      router.push('/unauthorized?message=login required ')
    }
  })
  if(status==='loading'){
    return(<div>loading</div>)
  }
  return children
}

