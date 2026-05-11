import type { CollectionConfig } from 'payload'
import { isAdminOrEditor } from '../access/isAdminOrEditor'

export const Innovations: CollectionConfig = {
  slug: 'innovations',
  labels: {
    singular: 'Inovasi',
    plural: 'Inovasi',
  },
  admin: {
    useAsTitle: 'title',
    group: 'Konten',
    defaultColumns: ['title', 'isPublished', 'order'],
  },
  access: {
    read: () => true, // publik bisa baca
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Judul Inovasi',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Deskripsi',
    },
    {
      name: 'icon',
      type: 'text',
      label: 'Emoji atau nama ikon',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Gambar',
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Tag / Sorotan',
      maxRows: 6,
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          label: 'Teks Tag',
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
