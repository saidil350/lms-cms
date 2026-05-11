import type { CollectionConfig } from 'payload'
import { isAdminOrEditor } from '../access/isAdminOrEditor'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    mimeTypes: [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/svg+xml',
      'image/gif',
      'application/pdf',
    ],
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 800,
        height: 600,
        position: 'centre',
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        position: 'centre',
      },
    ],
  },
  admin: {
    useAsTitle: 'filename',
    group: 'Media',
  },
  access: {
    read: () => true, // semua bisa baca media
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Teks Alternatif (Alt Text)',
      admin: {
        description: 'Penting untuk aksesibilitas dan SEO',
      },
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Keterangan Gambar',
    },
  ],
}
