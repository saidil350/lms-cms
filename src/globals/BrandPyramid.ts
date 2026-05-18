import { GlobalConfig } from 'payload'

export const BrandPyramid: GlobalConfig = {
  slug: 'brand-pyramid',
  label: 'Brand Essentials | Why MRS?',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      required: true,
      defaultValue: 'Fondasi Kemitraan MRS',
    },
    {
      name: 'headline',
      type: 'text',
      required: true,
      defaultValue: 'Halgreen™ | Quality | Total Support (MOP)',
    },
    {
      name: 'subheadline',
      type: 'textarea',
      required: true,
      defaultValue: 'Piramida Brand MRS mencerminkan fondasi kokoh menuju kemitraan yang membawa keberkahan.',
    },
    {
      name: 'levels',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'levelName',
          type: 'text',
          required: true,
        },
        {
          name: 'content',
          type: 'textarea',
          required: true,
        },
      ],
      defaultValue: [
        {
          levelName: 'VALUES',
          content: 'Wasilah kemakmuran & keberkahan; kemitraan jangka panjang yang adil & transparan; pertumbuhan bersama selaras prinsip Islam.',
        },
        {
          levelName: 'EMOTIONAL BENEFIT',
          content: 'Rasa aman, ketenangan hati, keyakinan bertumbuh, dan perasaan dihargai sebagai mitra strategis.',
        },
        {
          levelName: 'FUNCTIONAL BENEFIT',
          content: 'Kualitas tangguh, total support, rantai distribusi lancar, minim komplain, respons cepat, dan kepastian stok.',
        },
        {
          levelName: 'KEY ATTRIBUTES',
          content: 'Konsistensi Halgreen™ · Proses bisnis transparan · Total Support · Program MOP · Tim komunikatif',
        },
      ],
    },
  ],
}
