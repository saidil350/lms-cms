import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'

import { Users } from './collections/Users.ts'
import { Media } from './collections/Media.ts'
import { Posts } from './collections/Posts.ts'
import { Projects } from './collections/Projects.ts'
import { Testimonials } from './collections/Testimonials.ts'
import { Team } from './collections/Team.ts'
import { Certifications } from './collections/Certifications.ts'
import { Industries } from './collections/Industries.ts'
import { Innovations } from './collections/Innovations.ts'
import { Leads } from './collections/Leads.ts'

import { CompanyProfile } from './globals/CompanyProfile.ts'
import { BrandPromise } from './globals/BrandPromise.ts'
import { Contact } from './globals/Contact.ts'
import { Locations } from './globals/Locations.ts'
import { Stats } from './globals/Stats.ts'
import { ProductionProcess } from './globals/ProductionProcess.ts'
import { HomepageHero } from './globals/HomepageHero.ts'
import { ProductKnowledge } from './globals/ProductKnowledge.ts'
import { ProgramMitra } from './globals/ProgramMitra.ts'
import { SiteChrome } from './globals/SiteChrome.ts'
import { withFrontendCollectionSync, withFrontendGlobalSync } from './hooks/revalidateFrontend.ts'

const dirname = path.resolve(process.cwd(), 'src')

const corsOrigins = (process.env.CORS_ORIGINS || 'http://localhost:3000')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean)

const databaseUri =
  process.env.DATABASE_URI || 'postgresql://lms:lmspass@localhost:5432/lms_cms'
const useS3Storage = process.env.USE_S3_STORAGE === 'true' && Boolean(process.env.S3_BUCKET)

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || 'local_dev_secret_change_in_production',
  db: postgresAdapter({
    pool: {
      connectionString: databaseUri,
    },
  }),
  editor: lexicalEditor({}),
  collections: withFrontendCollectionSync([
    Users,
    Media,
    Posts,
    Projects,
    Testimonials,
    Team,
    Certifications,
    Industries,
    Innovations,
    Leads,
  ]),
  globals: withFrontendGlobalSync([
    CompanyProfile,
    HomepageHero,
    BrandPromise,
    ProductKnowledge,
    ProgramMitra,
    Contact,
    Locations,
    Stats,
    ProductionProcess,
    SiteChrome,
  ]),
  admin: {
    user: 'users',
    meta: {
      titleSuffix: '— LMS CMS',
    },
  },
  cors: corsOrigins,
  csrf: corsOrigins,
  upload: {
    limits: {
      fileSize: 10_000_000,
    },
  },
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  graphQL: {
    disable: true,
  },
  plugins:
    useS3Storage
      ? [
          s3Storage({
            collections: {
              media: {
                prefix: 'lms-media',
                disablePayloadAccessControl: true,
                generateFileURL: ({ filename: fname, prefix }) =>
                  `${process.env.S3_PUBLIC_URL}/${prefix || 'lms-media'}/${fname}`,
              },
            },
            bucket: process.env.S3_BUCKET || 'lms-media',
            config: {
              endpoint: process.env.S3_ENDPOINT,
              region: process.env.S3_REGION || 'auto',
              credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY || '',
                secretAccessKey: process.env.S3_SECRET_KEY || '',
              },
              forcePathStyle: true,
            },
          }),
        ]
      : [],
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3001',
})
