import type { GlobalConfig } from 'payload'
import { isAdminOrEditor } from '../access/isAdminOrEditor'

export const Locations: GlobalConfig = {
  slug: 'locations',
  label: 'Lokasi Perusahaan',
  admin: {
    group: 'Profil Perusahaan',
  },
  access: {
    read: () => true,
    update: isAdminOrEditor,
  },
  fields: [
    {
      name: 'locations',
      type: 'array',
      label: 'Daftar Lokasi',
      minRows: 1,
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Label Lokasi',
          admin: {
            description: 'Contoh: Kantor Pusat, Pabrik, Gudang Distribusi',
          },
        },
        {
          name: 'city',
          type: 'text',
          required: true,
          label: 'Kota',
        },
        {
          name: 'address',
          type: 'textarea',
          required: true,
          label: 'Alamat Lengkap',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Deskripsi Lokasi',
        },
        {
          name: 'phone',
          type: 'text',
          label: 'Telepon Cabang',
        },
        {
          name: 'mapsUrl',
          type: 'text',
          label: 'URL Google Maps',
          admin: {
            description: 'Link langsung ke Google Maps (bukan embed)',
          },
        },
        {
          name: 'isPrimary',
          type: 'checkbox',
          defaultValue: false,
          label: 'Kantor Pusat?',
        },
      ],
    },
  ],
}
