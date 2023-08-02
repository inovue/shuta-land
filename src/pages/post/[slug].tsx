import 'katex/dist/katex.min.css'

import { PortableText } from '@portabletext/react'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import { useLiveQuery } from 'next-sanity/preview'

import Container from '~/components/Container'
import { markdownToHtml } from '~/lib/markdown-to-html'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import { urlForImage } from '~/lib/sanity.image'
import {
  getPost,
  getPostSlugs,
  Post,
  postBySlugQuery,
} from '~/lib/sanity.queries'
import type { SharedPageProps } from '~/pages/_app'
import { formatDate } from '~/utils'

interface Query {
  [key: string]: string
}

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    post: Post
  },
  Query
> = async ({ draftMode = false, params = {} }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const post = await getPost(client, params.slug)
  

  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      post: {...post, bio: await markdownToHtml(post.bio)},
    },
  }
}

export default function ProjectSlugRoute(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const [post] = useLiveQuery(props.post, postBySlugQuery.query, {
    slug: props.post.slug,
  })

  return (
    <Container>
      <div className='main-wrapper w-full max-w-[1280px] mx-auto flex gap-4 md:p-4'>
        <main className='flex-1'>
          <article className='bg-white border rounded-lg'>
            <header className='article__header '>
              <div className='article__header__cover-image-wrapepr ' style={{ position: 'relative', paddingTop: '40%' }}>
                <Image 
                  className='article__header__cover-image absolute inset-0 object-cover bg-gray-400 rounded-t-lg' 
                  alt="Cover image for xxxxxxxxxxxxx" 
                  src={post.mainImage ? urlForImage(post.mainImage).url() : ''} 
                  fill 
                  sizes="100vw" 
                />
              </div>
              <div className='article__header__meta px-3 sm:px-6 md:px-12 lg:px-16 '>
                <h1 className="text-5xl font-black mb-2">{post.title}</h1>
                <div className='tags-wrapper'></div>
                {post._createdAt && (
                  <p className="created-at-wrapper text-gray-700">
                    <time dateTime={post._createdAt} title={post._createdAt}> {formatDate(post._createdAt)} </time>
                  </p>
                )}
              </div>
            </header>
            <div className='article__body prose max-w-full px-3 sm:px-6 md:px-12 lg:px-16 py-8' dangerouslySetInnerHTML={{ __html: post.bio }}></div>
          </article>

          {/*<div className="prose px-4 sm:px-6 md:px-8 mx-auto mt-12 mb-6"> <PortableText value={post.body} /> </div>*/}
        </main>

        <aside className='sidebar-right hidden md:block w-[30%]'>
          <div className='bg-white'></div>
        </aside>
        
        
      </div>
      
    </Container>
  )
}

export const getStaticPaths = async () => {
  const client = getClient()
  const slugs = await getPostSlugs(client)

  return {
    paths: slugs.map((slug) => `/post/${slug}`) || [],
    fallback: 'blocking',
  }
}
