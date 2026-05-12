"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Projects = void 0;
const isAdminOrEditor_1 = require("../access/isAdminOrEditor");
const generateSlug = ({ value, siblingData }) => {
    if (value)
        return value;
    if (siblingData?.title) {
        return siblingData.title
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
    }
    return value;
};
exports.Projects = {
    slug: 'projects',
    labels: {
        singular: 'Proyek',
        plural: 'Proyek',
    },
    admin: {
        useAsTitle: 'title',
        group: 'Konten',
        defaultColumns: ['title', 'category', 'isPublished', 'order'],
    },
    access: {
        read: ({ req }) => {
            if (req.user)
                return true;
            return { isPublished: { equals: true } };
        },
        create: isAdminOrEditor_1.isAdminOrEditor,
        update: isAdminOrEditor_1.isAdminOrEditor,
        delete: isAdminOrEditor_1.isAdminOrEditor,
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            label: 'Judul Proyek',
        },
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
            label: 'Slug URL',
            hooks: {
                beforeValidate: [generateSlug],
            },
        },
        {
            name: 'description',
            type: 'textarea',
            required: true,
            label: 'Deskripsi Proyek',
        },
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            label: 'Gambar Utama',
        },
        {
            name: 'gallery',
            type: 'array',
            label: 'Galeri Foto',
            fields: [
                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',
                    label: 'Gambar',
                },
            ],
        },
        {
            name: 'category',
            type: 'text',
            label: 'Kategori Proyek',
            admin: {
                description: 'Contoh: Packaging Food Grade, Industrial Packaging',
            },
        },
        {
            name: 'client',
            type: 'text',
            label: 'Nama Klien',
        },
        {
            name: 'year',
            type: 'number',
            label: 'Tahun Proyek',
            admin: { step: 1 },
        },
        {
            name: 'tags',
            type: 'array',
            label: 'Tags',
            fields: [
                {
                    name: 'tag',
                    type: 'text',
                    label: 'Tag',
                },
            ],
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
            admin: {
                description: 'Angka kecil = tampil lebih dulu',
            },
        },
    ],
};
//# sourceMappingURL=Projects.js.map