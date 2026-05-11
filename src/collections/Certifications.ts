import type { CollectionConfig } from 'payload'
import { isAdminOrEditor } from '../access/isAdminOrEditor'

export const Certifications: CollectionConfig = {
  slug: 'certifications',
  labels: {
    singular: 'Sertifikasi',
    plural: 'Sertifikasi',
  },
  admin: {
    useAsTitle: 'name',
    group: 'Profil Perusahaan',
    defaultColumns: ['name', 'issuer', 'year', 'isPublished', 'order'],
  },
  access: {
    read: () => true, // sertifikasi selalu publik
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nama Sertifikasi',
      admin: {
        description: 'Contoh: ISO 9001:2015, SNI, Halal MUI',
      },
    },
    {
      name: 'issuer',
      type: 'text',
      required: true,
      label: 'Lembaga Penerbit',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo Sertifikasi',
    },
    {
      name: 'year',
      type: 'number',
      label: 'Tahun Terbit',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Deskripsi',
    },
    {
      name: 'documentUrl',
      type: 'text',
      label: 'Link Dokumen/Sertifikat',
    },
    {
      name: 'isPublished',
      type: 'checkbox',
      defaultValue: true,
      label: 'Tampilkan di Website',
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      label: 'Urutan Tampil',
    },
  ],
}
