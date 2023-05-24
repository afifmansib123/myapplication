import '@/styles/globals.css'
import { Storeprovider } from './store'

export default function App({ Component, pageProps }) {
  return (
    <Storeprovider>
    <Component {...pageProps} /> 
    </Storeprovider>
    )
}
