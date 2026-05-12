import type { CollectionConfig } from 'payload'
import { isAdminOrEditor } from '../access/isAdminOrEditor.ts'

export const Industries: CollectionConfig = {
  slug: 'industries',
  labels: {
    singular: 'Industri',
    plural: 'Industri yang Dilayani',
  },
  admin: {
    useAsTitle: 'name',
    group: 'Konten',
    defaultColumns: ['name', 'isPublished', 'order'],
  },
  access: {
    read: () => true, // publik bisa baca
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nama Industri',
      admin: {
        description: 'Contoh: Food & Beverage, Farmasi, Kosmetik',
      },
    },
    {
      name: 'icon',
      type: 'text',
      label: 'Nama Ikon (GIF/animasi)',
      admin: {
        description: 'Nama file dari folder public/icon-animated/ tanpa ekstensi',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Gambar Industri',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Deskripsi',
    },
    {
      name: 'expertiseSummary',
      type: 'textarea',
      label: 'Ringkasan Expertise',
      admin: {
        description: 'Versi singkat yang cocok untuk card ringkas seperti section expertise.',
      },
    },
    {
      name: 'applications',
      type: 'array',
      label: 'Aplikasi / Use Cases',
      maxRows: 8,
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          label: 'Nama Aplikasi',
        },
      ],
    },
    {
      name: 'isPublished',
      type: 'checkbox',
      defaultValue: true,
      label: 'Tampilkan di Website',
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      label: 'Urutan Tampil',
    },
  ],
}
