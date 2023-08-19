import Link from 'next/link'
import Script from 'next/script'

async function getPosts() {
  const fields = ['id', 'date', 'title', 'slug', 'status', 'content.rendered']
  const res = await fetch(
    `${process.env.WORDPRESS_API_URL}/wp-json/wp/v2/posts?_fields=${fields.join(',')}`,
    { cache: 'no-store' })
  const posts = await res.json()

  return posts.reduce((mappedPosts, post ) => {
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
}
 

export default async function Home() {
  const posts = await getPosts()

  return (
    <main className="m-auto px-4 mt-24 min-h-screen max-w-5xl">
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
                <div className='flex-auto w-4'>{title}</div>
              </div>
            </Link>
          )
        }
      </div>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7588626076325542"
        crossorigin="anonymous" />
      <ins
        className="adsbygoogle display:block"
        data-ad-client="ca-pub-7588626076325542"
        data-ad-slot="7781895553"
        data-ad-format="auto"
        data-full-width-responsive="true"></ins>
      <script>
        (adsbygoogle = window.adsbygoogle || []).push({});
      </script>
    </main>
  )
}
