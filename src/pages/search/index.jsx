import Link from 'next/link'
import Layout from '@/components/Layout'

const Search = ({ posts, query }) => {
  return (
    <Layout>
      <section className='m-auto px-4 mt-24 min-h-screen max-w-5xl'>
      { (!Array.isArray(posts) || !posts.length)
        ? <>
            <h1 className='py-6 text-3xl text-[#AAAAAA] font-bold'>{`Search posts for "${query}"`}</h1>
            <h2 className='py-6 text-3xl font-bold'>No posts found</h2>
          </>
        : <>
            <h1 className='py-6 text-3xl text-[#AAAAAA] font-bold'>{`Search posts for "${query}"`}</h1>
            <div className="hidden sm:block">
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
                { posts.map(({ id, slug, title, imgCover }) =>
                    <Link
                      key={id}
                      className='h-80'
                      href={`/posts/${slug}`}
                    >
                      {imgCover && <div dangerouslySetInnerHTML={{ __html: imgCover }} /> }
                      <p>{title}</p>
                    </Link>
                  )
                }
              </div>
            </div>
            <div className="sm:hidden">
              { posts.map(({ id, slug, title, imgCover }) =>
                  <Link key={id} href={`/posts/${slug}`}>
                    <div key={slug} className='flex h-48 gap-2'>
                      {imgCover && <div className='flex-auto w-8' dangerouslySetInnerHTML={{ __html: imgCover }} /> }
                      <div className='flex-auto w-4' dangerouslySetInnerHTML={{ __html: title }} />
                    </div>
                  </Link>
                )
              }
            </div>
          </>
      }
      </section>
    </Layout>
  )
}

export async function getServerSideProps({ query: { query } }) {
  const fields = ['id', 'date', 'title', 'slug', 'status', 'content.rendered']

  const res = await fetch(
    `${process.env.WORDPRESS_API_URL}/wp-json/wp/v2/posts?search=
    ${query}&_fields=${fields.join(',')}`,
    { cache: 'no-store' })
  const posts = await res.json()

  const data = posts.reduce((mappedPosts, post ) => {
    const { id, date, slug, status, title, content } = post

    const isPublished = status === 'publish'

    const regex = /<img[^>]*>|<p[^>]*>.*?<\/p>/g
    const matches = content.rendered.match(regex)

    const modifiedContent = matches.map((p) => (
      p.replace(/<\/?p>/g, '').replace(/target="_blank"/g, 'target="_blank" class="text-blue-500"')
    ))

    if (isPublished) {
      mappedPosts.push({
        id,
        date,
        slug,
        title: title.rendered,
        imgCover: modifiedContent.find(content => content.includes('img'))
      })
    }
    return mappedPosts
  }, [])

  return {
    props: {
      posts: data,
      query,
    },
  }
}

export default Search