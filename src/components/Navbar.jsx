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

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick()
    }
  }

  const handleSearchClick = () => {
    if (searchValue !== '') {
      router.push(`/search?query=${searchValue}`)
      setSearchValue('')
      setShowSearchBar(false)
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside the search container
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowSearchBar(false);
      }
    };

    // Add a mousedown event listener to the document
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []); // Run this effect only once when the component mounts

  const links = [
    { name: 'News', url: '' },
    // { name: 'Hot', url: 'hot' },
  ]

  return (
    <nav>
      <div
        className={`
          px-4
          py-3
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
          <div className='flex items-center gap-5'>
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
            {/* <div className='hidden md:flex gap-4'> */}
            <div>
              {links.map(({ name, url }) =>
                <div key={`link-${name}-${url}`}>
                  <Link href={`/${url}`}>
                    {name.toUpperCase()}
                  </Link>
                </div>
              )}
            </div>
          </div>

          {showSearchBar
            ? <div
                ref={searchContainerRef}
                className={`
                  py-1
                  px-2
                  flex
                  items-center
                  gap-2
                  z-50
                  bg-white
                  w-60
                  h-10
                  rounded-lg
                  text-black
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
            : <div 
              className='py-2 pr-2'
              onClick={() => {
                setShowSearchBar(true)
                console.log('setShowSearchBar', showSearchBar)
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </div>
          }
        </div>
      </div>
      {showDrawer && <Drawer />}
    </nav>
  )
}

export default Navbar