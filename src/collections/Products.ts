import type { CollectionConfig, FieldHook } from 'payload'
import { isAdminOrEditor } from '../access/isAdminOrEditor.ts'

// Hook otomatis generate slug dari name
const generateSlug: FieldHook = ({ value, siblingData }) => {
  if (value) return value
  if (siblingData?.name) {
    return (siblingData.name as string)
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '') // hapus aksen/diakritik
      .replace(/[^a-z0-9\s-]/g, '') // hapus karakter non-alfanumerik
      .replace(/\s+/g, '-') // spasi → strip
      .replace(/-+/g, '-') // multiple strip → satu
      .trim()
  }
  return value
}

export const Products: CollectionConfig = {
  slug: 'products',
  labels: {
    singular: 'Produk',
    plural: 'Produk',
  },
  admin: {
    useAsTitle: 'name',
    group: 'Konten',
    defaultColumns: ['name', 'category', 'featured', 'order', 'isPublished'],
  },
  access: {
    read: ({ req }) => {
      if (req.user) return true // admin/editor bisa lihat semua
      return { isPublished: { equals: true } } // publik hanya lihat yang dipublish
    },
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nama Produk',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug URL',
      admin: {
        description: 'Contoh: standup-pouch (otomatis dari nama)',
      },
      hooks: {
        beforeValidate: [generateSlug],
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      label: 'Ringkasan Produk',
      admin: {
        description: 'Ditampilkan di kartu katalog (maks. 160 karakter).',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Deskripsi Lengkap',
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'product-categories',
      label: 'Kategori',
      required: true,
      admin: {
        description: 'Pilih kategori produk.',
      },
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'Galeri Foto',
      admin: {
        description: 'Gambar utama dan foto pendukung produk.',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Gambar',
        },
        {
          name: 'caption',
          type: 'text',
          label: 'Keterangan',
        },
      ],
    },
    {
      name: 'specifications',
      type: 'array',
      label: 'Spesifikasi',
      admin: {
        description: 'Detail teknis produk (material, ukuran, fitur, dll).',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Label (misal: Ukuran)',
        },
        {
          name: 'value',
          type: 'text',
          required: true,
          label: 'Nilai (misal: 30x40 cm)',
        },
      ],
    },
    {
      name: 'pricingInfo',
      type: 'textarea',
      label: 'Info Harga',
      admin: {
        description: 'Catatan tentang harga atau permintaan penawaran.',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      label: 'Tampilkan di Featured',
      admin: {
        description: 'Produk featured muncul di bagian atas katalog.',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      label: 'Urutan Tampil',
      admin: {
        description: 'Angka lebih kecil = tampil lebih dulu.',
      },
    },
    {
      name: 'isPublished',
      type: 'checkbox',
      defaultValue: true,
      label: 'Tampilkan di Website',
    },
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          label: 'Meta Title (maks. 60 karakter)',
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          label: 'Meta Description (maks. 160 karakter)',
        },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
          label: 'OG Image (1200×630px)',
        },
      ],
    },
  ],
}