# lms-cms — Backend CMS untuk LMS Landing Page

Backend headless CMS berbasis **Payload CMS v3** + **PostgreSQL** untuk website company profile perusahaan manufaktur plastik/packaging Indonesia.

---

## Tech Stack

- **Payload CMS v3** — standalone mode (tanpa Express custom)
- **TypeScript** — strict mode
- **PostgreSQL** — via `@payloadcms/db-postgres`
- **Cloudflare R2** — optional media storage via `@payloadcms/storage-s3`
- **Docker** — untuk deployment via Dokploy

---

## Persiapan Lokal

### 1. Clone dan setup environment

```bash
git clone <repo-url> lms-cms
cd lms-cms
cp .env.example .env
# Edit .env — isi semua variabel yang diperlukan
```

### 2. Jalankan PostgreSQL lokal

```bash
docker compose up -d db
# Tunggu hingga healthy
```

### 3. Install dependencies

```bash
pnpm install
```

### 4. Jalankan migrasi database

```bash
pnpm migrate
```

### 5. Jalankan CMS dalam mode development

```bash
pnpm dev
# CMS berjalan di http://localhost:3001
```

### 6. Buat admin user pertama

Buka `http://localhost:3001/admin` → isi form pembuatan user pertama.

---

## Generate TypeScript Types

```bash
pnpm generate:types
# Output: src/payload-types.ts
# File ini bisa di-share ke repo frontend jika diperlukan
```

---

## REST API Endpoints

### Collections

```
GET  /api/posts                              ← daftar artikel (published only untuk publik)
GET  /api/posts?where[slug][equals]=xxx      ← cari by slug
GET  /api/posts?where[category][equals]=xxx  ← filter by kategori
GET  /api/projects                           ← daftar proyek
GET  /api/testimonials                       ← daftar testimoni
GET  /api/team                               ← daftar anggota tim
GET  /api/certifications                     ← daftar sertifikasi
GET  /api/industries                         ← daftar industri yang dilayani
GET  /api/innovations                        ← daftar inovasi
```

### Globals

```
GET  /api/globals/company-profile            ← profil perusahaan
GET  /api/globals/brand-promise              ← brand promise / keunggulan
GET  /api/globals/contact                    ← informasi kontak
GET  /api/globals/locations                  ← daftar lokasi
GET  /api/globals/stats                      ← statistik perusahaan
GET  /api/globals/production-process         ← tahapan proses produksi
```

### Query Parameters Umum

```
?limit=10          ← jumlah hasil per halaman (default: 10)
?page=2            ← halaman ke-N
?sort=order        ← urut berdasarkan field (prefix - untuk descending)
?sort=-publishedAt ← urut publishedAt terbaru dulu
?where[isPublished][equals]=true  ← filter
&depth=1           ← populate relasi (default: 1)
```

---

## Collections & Globals

### Collections (data individual)

| Slug | Label | Keterangan |
|------|-------|-----------|
| `posts` | Artikel Blog | Artikel dengan Lexical rich text |
| `projects` | Proyek | Portofolio proyek perusahaan |
| `testimonials` | Testimoni | Ulasan dari klien |
| `team` | Anggota Tim | Profil anggota tim |
| `certifications` | Sertifikasi | ISO, SNI, Halal, dll |
| `industries` | Industri | Sektor industri yang dilayani |
| `innovations` | Inovasi | Inovasi dan teknologi perusahaan |
| `media` | Media | Upload gambar/file |
| `users` | Pengguna | Admin dan editor CMS |

### Globals (data tunggal)

| Slug | Label | Keterangan |
|------|-------|-----------|
| `company-profile` | Profil Perusahaan | Nama, logo, visi, misi, sosmed |
| `brand-promise` | Brand Promise | Keunggulan/nilai perusahaan |
| `contact` | Kontak | Email, WA, alamat, jam operasi |
| `locations` | Lokasi | Daftar cabang/kantor |
| `stats` | Statistik | Angka-angka pencapaian |
| `production-process` | Proses Produksi | Tahapan produksi |

---

## Deploy ke Dokploy

1. Push repo ke GitHub
2. Di Dokploy: **New Application** → connect repo `lms-cms` → build type: **Dockerfile**
3. Di Dokploy: **New Database** → PostgreSQL → copy connection string
4. Di Dokploy: Set environment variables:
   - `DATABASE_URI` — dari langkah 3
   - `PAYLOAD_SECRET` — string random min. 32 karakter
   - `PAYLOAD_PUBLIC_SERVER_URL` — domain CMS (mis. `https://cms.namaproject.id`)
   - `CORS_ORIGINS` — domain frontend (mis. `https://namaproject.id`)
   - `FRONTEND_URL` - domain frontend (mis. `https://namaproject.id`)
   - `FRONTEND_REVALIDATE_URL` - endpoint revalidate frontend (mis. `https://namaproject.id/api/revalidate`)
   - `REVALIDATE_SECRET` - secret yang sama dengan repo `lms-landing-page`
   - `USE_S3_STORAGE` — set `true` hanya kalau ingin pakai bucket R2/S3
   - `S3_*` — konfigurasi Cloudflare R2, dipakai hanya jika `USE_S3_STORAGE=true`
5. Set domain: `cms.namaproject.id` → Dokploy otomatis setup SSL
6. Deploy → tunggu build selesai
7. Buka `cms.namaproject.id/admin` → buat admin user pertama

---

## Cloudflare R2 Setup

1. Buat bucket baru di [Cloudflare R2 Dashboard](https://dash.cloudflare.com/)
2. Buat API Token dengan permission: **Object Read & Write**
3. Aktifkan **Custom Domain** pada bucket (mis. `media.namaproject.id`)
4. Isi environment variables:
   ```env
   USE_S3_STORAGE=true
   S3_BUCKET=nama-bucket
   S3_ENDPOINT=https://ACCOUNT_ID.r2.cloudflarestorage.com
   S3_REGION=auto
   S3_ACCESS_KEY=<access_key_id>
   S3_SECRET_KEY=<secret_access_key>
   S3_PUBLIC_URL=https://media.namaproject.id
   ```

---

## Scripts

```bash
pnpm dev              # Development server
pnpm build            # Production build
pnpm start            # Start production server
pnpm generate:types   # Generate TypeScript types
pnpm migrate          # Jalankan migrasi database
pnpm migrate:create   # Buat file migrasi baru
pnpm seed             # Seed dummy content ke Payload CMS (globals, collections, dan media lokal)
```

---

## Sinkronisasi ke Frontend

CMS akan otomatis memanggil endpoint revalidate di repo `lms-landing-page` setelah data publik berubah.

Flow:

1. Editor menyimpan data di Payload CMS.
2. Hook di `src/hooks/revalidateFrontend.ts` menentukan route frontend yang terdampak.
3. CMS mengirim `POST` ke `FRONTEND_REVALIDATE_URL`.
4. Frontend menjalankan `revalidatePath()` untuk route tersebut.

Environment yang wajib sinkron:

```env
# lms-cms
FRONTEND_URL=https://namaproject.id
FRONTEND_REVALIDATE_URL=https://namaproject.id/api/revalidate
REVALIDATE_SECRET=isi_secret_yang_sama
```
# lms-cms
