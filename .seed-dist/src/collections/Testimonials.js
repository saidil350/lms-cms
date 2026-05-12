"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Testimonials = void 0;
const isAdminOrEditor_1 = require("../access/isAdminOrEditor");
exports.Testimonials = {
    slug: 'testimonials',
    labels: {
        singular: 'Testimoni',
        plural: 'Testimoni',
    },
    admin: {
        useAsTitle: 'name',
        group: 'Konten',
        defaultColumns: ['name', 'company', 'rating', 'isPublished', 'order'],
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
            label: 'Nama',
        },
        {
            name: 'company',
            type: 'text',
            label: 'Nama Perusahaan',
        },
        {
            name: 'role',
            type: 'text',
            label: 'Jabatan',
        },
        {
            name: 'quote',
            type: 'textarea',
            required: true,
            label: 'Isi Testimoni',
        },
        {
            name: 'avatar',
            type: 'upload',
            relationTo: 'media',
            label: 'Foto (opsional)',
        },
        {
            name: 'rating',
            type: 'number',
            label: 'Rating Bintang',
            min: 1,
            max: 5,
            admin: { step: 1 },
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
//# sourceMappingURL=Testimonials.js.map