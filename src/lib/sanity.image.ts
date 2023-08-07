import createImageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource,  } from '@sanity/image-url/lib/types/types'

import { dataset, projectId } from '~/lib/sanity.api'

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
})

export const urlForImage = (source: SanityImageSource) => {
  // Ensure that source image contains a valid reference
  if (!source) {
    return undefined
  }

  return imageBuilder?.image(source).auto('format')
}
