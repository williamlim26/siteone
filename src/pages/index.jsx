import { Inter } from 'next/font/google'
import Link from 'next/link'
import Layout from '@/components/Layout'

const inter = Inter({ subsets: ['latin'] })

export default function Home({ posts }) {
  return (
    <Layout>
      <section className='m-auto px-4 mt-24 min-h-screen max-w-5xl'>
        <div className='hidden sm:block'>
          <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-2'>
            {posts.map(({ id, slug, title, imgCover }) => (
              <Link key={id} className='h-80' href={`/post/${slug}`}>
                {imgCover && (
                  <div dangerouslySetInnerHTML={{ __html: imgCover }} />
                )}
                <p dangerouslySetInnerHTML={{ __html: title }} />
              </Link>
            ))}
          </div>
        </div>
        <div className='sm:hidden'>
          {posts.map(({ id, slug, title, imgCover }) => (
            <Link key={id} href={`/post/${slug}`}>
              <div key={slug} className='flex h-48 gap-2'>
                {imgCover && (
                  <div
                    className='flex-auto w-8'
                    dangerouslySetInnerHTML={{ __html: imgCover }}
                  />
                )}
                <div
                  className='flex-auto w-4'
                  dangerouslySetInnerHTML={{ __html: title }}
                />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  )
}

export async function getServerSideProps() {
  const fields = ['id', 'date', 'title', 'slug', 'status', 'content.rendered']
  const res = await fetch(
    `${process.env.WORDPRESS_API_URL}/wp-json/wp/v2/posts?_fields=${fields.join(
      ','
    )}`,
    { cache: 'no-store' }
  )
  const posts = await res.json()

  const data = posts.reduce((mappedPosts, post) => {
    const { id, date, slug, status, title, content } = post

    const isPublished = status === 'publish'

    const regex = /<img[^>]*>|<p[^>]*>.*?<\/p>/g
    const matches = content.rendered.match(regex)

    const modifiedContent = matches.map((p) =>
      p
        .replace(/<\/?p>/g, '')
        .replace(/target="_blank"/g, 'target="_blank" class="text-blue-500"')
    )

    if (isPublished) {
      mappedPosts.push({
        id,
        date,
        slug,
        title: title.rendered,
        imgCover: modifiedContent.find((content) => content.includes('img')),
      })
    }

    return mappedPosts
  }, [])

  return {
    props: {
      posts: data,
    },
  }
}
