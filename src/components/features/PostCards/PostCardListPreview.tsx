'use client'

import { useLiveQuery } from 'next-sanity/preview'

import { type Post } from '~/lib/sanity.queries'
import { postsQuery } from '~/lib/sanity.queries'

import PostCard from './PostCard'

export default function PostCardListPreview({ posts: initialPosts }: { posts: Post[] }) {
  const [posts] = useLiveQuery<Post[]>(initialPosts, postsQuery.query)
  return (
    <ul className='post-card-list'>
      { posts.map(post => (
        <li key={post._id} className='post-card-list__item'>
          <PostCard post={post} />
        </li>
      ))}
    </ul>
  )
}
