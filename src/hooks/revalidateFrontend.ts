import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  CollectionConfig,
  GlobalAfterChangeHook,
  GlobalConfig,
} from 'payload'

type SyncTarget = {
  paths: string[]
  includeSlugPath?: (doc: Record<string, unknown>) => string | null
}

const PUBLIC_ROUTES = ['/', '/tentang-kami', '/layanan', '/proyek', '/berita', '/kontak', '/pengetahuan-produk', '/program-mitra']

const COLLECTION_SYNC_TARGETS: Record<string, SyncTarget> = {
  posts: {
    paths: ['/', '/berita'],
    includeSlugPath: (doc) => (typeof doc.slug === 'string' ? `/berita/${doc.slug}` : null),
  },
  projects: { paths: ['/', '/proyek', '/program-mitra'] },
  testimonials: { paths: ['/'] },
  team: { paths: ['/', '/tentang-kami'] },
  certifications: { paths: ['/', '/tentang-kami'] },
  industries: { paths: ['/', '/layanan', '/pengetahuan-produk'] },
  innovations: { paths: ['/', '/program-mitra'] },
  media: { paths: PUBLIC_ROUTES },
  leads: { paths: ['/kontak', '/program-mitra'] },
}

const GLOBAL_SYNC_TARGETS: Record<string, SyncTarget> = {
  'company-profile': { paths: ['/', '/tentang-kami', '/kontak'] },
  'homepage-hero': { paths: ['/'] },
  'brand-promise': { paths: ['/', '/tentang-kami'] },
  contact: { paths: ['/', '/kontak'] },
  locations: { paths: ['/', '/tentang-kami'] },
  stats: { paths: ['/', '/tentang-kami'] },
  'production-process': { paths: ['/', '/tentang-kami'] },
  'product-knowledge': { paths: ['/pengetahuan-produk'] },
  'program-mitra': { paths: ['/program-mitra'] },
  'site-chrome': { paths: PUBLIC_ROUTES },
}

function uniquePaths(paths: Array<string | null | undefined>) {
  return Array.from(new Set(paths.filter((path): path is string => Boolean(path))))
}

function getRevalidateEndpoint() {
  const directUrl = process.env.FRONTEND_REVALIDATE_URL?.replace(/\/$/, '')
  if (directUrl) return directUrl

  const frontendUrl = process.env.FRONTEND_URL?.replace(/\/$/, '')
  return frontendUrl ? `${frontendUrl}/api/revalidate` : null
}

async function notifyFrontend(source: string, paths: string[]) {
  const endpoint = getRevalidateEndpoint()
  const secret = process.env.REVALIDATE_SECRET

  if (!endpoint || !secret) {
    console.warn(
      `[frontend-sync] Skip revalidate for ${source}: FRONTEND_REVALIDATE_URL/FRONTEND_URL or REVALIDATE_SECRET is missing.`,
    )
    return
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secret}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ paths, source }),
    })

    if (!response.ok) {
      const message = await response.text().catch(() => '')
      console.warn(`[frontend-sync] Revalidate failed for ${source}: ${response.status} ${message}`)
    }
  } catch (error) {
    console.warn(
      `[frontend-sync] Revalidate request failed for ${source}:`,
      error instanceof Error ? error.message : error,
    )
  }
}

function buildCollectionPaths(slug: string, doc: Record<string, unknown> | undefined) {
  const target = COLLECTION_SYNC_TARGETS[slug]
  if (!target) return []

  return uniquePaths([...(target.paths ?? []), doc && target.includeSlugPath?.(doc)])
}

export function withFrontendCollectionSync(collections: CollectionConfig[]): CollectionConfig[] {
  return collections.map((collection) => {
    const afterChange: CollectionAfterChangeHook = async ({ doc }) => {
      const paths = buildCollectionPaths(collection.slug, doc as Record<string, unknown>)
      if (paths.length > 0) await notifyFrontend(`collection:${collection.slug}`, paths)
      return doc
    }

    const afterDelete: CollectionAfterDeleteHook = async ({ doc }) => {
      const paths = buildCollectionPaths(collection.slug, doc as Record<string, unknown>)
      if (paths.length > 0) await notifyFrontend(`collection:${collection.slug}:delete`, paths)
      return doc
    }

    return {
      ...collection,
      hooks: {
        ...collection.hooks,
        afterChange: [...(collection.hooks?.afterChange ?? []), afterChange],
        afterDelete: [...(collection.hooks?.afterDelete ?? []), afterDelete],
      },
    }
  })
}

export function withFrontendGlobalSync(globals: GlobalConfig[]): GlobalConfig[] {
  return globals.map((global) => {
    const afterChange: GlobalAfterChangeHook = async ({ doc }) => {
      const paths = uniquePaths(GLOBAL_SYNC_TARGETS[global.slug]?.paths ?? [])
      if (paths.length > 0) await notifyFrontend(`global:${global.slug}`, paths)
      return doc
    }

    return {
      ...global,
      hooks: {
        ...global.hooks,
        afterChange: [...(global.hooks?.afterChange ?? []), afterChange],
      },
    }
  })
}
