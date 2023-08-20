import Script from 'next/script'

const getPost = async (slug) => {
  const fields = ['date', 'title', 'status', 'content.rendered']
  const res = await fetch(
    `${process.env.WORDPRESS_API_URL}/wp-json/wp/v2/posts?slug=${slug}&_fields=${fields.join(',')}`,
    { cache: 'no-store' })
  const posts = await res.json()

  const { date, status, title, content } = posts[0]

  const isPublished = status === 'publish'

  // const regex = /<img[^>]*>|<p[^>]*>.*?<\/p>/g
  // const regex = /[^\\]n/g
  // const matches = content.rendered.match(regex)

  // const modifiedContent = matches.map((p) => (
  //   p.replace(/<\/?p>/g, '').replace(/target="_blank"/g, 'target="_blank" class="text-blue-500"')
  // ))

  if (isPublished) {
    return {
      date,
      title: title.rendered,
      content: content.rendered.split('\n').filter(e => e !== ''),
    }
  }
  return {}
}

const Posts = async ({ params }) => {
  const { slug } = params
  const { date, title, content } = await getPost(slug)

  return (
    <main className="m-auto px-4 pb-20 mt-28 min-h-screen relative max-w-2xl">
      <div key={date} className='flex flex-col space-y-6'>
        <h1 className='text-6xl' dangerouslySetInnerHTML={{ __html: title }} />
        {content?.length && content.map(
          (paragraph, index) =>
            <div key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
        )}
      </div>
    </main>
  )
}

export default Posts