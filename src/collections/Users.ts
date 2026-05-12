import type { CollectionConfig } from 'payload'
import { isAdmin } from '../access/isAdmin.ts'
import { isAdminOrEditor } from '../access/isAdminOrEditor.ts'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    tokenExpiration: 604800, // 7 hari
  },
  admin: {
    useAsTitle: 'name',
    group: 'Pengaturan',
    defaultColumns: ['name', 'email', 'role', 'updatedAt'],
  },
  access: {
    create: isAdmin,
    read: ({ req: { user } }) => {
      if (!user) return false
      if (user.role === 'admin') return true
      // editor hanya bisa lihat diri sendiri
      return {
        id: {
          equals: user.id,
        },
      }
    },
    update: ({ req: { user }, id }) => {
      if (!user) return false
      if (user.role === 'admin') return true
      return user.id === id
    },
    delete: isAdmin,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nama Lengkap',
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      label: 'Peran',
      options: [
        { label: 'Administrator', value: 'admin' },
        { label: 'Editor Konten', value: 'editor' },
      ],
    },
  ],
}
