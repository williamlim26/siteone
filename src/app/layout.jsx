import './globals.css'
import { Inter } from 'next/font/google'
import NavBar from './navbar'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Your Kpop',
  description: 'Created by Siteone',
}

const Drawer = () => {
  const links = [
    { name: 'News', url: '' },
    { name: 'Hot', url: 'hot' },
  ]

  return (
    <div className='
      fixed
      z-1
      top-10
      left-0
      right-0
      text-center
    '>
      {links.map(({ name, url }) =>
        <div key={`link-${name}-${url}`} className='py-2'>
          <Link
            className='px-2'
            href={`/${url}`}
          >
            {name.toUpperCase()}
          </Link>
        </div>
      )}
    </div>
  )
}

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className='relative'>
          <NavBar />
          {/* <Drawer /> */}
          {children}
        </div>
      </body>
    </html>
  )
}
