"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contact = void 0;
const isAdminOrEditor_1 = require("../access/isAdminOrEditor");
exports.Contact = {
    slug: 'contact',
    label: 'Informasi Kontak',
    admin: {
        group: 'Profil Perusahaan',
    },
    access: {
        read: () => true,
        update: isAdminOrEditor_1.isAdminOrEditor,
    },
    fields: [
        {
            name: 'sectionHeadline',
            type: 'text',
            label: 'Judul Section Kontak',
            admin: {
                description: 'Judul utama pada section kontak di frontend.',
            },
        },
        {
            name: 'sectionDescription',
            type: 'textarea',
            label: 'Deskripsi Section Kontak',
        },
        {
            name: 'formTitle',
            type: 'text',
            label: 'Judul Form Kontak',
            defaultValue: 'Form Kontak',
        },
        {
            name: 'submitLabel',
            type: 'text',
            label: 'Teks Tombol Submit',
            defaultValue: 'Kirim Permintaan',
        },
        {
            name: 'emailSubject',
            type: 'text',
            label: 'Subject Email Default',
            admin: {
                description: 'Dipakai saat frontend mengirimkan form ke email atau WhatsApp.',
            },
        },
        {
            name: 'email',
            type: 'email',
            required: true,
            label: 'Email Utama',
        },
        {
            name: 'phone',
            type: 'text',
            label: 'Nomor Telepon',
        },
        {
            name: 'whatsapp',
            type: 'text',
            label: 'Nomor WhatsApp',
            admin: {
                description: 'Format: 628xxxxxxxxxx (tanpa + atau spasi)',
            },
        },
        {
            name: 'address',
            type: 'textarea',
            label: 'Alamat Lengkap',
        },
        {
            name: 'mapsEmbedUrl',
            type: 'text',
            label: 'URL Embed Google Maps',
            admin: {
                description: 'Ambil dari Google Maps > Share > Embed a map > salin src="..."',
            },
        },
        {
            name: 'operationalHours',
            type: 'textarea',
            label: 'Jam Operasional',
            admin: {
                description: 'Contoh: Senin–Jumat: 08.00–17.00 WIB',
            },
        },
    ],
};
//# sourceMappingURL=Contact.js.map