"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdminOrEditor = void 0;
const isAdminOrEditor = ({ req: { user } }) => {
    return Boolean(user?.role === 'admin' || user?.role === 'editor');
};
exports.isAdminOrEditor = isAdminOrEditor;
//# sourceMappingURL=isAdminOrEditor.js.map