"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withFrontendCollectionSync = withFrontendCollectionSync;
exports.withFrontendGlobalSync = withFrontendGlobalSync;
const PUBLIC_ROUTES = ['/', '/tentang-kami', '/layanan', '/proyek', '/berita', '/kontak'];
const COLLECTION_SYNC_TARGETS = {
    posts: {
        paths: ['/', '/berita'],
        includeSlugPath: (doc) => (typeof doc.slug === 'string' ? `/berita/${doc.slug}` : null),
    },
    projects: { paths: ['/', '/proyek'] },
    testimonials: { paths: ['/'] },
    team: { paths: ['/', '/tentang-kami'] },
    certifications: { paths: ['/', '/tentang-kami'] },
    industries: { paths: ['/', '/layanan'] },
    innovations: { paths: ['/'] },
    media: { paths: PUBLIC_ROUTES },
};
const GLOBAL_SYNC_TARGETS = {
    'company-profile': { paths: ['/', '/tentang-kami', '/kontak'] },
    'homepage-hero': { paths: ['/'] },
    'brand-promise': { paths: ['/', '/tentang-kami'] },
    contact: { paths: ['/', '/kontak'] },
    locations: { paths: ['/', '/tentang-kami'] },
    stats: { paths: ['/', '/tentang-kami'] },
    'production-process': { paths: ['/', '/tentang-kami'] },
    'site-chrome': { paths: PUBLIC_ROUTES },
};
function uniquePaths(paths) {
    return Array.from(new Set(paths.filter((path) => Boolean(path))));
}
function getRevalidateEndpoint() {
    const directUrl = process.env.FRONTEND_REVALIDATE_URL?.replace(/\/$/, '');
    if (directUrl)
        return directUrl;
    const frontendUrl = process.env.FRONTEND_URL?.replace(/\/$/, '');
    return frontendUrl ? `${frontendUrl}/api/revalidate` : null;
}
async function notifyFrontend(source, paths) {
    const endpoint = getRevalidateEndpoint();
    const secret = process.env.REVALIDATE_SECRET;
    if (!endpoint || !secret) {
        console.warn(`[frontend-sync] Skip revalidate for ${source}: FRONTEND_REVALIDATE_URL/FRONTEND_URL or REVALIDATE_SECRET is missing.`);
        return;
    }
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${secret}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ paths, source }),
        });
        if (!response.ok) {
            const message = await response.text().catch(() => '');
            console.warn(`[frontend-sync] Revalidate failed for ${source}: ${response.status} ${message}`);
        }
    }
    catch (error) {
        console.warn(`[frontend-sync] Revalidate request failed for ${source}:`, error instanceof Error ? error.message : error);
    }
}
function buildCollectionPaths(slug, doc) {
    const target = COLLECTION_SYNC_TARGETS[slug];
    if (!target)
        return [];
    return uniquePaths([...(target.paths ?? []), doc && target.includeSlugPath?.(doc)]);
}
function withFrontendCollectionSync(collections) {
    return collections.map((collection) => {
        const afterChange = async ({ doc }) => {
            const paths = buildCollectionPaths(collection.slug, doc);
            if (paths.length > 0)
                await notifyFrontend(`collection:${collection.slug}`, paths);
            return doc;
        };
        const afterDelete = async ({ doc }) => {
            const paths = buildCollectionPaths(collection.slug, doc);
            if (paths.length > 0)
                await notifyFrontend(`collection:${collection.slug}:delete`, paths);
            return doc;
        };
        return {
            ...collection,
            hooks: {
                ...collection.hooks,
                afterChange: [...(collection.hooks?.afterChange ?? []), afterChange],
                afterDelete: [...(collection.hooks?.afterDelete ?? []), afterDelete],
            },
        };
    });
}
function withFrontendGlobalSync(globals) {
    return globals.map((global) => {
        const afterChange = async ({ doc }) => {
            const paths = uniquePaths(GLOBAL_SYNC_TARGETS[global.slug]?.paths ?? []);
            if (paths.length > 0)
                await notifyFrontend(`global:${global.slug}`, paths);
            return doc;
        };
        return {
            ...global,
            hooks: {
                ...global.hooks,
                afterChange: [...(global.hooks?.afterChange ?? []), afterChange],
            },
        };
    });
}
//# sourceMappingURL=revalidateFrontend.js.map