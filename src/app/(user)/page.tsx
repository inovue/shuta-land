import Container from '~/components/Container'
import PostCardList from '~/components/features/PostCards/PostCardList'
import { getClient } from '~/lib/sanity.client'
import { getPosts } from '~/lib/sanity.queries'


export default async function Page() {
  const client = getClient()
  const posts = await getPosts(client)
  return (
    <Container>
      <PostCardList posts={posts} />
    </Container>
  )
}
