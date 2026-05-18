import { GlobalConfig } from 'payload'

export const BenefitAnalysis: GlobalConfig = {
  slug: 'benefit-analysis',
  label: 'Brand Essentials | Benefit Analysis',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      required: true,
      defaultValue: 'Manfaat Bermitra dengan MRS',
    },
    {
      name: 'headline',
      type: 'text',
      required: true,
      defaultValue: 'Apa yang Anda Dapatkan Bersama Kami',
    },
    {
      name: 'functionalBenefitsTitle',
      type: 'text',
      required: true,
      defaultValue: 'Functional Benefits',
    },
    {
      name: 'functionalBenefitsDescription',
      type: 'text',
      required: true,
      defaultValue: 'Keuntungan praktis yang langsung Anda rasakan dalam operasional bisnis.',
    },
    {
      name: 'functionalBenefits',
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
        { text: 'Perlindungan produk yang berkualitas & tangguh' },
        { text: 'Kelancaran rantai distribusi tanpa hambatan' },
        { text: 'Minim komplain dari pelanggan akhir Anda' },
        { text: 'Respons layanan operasional yang cepat & solutif' },
        { text: 'Kepastian ketersediaan stok untuk stabilitas revenue' },
      ],
    },
    {
      name: 'emotionalBenefitsTitle',
      type: 'text',
      required: true,
      defaultValue: 'Emotional Benefits',
    },
    {
      name: 'emotionalBenefitsDescription',
      type: 'text',
      required: true,
      defaultValue: 'Keuntungan emosional yang membangun koneksi dan kepercayaan.',
    },
    {
      name: 'emotionalBenefits',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'text',
          required: true,
        },
        {
          name: 'icon',
          type: 'text',
          required: true,
        },
      ],
      defaultValue: [
        {
          title: 'Rasa Aman',
          description: 'Keyakinan bahwa MRS berikhtiar untuk amanah dan menjaga kualitasnya.',
          icon: 'Shield',
        },
        {
          title: 'Ketenangan Hati',
          description: 'Bermitra dengan entitas yang menjalankan bisnis sesuai prinsip Islam.',
          icon: 'Heart',
        },
        {
          title: 'Rasa Dihargai',
          description: 'Diperlakukan sebagai mitra strategis, bukan sekadar pelanggan biasa.',
          icon: 'Users',
        },
        {
          title: 'Keyakinan Tumbuh',
          description: 'Yakin dengan izin Allah bahwa bersama MRS, bisnis akan terus berkembang dan naik kelas.',
          icon: 'TrendingUp',
        },
      ],
    },
  ],
}
