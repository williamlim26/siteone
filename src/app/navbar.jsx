'use client'
import Link from 'next/link'
import { useState } from 'react'
import Image from 'next/image'

const Drawer = () => {
  const links = [
    { name: 'News', url: '' },
    { name: 'Hot', url: 'hot' },
  ]

  return (
    <div
      className='
        fixed
        z-10
        top-[4rem]
        left-0
        right-0
        bg-[#52c4ff]
        text-[#ffffff]
        font-extrabold
        md:hidden
        text-center
        text-xl
      '
    >
      {links.map(({ name, url }) =>
        <div
          key={`link-${name}-${url}`}
          className='shadow-md'
        >
          <Link
            className='block p-2'
            href={`/${url}`}
          >
            {name.toUpperCase()}
          </Link>
        </div>
      )}
    </div>
  )
}

const NavBar = () => {
  const [showDrawer, setShowDrawer] = useState(false)

  const links = [
    { name: 'News', url: '' },
    { name: 'Hot', url: 'hot' },
  ]

  return (
    <main>
      <div
        className={`
          p-4
          bg-[#52c4ff]
          z-20
          fixed
          top-0
          left-0
          right-0
          text-[#ffffff]
          font-bold
          tracking-wide
          shadow-lg
        `}
      >
        <div className='m-auto max-w-5xl flex items-center gap-5'>
          <div className='md:hidden flex gap-4' onClick={() => setShowDrawer(!showDrawer)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </div>
          <Link href={`/`}>
            <Image
              src='/images/logo.png'
              alt='Your Kpop logo'
              className="dark:invert"
              width={150}
              height={40}
              priority
            />
          </Link>
          <div className='hidden md:flex gap-4'>
            {links.map(({ name, url }) =>
              <div key={`link-${name}-${url}`}>
                <Link href={`/${url}`}>
                  {name.toUpperCase()}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      {showDrawer && <Drawer />}
    </main>
  )
}

export default NavBar