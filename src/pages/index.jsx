import Link from 'next/link'
import Layout from '@/components/Layout'
import Image from 'next/image'

export default function Home({ posts }) {
  return (
    <Layout>
      <section className='m-auto px-4 mt-24 min-h-screen max-w-5xl'>
        <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-2'>
          {posts.map(({ id, slug, title, imgUrl }) => (
            <Link key={id} className='h-80' href={`/post/${slug}`}>
              {imgUrl && (
                <div className='h-60 relative'>
                  <Image
                    src={imgUrl}
                    alt={`${slug}-img`}
                    layout='fill'
                    objectFit='cover'
                  />
                </div>
              )}
              <p className='pt-2' dangerouslySetInnerHTML={{ __html: title }} />
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

  const data = posts.map((post) => {
    const { id, date, slug, title, content } = post

    const regex = /<img[^>]*>|<p[^>]*>.*?<\/p>/g
    const matches = content.rendered.match(regex)

    const modifiedContent = matches.map((element) =>
      element
        .replace(/<\/?p>/g, '')
        .replace(/target="_blank"/g, 'target="_blank" class="text-blue-500"')
    )

    const imgSrc = modifiedContent.find((element) => element.includes('img'))

    let imgUrl = ''
    if (imgSrc) {
      const regex = /src="([^"]+)"/
      const match = imgSrc.match(regex)
      if (Array.isArray(match) && match.length) {
        imgUrl = match[1]
      }
    }

    return {
      id,
      date,
      slug,
      title: title.rendered,
      imgUrl,
    }
  })

  return {
    props: {
      posts: data,
    },
  }
}
