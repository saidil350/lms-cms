"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stats = void 0;
const isAdminOrEditor_1 = require("../access/isAdminOrEditor");
exports.Stats = {
    slug: 'stats',
    label: 'Statistik Perusahaan',
    admin: {
        group: 'Konten Halaman',
    },
    access: {
        read: () => true,
        update: isAdminOrEditor_1.isAdminOrEditor,
    },
    fields: [
        {
            name: 'items',
            type: 'array',
            label: 'Statistik',
            minRows: 1,
            maxRows: 8,
            fields: [
                {
                    name: 'value',
                    type: 'text',
                    required: true,
                    label: 'Nilai',
                    admin: {
                        description: 'Contoh: 500, 15, 98',
                    },
                },
                {
                    name: 'suffix',
                    type: 'text',
                    label: 'Suffix',
                    admin: {
                        description: 'Contoh: +, %, Ton/Hari',
                    },
                },
                {
                    name: 'label',
                    type: 'text',
                    required: true,
                    label: 'Keterangan',
                    admin: {
                        description: 'Contoh: Klien Aktif, Tahun Pengalaman',
                    },
                },
                {
                    name: 'icon',
                    type: 'text',
                    label: 'Emoji atau ikon',
                },
            ],
        },
    ],
};
//# sourceMappingURL=Stats.js.map