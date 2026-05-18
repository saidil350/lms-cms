import { GlobalConfig } from 'payload'

export const CTA: GlobalConfig = {
  slug: 'cta',
  label: 'Wasilah Kemakmuran & Keberkahan Bisnis',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'headline',
      type: 'text',
      required: true,
      defaultValue: 'Wasilah Kemakmuran & Keberkahan Bisnis Anda',
    },
    {
      name: 'bodyText',
      type: 'textarea',
      required: true,
      defaultValue: 'Dengan izin Allah, kami siap menjadi bagian dari perjalanan pertumbuhan bisnis Anda. Mari bertumbuh bersama, naik kelas bersama, dan meraih keberkahan bersama melalui kemitraan yang strategis.',
    },
    {
      name: 'primaryCta',
      type: 'group',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          defaultValue: 'Hubungi Kami Sekarang',
        },
        {
          name: 'href',
          type: 'text',
          required: true,
          defaultValue: '/kontak',
          admin: {
            description: 'URL atau path untuk primary CTA button',
          },
        },
      ],
    },
    {
      name: 'secondaryCta',
      type: 'group',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          defaultValue: 'Daftar Program MOP',
        },
        {
          name: 'href',
          type: 'text',
          required: true,
          defaultValue: '/program-mitra',
          admin: {
            description: 'URL atau path untuk secondary CTA button',
          },
        },
      ],
    },
    {
      name: 'contactInfo',
      type: 'group',
      fields: [
        {
          name: 'companyName',
          type: 'text',
          required: true,
          defaultValue: 'Makmur Raya Sejahtera (MRS)',
        },
        {
          name: 'tagline',
          type: 'text',
          required: true,
          defaultValue: 'Provider Kemasan Plastik Halgreen™ | Program Mitra MOP',
        },
        {
          name: 'whatsapp',
          type: 'text',
          required: false,
          admin: {
            description: 'Nomor WhatsApp dengan format kode negara (contoh: 628123456789)',
          },
        },
        {
          name: 'email',
          type: 'text',
          required: false,
          admin: {
            description: 'Alamat email perusahaan',
          },
        },
        {
          name: 'address',
          type: 'textarea',
          required: false,
          admin: {
            description: 'Alamat lengkap kantor atau wilayah operasional',
          },
        },
      ],
    },
    {
      name: 'footerText',
      type: 'textarea',
      required: true,
      defaultValue: '© 2026 Makmur Raya Sejahtera (MRS)\n"Halal-Green, Quality & Total Support"\n\nBrand Strategy by Dias Aryo Wibowo Marketing, S.E., M.B.A.\nZiyadah Consulting',
      admin: {
        description: 'Teks footer lengkap dengan copyright dan atribusi',
      },
    },
  ],
}