import Layout from '@/components/Layout'
import Head from 'next/head'
import { TwitterEmbed, InstagramEmbed } from 'react-social-media-embed'

export default function Post({
  slug = '',
  date = '',
  title = '',
  content = [],
}) {
  return (
    <>
      <Head>
        <title>{slug}</title>
        <meta property='og:title' content={slug} key='title' />
      </Head>
      <Layout>
        <section className='m-auto px-4 pb-20 mt-28 min-h-screen relative max-w-2xl'>
          <div key={date} className='flex flex-col space-y-6'>
            <h1
              className='text-6xl'
              dangerouslySetInnerHTML={{ __html: title }}
            />
            {content?.length &&
              content.map((paragraph, index) => {
                if (paragraph.includes('twitter.com')) {
                  const url = paragraph.replace(/<p>twitterUrl=|<\/p>/g, '')
                  return <TwitterEmbed key={index} url={url} />
                }
                if (paragraph.includes('instagram.com')) {
                  const url = paragraph.replace(/<p>instagramUrl=|<\/p>/g, '')
                  return <InstagramEmbed key={index} url={url} />
                }
                return (
                  <div
                    key={index}
                    dangerouslySetInnerHTML={{ __html: paragraph }}
                  />
                )
              })}
          </div>
        </section>
      </Layout>
    </>
  )
}

export async function getServerSideProps({ params }) {
  const { slug } = params

  const fields = ['date', 'title', 'status', 'content.rendered']
  const res = await fetch(
    `${
      process.env.WORDPRESS_API_URL
    }/wp-json/wp/v2/posts?slug=${slug}&_fields=${fields.join(',')}`,
    { cache: 'no-store' }
  )
  const posts = await res.json()

  const { date, status, title, content } = posts[0]

  const isPublished = status === 'publish'

  if (isPublished) {
    return {
      props: {
        slug,
        date,
        title: title.rendered,
        content: content.rendered.split('\n').filter((e) => e !== ''),
      },
    }
  }
  return {
    props: {},
  }
}
