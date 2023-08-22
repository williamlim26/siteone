import '@/styles/globals.css'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="yourkpop icon" href="/favicon.png" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
