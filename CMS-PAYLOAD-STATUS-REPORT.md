# CMS Payload Status Report

Dokumen ini merangkum status proyek `lms-cms`, apa yang sudah selesai, apa yang masih kurang, dan tahapan lanjutan yang sebaiknya dikerjakan berikutnya.

## Ringkasan Singkat

- CMS sudah bisa dibuka di `/admin`.
- Build project sudah berhasil.
- Database lokal sudah dikonfigurasi ke PostgreSQL.
- Schema collection dan globals sudah tersedia.
- Hook revalidate ke frontend sudah ada.
- Masih ada beberapa tahap yang belum tuntas, terutama seed data, flow auth lengkap, verifikasi DB end-to-end, dan finalisasi integrasi frontend.

## Status Umum

| Area | Status | Catatan |
|---|---:|---|
| Core CMS | Selesai | Admin panel, route API, dan schema dasar sudah ada |
| Database lokal | Sebagian | Koneksi sudah ada, verifikasi isi data masih perlu dilakukan |
| Admin panel | Sebagian | Layout runtime sudah diperbaiki, perlu uji login dan CRUD penuh |
| User/Auth | Belum selesai | Belum ada register publik, email adapter belum aktif |
| Seed data | Belum selesai | Script seed masih belum benar-benar beres |
| Sinkronisasi frontend | Sebagian | Hook ada, endpoint frontend tetap harus diuji |
| Media storage | Sebagian | Konfigurasi S3/R2 ada, perlu uji upload sungguhan |
| Deploy produksi | Belum selesai | Environment final dan smoke test production masih perlu |

## Yang Sudah Selesai

### 1. CMS Core

- Route admin ada di `/admin`.
- Route API Payload ada di `/api/[...slug]`.
- Collection dan global schema sudah dibuat.
- Build project sudah lolos.

### 2. Konfigurasi Database Lokal

- `DATABASE_URI` sudah mengarah ke PostgreSQL lokal.
- Docker Compose untuk Postgres sudah tersedia.
- Mode lokal diarahkan ke `lms_cms`.

### 3. Integrasi Admin Payload

- Layout admin sudah disesuaikan agar sesuai pola Payload.
- `importMap` admin sudah terisi.
- Error compile yang sempat muncul di admin sudah teratasi.

### 4. Hook Sinkronisasi

- Hook revalidate frontend sudah tersedia.
- Route yang terdampak sudah dipetakan berdasarkan collection/global.

## Yang Belum Selesai

### 1. Seed Data Awal

Masalah yang terlihat:

- Script `seed` masih mengarah ke `src/seed.ts`.
- Dari isi repo, file `src/seed.ts` belum ada.

Kenapa ini penting:

- Tanpa seed yang valid, CMS baru tidak punya data awal.
- Kamu harus input manual atau membuat seed baru dari nol.

Tahap berikutnya:

- Tentukan apakah seed akan dibuat di repo ini atau dipindahkan dari repo lain.
- Pastikan script `seed` benar-benar menjalankan file yang ada.

### 2. Flow Auth dan User

Masalah yang terlihat:

- Koleksi `users` sudah ada.
- Access create dibatasi admin.
- Belum ada register publik.
- Email adapter belum aktif.

Kenapa ini penting:

- User baru tidak bisa daftar sendiri lewat halaman publik.
- Reset password dan verifikasi email belum berjalan penuh jika email adapter belum disiapkan.

Tahap berikutnya:

- Tentukan apakah user dibuat hanya lewat admin panel atau perlu halaman register.
- Aktifkan email adapter jika butuh verifikasi dan reset password.

### 3. Verifikasi Edit ke Database

Masalah yang perlu dipastikan:

- Edit di dashboard harus benar-benar tersimpan ke PostgreSQL lokal.
- Hook revalidate tidak boleh membuat kesan data tersimpan padahal belum masuk DB.

Tahap berikutnya:

- Edit satu field di admin.
- Cek langsung data di database lokal.
- Pastikan perubahan muncul di tabel yang sesuai.

### 4. Sinkronisasi Frontend

Masalah yang perlu diuji:

- Hook revalidate sudah ada, tetapi endpoint frontend harus benar-benar menerima request.
- Route frontend yang di-revalidate harus sesuai dengan halaman yang memakai data CMS.

Tahap berikutnya:

- Uji POST dari CMS ke endpoint revalidate frontend.
- Pastikan perubahan CMS memicu update di website frontend.
- Cek apakah semua field yang dibutuhkan frontend memang sudah ada di schema CMS.

### 5. Media Storage

Masalah yang perlu diuji:

- Konfigurasi S3/R2 sudah ada.
- Credential dan URL publik harus benar-benar valid.
- Upload file harus dicoba end-to-end.

Tahap berikutnya:

- Upload file dari admin.
- Pastikan file tersimpan.
- Pastikan URL publik file bisa dibuka kembali.

### 6. Deploy Produksi

Masalah yang perlu disiapkan:

- `PAYLOAD_SECRET` harus final dan aman.
- `PAYLOAD_PUBLIC_SERVER_URL` harus sesuai domain produksi.
- `CORS_ORIGINS`, `FRONTEND_URL`, dan `FRONTEND_REVALIDATE_URL` harus sinkron.
- `REVALIDATE_SECRET` harus sama dengan frontend.

Tahap berikutnya:

- Finalisasi environment production.
- Jalankan build production.
- Uji deploy staging atau production.

## Checklist Tahapan Lanjutan

### Prioritas Tinggi

- [ ] Benarkan seed data awal
- [ ] Uji edit admin masuk ke DB lokal
- [ ] Uji login admin dari awal sampai dashboard terbuka
- [ ] Uji CRUD pada collection utama
- [ ] Aktifkan atau pastikan flow auth yang dibutuhkan

### Prioritas Menengah

- [ ] Uji endpoint revalidate frontend
- [ ] Uji sinkronisasi data CMS ke frontend
- [ ] Uji upload media
- [ ] Rapikan form admin yang terlalu panjang

### Prioritas Produksi

- [ ] Finalisasi environment produksi
- [ ] Uji build production
- [ ] Uji deploy staging/production
- [ ] Uji smoke test setelah deploy

## Urutan Kerja yang Disarankan

### Tahap 1: Pastikan Data Benar-Benar Masuk DB

Fokus:

- Edit satu field di admin.
- Cek apakah perubahan muncul di database lokal.
- Pastikan ini konsisten untuk collection dan globals.

### Tahap 2: Bereskan Seed

Fokus:

- Perbaiki script seed.
- Tentukan sumber data awal.
- Pastikan seed bisa dijalankan ulang saat setup lokal baru.

### Tahap 3: Rapikan User/Auth

Fokus:

- Putuskan apakah ada register publik.
- Jika ada, buat flow yang aman.
- Jika tidak, pastikan admin/user management jelas.

### Tahap 4: Uji Integrasi Frontend

Fokus:

- Revalidate berjalan.
- Frontend membaca data CMS.
- Perubahan dari admin muncul di halaman publik.

### Tahap 5: Siapkan Produksi

Fokus:

- Secret dan URL final.
- Upload media production.
- Build dan deploy production tanpa error.

## Catatan Penting

- CMS ini adalah backend, jadi tidak semua hal yang terlihat di admin harus punya tampilan publik langsung.
- Hook revalidate hanya tugasnya memberi tahu frontend, bukan menyimpan data.
- Kalau ada perubahan yang tidak muncul di website, masalahnya bisa ada di frontend, endpoint revalidate, atau schema yang belum sinkron.

## Kesimpulan

Status proyek saat ini sudah cukup kuat di level fondasi:

- core CMS sudah jalan
- database lokal sudah disiapkan
- admin panel sudah pulih

Tetapi proyek ini masih belum bisa disebut selesai penuh karena:

- seed data belum beres
- flow auth belum lengkap
- verifikasi DB end-to-end belum dilakukan
- sinkronisasi frontend belum diuji penuh
- environment produksi belum difinalisasi

Jika kamu mau, langkah paling aman setelah ini adalah fokus ke:

1. verifikasi edit admin masuk ke DB lokal
2. bereskan seed data
3. uji sinkronisasi ke frontend
