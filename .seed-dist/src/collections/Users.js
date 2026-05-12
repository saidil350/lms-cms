"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const isAdmin_1 = require("../access/isAdmin");
exports.Users = {
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
        create: isAdmin_1.isAdmin,
        read: ({ req: { user } }) => {
            if (!user)
                return false;
            if (user.role === 'admin')
                return true;
            // editor hanya bisa lihat diri sendiri
            return {
                id: {
                    equals: user.id,
                },
            };
        },
        update: ({ req: { user }, id }) => {
            if (!user)
                return false;
            if (user.role === 'admin')
                return true;
            return user.id === id;
        },
        delete: isAdmin_1.isAdmin,
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
};
//# sourceMappingURL=Users.js.map