"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OPTIONS = exports.PATCH = exports.DELETE = exports.POST = exports.GET = void 0;
const _payload_config_1 = __importDefault(require("@payload-config"));
const routes_1 = require("@payloadcms/next/routes");
exports.GET = (0, routes_1.REST_GET)(_payload_config_1.default);
exports.POST = (0, routes_1.REST_POST)(_payload_config_1.default);
exports.DELETE = (0, routes_1.REST_DELETE)(_payload_config_1.default);
exports.PATCH = (0, routes_1.REST_PATCH)(_payload_config_1.default);
exports.OPTIONS = (0, routes_1.REST_OPTIONS)(_payload_config_1.default);
//# sourceMappingURL=route.js.map