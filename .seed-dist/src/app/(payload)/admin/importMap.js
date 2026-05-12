"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.importMap = void 0;
const rsc_1 = require("@payloadcms/richtext-lexical/rsc");
const rsc_2 = require("@payloadcms/richtext-lexical/rsc");
const rsc_3 = require("@payloadcms/richtext-lexical/rsc");
const client_1 = require("@payloadcms/richtext-lexical/client");
const client_2 = require("@payloadcms/richtext-lexical/client");
const client_3 = require("@payloadcms/richtext-lexical/client");
const client_4 = require("@payloadcms/richtext-lexical/client");
const client_5 = require("@payloadcms/richtext-lexical/client");
const client_6 = require("@payloadcms/richtext-lexical/client");
const client_7 = require("@payloadcms/richtext-lexical/client");
const client_8 = require("@payloadcms/richtext-lexical/client");
const client_9 = require("@payloadcms/richtext-lexical/client");
const client_10 = require("@payloadcms/richtext-lexical/client");
const client_11 = require("@payloadcms/storage-s3/client");
const rsc_4 = require("@payloadcms/next/rsc");
/** @type import('payload').ImportMap */
exports.importMap = {
    "@payloadcms/richtext-lexical/rsc#RscEntryLexicalCell": rsc_1.RscEntryLexicalCell,
    "@payloadcms/richtext-lexical/rsc#RscEntryLexicalField": rsc_2.RscEntryLexicalField,
    "@payloadcms/richtext-lexical/rsc#LexicalDiffComponent": rsc_3.LexicalDiffComponent,
    "@payloadcms/richtext-lexical/client#UploadFeatureClient": client_1.UploadFeatureClient,
    "@payloadcms/richtext-lexical/client#LinkFeatureClient": client_2.LinkFeatureClient,
    "@payloadcms/richtext-lexical/client#OrderedListFeatureClient": client_3.OrderedListFeatureClient,
    "@payloadcms/richtext-lexical/client#UnorderedListFeatureClient": client_4.UnorderedListFeatureClient,
    "@payloadcms/richtext-lexical/client#StrikethroughFeatureClient": client_5.StrikethroughFeatureClient,
    "@payloadcms/richtext-lexical/client#UnderlineFeatureClient": client_6.UnderlineFeatureClient,
    "@payloadcms/richtext-lexical/client#BoldFeatureClient": client_7.BoldFeatureClient,
    "@payloadcms/richtext-lexical/client#ItalicFeatureClient": client_8.ItalicFeatureClient,
    "@payloadcms/richtext-lexical/client#HeadingFeatureClient": client_9.HeadingFeatureClient,
    "@payloadcms/richtext-lexical/client#ParagraphFeatureClient": client_10.ParagraphFeatureClient,
    "@payloadcms/storage-s3/client#S3ClientUploadHandler": client_11.S3ClientUploadHandler,
    "@payloadcms/next/rsc#CollectionCards": rsc_4.CollectionCards
};
//# sourceMappingURL=importMap.js.map