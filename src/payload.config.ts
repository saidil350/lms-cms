import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { fileURLToPath } from 'url'

// Collections
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Posts } from './collections/Posts'
import { Projects } from './collections/Projects'
import { Testimonials } from './collections/Testimonials'
import { Team } from './collections/Team'
import { Certifications } from './collections/Certifications'
import { Industries } from './collections/Industries'
import { Innovations } from './collections/Innovations'

// Globals
import { CompanyProfile } from './globals/CompanyProfile'
import { BrandPromise } from './globals/BrandPromise'
import { Contact } from './globals/Contact'
import { Locations } from './globals/Locations'
import { Stats } from './globals/Stats'
import { ProductionProcess } from './globals/ProductionProcess'
import { HomepageHero } from './globals/HomepageHero'
import { SiteChrome } from './globals/SiteChrome'
import { withFrontendCollectionSync, withFrontendGlobalSync } from './hooks/revalidateFrontend'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

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
  plugins: [
    s3Storage({
      collections: {
        media: {
          prefix: 'lms-media',
          disablePayloadAccessControl: true,
          generateFileURL: ({ filename: fname, prefix }) =>
            `${process.env.S3_PUBLIC_URL}/${prefix}/${fname}`,
        },
      },
      bucket: process.env.S3_BUCKET || '',
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
  ],

  // ─── Server URL ──────────────────────────────────────────────────────────────
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3001',
})
