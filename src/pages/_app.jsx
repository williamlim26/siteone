import '@/styles/globals.css'
import Head from 'next/head'
import { useEffect } from 'react'

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // Google Analytics Tracking Code
    const script = document.createElement('script')
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-DTHZF8KP7D'
    script.async = true

    script.onload = () => {
      window.dataLayer = window.dataLayer || []
      function gtag() {
        window.dataLayer.push(arguments)
      }
      gtag('js', new Date())
      gtag('config', 'G-DTHZF8KP7D')
    }

    document.head.appendChild(script)
  }, [])

  return (
    <>
      <Head>
        <title>YourKpop</title>
        <meta property='og:title' content='YourKpop' key='title' />
        <link rel='yourkpop icon' href='/favicon.png' />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
