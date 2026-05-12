"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Team = void 0;
const isAdminOrEditor_1 = require("../access/isAdminOrEditor");
exports.Team = {
    slug: 'team',
    labels: {
        singular: 'Anggota Tim',
        plural: 'Anggota Tim',
    },
    admin: {
        useAsTitle: 'name',
        group: 'Konten',
        defaultColumns: ['name', 'role', 'isPublished', 'order'],
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
            name: 'name',
            type: 'text',
            required: true,
            label: 'Nama Lengkap',
        },
        {
            name: 'role',
            type: 'text',
            required: true,
            label: 'Jabatan',
        },
        {
            name: 'bio',
            type: 'textarea',
            label: 'Biografi Singkat',
        },
        {
            name: 'photo',
            type: 'upload',
            relationTo: 'media',
            label: 'Foto',
        },
        {
            name: 'linkedIn',
            type: 'text',
            label: 'URL LinkedIn',
            admin: {
                description: 'Contoh: https://linkedin.com/in/username',
            },
        },
        {
            name: 'email',
            type: 'email',
            label: 'Email (opsional, tidak ditampilkan publik)',
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
//# sourceMappingURL=Team.js.map