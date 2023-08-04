import 'katex/dist/katex.min.css'

import { draftMode } from 'next/headers'

import Container from '~/components/Container'
import PostMain from '~/components/features/PostMain/PostMain'
import { markdownToHtml } from '~/lib/markdown-to-html'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import {
  getPost,
  getPostSlugs,
  Post,
} from '~/lib/sanity.queries'


export async function generateStaticParams() {
  const isPreview = false //draftMode().isEnabled
  const client = getClient(isPreview ? {token: readToken} : undefined)
  const slugs = await getPostSlugs(client)

  return slugs.map((slug) =>({slug}))
}


export default async function PostPage({params}: {params: {slug: string}}) {
  const isPreview = draftMode().isEnabled
  const client = getClient(isPreview ? {token: readToken} : undefined)
  const post = await getPost(client, params.slug)
  console.log('isPreview', isPreview)
  //const post = (async (post)=>({...post, bio: await markdownToHtml(post.bio)}))(await getPost(client, params.slug))
  
  return (
    <Container>
      <div className='main-wrapper w-full max-w-[1280px] mx-auto flex gap-4 md:p-4'>
        <PostMain post={post} />
        <aside className='sidebar-right hidden md:block w-[30%]'>
          <div className='bg-white'></div>
        </aside>
      </div>
    </Container>
  )
}
