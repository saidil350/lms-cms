"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
const isAdmin = ({ req: { user } }) => {
    return Boolean(user?.role === 'admin');
};
exports.isAdmin = isAdmin;
//# sourceMappingURL=isAdmin.js.map