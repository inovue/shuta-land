'use client'

import Image from 'next/image'
import { useLiveQuery } from 'next-sanity/preview'
import { useEffect, useState } from 'react'

import { markdownToHtml } from '~/lib/markdown-to-html'
import { urlForImage } from '~/lib/sanity.image'
import { type Post } from '~/lib/sanity.queries'
import { postBySlugQuery } from '~/lib/sanity.queries'
import { formatDate } from '~/utils'

export default function PostMainPreview({ post:initialPost }: { post: Post }) {
  const [post, setPost] = useState<Post>(initialPost)
  let [previewPost] = useLiveQuery<Post>(
    initialPost, 
    postBySlugQuery.query, 
    {slug: initialPost.slug.current}
  )
  
  useEffect(()=>{
    (async () => {
      console.log('previewPost', previewPost._id)
      let bio = await markdownToHtml(previewPost.bio)
      setPost({...previewPost, bio})
    })();
  } , [previewPost]);

  return (
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
  )
}
