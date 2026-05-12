"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const payload_1 = require("payload");
const db_postgres_1 = require("@payloadcms/db-postgres");
const richtext_lexical_1 = require("@payloadcms/richtext-lexical");
const storage_s3_1 = require("@payloadcms/storage-s3");
const path_1 = __importDefault(require("path"));
const url_1 = require("url");
// Collections
const Users_1 = require("./collections/Users");
const Media_1 = require("./collections/Media");
const Posts_1 = require("./collections/Posts");
const Projects_1 = require("./collections/Projects");
const Testimonials_1 = require("./collections/Testimonials");
const Team_1 = require("./collections/Team");
const Certifications_1 = require("./collections/Certifications");
const Industries_1 = require("./collections/Industries");
const Innovations_1 = require("./collections/Innovations");
// Globals
const CompanyProfile_1 = require("./globals/CompanyProfile");
const BrandPromise_1 = require("./globals/BrandPromise");
const Contact_1 = require("./globals/Contact");
const Locations_1 = require("./globals/Locations");
const Stats_1 = require("./globals/Stats");
const ProductionProcess_1 = require("./globals/ProductionProcess");
const HomepageHero_1 = require("./globals/HomepageHero");
const SiteChrome_1 = require("./globals/SiteChrome");
const revalidateFrontend_1 = require("./hooks/revalidateFrontend");
const filename = (0, url_1.fileURLToPath)(import.meta.url);
const dirname = path_1.default.dirname(filename);
// Parse CORS origins dari environment variable
const corsOrigins = (process.env.CORS_ORIGINS || 'http://localhost:3000')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
const databaseUri = process.env.DATABASE_URI || 'postgresql://lms:lmspass@localhost:5432/lms_cms';
exports.default = (0, payload_1.buildConfig)({
    secret: process.env.PAYLOAD_SECRET || 'local_dev_secret_change_in_production',
    // ─── Database ────────────────────────────────────────────────────────────────
    db: (0, db_postgres_1.postgresAdapter)({
        pool: {
            connectionString: databaseUri,
        },
    }),
    // ─── Default Rich Text Editor ────────────────────────────────────────────────
    editor: (0, richtext_lexical_1.lexicalEditor)({}),
    // ─── Collections ─────────────────────────────────────────────────────────────
    collections: (0, revalidateFrontend_1.withFrontendCollectionSync)([
        Users_1.Users,
        Media_1.Media,
        Posts_1.Posts,
        Projects_1.Projects,
        Testimonials_1.Testimonials,
        Team_1.Team,
        Certifications_1.Certifications,
        Industries_1.Industries,
        Innovations_1.Innovations,
    ]),
    // ─── Globals ─────────────────────────────────────────────────────────────────
    globals: (0, revalidateFrontend_1.withFrontendGlobalSync)([
        CompanyProfile_1.CompanyProfile,
        HomepageHero_1.HomepageHero,
        BrandPromise_1.BrandPromise,
        Contact_1.Contact,
        Locations_1.Locations,
        Stats_1.Stats,
        ProductionProcess_1.ProductionProcess,
        SiteChrome_1.SiteChrome,
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
        outputFile: path_1.default.resolve(dirname, 'payload-types.ts'),
    },
    // ─── Disable GraphQL (REST only) ─────────────────────────────────────────────
    graphQL: {
        disable: true,
    },
    // ─── Plugins ─────────────────────────────────────────────────────────────────
    plugins: [
        (0, storage_s3_1.s3Storage)({
            collections: {
                media: {
                    prefix: 'lms-media',
                    disablePayloadAccessControl: true,
                    generateFileURL: ({ filename: fname, prefix }) => `${process.env.S3_PUBLIC_URL}/${prefix}/${fname}`,
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
});
//# sourceMappingURL=payload.config.js.map