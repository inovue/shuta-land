import { SchemaTypeDefinition } from 'sanity'

import blockContent from './blockContent'
import openGraph from './openGraph'
import post from './post'
import siteMeta from './siteMeta'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, blockContent, siteMeta, openGraph],
}
