'use client'
import Link from 'next/link'
import { useState } from 'react'

interface NavBarBelowMediumProps {
  showDrawer: boolean
  setShowDrawer: (value: boolean) => void
}

const NavBarBelowMedium = ({ showDrawer, setShowDrawer }: NavBarBelowMediumProps) => {
  const expandNavBar = () => {
    setShowDrawer(!showDrawer)
  }

  return (
    <div className='md:hidden' onClick={expandNavBar}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>
    </div>
  )
}

const NavBarAboveMedium = () => {
  const links = [
    { name: 'Home', url: '' },
    { name: 'Posts', url: 'posts' },
    { name: 'About', url: 'about' }
  ]

  return (
    <div className='hidden md:block'>
      {links.map(({ name, url }) =>
        <Link
          className='px-2'
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
    { name: 'Home', url: '' },
    { name: 'Posts', url: 'posts' },
    { name: 'About', url: 'about' }
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
        bg-[#2A2A2A]
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