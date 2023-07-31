import type { PortableTextBlock } from '@portabletext/types'
import type { ImageAsset, Slug } from '@sanity/types'
import groq from 'groq'
import { InferType, makeSafeQueryRunner, q, sanityImage } from "groqd";
import { type SanityClient } from 'next-sanity'

export const postsQuery = groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc)`

export async function getPosts(client: SanityClient): Promise<Post[]> {
  return await client.fetch(postsQuery)
}

export const postSchema = {
  _type: q.string(),
  _id: q.string(),
  _createdAt: q.string(),
  title: q.string().optional(),
  slug: q.object({current:q.string(), _type:q.string()}),
  excerpt: q.string().optional(),
  mainImage: sanityImage("mainImage").nullable(),
  body: q.contentBlocks()
}

export const postBySlugQuery = q('*').filterByType("post").filter("slug.current == $slug").slice(0).grab$(
  postSchema
);

export type Post = InferType<typeof postBySlugQuery>


export const getPost = (client: SanityClient, slug: string) => {
  return makeSafeQueryRunner((query, params) => client.fetch(query, params))(postBySlugQuery, {slug});
}

/*
export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0]`

export async function getPost(
  client: SanityClient,
  slug: string
): Promise<Post> {
  return await client.fetch(postBySlugQuery, {
    slug,
  })
}
*/

export const postSlugsQuery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`

/*
export interface Post {
  _type: 'post'
  _id: string
  _createdAt: string
  title?: string
  slug: Slug
  excerpt?: string
  mainImage?: ImageAsset
  body: PortableTextBlock[]
}
*/