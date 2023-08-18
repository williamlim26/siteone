const getPost = async (slug) => {
  const fields = ['date', 'title', 'status', 'content.rendered']
  const res = await fetch(
    `${process.env.WORDPRESS_API_URL}/wp-json/wp/v2/posts?slug=${slug}&_fields=${fields.join(',')}`,
    { cache: 'no-store' })
  const posts = await res.json()

  const { date, status, title, content } = posts[0]

  const isPublished = status === 'publish'

  const imgRegex = /<img(.*?)>/g
  const images = content.rendered.match(imgRegex)

  const regex = /<p>(.*?)<\/p>/g
  const matches = content.rendered.match(regex) || [];

  const modifiedContent = matches.map((p) => (
    p.replace(/<\/?p>/g, '').replace(/target="_blank"/g, 'target="_blank" class="text-blue-500"')
  ))

  if (isPublished) {
    return {
      date,
      title: title.rendered,
      content: modifiedContent,
      images
    }
  }
  return {}
}

const Posts = async ({ params }) => {
  const { slug } = params
  const { date, title, content, images } = await getPost(slug)

  return (
    <main className="m-auto px-4 mt-28 min-h-screen relative max-w-2xl">
      <div key={date} className='flex flex-col space-y-6'>
        <h1 className='text-6xl'>{title}</h1>
        {images?.length && images.map(
          (image, index) => <div key={index} dangerouslySetInnerHTML={{ __html: image }} />
        )}
        {content?.length && content.map(
          (paragraph, index) =>
            <div key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
        )}
      </div>
    </main>
  )
}

export default Posts