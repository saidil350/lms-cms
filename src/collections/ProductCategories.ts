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

export const ProductCategories: CollectionConfig = {
  slug: 'product-categories',
  labels: {
    singular: 'Kategori Produk',
    plural: 'Kategori Produk',
  },
  admin: {
    useAsTitle: 'name',
    group: 'Konten',
    defaultColumns: ['name', 'order', 'isPublished'],
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
      label: 'Nama Kategori',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug URL',
      admin: {
        description: 'Contoh: food-beverage (otomatis dari nama)',
      },
      hooks: {
        beforeValidate: [generateSlug],
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Deskripsi Singkat',
      admin: {
        description: 'Ditampilkan di tab filter katalog produk.',
      },
    },
    {
      name: 'icon',
      type: 'text',
      label: 'Nama Ikon',
      admin: {
        description: 'Contoh: Utensils, ShoppingBag, Factory, MoreHorizontal, Package',
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
  ],
}