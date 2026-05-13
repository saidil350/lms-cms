import type { GlobalConfig } from 'payload'
import { isAdminOrEditor } from '../access/isAdminOrEditor.ts'

export const HomepageHero: GlobalConfig = {
  slug: 'homepage-hero',
  label: 'Homepage Hero',
  admin: {
    group: 'Konten Halaman',
  },
  access: {
    read: () => true,
    update: isAdminOrEditor,
  },
  fields: [
    {
      name: 'titlePrimary',
      type: 'text',
      required: true,
      label: 'Judul Utama',
      defaultValue: 'MRS Solusi Kemasan',
    },
    {
      name: 'titleSecondary',
      type: 'text',
      label: 'Judul Sekunder',
      defaultValue: 'yang Amanah Bersama Industri',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Deskripsi Hero',
    },
    {
      name: 'primaryCtaLabel',
      type: 'text',
      label: 'Teks Tombol Utama',
      defaultValue: 'Jelajahi Kapabilitas',
    },
    {
      name: 'primaryCtaHref',
      type: 'text',
      label: 'Link Tombol Utama',
      defaultValue: '#keahlian',
    },
    {
      name: 'secondaryCtaLabel',
      type: 'text',
      label: 'Teks Tombol Sekunder',
      defaultValue: 'Profil Perusahaan',
    },
    {
      name: 'secondaryCtaHref',
      type: 'text',
      label: 'Link Tombol Sekunder',
      defaultValue: '#company-profile',
    },
    {
      name: 'mediaType',
      type: 'select',
      label: 'Tipe Media Hero',
      defaultValue: 'video',
      options: [
        { label: 'Video', value: 'video' },
        { label: 'Gambar', value: 'image' },
      ],
    },
    {
      name: 'backgroundVideoUrl',
      type: 'text',
      label: 'URL Video Hero',
      admin: {
        description: 'Jika memakai video lokal/CDN, isi URL langsung di sini.',
      },
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Gambar Hero Utama',
    },
    {
      name: 'posterImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Poster Video Hero',
    },
    {
      name: 'supportImages',
      type: 'array',
      label: 'Gambar Kolase Pendukung',
      maxRows: 6,
      admin: {
        description: 'Gambar-gambar ini mengisi kolase pada hero halaman awal di landing page.',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Gambar',
        },
        {
          name: 'alt',
          type: 'text',
          label: 'Alt Text',
        },
        {
          name: 'objectPosition',
          type: 'text',
          label: 'Object Position',
          admin: {
            description: 'Contoh: 56% center',
          },
        },
      ],
    },
  ],
}
