import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

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

const Navbar = () => {
  const router = useRouter()

  const [showDrawer, setShowDrawer] = useState(false)
  const [showSearchBar, setShowSearchBar] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const searchContainerRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowSearchBar(false)
      }
    }

    if (showSearchBar) {
      document.addEventListener('click', handleClickOutside)
      inputRef.current.focus()
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    };
  }, [showSearchBar])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick()
    }
  }

  const handleSearchClick = () => {
    router.push(`/search?query=${searchValue}`)
    setSearchValue('')
    setShowSearchBar(false)
  }

  const links = [
    { name: 'News', url: '' },
    { name: 'Hot', url: 'hot' },
  ]

  return (
    <nav>
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
        <div className='m-auto max-w-5xl flex items-center gap-5 justify-between'>
          {/* <div
            className='md:hidden flex gap-4'
            onClick={() => setShowDrawer(!showDrawer)}
            onBlur={() => {
              console.log('Cool')
              setShowDrawer(false)
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </div> */}
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
          {/* <div className='hidden md:flex gap-4'>
            {links.map(({ name, url }) =>
              <div key={`link-${name}-${url}`}>
                <Link href={`/${url}`}>
                  {name.toUpperCase()}
                </Link>
              </div>
            )}
          </div> */}
          {/* <div onClick={() => setShowSearchBar(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div> */}
        </div>
      </div>
      {showDrawer && <Drawer />}
      {showSearchBar &&
        <div
          ref={searchContainerRef}
          className={`
            p-2
            flex
            items-center
            gap-2
            fixed
            top-3
            right-4
            z-30
            bg-white
            w-60
            h-10
            rounded-lg
          `}
        >
          <div className='grow w-2'>
            <input
              type="text"
              id="searchQuery"
              name="searchQuery"
              ref={inputRef}
              className='focus:outline-none w-full'
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className='flex-none w-6' onClick={handleSearchClick}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>
        </div>
      }
    </nav>
  )
}

export default Navbar