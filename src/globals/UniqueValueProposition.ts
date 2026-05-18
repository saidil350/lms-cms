import { GlobalConfig } from 'payload'

export const UniqueValueProposition: GlobalConfig = {
  slug: 'unique-value-proposition',
  label: 'Brand Essentials | Unique Value Proposition & Brand Story',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      required: true,
      defaultValue: 'Kenapa Harus Makmur Raya Sejahtera?',
    },
    {
      name: 'quoteStatement',
      type: 'textarea',
      required: true,
      defaultValue: '"Lebih dari sekadar kemasan. Melalui konsistensi kualitas Halgreen™ dan total support, kami berikhtiar — dengan izin Allah — menjadi wasilah keberkahan dan kemakmuran yang mampu mengantarkan bisnis Anda pada pertumbuhan yang sustain dan rasa aman."',
    },
    {
      name: 'uvpPoints',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
        {
          name: 'icon',
          type: 'text',
          required: true,
          admin: {
            description: 'Nama icon Lucide (contoh: Sparkles, Leaf, ShieldCheck)',
          },
        },
      ],
      defaultValue: [
        { text: 'Wasilah kemakmuran & keberkahan bisnis', icon: 'Sparkles' },
        { text: 'Standar produksi Halgreen™ — terkontrol & sesuai prinsip Islam', icon: 'Leaf' },
        { text: 'Konsistensi kualitas (kuat & minim komplain)', icon: 'ShieldCheck' },
        { text: 'Total support & respons operasional cepat', icon: 'Headphones' },
        { text: 'Ekosistem kemitraan mendorong pertumbuhan (MOP Upgrade)', icon: 'TrendingUp' },
        { text: '*MOP = Makmur Official Partner', icon: 'Briefcase' },
      ],
    },
    {
      name: 'brandStorySummary',
      type: 'textarea',
      required: true,
      defaultValue: 'MRS hadir dengan ikhtiar luhur — menjadi wasilah kemakmuran & keberkahan bagi distributor di Indonesia. Melalui Halgreen™, MOP, dan total support, kami merajut kemitraan yang tumbuh, sustain, dan membawa keberkahan di setiap langkahnya.',
    },
  ],
}
