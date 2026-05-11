# PROMPT — Scaffold Repo: `halgreen-cms` (Payload CMS v3 Backend)

Gunakan prompt ini di **Claude Code**, **Cursor**, atau AI coding assistant lainnya.
Jalankan SETELAH repo frontend selesai di-scaffold.

---

## PROMPT

```
You are an expert Payload CMS v3 and Node.js developer. Scaffold a complete, production-ready backend CMS project called `halgreen-cms` for PT Makmur Raya Sejahtera's "Halgreen" website.

## Project Overview
- CMS for company profile website: Halgreen by PT Makmur Raya Sejahtera
- Frontend: Next.js 14 (separate repo at https://halgreen.id)
- This repo serves as headless CMS + REST API + admin panel
- Deployed to Railway with PostgreSQL database

## Tech Stack
- Payload CMS v3 (latest) — standalone mode (no Express needed)
- TypeScript
- PostgreSQL via @payloadcms/db-postgres
- Node.js 20+
- Cloudflare R2 or local disk for media storage (use @payloadcms/storage-s3)

---

## Project Structure to Generate

```
halgreen-cms/
├── src/
│   ├── collections/
│   │   ├── Pages.ts          ← Konten 5 halaman utama
│   │   ├── Leads.ts          ← Data lead dari form kontak
│   │   ├── Media.ts          ← Upload gambar/file
│   │   ├── Users.ts          ← Admin users dengan roles
│   │   └── Products.ts       ← Product knowledge content
│   ├── globals/
│   │   ├── SiteSettings.ts   ← Nama, logo, tagline, meta global
│   │   └── Navigation.ts     ← Navbar links config
│   ├── access/
│   │   ├── isAdmin.ts        ← Full access
│   │   ├── isEditor.ts       ← Content only, no leads/users
│   │   └── isAdminOrEditor.ts
│   ├── hooks/
│   │   └── notifyOnLead.ts   ← afterChange hook → WA + Telegram notif
│   ├── blocks/
│   │   ├── HeroBlock.ts      ← Hero section block type
│   │   ├── FeatureBlock.ts   ← Feature list block
│   │   └── CTABlock.ts       ← Call to action block
│   └── payload.config.ts     ← Main Payload configuration
├── .env
├── .env.example
├── tsconfig.json
├── package.json
└── README.md
```

---

## Files to Generate

### 1. `package.json`
Dependencies:
- payload@latest
- @payloadcms/db-postgres
- @payloadcms/richtext-lexical
- @payloadcms/storage-s3 (for Cloudflare R2)
- @payloadcms/next (for standalone server)
- graphql
- typescript, ts-node, tsx (dev)

Scripts:
- `dev`: `payload dev`
- `build`: `payload build`
- `start`: `node dist/server.js`
- `generate:types`: `payload generate:types`
- `migrate`: `payload migrate`
- `migrate:create`: `payload migrate:create`

### 2. `src/collections/Users.ts`
```typescript
// Collection: users
// Fields:
// - email (auto-included by Payload auth)
// - password (auto-included by Payload auth)
// - role: select — options: ['admin', 'editor'] — defaultValue: 'editor'
// - name: text — required
//
// Access:
// - create: only admin
// - read: isAdmin or self (req.user?.id === doc.id)
// - update: isAdmin or self
// - delete: isAdmin only
//
// Auth: enabled — tokenExpiration: 7 days
// Admin: useAsTitle: 'email'
```

### 3. `src/collections/Media.ts`
```typescript
// Collection: media
// Upload: enabled
// - mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/gif']
// - imageSizes: 
//   - thumbnail: { width: 400, height: 300, crop: 'center' }
//   - card: { width: 800, height: 600, crop: 'center' }
//   - og: { width: 1200, height: 630, crop: 'center' }
// Fields:
// - alt: text — required (for accessibility)
// - caption: text — optional
// Access:
// - read: public (everyone)
// - create/update/delete: isAdminOrEditor
// Admin: useAsTitle: 'filename'
```

### 4. `src/collections/Leads.ts`
```typescript
// Collection: leads
// Fields:
// - nama: text — required — label: 'Nama Lengkap'
// - whatsapp: text — required — label: 'Nomor WhatsApp'
// - email: email — required
// - ketertarikan: select — required
//   options: [
//     { label: 'Jadi Mitra', value: 'mitra' },
//     { label: 'Info Produk', value: 'produk' },
//     { label: 'Kerjasama Bisnis', value: 'kerjasama' },
//     { label: 'Lainnya', value: 'lainnya' }
//   ]
// - pesan: textarea — optional — label: 'Pesan'
// - status: select — defaultValue: 'baru'
//   options: [
//     { label: 'Baru', value: 'baru' },
//     { label: 'Dihubungi', value: 'dihubungi' },
//     { label: 'Follow Up', value: 'follow_up' },
//     { label: 'Selesai', value: 'selesai' }
//   ]
// - catatanAdmin: textarea — optional — label: 'Catatan Internal Admin'
// - source: text — defaultValue: 'website' — admin: { readOnly: true }
//
// Timestamps: createdAt, updatedAt (auto by Payload)
//
// Access:
// - create: public (unauthenticated — from frontend form)
// - read: isAdmin only
// - update: isAdmin only (for status & catatan)
// - delete: isAdmin only
//
// Hooks:
// - afterChange: [notifyOnLead] — fire only on create operation
//
// Admin:
// - useAsTitle: 'nama'
// - defaultColumns: ['nama', 'whatsapp', 'email', 'ketertarikan', 'status', 'createdAt']
// - defaultSort: '-createdAt'
```

### 5. `src/collections/Products.ts`
```typescript
// Collection: products
// Fields:
// - title: text — required — label: 'Nama Produk'
// - slug: text — unique — auto-generated from title
// - thumbnail: upload — relationTo: 'media'
// - shortDescription: textarea — required — label: 'Deskripsi Singkat'
// - content: richText (Lexical) — label: 'Konten Lengkap'
// - features: array — label: 'Fitur Unggulan'
//   - featureItem: text
// - category: select
//   options: [
//     { label: 'Produk Halal', value: 'halal' },
//     { label: 'Produk Hijau', value: 'green' },
//     { label: 'Layanan', value: 'layanan' }
//   ]
// - isPublished: checkbox — defaultValue: false — label: 'Publikasikan'
// - order: number — label: 'Urutan Tampil'
//
// Access:
// - read: if isPublished OR isAdminOrEditor
// - create/update/delete: isAdminOrEditor
//
// Admin: useAsTitle: 'title', defaultSort: 'order'
```

### 6. `src/collections/Pages.ts`
```typescript
// Collection: pages
// For managing content blocks of the 5 main pages
// Fields:
// - title: text — required
// - slug: text — required — unique
//   options: home, about, produk, mitra, kontak
// - hero: group
//   - eyebrow: text — label: 'Teks Kecil di atas Headline'
//   - headline: text — required
//   - subheadline: textarea
//   - backgroundImage: upload — relationTo: 'media'
//   - ctaText: text
//   - ctaLink: text
// - content: blocks — label: 'Blok Konten'
//   blocks: [HeroBlock, FeatureBlock, CTABlock]
// - seo: group — label: 'SEO'
//   - metaTitle: text
//   - metaDescription: textarea — maxLength: 160
//   - ogImage: upload — relationTo: 'media'
//
// Access:
// - read: public
// - create/update/delete: isAdminOrEditor
//
// Admin: useAsTitle: 'title'
```

### 7. `src/globals/SiteSettings.ts`
```typescript
// Global: site-settings
// Fields:
// - siteName: text — required — defaultValue: 'Halgreen'
// - siteTagline: text — defaultValue: 'Ekosistem Halal & Hijau Indonesia'
// - logo: upload — relationTo: 'media'
// - favicon: upload — relationTo: 'media'
// - defaultOgImage: upload — relationTo: 'media'
// - defaultMetaDescription: textarea
// - contactEmail: email
// - contactWhatsApp: text
// - socialLinks: array
//   - platform: select (instagram, facebook, youtube, tiktok, linkedin)
//   - url: text
// - ecosystemLinks: array — label: 'Link Ekosistem AmanahCorp'
//   - label: text
//   - url: text
//   - icon: text (emoji or icon name)
//
// Access: read public, update isAdminOrEditor
```

### 8. `src/globals/Navigation.ts`
```typescript
// Global: navigation
// Fields:
// - navItems: array — label: 'Menu Navigasi'
//   - label: text — required
//   - link: text — required
//   - isExternal: checkbox
// Access: read public, update isAdmin
```

### 9. `src/access/isAdmin.ts`
```typescript
// export const isAdmin = ({ req: { user } }) => {
//   return Boolean(user?.role === 'admin')
// }
```

### 10. `src/access/isEditor.ts`
```typescript
// export const isEditor = ({ req: { user } }) => {
//   return Boolean(user?.role === 'editor')
// }
```

### 11. `src/access/isAdminOrEditor.ts`
```typescript
// export const isAdminOrEditor = ({ req: { user } }) => {
//   return Boolean(user?.role === 'admin' || user?.role === 'editor')
// }
```

### 12. `src/hooks/notifyOnLead.ts`
```typescript
// Payload CollectionAfterChangeHook — fires after a new Lead is created
// Function: notifyOnLead
// 1. Only run if operation === 'create'
// 2. Extract doc fields: nama, whatsapp, email, ketertarikan, pesan
// 3. Format datetime in WIB (Asia/Jakarta timezone)
// 4. Send notifications in parallel using Promise.allSettled:
//    a. Telegram Bot API:
//       POST https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage
//       body: { chat_id: TELEGRAM_CHAT_ID, parse_mode: 'HTML', text: formattedMessage }
//       HTML format:
//       🌿 <b>Lead Baru Halgreen</b>
//       <b>Nama:</b> {nama}
//       <b>WhatsApp:</b> {whatsapp}
//       <b>Email:</b> {email}
//       <b>Ketertarikan:</b> {ketertarikan}
//       <b>Pesan:</b> {pesan || '-'}
//       <b>Waktu:</b> {datetime WIB}
//    b. WhatsApp Cloud API:
//       POST https://graph.facebook.com/v19.0/{WA_PHONE_NUMBER_ID}/messages
//       Authorization: Bearer {WA_ACCESS_TOKEN}
//       body: { messaging_product: 'whatsapp', to: WA_RECIPIENT_NUMBER, type: 'text', text: { body: formattedTextMessage } }
// 5. Log success/failure for each channel — do NOT throw (don't block lead save)
// 6. Return doc unchanged
```

### 13. `src/blocks/HeroBlock.ts`
```typescript
// Block: hero-block
// Fields:
// - eyebrow: text
// - headline: text — required
// - subheadline: textarea
// - backgroundImage: upload — relationTo: 'media'
// - ctaText: text
// - ctaLink: text
// - darkOverlay: checkbox — defaultValue: true
```

### 14. `src/blocks/FeatureBlock.ts`
```typescript
// Block: feature-block
// Fields:
// - title: text — required
// - subtitle: textarea
// - layout: select — options: ['grid-2', 'grid-3', 'list']
// - features: array
//   - icon: text (emoji)
//   - title: text
//   - description: textarea
```

### 15. `src/blocks/CTABlock.ts`
```typescript
// Block: cta-block
// Fields:
// - headline: text — required
// - subheadline: textarea
// - buttonText: text
// - buttonLink: text
// - variant: select — options: ['primary', 'secondary', 'outline']
// - backgroundColor: select — options: ['green', 'dark', 'light', 'gold']
```

### 16. `src/payload.config.ts`
```typescript
// Complete Payload v3 configuration:
// - db: postgresAdapter({ pool: { connectionString: process.env.DATABASE_URI } })
// - editor: lexicalEditor({})
// - collections: [Users, Media, Leads, Products, Pages]
// - globals: [SiteSettings, Navigation]
// - admin:
//   - user: Users.slug
//   - meta: { titleSuffix: '— Halgreen CMS', favicon: '/favicon.ico' }
// - cors: [process.env.FRONTEND_URL, 'https://halgreen.id', 'https://www.halgreen.id']
// - csrf: same as cors origins
// - upload: { limits: { fileSize: 5_000_000 } } // 5MB max
// - typescript: { outputFile: path.resolve(__dirname, 'payload-types.ts') }
// - graphQL: disabled (REST only, for simplicity)
//
// S3/R2 Storage plugin:
// - @payloadcms/storage-s3
// - bucket: process.env.S3_BUCKET
// - endpoint: process.env.S3_ENDPOINT (Cloudflare R2 endpoint)
// - region: 'auto'
// - credentials: { accessKeyId, secretAccessKey }
// - collections: { media: { prefix: 'halgreen-media' } }
```

### 17. `.env.example`
```env
# Database (Railway PostgreSQL)
DATABASE_URI=postgresql://postgres:password@host.railway.app:5432/halgreen_db

# Payload
PAYLOAD_SECRET=change_this_to_random_32_char_string
PAYLOAD_PUBLIC_SERVER_URL=https://cms.halgreen.id

# CORS — Frontend URL
FRONTEND_URL=https://halgreen.id

# Telegram Bot
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=

# WhatsApp Cloud API
WA_ACCESS_TOKEN=
WA_PHONE_NUMBER_ID=
WA_RECIPIENT_NUMBER=628xxxxxxxxxx

# Cloudflare R2 / S3 Storage
S3_BUCKET=halgreen-media
S3_ENDPOINT=https://xxxxxxxxxx.r2.cloudflarestorage.com
S3_REGION=auto
S3_ACCESS_KEY=
S3_SECRET_KEY=
```

### 18. `README.md`
Include:
- Project overview
- Prerequisites: Node 20+, pnpm, PostgreSQL
- Setup: clone → install → cp .env → migrate → dev
- How to create first admin user (payload create-first-user)
- Collections & Globals explanation
- API endpoints (REST): GET /api/pages, GET /api/products, POST /api/leads
- How to generate TypeScript types: pnpm generate:types
- Deployment to Railway (step by step)
- Media storage: Cloudflare R2 setup guide

---

## Additional Requirements
- All TypeScript — strict mode enabled
- Every collection must have proper access control — no collection should be accidentally public for write operations
- The `leads` collection create access MUST be public (unauthenticated) so the frontend form can POST without auth
- Use Payload v3 standalone mode — no custom Express server needed
- Admin UI customization: group collections in admin sidebar — Content (Pages, Products), CRM (Leads), Media, Settings (Users)
- Generate all files with complete, working TypeScript code
- No placeholder comments — every function must be fully implemented
- Include proper error handling in hooks and access functions
```