import type { CollectionConfig } from 'payload'
import { isAdminOrEditor } from '../access/isAdminOrEditor.ts'

export const Leads: CollectionConfig = {
  slug: 'leads',
  labels: {
    singular: 'Lead Kontak',
    plural: 'Lead Kontak',
  },
  admin: {
    useAsTitle: 'name',
    group: 'Leads',
    defaultColumns: ['name', 'company', 'status', 'sourcePage', 'createdAt'],
  },
  access: {
    read: isAdminOrEditor,
    create: () => true,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nama',
    },
    {
      name: 'company',
      type: 'text',
      label: 'Perusahaan',
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Telepon',
    },
    {
      name: 'need',
      type: 'textarea',
      label: 'Kebutuhan',
    },
    {
      name: 'sourcePage',
      type: 'select',
      label: 'Asal Halaman',
      options: [
        { label: 'Beranda', value: 'home' },
        { label: 'Tentang Kami', value: 'tentang-kami' },
        { label: 'Pengetahuan Produk', value: 'pengetahuan-produk' },
        { label: 'Kontak', value: 'kontak' },
        { label: 'Program Mitra', value: 'program-mitra' },
      ],
    },
    {
      name: 'sourceUrl',
      type: 'text',
      label: 'URL Sumber',
    },
    {
      name: 'status',
      type: 'select',
      label: 'Status',
      defaultValue: 'new',
      options: [
        { label: 'Baru', value: 'new' },
        { label: 'Sudah Dihubungi', value: 'contacted' },
        { label: 'Terkualifikasi', value: 'qualified' },
        { label: 'Selesai', value: 'closed' },
      ],
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Catatan Internal',
    },
  ],
}
