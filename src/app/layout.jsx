import './globals.css'
import { Inter } from 'next/font/google'
import NavBar from './navbar'

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
      <body className={inter.className}>
        <div className='relative'>
          <NavBar />
          {children}
        </div>
      </body>
    </html>
  )
}
