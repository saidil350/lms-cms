import type { GlobalConfig } from 'payload'
import { isAdminOrEditor } from '../access/isAdminOrEditor.ts'

export const Stats: GlobalConfig = {
  slug: 'stats',
  label: 'Statistik Perusahaan',
  admin: {
    group: 'Konten Halaman',
  },
  access: {
    read: () => true,
    update: isAdminOrEditor,
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      label: 'Statistik',
      minRows: 1,
      maxRows: 8,
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
          label: 'Nilai',
          admin: {
            description: 'Contoh: 500, 15, 98',
          },
        },
        {
          name: 'suffix',
          type: 'text',
          label: 'Suffix',
          admin: {
            description: 'Contoh: +, %, Ton/Hari',
          },
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Keterangan',
          admin: {
            description: 'Contoh: Klien Aktif, Tahun Pengalaman',
          },
        },
        {
          name: 'icon',
          type: 'text',
          label: 'Emoji atau ikon',
        },
      ],
    },
  ],
}
