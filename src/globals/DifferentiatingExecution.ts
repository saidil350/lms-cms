import type { GlobalConfig } from 'payload'
import {
  lexicalEditor,
  ParagraphFeature,
  UnorderedListFeature,
  OrderedListFeature,
} from '@payloadcms/richtext-lexical'
import { isAdminOrEditor } from '../access/isAdminOrEditor.ts'

export const DifferentiatingExecution: GlobalConfig = {
  slug: 'differentiating-execution',
  label: 'Eksekusi | Differentiating Execution – MOP & Halgreen',
  admin: {
    group: 'Brand',
  },
  access: {
    read: () => true,
    update: isAdminOrEditor,
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow Text',
      required: true,
      defaultValue: 'Keunggulan yang Membedakan Kami',
    },
    {
      name: 'headline',
      type: 'text',
      required: true,
      label: 'Headline',
      defaultValue: 'Halgreen™ & Program MOP: Wujud Nyata Komitmen MRS',
    },
    {
      name: 'subheadline',
      type: 'textarea',
      label: 'Subheadline',
      defaultValue: 'Standar produksi kami yang terukur, higienis, dan selaras syariat Islam, dipadukan dengan ekosistem kemitraan yang adil dan transparan.',
    },
    {
      name: 'standarTitle',
      type: 'text',
      label: 'Standar Title',
      required: true,
      defaultValue: 'STANDAR HALGREEN™',
    },
    {
      name: 'standars',
      type: 'array',
      label: 'Standar Halgreen Items',
      fields: [
        {
          name: 'icon',
          type: 'text',
          required: true,
          label: 'Icon',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Title',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Description',
        },
      ],
      defaultValue: [
        {
          icon: 'Settings',
          title: 'Produksi Terukur & Terkontrol',
          description: 'Setiap batch produksi dijalankan dengan SOP untuk memastikan konsistensi dimensi, ketebalan, dan kekuatan material.',
        },
        {
          icon: 'Sparkles',
          title: 'Bersih & Transparan',
          description: 'Proses produksi yang bersih dan dapat diverifikasi, memberikan keyakinan pada mitra atas integritas produk.',
        },
        {
          icon: 'Leaf',
          title: 'Kepatuhan Syariat (Ikhtiar)',
          description: 'Mengedepankan prinsip Islam dalam setiap aspek operasional sebagai wujud komitmen bisnis yang berkah.',
        },
        {
          icon: 'ShieldCheck',
          title: 'Minim Retur & Komplain',
          description: 'Standar QC ketat memastikan produk yang sampai ke mitra dalam kondisi prima, menjaga reputasi bisnis Anda.',
        },
      ],
    },
    {
      name: 'mopTitle',
      type: 'text',
      label: 'MOP Title',
      required: true,
      defaultValue: 'PROGRAM MOP (Makmur Official Partner)',
    },
    {
      name: 'mopItems',
      type: 'array',
      label: 'MOP Items',
      fields: [
        {
          name: 'icon',
          type: 'text',
          required: true,
          label: 'Icon',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Title',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Description',
        },
      ],
      defaultValue: [
        {
          icon: 'Eye',
          title: 'Transparansi Penuh & Ekosistem Keberkahan',
          description: 'Skema kerja sama dikomunikasikan secara jujur dan terbuka dan dilakukan dengan mengedepankan prinsip Islam.',
        },
        {
          icon: 'Users',
          title: 'Total Support',
          description: 'Kami menghadirkan dukungan personalized untuk mendorong pertumbuhan berkelanjutan mitra.',
        },
        {
          icon: 'TrendingUp',
          title: 'Pendampingan Upgrade',
          description: 'Program aktif untuk mendorong mitra berkembang dan naik ke level kemitraan berikutnya.',
        },
        {
          icon: 'MessageCircle',
          title: 'Fast Response Support',
          description: 'Tim siap siaga memberikan respons cepat atas setiap kendala operasional.',
        },
      ],
    },
    {
      name: 'closingTitle',
      type: 'text',
      label: 'Closing Title',
      required: true,
      defaultValue: 'Komitmen Jangka Panjang',
    },
    {
      name: 'closingText',
      type: 'textarea',
      label: 'Closing Text',
      required: true,
      defaultValue: 'Menolak model "jual-beli putus" — MRS berkomitmen pada ekosistem kemitraan jangka panjang yang mendorong mitra untuk terus naik kelas.',
    },
    {
      name: 'ctaLabel',
      type: 'text',
      label: 'CTA Label',
      defaultValue: 'Pelajari Program MOP',
    },
    {
      name: 'ctaHref',
      type: 'text',
      label: 'CTA Link',
      defaultValue: '/program-mitra',
    },
    {
      name: 'footerLine',
      type: 'text',
      label: 'Footer Line',
      defaultValue: 'Menggabungkan standar produksi Halgreen™ dengan ekosistem kemitraan MOP untuk pertumbuhan bisnis yang berkelanjutan.',
    },
  ],
}
