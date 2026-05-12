import type { CollectionConfig } from 'payload'
import { isAdminOrEditor } from '../access/isAdminOrEditor.ts'

export const Team: CollectionConfig = {
  slug: 'team',
  labels: {
    singular: 'Anggota Tim',
    plural: 'Anggota Tim',
  },
  admin: {
    useAsTitle: 'name',
    group: 'Konten',
    defaultColumns: ['name', 'role', 'isPublished', 'order'],
  },
  access: {
    read: ({ req }) => {
      if (req.user) return true
      return { isPublished: { equals: true } }
    },
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nama Lengkap',
    },
    {
      name: 'role',
      type: 'text',
      required: true,
      label: 'Jabatan',
    },
    {
      name: 'bio',
      type: 'textarea',
      label: 'Biografi Singkat',
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      label: 'Foto',
    },
    {
      name: 'linkedIn',
      type: 'text',
      label: 'URL LinkedIn',
      admin: {
        description: 'Contoh: https://linkedin.com/in/username',
      },
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email (opsional, tidak ditampilkan publik)',
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
