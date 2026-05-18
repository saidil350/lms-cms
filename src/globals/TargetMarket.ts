import { GlobalConfig } from 'payload'

export const TargetMarket: GlobalConfig = {
  slug: 'target-market',
  label: 'Brand Essentials | STP Analysis',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      required: true,
      defaultValue: 'Untuk Siapa MRS?',
    },
    {
      name: 'headline',
      type: 'text',
      required: true,
      defaultValue: 'Kami Hadir untuk Distributor yang Berambisi Naik Kelas',
    },
    {
      name: 'segmentationItems',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
      ],
      defaultValue: [
        { text: 'Distributor kemasan plastik aktif di Indonesia' },
        { text: 'Skala UKM hingga menengah dengan jaringan distribusi regional' },
        { text: 'Prioritas pada pelaku usaha yang mengutamakan kualitas & reputasi' },
        { text: 'Segmen yang sadar nilai (value-conscious), bukan semata price-driven' },
        { text: 'Mitra yang membuka diri terhadap pertumbuhan & pembenahan bisnis' },
      ],
    },
    {
      name: 'targetingItems',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
      ],
      defaultValue: [
        { text: 'Target Primer: Distributor di Jawa Tengah, Jawa Timur, Jawa Barat' },
        { text: 'Target Sekunder: Seluruh Indonesia' },
        { text: 'Volume transaksi konsisten & potensi repeat order tinggi' },
        { text: 'Pengusaha Muslim' },
        { text: 'Berambisi naik kelas & memerlukan mitra strategis' },
        { text: 'Menghargai program MOP & long-term partnership' },
      ],
    },
    {
      name: 'positioningItems',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
      ],
      defaultValue: [
        { text: 'Bukan sekadar supplier komoditas plastik biasa' },
        { text: 'Mitra strategis pertumbuhan dengan standar Halgreen™' },
        { text: 'Penyedia ekosistem kemitraan yang adil & transparan (MOP) berprinsip Islam' },
        { text: 'Wasilah keberkahan bisnis melalui operasional mengedepankan prinsip Islam' },
        { text: 'Pilihan utama bagi distributor yang mendambakan stabilitas & upgrade' },
      ],
    },
    {
      name: 'ctaLabel',
      type: 'text',
      required: true,
      defaultValue: 'Cek Apakah Bisnis Saya Cocok',
    },
    {
      name: 'ctaHref',
      type: 'text',
      required: true,
      defaultValue: '/kontak',
    },
  ],
}
