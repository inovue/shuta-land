import { type Post } from '~/lib/sanity.queries'

import PostCard from './PostCard'

export default function PostCardList({ posts }: { posts: Post[] }) {
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
