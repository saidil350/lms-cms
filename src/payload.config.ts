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
import { Leads } from './collections/Leads.ts'
import { Products } from './collections/Products.ts'
import { ProductCategories } from './collections/ProductCategories.ts'

// Globals
import { CompanyProfile } from './globals/CompanyProfile.ts'
import { BrandPromise } from './globals/BrandPromise.ts'
import { Contact } from './globals/Contact.ts'
import { Locations } from './globals/Locations.ts'
import { Stats } from './globals/Stats.ts'
import { ProductionProcess } from './globals/ProductionProcess.ts'
import { HomepageHero } from './globals/HomepageHero.ts'
import { ProductKnowledge } from './globals/ProductKnowledge.ts'
import { ProgramMitra } from './globals/ProgramMitra.ts'
import { KeunggulanHalgreen } from './globals/KeunggulanHalgreen.ts'
import { SiteChrome } from './globals/SiteChrome.ts'
import { BrandEssentials } from './globals/BrandEssentials.ts'
import { BrandStory } from './globals/BrandStory.ts'
import { DifferentiatingExecution } from './globals/DifferentiatingExecution.ts'
import { withFrontendCollectionSync, withFrontendGlobalSync } from './hooks/revalidateFrontend.ts'

const dirname = path.resolve(process.cwd(), 'src')

// Parse CORS origins dari environment variable
const corsOrigins = (process.env.CORS_ORIGINS || 'http://localhost:3000')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean)

const databaseUri =
  process.env.DATABASE_URI || 'postgresql://lms:lmspass@localhost:5432/lms_cms'
const useS3Storage = process.env.USE_S3_STORAGE === 'true' && Boolean(process.env.S3_BUCKET)

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
    Leads,
    Products,
    ProductCategories,
  ]),

  // ─── Globals ─────────────────────────────────────────────────────────────────
  globals: withFrontendGlobalSync([
    CompanyProfile,
    HomepageHero,
    BrandPromise,
    ProductKnowledge,
    ProgramMitra,
    KeunggulanHalgreen,
    Contact,
    Locations,
    Stats,
    ProductionProcess,
    SiteChrome,
    BrandEssentials,
    BrandStory,
    DifferentiatingExecution,
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
  plugins: useS3Storage
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

  // ─── Server URL ──────────────────────────────────────────────────────────────
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3001',
})
