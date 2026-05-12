"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Posts = void 0;
const richtext_lexical_1 = require("@payloadcms/richtext-lexical");
const isAdminOrEditor_1 = require("../access/isAdminOrEditor");
// Hook otomatis generate slug dari title
const generateSlug = ({ value, siblingData }) => {
    if (value)
        return value;
    if (siblingData?.title) {
        return siblingData.title
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '') // hapus aksen/diakritik
            .replace(/[^a-z0-9\s-]/g, '') // hapus karakter non-alfanumerik
            .replace(/\s+/g, '-') // spasi → strip
            .replace(/-+/g, '-') // multiple strip → satu
            .trim();
    }
    return value;
};
exports.Posts = {
    slug: 'posts',
    labels: {
        singular: 'Artikel Blog',
        plural: 'Artikel Blog',
    },
    admin: {
        useAsTitle: 'title',
        group: 'Konten',
        defaultColumns: ['title', 'category', 'isPublished', 'publishedAt'],
    },
    access: {
        read: ({ req }) => {
            if (req.user)
                return true; // admin/editor bisa lihat semua
            return { isPublished: { equals: true } }; // publik hanya lihat yang dipublish
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
            label: 'Judul Artikel',
        },
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
            label: 'Slug URL',
            admin: {
                description: 'Contoh: cara-memilih-kemasan-plastik (otomatis dari judul)',
            },
            hooks: {
                beforeValidate: [generateSlug],
            },
        },
        {
            name: 'excerpt',
            type: 'textarea',
            required: true,
            label: 'Ringkasan Artikel',
            admin: {
                description: 'Ditampilkan di halaman daftar artikel (maks. 200 karakter)',
            },
        },
        {
            name: 'thumbnail',
            type: 'upload',
            relationTo: 'media',
            label: 'Gambar Utama',
        },
        {
            name: 'category',
            type: 'select',
            required: true,
            label: 'Kategori',
            options: [
                { label: 'Packaging', value: 'packaging' },
                { label: 'Industri', value: 'industri' },
                { label: 'Inovasi', value: 'inovasi' },
                { label: 'Sertifikasi', value: 'sertifikasi' },
                { label: 'Umum', value: 'umum' },
            ],
        },
        {
            name: 'content',
            type: 'richText',
            label: 'Konten Artikel',
            editor: (0, richtext_lexical_1.lexicalEditor)({
                features: [
                    (0, richtext_lexical_1.HeadingFeature)({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
                    (0, richtext_lexical_1.BoldFeature)(),
                    (0, richtext_lexical_1.ItalicFeature)(),
                    (0, richtext_lexical_1.UnderlineFeature)(),
                    (0, richtext_lexical_1.StrikethroughFeature)(),
                    (0, richtext_lexical_1.UnorderedListFeature)(),
                    (0, richtext_lexical_1.OrderedListFeature)(),
                    (0, richtext_lexical_1.LinkFeature)({}),
                    (0, richtext_lexical_1.UploadFeature)({ collections: { media: { fields: [] } } }),
                ],
            }),
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
            name: 'author',
            type: 'text',
            label: 'Nama Penulis',
            defaultValue: 'Tim Redaksi',
        },
        {
            name: 'publishedAt',
            type: 'date',
            label: 'Tanggal Terbit',
            defaultValue: () => new Date().toISOString(),
            admin: {
                date: {
                    pickerAppearance: 'dayAndTime',
                },
            },
        },
        {
            name: 'isPublished',
            type: 'checkbox',
            defaultValue: false,
            label: 'Publikasikan',
            admin: {
                description: 'Centang untuk menampilkan artikel di website',
            },
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
};
//# sourceMappingURL=Posts.js.map