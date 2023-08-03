import '~/styles/global.css'

import { Metadata } from 'next'
import { draftMode } from 'next/headers'

import PreviewProvider from '~/components/PreviewProvider'
import { readToken } from '~/lib/sanity.api'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to Next.js',
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  const preview = draftMode().isEnabled ? {token: readToken} : undefined

  return (
    <html lang="ja">
      {preview ? (
        <PreviewProvider token={preview.token}>
          <body>{children}</body>
        </PreviewProvider>
      ):(
        <body>{children}</body>
      )}
    </html>
  )
}