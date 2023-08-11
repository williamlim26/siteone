import NavBar from './navbar'

interface Post {
  date: string
  slug: string
  status: string
  title: {
    rendered: string
  }
  content: {
    rendered: string
  }
}

interface MappedPost {
  date: string
  slug: string
  title: string
  content: string[]
  images: string[] | null
}

async function getPosts() {
  const fields = ['date', 'title', 'slug', 'status', 'content.rendered']
  const res = await fetch(
    `${process.env.WORDPRESS_API_URL}/wp-json/wp/v2/posts?_fields=${fields.join(',')}`,
    { cache: 'no-store' })
  const posts = await res.json()

  return posts.reduce((mappedPosts: MappedPost[], post: Post ) => {
    const { date, slug, status, title, content } = post

    const isPublished = status === 'publish'

    const imgRegex = /<img(.*?)>/g
    const images = content.rendered.match(imgRegex)

    const regex = /<p>(.*?)<\/p>/g
    const matches = content.rendered.match(regex) || [];

    let modifiedContent = matches.map((p: string) => (
      p.replace(/<\/?p>/g, '').replace(/target="_blank"/g, 'target="_blank" class="text-blue-500"')
    ));

    if (isPublished) {
      mappedPosts.push({
        date,
        slug,
        title: title.rendered,
        content: modifiedContent,
        images
      })
    }
    return mappedPosts
  }, [])
}
 

export default async function Home() {
  const posts = await getPosts()

  console.log(posts[0])

  return (
    <main className="m-auto px-4 mt-16 min-h-screen relative max-w-2xl">
      <NavBar />
      { posts.map(({ date, title, content, images}: MappedPost) =>
          <div key={date} className='space-y-4'>
            <h1 className='text-6xl'>{title}</h1>
            {images?.length && images.map(
              (image, index) => <div key={index} dangerouslySetInnerHTML={{ __html: image }} />
            )}
            {content?.length && content.map(
              (paragraph, index) =>
                <p key={index}>
                  <div key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
                </p>
            )}
          </div>
        )
      }
    </main>
  )
}
