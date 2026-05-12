import type { GlobalConfig } from 'payload'
import {
  lexicalEditor,
  ParagraphFeature,
  UnorderedListFeature,
  OrderedListFeature,
} from '@payloadcms/richtext-lexical'
import { isAdminOrEditor } from '../access/isAdminOrEditor.ts'

export const CompanyProfile: GlobalConfig = {
  slug: 'company-profile',
  label: 'Profil Perusahaan',
  admin: {
    group: 'Profil Perusahaan',
  },
  access: {
    read: () => true,
    update: isAdminOrEditor,
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      required: true,
      defaultValue: 'LMS',
      label: 'Nama Situs / Brand',
    },
    {
      name: 'tagline',
      type: 'text',
      label: 'Tagline',
      admin: {
        description: 'Ditampilkan di hero dan footer',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Deskripsi Singkat Perusahaan',
      admin: {
        description: 'Untuk meta description default dan About section',
      },
    },
    {
      name: 'vision',
      type: 'textarea',
      label: 'Visi Perusahaan',
    },
    {
      name: 'mission',
      type: 'richText',
      label: 'Misi Perusahaan',
      editor: lexicalEditor({
        features: [
          ParagraphFeature(),
          UnorderedListFeature(),
          OrderedListFeature(),
        ],
      }),
    },
    {
      name: 'foundedYear',
      type: 'number',
      label: 'Tahun Berdiri',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo Perusahaan',
    },
    {
      name: 'logoDark',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo Versi Gelap (opsional)',
    },
    {
      name: 'favicon',
      type: 'upload',
      relationTo: 'media',
      label: 'Favicon',
    },
    {
      name: 'defaultOgImage',
      type: 'upload',
      relationTo: 'media',
      label: 'OG Image Default (1200×630px)',
    },
    {
      name: 'overviewHighlights',
      type: 'array',
      label: 'Highlight Profil Perusahaan',
      admin: {
        description: 'Dipakai untuk poin-poin ringkas di section company profile.',
      },
      maxRows: 6,
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          label: 'Teks Highlight',
        },
      ],
    },
    {
      name: 'footerDescription',
      type: 'textarea',
      label: 'Deskripsi Footer',
      admin: {
        description: 'Ringkasan perusahaan yang ditampilkan di area footer.',
      },
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Media Sosial',
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          label: 'Platform',
          options: [
            { label: 'Instagram', value: 'instagram' },
            { label: 'Facebook', value: 'facebook' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'TikTok', value: 'tiktok' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'Twitter/X', value: 'twitter' },
            { label: 'WhatsApp', value: 'whatsapp' },
          ],
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          label: 'URL',
        },
      ],
    },
  ],
}
