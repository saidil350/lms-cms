import type { GlobalConfig } from 'payload'
import { isAdminOrEditor } from '../access/isAdminOrEditor.ts'

export const KeunggulanHalgreen: GlobalConfig = {
  slug: 'keunggulan-halgreen',
  label: 'Keunggulan Halgreen',
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
      defaultValue: 'Keunggulan',
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
    // ─── Standar Halgreen ─────────────────────────────────────────────────────
    {
      name: 'standarTitle',
      type: 'text',
      label: 'Judul Standar Halgreen',
      defaultValue: 'Standar Halgreen™',
    },
    {
      name: 'standarPoints',
      type: 'array',
      label: 'Poin Standar Halgreen',
      admin: {
        description: 'Contoh: Produksi Terukur, Bersih & Transparan, Kepatuhan Syariat, Minim Retur',
      },
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          label: 'Teks Poin',
        },
      ],
    },
    // ─── Functional Benefits ──────────────────────────────────────────────────
    {
      name: 'functionalTitle',
      type: 'text',
      label: 'Judul Functional Benefit',
      defaultValue: 'Benefit Fungsional',
    },
    {
      name: 'functionalBenefits',
      type: 'array',
      label: 'Daftar Benefit Fungsional',
      admin: {
        description: 'Keunggulan operasional yang langsung dirasakan mitra.',
      },
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
        {
          name: 'icon',
          type: 'text',
          label: 'Nama Ikon',
          admin: {
            description: 'Contoh: Shield, Truck, Headphones, Settings, Package',
          },
        },
      ],
    },
    // ─── Emotional Benefits ───────────────────────────────────────────────────
    {
      name: 'emotionalTitle',
      type: 'text',
      label: 'Judul Emotional Benefit',
      defaultValue: 'Benefit Emosional',
    },
    {
      name: 'emotionalBenefits',
      type: 'array',
      label: 'Daftar Benefit Emosional',
      admin: {
        description: 'Rasa tenang dan keyakinan yang didapat dari kemitraan.',
      },
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
          label: 'Deskripsi',
        },
        {
          name: 'icon',
          type: 'text',
          label: 'Nama Ikon',
          admin: {
            description: 'Contoh: ShieldCheck, Heart, Star, TrendingUp, Sparkles',
          },
        },
      ],
    },
    // ─── Brand Pyramid ────────────────────────────────────────────────────────
    {
      name: 'pyramidTitle',
      type: 'text',
      label: 'Judul Brand Pyramid',
      defaultValue: 'Piramida Brand',
    },
    {
      name: 'pyramidDescription',
      type: 'textarea',
      label: 'Deskripsi Brand Pyramid',
    },
    {
      name: 'pyramidLevels',
      type: 'array',
      label: 'Tingkat Piramida',
      admin: {
        description: 'Urutan: apex (atas) → identity → relevance → presence (bawah)',
      },
      fields: [
        {
          name: 'level',
          type: 'select',
          required: true,
          label: 'Tingkat',
          options: [
            { label: 'Apex (Puncak)', value: 'apex' },
            { label: 'Identity (Identitas)', value: 'identity' },
            { label: 'Relevance (Relevansi)', value: 'relevance' },
            { label: 'Presence (Kehadiran)', value: 'presence' },
          ],
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Judul',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Deskripsi',
        },
        {
          name: 'icon',
          type: 'text',
          label: 'Nama Ikon',
          admin: {
            description: 'Contoh: Sparkles, Eye, Target, Zap',
          },
        },
      ],
    },
    // ─── CTA ─────────────────────────────────────────────────────────────────
    {
      name: 'ctaLabel',
      type: 'text',
      label: 'Teks CTA',
      defaultValue: 'Mulai Kemitraan',
    },
    {
      name: 'ctaHref',
      type: 'text',
      label: 'Link CTA',
      defaultValue: '/kontak',
    },
  ],
}