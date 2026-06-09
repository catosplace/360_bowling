import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'

import { Users } from './collections/Users'

import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Products } from './collections/Products'

export default buildConfig({
  admin: {
    user: Users.slug
  },
  collections: [
    Users,
    Products,
    Categories,
    Pages,
    Media,
  ],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
  }),
  secret: process.env.PAYLOAD_SECRET || '',
})