const Posts = ({ params }: { params: { slug: string } }) => {
  return <p>Post: {params.slug}</p>
}

export default Posts