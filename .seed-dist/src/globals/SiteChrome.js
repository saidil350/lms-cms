"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiteChrome = void 0;
const isAdminOrEditor_1 = require("../access/isAdminOrEditor");
exports.SiteChrome = {
    slug: 'site-chrome',
    label: 'Site Chrome',
    admin: {
        group: 'Navigasi & Footer',
    },
    access: {
        read: () => true,
        update: isAdminOrEditor_1.isAdminOrEditor,
    },
    fields: [
        {
            name: 'headerCtaLabel',
            type: 'text',
            label: 'Teks CTA Header',
            defaultValue: 'Hubungi Kami',
        },
        {
            name: 'headerCtaHref',
            type: 'text',
            label: 'Link CTA Header',
            defaultValue: '/kontak',
        },
        {
            name: 'navigationItems',
            type: 'array',
            label: 'Item Navigasi',
            fields: [
                {
                    name: 'label',
                    type: 'text',
                    required: true,
                    label: 'Label',
                },
                {
                    name: 'href',
                    type: 'text',
                    required: true,
                    label: 'Link',
                },
                {
                    name: 'megaMenuGroups',
                    type: 'array',
                    label: 'Group Mega Menu',
                    fields: [
                        {
                            name: 'title',
                            type: 'text',
                            required: true,
                            label: 'Judul Group',
                        },
                        {
                            name: 'icon',
                            type: 'text',
                            label: 'Nama Ikon',
                        },
                        {
                            name: 'links',
                            type: 'array',
                            label: 'Link di Group',
                            fields: [
                                {
                                    name: 'label',
                                    type: 'text',
                                    required: true,
                                    label: 'Label',
                                },
                                {
                                    name: 'href',
                                    type: 'text',
                                    required: true,
                                    label: 'Link',
                                },
                                {
                                    name: 'description',
                                    type: 'textarea',
                                    label: 'Deskripsi',
                                },
                                {
                                    name: 'icon',
                                    type: 'text',
                                    label: 'Nama Ikon',
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            name: 'footerDescription',
            type: 'textarea',
            label: 'Deskripsi Footer',
        },
        {
            name: 'footerGroups',
            type: 'array',
            label: 'Kolom Link Footer',
            fields: [
                {
                    name: 'title',
                    type: 'text',
                    required: true,
                    label: 'Judul Kolom',
                },
                {
                    name: 'links',
                    type: 'array',
                    label: 'Daftar Link',
                    fields: [
                        {
                            name: 'label',
                            type: 'text',
                            required: true,
                            label: 'Label',
                        },
                        {
                            name: 'href',
                            type: 'text',
                            required: true,
                            label: 'Link',
                        },
                    ],
                },
            ],
        },
        {
            name: 'legalLinks',
            type: 'array',
            label: 'Link Legal',
            fields: [
                {
                    name: 'label',
                    type: 'text',
                    required: true,
                    label: 'Label',
                },
                {
                    name: 'href',
                    type: 'text',
                    required: true,
                    label: 'Link',
                },
            ],
        },
    ],
};
//# sourceMappingURL=SiteChrome.js.map