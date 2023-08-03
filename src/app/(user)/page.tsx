import {draftMode} from 'next/headers'
import { useLiveQuery } from 'next-sanity/preview'

import Container from '~/components/Container'
import PostCardList from '~/components/features/PostCards/PostCardList'
import PostCardListPreview from '~/components/features/PostCards/PostCardListPreview'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import { getPosts, type Post, postsQuery } from '~/lib/sanity.queries'

export async function generateStaticParams() {
  const isPreview = false //draftMode().isEnabled
  const client = getClient(isPreview ? {token: readToken} : undefined)
  const posts = await getPosts(client) ?? []
  return {posts, isPreview}
}

export default function Page({params}: {params: {posts:Post[], isPreview:boolean}}) {

  return (
    <Container>
      {params.isPreview ? (
        <PostCardListPreview posts={params.posts} />
      ):(
        <PostCardList posts={params.posts} />
      )}
    </Container>
  )
}
