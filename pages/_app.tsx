import { AppProps } from 'next/dist/next-server/lib/router/router'
import '../styles/globals.scss'

function MyApp({ Component, pageProps }: AppProps): React.ReactNode {
  return <Component {...pageProps} />
}

export default MyApp
