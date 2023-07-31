import groq from 'groq'
import { InferType, makeSafeQueryRunner, q, sanityImage } from "groqd";
import type { SanityClient } from 'next-sanity'


export const postFieldsSchema = {
  _type: q.string(),
  _id: q.string(),
  _createdAt: q.string(),
  title: q.string().optional(),
  slug: q.object({current:q.string(), _type:q.string()}),
  excerpt: q.string().optional(),
  mainImage: sanityImage("mainImage").nullable(),
  body: q.contentBlocks()
}


export const postsQuery = q('*').filterByType("post").filter("defined(slug.current)").order("_createdAt desc").grab$(postFieldsSchema);
export const getPosts = (client: SanityClient) => {
  return makeSafeQueryRunner((query, params) => client.fetch(query, params))(postsQuery, {});
}


export const postBySlugQuery = q('*').filterByType("post").filter("slug.current == $slug").slice(0).grab$(postFieldsSchema);
export const getPost = (client: SanityClient, slug: string) => {
  return makeSafeQueryRunner((query, params) => client.fetch(query, params))(postBySlugQuery, {slug});
}


export const postSlugsQuery = q('*').filterByType("post").filter("defined(slug.current)").grab$({slug: q.object({current:q.string(), _type:q.string()})});
export const getPostSlugs = async (client: SanityClient) => {
  const posts = await makeSafeQueryRunner((query, params) => client.fetch(query, params))(postSlugsQuery, {});
  return posts.map((post) => post.slug.current);
}

export type Post = InferType<typeof postBySlugQuery>