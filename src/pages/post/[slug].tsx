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
      <section className="post">
        <header className='flex flex-col'>
          {post.mainImage ? (
            <div className='relative w-full h-56'>
              <Image src={urlForImage(post.mainImage).url()} className='object-cover' fill alt="" />
            </div>
          ) : (
            <div className="post-cover-none" />
          )}
          <h1 className="text-6xl font-bold mb-4">{post.title}</h1>
          <p className="text-xl mb-2">{post.excerpt}</p>
          <p className="text-gray-500">{formatDate(post._createdAt)}</p>
        </header>
        <div className="prose px-4 sm:px-6 md:px-8 mx-auto mt-12 mb-6">
          <PortableText value={post.body} />
        </div>
        <article className="prose px-4 sm:px-6 md:px-8 mx-auto mt-12 mb-6" dangerouslySetInnerHTML={{ __html: post.bio }}></article>
        
      </section>
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
