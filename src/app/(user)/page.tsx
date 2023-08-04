import {draftMode} from 'next/headers'
import { useLiveQuery } from 'next-sanity/preview'

import Container from '~/components/Container'
import PostCardList from '~/components/features/PostCards/PostCardList'
import PostCardListPreview from '~/components/features/PostCards/PostCardListPreview'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import { getPosts, type Post, postsQuery } from '~/lib/sanity.queries'


export default async function Page() {
  const isPreview = false //draftMode().isEnabled
  const client = getClient(isPreview ? {token: readToken} : undefined)
  const posts = await getPosts(client)
  return (
    <Container>
      {isPreview ? (
        <PostCardListPreview posts={posts} />
      ):(
        <PostCardList posts={posts} />
      )}
    </Container>
  )
}
