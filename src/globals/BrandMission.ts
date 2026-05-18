import { GlobalConfig } from 'payload'

export const BrandMission: GlobalConfig = {
  slug: 'brand-mission',
  label: 'Brand Essentials | Brand Identity & Values',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      required: true,
      defaultValue: 'Siapa Kami',
    },
    {
      name: 'headline',
      type: 'text',
      required: true,
      defaultValue: 'Dibangun di Atas Nilai, Bukan Sekadar Transaksi',
    },
    {
      name: 'missionText',
      type: 'textarea',
      required: true,
      defaultValue: 'Memastikan suplai kemasan plastik berstandar Halgreen™ yang konsisten bagi para distributor di Indonesia. Melalui pelayanan PRIMA, Total Support, dan kemitraan MOP, kami berikhtiar membangun kerjasama amanah yang selaras dengan syariat Islam, sebagai wasilah keberkahan, kemakmuran, dan pertumbuhan bisnis berkelanjutan bagi mitra kami.',
    },
    {
      name: 'coreValues',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'icon',
          type: 'text',
          required: true,
          admin: {
            description: 'Nama icon Lucide (contoh: Leaf, ShieldCheck, TrendingUp)',
          },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
      ],
      defaultValue: [
        {
          icon: 'Leaf',
          title: 'Keberkahan',
          description: 'Bisnis yang selaras syariat sebagai fondasi keberlanjutan.',
        },
        {
          icon: 'ShieldCheck',
          title: 'Integritas',
          description: 'Transparansi dan kejujuran dalam setiap interaksi kemitraan.',
        },
        {
          icon: 'TrendingUp',
          title: 'Pertumbuhan',
          description: 'Mendorong mitra untuk terus naik kelas bersama MRS.',
        },
        {
          icon: 'BadgeCheck',
          title: 'Kualitas',
          description: 'Konsistensi Halgreen™ yang terkontrol dan terukur.',
        },
      ],
    },
  ],
}
