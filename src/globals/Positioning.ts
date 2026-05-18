import { GlobalConfig } from 'payload'

export const Positioning: GlobalConfig = {
  slug: 'positioning',
  label: 'Brand Essentials | Positioning',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      required: true,
      defaultValue: 'Posisi Kami di Pasar',
    },
    {
      name: 'headline',
      type: 'text',
      required: true,
      defaultValue: 'Bukan Komoditas. Kami Adalah Mitra Strategis Anda.',
    },
    {
      name: 'elements',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'step',
          type: 'text',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'content',
          type: 'textarea',
          required: true,
        },
        {
          name: 'isHighlighted',
          type: 'checkbox',
          required: true,
          defaultValue: false,
        },
      ],
      defaultValue: [
        {
          step: '01',
          title: 'Target Market',
          content: 'Distributor kemasan plastik di Indonesia yang mengutamakan pertumbuhan dan profitabilitas bisnis.',
          isHighlighted: false,
        },
        {
          step: '02',
          title: 'Brand + Frame of Reference',
          content: 'CV Makmur Raya Sejahtera (MRS) adalah provider kemasan plastik Halgreen™ yang memposisikan diri lebih dari sekadar penyedia komoditas, melainkan mitra strategis pertumbuhan bisnis Anda.',
          isHighlighted: false,
        },
        {
          step: '03',
          title: 'Point of Difference',
          content: 'Menjadi wasilah kemakmuran & keberkahan melalui konsistensi kualitas kemasan, operasional bisnis yang adil & selaras syariat, serta dedikasi pada program upgrade mitra MOP.',
          isHighlighted: true,
        },
      ],
    },
    {
      name: 'reasonsToBelieve',
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
        { text: 'Konsistensi Halgreen™' },
        { text: 'Layanan Total Support (fast response)' },
        { text: 'Standar syariat transparan' },
        { text: 'Program MOP (anti jual-beli putus)' },
        { text: 'Skema margin yang adil & pendampingan naik kelas' },
      ],
    },
  ],
}
