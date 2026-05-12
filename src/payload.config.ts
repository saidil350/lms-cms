import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'

// Collections
import { Users } from './collections/Users.ts'
import { Media } from './collections/Media.ts'
import { Posts } from './collections/Posts.ts'
import { Projects } from './collections/Projects.ts'
import { Testimonials } from './collections/Testimonials.ts'
import { Team } from './collections/Team.ts'
import { Certifications } from './collections/Certifications.ts'
import { Industries } from './collections/Industries.ts'
import { Innovations } from './collections/Innovations.ts'

// Globals
import { CompanyProfile } from './globals/CompanyProfile.ts'
import { BrandPromise } from './globals/BrandPromise.ts'
import { Contact } from './globals/Contact.ts'
import { Locations } from './globals/Locations.ts'
import { Stats } from './globals/Stats.ts'
import { ProductionProcess } from './globals/ProductionProcess.ts'
import { HomepageHero } from './globals/HomepageHero.ts'
import { SiteChrome } from './globals/SiteChrome.ts'
import { withFrontendCollectionSync, withFrontendGlobalSync } from './hooks/revalidateFrontend.ts'

const dirname = path.resolve(process.cwd(), 'src')

// Parse CORS origins dari environment variable
const corsOrigins = (process.env.CORS_ORIGINS || 'http://localhost:3000')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean)

const databaseUri =
  process.env.DATABASE_URI || 'postgresql://lms:lmspass@localhost:5432/lms_cms'

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || 'local_dev_secret_change_in_production',

  // ─── Database ────────────────────────────────────────────────────────────────
  db: postgresAdapter({
    pool: {
      connectionString: databaseUri,
    },
  }),

  // ─── Default Rich Text Editor ────────────────────────────────────────────────
  editor: lexicalEditor({}),

  // ─── Collections ─────────────────────────────────────────────────────────────
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
  ]),

  // ─── Globals ─────────────────────────────────────────────────────────────────
  globals: withFrontendGlobalSync([
    CompanyProfile,
    HomepageHero,
    BrandPromise,
    Contact,
    Locations,
    Stats,
    ProductionProcess,
    SiteChrome,
  ]),

  // ─── Admin Panel ─────────────────────────────────────────────────────────────
  admin: {
    user: 'users',
    meta: {
      titleSuffix: '— LMS CMS',
    },
  },

  // ─── CORS & CSRF ─────────────────────────────────────────────────────────────
  cors: corsOrigins,
  csrf: corsOrigins,

  // ─── Upload Limits ───────────────────────────────────────────────────────────
  upload: {
    limits: {
      fileSize: 10_000_000, // 10MB max
    },
  },

  // ─── TypeScript Output ───────────────────────────────────────────────────────
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  // ─── Disable GraphQL (REST only) ─────────────────────────────────────────────
  graphQL: {
    disable: true,
  },

  // ─── Plugins ─────────────────────────────────────────────────────────────────
  plugins: process.env.S3_BUCKET
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
          bucket: process.env.S3_BUCKET,
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

  // ─── Server URL ──────────────────────────────────────────────────────────────
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3001',
})
