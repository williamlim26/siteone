'use client'
import Link from 'next/link'
import { useState } from 'react'
import Image from 'next/image'

interface NavBarBelowMediumProps {
  showDrawer: boolean
  setShowDrawer: (value: boolean) => void
}

const NavBarBelowMedium = ({ showDrawer, setShowDrawer }: NavBarBelowMediumProps) => {
  const expandNavBar = () => {
    setShowDrawer(!showDrawer)
  }

  return (
    <div className='md:hidden flex gap-4' onClick={expandNavBar}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>
      <Image
        src='/images/logo.png'
        alt='Your Kpop logo'
        width={100}
        height={24}
        priority
      />
    </div>
  )
}

const NavBarAboveMedium = () => {
  const links = [
    { name: 'News', url: '' },
    { name: 'Hot', url: 'hot' },
  ]

  return (
    <div className='hidden md:flex gap-5'>
      <Image
        src='/images/logo.png'
        alt='Your Kpop logo'
        className="dark:invert"
        width={100}
        height={24}
        priority
      />
      {links.map(({ name, url }) =>
        <Link
          key={`link-${name}-${url}`}
          href={`/${url}`}>
            {name.toUpperCase()}
          </Link>
      )}
    </div>
  )
}

const Drawer = () => {
  const links = [
    { name: 'News', url: '' },
    { name: 'Hot', url: 'hot' },
  ]

  return (
    <div className='text-center'>
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

const NavBar = () => {
  const [showDrawer, setShowDrawer] = useState(false)

  return (
    <main
      className='
        p-4
        bg-[#52c4ff]
        fixed
        top-0
        left-0
        right-0
        text-[#ffffff]
        font-bold
        tracking-wide
      '
    >
      <NavBarBelowMedium showDrawer={showDrawer} setShowDrawer={setShowDrawer} />
      <NavBarAboveMedium />
      {showDrawer && <Drawer />}
    </main>
  )
}

export default NavBar