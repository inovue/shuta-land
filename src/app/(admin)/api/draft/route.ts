import type { NextApiRequest, NextApiResponse } from 'next'
import { draftMode } from 'next/headers'
import {NextRequest, NextResponse} from 'next/server'

import { previewSecretId, readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import { getPreviewSecret } from '~/utils/previewSecret'

export async function GET(request: NextRequest) {
  
  if (!readToken) {
    return NextResponse.json({ error: 'Misconfigured server' }, { status: 500 })
  }

  const params = request.nextUrl.searchParams

  const secret = params.get('secret')
  const slug = params.get('slug')

  if (!secret) {
    return NextResponse.json({ error: 'secret not found' }, { status: 401 })
  }

  const authClient = getClient({ token: readToken }).withConfig({
    useCdn: false,
    token: readToken,
  })

  // The secret can't be stored in an env variable with a NEXT_PUBLIC_ prefix, as it would make you
  // vulnerable to leaking the token to anyone. If you don't have an custom API with authentication
  // that can handle checking secrets, you may use https://github.com/sanity-io/sanity-studio-secrets
  // to store the secret in your dataset.
  const storedSecret = await getPreviewSecret({
    client: authClient,
    id: previewSecretId,
  })

  // This is the most common way to check for auth, but we encourage you to use your existing auth
  // infra to protect your token and securely transmit it to the client
  if (secret !== storedSecret) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
  }

  if (slug) {
    draftMode().enable()
    //res.setPreviewData({ token: readToken })
    return NextResponse.redirect(new URL(`/posts/${slug}`, request.nextUrl))
  }

  
  return NextResponse.json({ error: 'Slug query parameter is required' }, { status: 404 })
}