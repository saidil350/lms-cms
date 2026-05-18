import type { GlobalConfig } from 'payload'
import {
  lexicalEditor,
  ParagraphFeature,
  UnorderedListFeature,
  OrderedListFeature,
} from '@payloadcms/richtext-lexical'
import { isAdminOrEditor } from '../access/isAdminOrEditor.ts'

export const BrandStory: GlobalConfig = {
  slug: 'brand-story',
  label: 'Brand Essentials | Brand Story Full',
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
      defaultValue: 'Kisah Kami',
    },
    {
      name: 'headline',
      type: 'text',
      required: true,
      label: 'Headline',
      defaultValue: 'Makmur Raya Sejahtera: Sebuah Ikhtiar Luhur',
    },
    {
      name: 'kenapaMRS',
      type: 'textarea',
      label: 'Kenapa MRS',
      defaultValue: 'MRS hadir dengan ikhtiar luhur — menjadi wasilah kemakmuran & keberkahan bagi distributor di Indonesia. Melalui Halgreen™, MOP, dan total support, kami merajut kemitraan yang tumbuh, sustain, dan membawa keberkahan di setiap langkahnya.',
    },
    {
      name: 'uvpPoints',
      type: 'array',
      label: 'UVP Points',
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
      ],
      defaultValue: [
        {
          icon: 'Sparkles',
          title: 'Wasilah kemakmuran & keberkahan bisnis',
        },
        {
          icon: 'Award',
          title: 'Standar produksi Halgreen™ — terkontrol & sesuai prinsip Islam',
        },
        {
          icon: 'Shield',
          title: 'Konsistensi kualitas (kuat & minim komplain)',
        },
        {
          icon: 'Users',
          title: 'Total support & respons operasional cepat',
        },
        {
          icon: 'TrendingUp',
          title: 'Ekosistem kemitraan mendorong pertumbuhan (MOP Upgrade)',
        },
        {
          icon: 'Info',
          title: '*MOP = Makmur Official Partner',
        },
      ],
    },
    {
      name: 'brandStoryParagraphs',
      type: 'array',
      label: 'Brand Story Paragraphs',
      fields: [
        {
          name: 'text',
          type: 'textarea',
          required: true,
          label: 'Paragraph',
        },
      ],
      defaultValue: [
        {
          text: 'Di Makmur Raya Sejahtera (MRS), kami percaya bahwa kemasan bukanlah sekadar produk akhir atau pelengkap transaksi, melainkan fondasi penting bagi kelancaran rantai pasok bisnis Anda. Kami hadir di industri ini bukan sekadar untuk menyuplai komoditas plastik, melainkan dengan sebuah ikhtiar luhur: menjadi wasilah pembawa kemakmuran dan keberkahan bagi seluruh mitra distributor di Indonesia.',
        },
        {
          text: 'Kami memahami bahwa dengan berpegang teguh pada prinsip-prinsip Islam dan bertakwa kepada Allah serta dengan ikhtiar adanya kepastian dan kelancaran operasional adalah kunci utama menuju ketenangan bisnis. Oleh karena itu, melalui inovasi Halgreen™, kami menjalankan proses produksi yang terukur, higienis, dan berlandaskan pada prinsip kepatuhan syariat. Ini adalah wujud nyata komitmen kami untuk menghadirkan kualitas kemasan yang konsisten, kuat, dan minim komplain - memastikan Anda dapat fokus pada ekspansi penjualan tanpa rasa khawatir akan retur atau keluhan pelanggan.',
        },
        {
          text: 'Lebih dari itu, kami menyadari bahwa pertumbuhan bisnis tidak bisa diraih sendirian. Melalui layanan total support dan program Makmur Official Partner (MOP), pendampingan kami diwujudkan melalui respons yang cepat, transparansi, dan ekosistem kerjasama yang adil. Fokus kami adalah merajut win-win solution yang mendorong profitabilitas berkelanjutan.',
        },
        {
          text: 'Dengan izin Allah, MRS berkomitmen untuk terus mendampingi setiap fase perjalanan bisnis Anda. Kami mengundang Anda untuk bertumbuh dan naik kelas (upgrade) bersama kami, membangun kemitraan strategis yang tangguh, profesional, dan membawa keberkahan di setiap langkah operasionalnya.',
        },
      ],
    },
    {
      name: 'ctaLabel',
      type: 'text',
      label: 'CTA Label',
      defaultValue: 'Pelajari Lebih Lanjut',
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
      defaultValue: 'Bersama MRS, Anda tidak hanya mendapatkan kemasan — Anda mendapatkan mitra pertumbuhan.',
    },
  ],
}
