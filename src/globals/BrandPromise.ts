import type { GlobalConfig } from 'payload'
import { isAdminOrEditor } from '../access/isAdminOrEditor'

export const BrandPromise: GlobalConfig = {
  slug: 'brand-promise',
  label: 'Brand Promise',
  admin: {
    group: 'Konten Halaman',
  },
  access: {
    read: () => true,
    update: isAdminOrEditor,
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Label Kecil Section',
      defaultValue: 'Brand Promise',
    },
    {
      name: 'headline',
      type: 'text',
      required: true,
      label: 'Judul Section',
    },
    {
      name: 'subheadline',
      type: 'textarea',
      label: 'Subjudul',
    },
    {
      name: 'visionPoints',
      type: 'array',
      label: 'Poin Sorotan Visi',
      maxRows: 6,
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          label: 'Teks Poin',
        },
      ],
    },
    {
      name: 'valuesTitle',
      type: 'text',
      label: 'Judul Blok Nilai',
      defaultValue: 'Nilai Inti',
    },
    {
      name: 'missionTitle',
      type: 'text',
      label: 'Judul Blok Misi',
      defaultValue: 'Misi Perusahaan',
    },
    {
      name: 'items',
      type: 'array',
      label: 'Poin-poin Keunggulan',
      minRows: 1,
      maxRows: 8,
      fields: [
        {
          name: 'icon',
          type: 'text',
          label: 'Nama Ikon/GIF',
          admin: {
            description: 'Nama file dari icon-animated/ atau emoji',
          },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Judul Keunggulan',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Deskripsi',
        },
      ],
    },
  ],
}
