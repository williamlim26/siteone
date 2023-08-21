import Script from 'next/script'
import { TwitterTweetEmbed } from 'react-twitter-embed';

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
      <Script async src="https://platform.twitter.com/widgets.js"/>
      <Script async src="//www.instagram.com/embed.js" charset="utf-8" />
      <div key={date} className='flex flex-col space-y-6'>
        <div className='text-6xl' dangerouslySetInnerHTML={{ __html: title }} />
        {/* {content?.length && content.map(
          (paragraph, index) =>
            <div key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
        )} */}
      </div>
      {/* <div dangerouslySetInnerHTML={{ __html: COOL }} /> */}
      <blockquote className="twitter-tweet">
        <p lang="ko" dir="ltr">[★337회 더쇼초이스 후보②]
          <br/>권은비로 삼행시 도전 하겠습니다.
          <br/>권 은비대장토끼‼️
          <br/>은 밀하게 전할 말이 있어요•••
          <br/>비 밀인데 오늘 더쇼에 조명이 다 꺼진답니다‼️‼️
          <br/>
          <br/>울 대장토끼가 빛나서 따로 조명이 필요 없대요‼️‼️
          <br/>자체발광 미모 무엇🥹🫶
          <a href="https://twitter.com/hashtag/%EA%B6%8C%EC%9D%80%EB%B9%84?src=hash&amp;ref_src=twsrc%5Etfw">#권은비</a>
          <a href="https://twitter.com/hashtag/TheFlash?src=hash&amp;ref_src=twsrc%5Etfw">#TheFlash</a>
          <a href="https://twitter.com/hashtag/%EB%8D%94%EC%87%BC?src=hash&amp;ref_src=twsrc%5Etfw">#더쇼</a>
          <a href="https://twitter.com/KWONEUNBI?ref_src=twsrc%5Etfw">@KWONEUNBI</a>
          <a href="https://t.co/BRg2qrkS9z">pic.twitter.com/BRg2qrkS9z</a>
        </p>&mdash; THE SHOW (@sbsmtvtheshow)
        <a href="https://twitter.com/sbsmtvtheshow/status/1691376363721392128?ref_src=twsrc%5Etfw">August 15, 2023</a>
      </blockquote>
      {/* <Script async src="https://platform.twitter.com/widgets.js" charset="utf-8" /> */}

      {/* <TwitterTweetEmbed tweetId={'1686663134100983808'} /> */}
    </main>
  )
}

export default Posts