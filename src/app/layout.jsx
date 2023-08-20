import './globals.css'
import { Inter } from 'next/font/google'
import NavBar from './navbar'
import Script from 'next/script'

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
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7588626076325542"
        crossorigin="anonymous"
      />
      <body className={inter.className}>
        <main className='relative'>
          <NavBar />
          {children}
        </main>
      </body>
    </html>
  )
}
