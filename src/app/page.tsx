import Image from 'next/image'

async function getPosts() {
  const res = await fetch(`http://34.168.90.0/wp-json/wp/v2/posts`, { cache: 'no-store' })
  const posts = await res.json()
 
  return posts
}
 

export default async function Home() {
  const posts = await getPosts()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        {posts[0].content.rendered}
      </div>
    </main>
  )
}
