import type { GlobalConfig } from 'payload'
import { isAdminOrEditor } from '../access/isAdminOrEditor.ts'

export const ProgramMitra: GlobalConfig = {
  slug: 'program-mitra',
  label: 'Program Mitra',
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
      defaultValue: 'Program Mitra',
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
      defaultValue: 'Kemitraan strategis',
    },
    {
      name: 'valueTitle',
      type: 'text',
      label: 'Judul Nilai',
      defaultValue: 'Kenapa program ini ada',
    },
    {
      name: 'valueDescription',
      type: 'textarea',
      label: 'Deskripsi Nilai',
    },
    {
      name: 'valuePoints',
      type: 'array',
      label: 'Poin Nilai',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Judul',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Deskripsi',
        },
      ],
    },
    {
      name: 'processTitle',
      type: 'text',
      label: 'Judul Proses',
      defaultValue: 'Bagaimana program berjalan',
    },
    {
      name: 'processDescription',
      type: 'textarea',
      label: 'Deskripsi Proses',
    },
    {
      name: 'steps',
      type: 'array',
      label: 'Langkah Program',
      fields: [
        {
          name: 'step',
          type: 'text',
          required: true,
          label: 'Nomor Langkah',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Judul Langkah',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Deskripsi',
        },
      ],
    },
    {
      name: 'ctaLabel',
      type: 'text',
      label: 'Teks CTA',
      defaultValue: 'Ajukan kemitraan',
    },
    {
      name: 'ctaHref',
      type: 'text',
      label: 'Link CTA',
      defaultValue: '/kontak',
    },
    // ─── FAQ ─────────────────────────────────────────────────────────────────
    {
      name: 'faqTitle',
      type: 'text',
      label: 'Judul FAQ',
      defaultValue: 'Pertanyaan Umum',
    },
    {
      name: 'faqs',
      type: 'array',
      label: 'FAQ Program MOP',
      admin: {
        description: 'Pertanyaan umum seputar Program MOP.',
      },
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
          label: 'Pertanyaan',
        },
        {
          name: 'answer',
          type: 'textarea',
          required: true,
          label: 'Jawaban',
        },
      ],
    },
  ],
}
