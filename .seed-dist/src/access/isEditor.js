"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEditor = void 0;
const isEditor = ({ req: { user } }) => {
    return Boolean(user?.role === 'editor');
};
exports.isEditor = isEditor;
//# sourceMappingURL=isEditor.js.map