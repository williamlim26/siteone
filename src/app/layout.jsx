import './globals.css'
import { Inter } from 'next/font/google'
import NavBar from './navbar'
import Script from 'next/script'
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Your Kpop',
  description: 'Created by Siteone',
}

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <Script async src="https://platform.twitter.com/widgets.js"/>
      <Script async src="//www.instagram.com/embed.js" charset="utf-8" />
      <body className={inter.className}>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7588626076325542"
          crossorigin="anonymous"
        />
        <Script async src="https://platform.twitter.com/widgets.js"/>
        <Script async src="//www.instagram.com/embed.js" charset="utf-8" />
        <main className='relative'>
          <NavBar />
          {children}
        </main>
      </body>
    </html>
  )
}
