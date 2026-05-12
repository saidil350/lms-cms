import type { GlobalConfig } from 'payload'
import { isAdminOrEditor } from '../access/isAdminOrEditor.ts'

export const ProductionProcess: GlobalConfig = {
  slug: 'production-process',
  label: 'Proses Produksi',
  admin: {
    group: 'Konten Halaman',
  },
  access: {
    read: () => true,
    update: isAdminOrEditor,
  },
  fields: [
    {
      name: 'headline',
      type: 'text',
      label: 'Judul Section',
      defaultValue: 'Proses Produksi Kami',
    },
    {
      name: 'introDescription',
      type: 'textarea',
      label: 'Deskripsi Pengantar',
    },
    {
      name: 'ctaLabel',
      type: 'text',
      label: 'Teks Tombol CTA',
      defaultValue: 'Lihat Profil Operasional',
    },
    {
      name: 'ctaHref',
      type: 'text',
      label: 'Link Tombol CTA',
      defaultValue: '/tentang-kami',
    },
    {
      name: 'stages',
      type: 'array',
      label: 'Tahapan Produksi',
      minRows: 1,
      fields: [
        {
          name: 'step',
          type: 'number',
          required: true,
          label: 'Nomor Tahap',
          admin: { step: 1 },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Nama Tahap',
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
          label: 'Nama Ikon/GIF',
          admin: {
            description: 'Nama file dari icon-animated/ atau emoji',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Gambar (opsional)',
        },
      ],
    },
  ],
}
