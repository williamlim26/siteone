import '@/styles/globals.css'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>YourKpop</title>
        <meta property="og:title" content="YourKpop" key="title" />
        <link rel="yourkpop icon" href="/favicon.png" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
