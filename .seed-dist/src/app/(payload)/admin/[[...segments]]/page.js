"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMetadata = void 0;
const _payload_config_1 = __importDefault(require("@payload-config"));
const views_1 = require("@payloadcms/next/views");
const importMap_1 = require("../importMap");
const generateMetadata = ({ params, searchParams }) => (0, views_1.generatePageMetadata)({ config: _payload_config_1.default, params, searchParams });
exports.generateMetadata = generateMetadata;
const Page = ({ params, searchParams }) => (0, views_1.RootPage)({ config: _payload_config_1.default, importMap: importMap_1.importMap, params, searchParams });
exports.default = Page;
//# sourceMappingURL=page.js.map