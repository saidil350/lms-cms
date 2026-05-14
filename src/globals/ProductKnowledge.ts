import type { GlobalConfig } from 'payload'
import { isAdminOrEditor } from '../access/isAdminOrEditor.ts'

export const ProductKnowledge: GlobalConfig = {
  slug: 'product-knowledge',
  label: 'Pengetahuan Produk',
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
      label: 'Label Section',
      defaultValue: 'Pengetahuan Produk',
    },
    {
      name: 'headline',
      type: 'text',
      required: true,
      label: 'Judul Utama',
    },
    {
      name: 'subheadline',
      type: 'textarea',
      label: 'Subjudul',
    },
    {
      name: 'introLabel',
      type: 'text',
      label: 'Label Intro',
      defaultValue: 'Insight yang relevan',
    },
    {
      name: 'topicsTitle',
      type: 'text',
      label: 'Judul Topik',
      defaultValue: 'Topik utama',
    },
    {
      name: 'topicsDescription',
      type: 'textarea',
      label: 'Deskripsi Topik',
    },
    {
      name: 'topics',
      type: 'array',
      label: 'Topik Utama',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Judul Topik',
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
          label: 'Nama Ikon',
          admin: {
            description: 'Contoh: ShieldCheck, Users, Truck',
          },
        },
      ],
    },
    {
      name: 'ctaLabel',
      type: 'text',
      label: 'Teks CTA',
      defaultValue: 'Hubungi tim',
    },
    {
      name: 'ctaHref',
      type: 'text',
      label: 'Link CTA',
      defaultValue: '/kontak',
    },
  ],
}
