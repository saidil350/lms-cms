"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Innovations = void 0;
const isAdminOrEditor_1 = require("../access/isAdminOrEditor");
exports.Innovations = {
    slug: 'innovations',
    labels: {
        singular: 'Inovasi',
        plural: 'Inovasi',
    },
    admin: {
        useAsTitle: 'title',
        group: 'Konten',
        defaultColumns: ['title', 'isPublished', 'order'],
    },
    access: {
        read: () => true, // publik bisa baca
        create: isAdminOrEditor_1.isAdminOrEditor,
        update: isAdminOrEditor_1.isAdminOrEditor,
        delete: isAdminOrEditor_1.isAdminOrEditor,
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            label: 'Judul Inovasi',
        },
        {
            name: 'description',
            type: 'textarea',
            required: true,
            label: 'Deskripsi',
        },
        {
            name: 'icon',
            type: 'text',
            label: 'Emoji atau nama ikon',
        },
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            label: 'Gambar',
        },
        {
            name: 'tags',
            type: 'array',
            label: 'Tag / Sorotan',
            maxRows: 6,
            fields: [
                {
                    name: 'text',
                    type: 'text',
                    required: true,
                    label: 'Teks Tag',
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
        },
    ],
};
//# sourceMappingURL=Innovations.js.map