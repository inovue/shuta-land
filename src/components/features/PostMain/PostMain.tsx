import Image from 'next/image'

import { markdownToHtml } from '~/lib/markdown-to-html'
import { urlForImage } from '~/lib/sanity.image'
import { type Post } from '~/lib/sanity.queries'
import { formatDate } from '~/utils'

export default async function PostMain({ post }: { post: Post }) {
  
  const body = await markdownToHtml(post.bio)
  
  return (
    <main className='flex-1'>
      <article className='bg-white rounded-lg md:border'>
        <header className='article__header '>
          <div className='article__header__cover-image-wrapepr ' style={{ position: 'relative', paddingTop: '40%' }}>
            <Image 
              className='article__header__cover-image absolute inset-0 object-cover bg-gray-400 md:rounded-t-lg' 
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
        <div className='article__body prose max-w-full px-3 sm:px-6 md:px-12 lg:px-16 py-8' dangerouslySetInnerHTML={{ __html: body }}></div>
      </article>

      {/*<div className="prose px-4 sm:px-6 md:px-8 mx-auto mt-12 mb-6"> <PortableText value={post.body} /> </div>*/}
    </main>
  )
}
