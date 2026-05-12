"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Media = void 0;
const isAdminOrEditor_1 = require("../access/isAdminOrEditor");
exports.Media = {
    slug: 'media',
    upload: {
        mimeTypes: [
            'image/jpeg',
            'image/png',
            'image/webp',
            'image/svg+xml',
            'image/gif',
            'application/pdf',
        ],
        imageSizes: [
            {
                name: 'thumbnail',
                width: 400,
                height: 300,
                position: 'centre',
            },
            {
                name: 'card',
                width: 800,
                height: 600,
                position: 'centre',
            },
            {
                name: 'og',
                width: 1200,
                height: 630,
                position: 'centre',
            },
        ],
    },
    admin: {
        useAsTitle: 'filename',
        group: 'Media',
    },
    access: {
        read: () => true, // semua bisa baca media
        create: isAdminOrEditor_1.isAdminOrEditor,
        update: isAdminOrEditor_1.isAdminOrEditor,
        delete: isAdminOrEditor_1.isAdminOrEditor,
    },
    fields: [
        {
            name: 'alt',
            type: 'text',
            required: true,
            label: 'Teks Alternatif (Alt Text)',
            admin: {
                description: 'Penting untuk aksesibilitas dan SEO',
            },
        },
        {
            name: 'caption',
            type: 'text',
            label: 'Keterangan Gambar',
        },
    ],
};
//# sourceMappingURL=Media.js.map