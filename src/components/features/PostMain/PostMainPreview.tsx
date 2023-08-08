'use client'

import mermaid from 'mermaid'
import { useLiveQuery } from 'next-sanity/preview'

import { type Post } from '~/lib/sanity.queries'
import { postBySlugQuery } from '~/lib/sanity.queries'

import PostMain from './PostMain'



export default function PostMainPreview({ post:initialPost }: { post: Post }) {
  const [post] = useLiveQuery<Post>(
    initialPost, 
    postBySlugQuery.query, 
    {slug: initialPost.slug.current}
  )
  mermaid.initialize({ startOnLoad: true })
  
  return (
    <PostMain post={post} />
  )
}