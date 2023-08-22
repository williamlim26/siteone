import Layout from '@/components/Layout'
import { useEffect, } from 'react'
import { TwitterEmbed, InstagramEmbed } from 'react-social-media-embed'
// https://www.npmjs.com/package/react-social-media-embed
// https://www.npmjs.com/package/react-twitter-embed
const instagramScriptSrc = '//www.instagram.com/embed.js'
const twitterScriptSrc = 'https://platform.twitter.com/widgets.js'

// posts will be populated at build time by getStaticProps()
export default function Post({ date, title, content }) {
  useEffect(() => {
    let scriptElement = document.createElement('script');
    scriptElement.setAttribute('src', instagramScriptSrc);
    document.head.appendChild(scriptElement);

    scriptElement = document.createElement('script');
    scriptElement.setAttribute('src', twitterScriptSrc);
    document.head.appendChild(scriptElement);
  }, [])

  return (
    <Layout>
      <section className="m-auto px-4 pb-20 mt-28 min-h-screen relative max-w-2xl">
        <div key={date} className='flex flex-col space-y-6'>
          <h1 className='text-6xl' dangerouslySetInnerHTML={{ __html: title }} />
          {content?.length && content.map(
            (paragraph, index) =>
              <div key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
          )}
        </div>
        {/* <div className="twitter-tweet">
          <a data-id="1686663134100983808" href="https://twitter.com/user/status/1686663134100983808"></a>
        </div> */}
        {/* <TwitterTweetEmbed tweetId={'1686663134100983808'} /> */}
      </section>
    </Layout>
  )
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export async function getStaticProps() {
  const sz = 'my-dearest-nearly-doubles-its-ratings-as-it-surges-to-new-all-time-high'
  const fields = ['date', 'title', 'status', 'content.rendered']
  const res = await fetch(
    `https://www.weinian.ca/wp-json/wp/v2/posts?slug=${sz}&_fields=${fields.join(',')}`,
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
      props: {
        date,
        title: title.rendered,
        content: content.rendered.split('\n').filter(e => e !== ''),
      }
    }
  }
  return {
    props: {},
  }
}