"use strict";
/**
 * Seed script for LMS CMS.
 * Populates Payload CMS with initial dummy content used by the landing page.
 *
 * Run from lms-cms:
 *   pnpm seed
 *
 * Required environment:
 *   NEXT_PUBLIC_CMS_URL or default http://localhost:3001
 *
 * Optional:
 *   SEED_MEDIA_SOURCE_DIR to override the local media source folder
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const module_1 = require("module");
const CMS_URL = (process.env.NEXT_PUBLIC_CMS_URL || "http://localhost:3001").replace(/\/$/, "");
const MEDIA_SOURCE_DIR = process.env.SEED_MEDIA_SOURCE_DIR ||
    path_1.default.resolve(process.cwd(), "..", "lms-landing-page", "public");
let payloadPromise = null;
const require = (0, module_1.createRequire)(__filename);
try {
    const nextEnv = require("@next/env");
    if (nextEnv && !nextEnv.default) {
        nextEnv.default = nextEnv;
    }
}
catch (error) {
    console.warn("Tidak bisa memasang shim @next/env lebih awal:", error instanceof Error ? error.message : error);
}
const mediaSources = [
    { key: "heroBackground", file: "images/hero/hero_background.png", alt: "Latar hero perusahaan" },
    { key: "heroPoster", file: "images/hero/hero_background.png", alt: "Poster hero perusahaan" },
    { key: "logoDark", file: "images/hero/hero.png", alt: "Logo versi gelap" },
    { key: "collage1", file: "images/collage/kolase-1.jpg", alt: "Kolase produksi 1" },
    { key: "collage2", file: "images/collage/kolase-2.jpg", alt: "Kolase produksi 2" },
    { key: "collage4", file: "images/collage/kolase-4.jpg", alt: "Kolase produksi 4" },
    { key: "collage5", file: "images/collage/kolase-5.jpg", alt: "Kolase produksi 5" },
    { key: "teamAhmad", file: "images/team/ahmad-fauzi.png", alt: "Ahmad Fauzi" },
    { key: "teamBudi", file: "images/team/budi-santoso.png", alt: "Budi Santoso" },
    { key: "teamIlham", file: "images/team/muhammad-ilham.png", alt: "Muhammad Ilham" },
    { key: "blogIso", file: "images/blog/iso-certification.png", alt: "ISO certification" },
    { key: "blogHalal", file: "images/blog/halal-packaging.png", alt: "Halal packaging" },
    { key: "blogFood", file: "images/blog/food-tips.png", alt: "Food tips" },
    { key: "blogIndustrial", file: "images/blog/industrial-trends.png", alt: "Industrial trends" },
    { key: "blogEco", file: "images/blog/eco-packaging.png", alt: "Eco packaging" },
    { key: "blogFactory", file: "images/blog/factory-cikarang.png", alt: "Factory Cikarang" },
    { key: "blogEcommerce", file: "images/blog/ecommerce-packaging.png", alt: "E-commerce packaging" },
    { key: "blogCustom", file: "images/blog/custom-packaging.png", alt: "Custom packaging" },
    { key: "productPackaging", file: "images/products/packaging.png", alt: "Kemasan produk" },
    { key: "productRolls", file: "images/products/rolls.png", alt: "Roll material" },
];
const seedState = {};
const emptyRichText = (paragraphs) => ({
    root: {
        type: "root",
        format: "",
        indent: 0,
        direction: "ltr",
        version: 1,
        children: paragraphs.map((paragraph) => ({
            type: "paragraph",
            version: 1,
            indent: 0,
            format: "",
            direction: "ltr",
            children: [
                {
                    type: "text",
                    version: 1,
                    text: paragraph,
                    detail: 0,
                    format: 0,
                    mode: "normal",
                    style: "",
                },
            ],
        })),
    },
});
const companyMissionParagraphs = [
    "MRS hadir bukan sekadar sebagai pemasok kemasan plastik, melainkan sebagai mitra strategis pertumbuhan bisnis yang membawa kemakmuran dan keberkahan.",
    "Melalui standar Halgreen, program MOP, dan total support, MRS berkomitmen menjadi wasilah ketenangan dan pertumbuhan bisnis mitra distributor di seluruh Indonesia.",
    "Kemasan bukan hanya pelengkap transaksi, tetapi fondasi penting bagi kelancaran rantai pasok bisnis Anda.",
    "Kami menjalankan proses produksi yang terukur, higienis, dan berlandaskan prinsip kepatuhan syariat.",
    "Fokus kami adalah menghadirkan kualitas kemasan yang konsisten, kuat, dan minim komplain agar mitra bisa fokus pada ekspansi penjualan.",
];
const mediaFallback = (key) => seedState[key];
async function getCmsPayload() {
    if (!payloadPromise) {
        const { getPayload } = await Promise.resolve().then(() => __importStar(require("payload")));
        const { default: payloadConfig } = await Promise.resolve().then(() => __importStar(require("./payload.config")));
        payloadPromise = getPayload({ config: payloadConfig });
    }
    return payloadPromise;
}
async function ensureMedia(source) {
    const fileName = path_1.default.basename(source.file);
    const payload = await getCmsPayload();
    try {
        const existing = await payload.find({
            collection: "media",
            where: {
                filename: { equals: fileName },
            },
            limit: 1,
            depth: 0,
            overrideAccess: true,
        });
        const current = existing.docs?.[0];
        if (current?.id) {
            return current;
        }
    }
    catch (error) {
        console.warn(`[media] lookup gagal untuk ${fileName}:`, error instanceof Error ? error.message : error);
    }
    const absPath = path_1.default.resolve(MEDIA_SOURCE_DIR, source.file);
    try {
        const doc = await payload.create({
            collection: "media",
            data: { alt: source.alt },
            filePath: absPath,
            overrideAccess: true,
        });
        if (doc?.id) {
            return doc;
        }
    }
    catch (error) {
        console.warn(`[media] upload gagal untuk ${absPath}:`, error instanceof Error ? error.message : error);
    }
    return undefined;
}
async function seedMediaAssets() {
    console.log("Seeding media...");
    for (const source of mediaSources) {
        const doc = await ensureMedia(source);
        if (doc) {
            seedState[source.key] = doc;
            console.log(`  ok media ${source.key} -> ${doc.id}`);
        }
        else {
            console.log(`  skip media ${source.key}`);
        }
    }
}
async function upsertGlobal(slug, data) {
    const payload = await getCmsPayload();
    const result = await payload.updateGlobal({
        slug: slug,
        data: data,
        overrideAccess: true,
    });
    console.log(`  ok global ${slug}`);
    return result;
}
async function findCollectionItem(slug, field, value) {
    const payload = await getCmsPayload();
    const result = await payload.find({
        collection: slug,
        where: {
            [field]: { equals: value },
        },
        limit: 1,
        depth: 0,
        overrideAccess: true,
    });
    return result.docs?.[0];
}
async function upsertCollectionItem(slug, uniqueField, data) {
    const uniqueValue = data[uniqueField];
    if (typeof uniqueValue !== "string" || !uniqueValue.trim()) {
        throw new Error(`Missing unique field ${uniqueField} for collection ${slug}`);
    }
    const existing = await findCollectionItem(slug, uniqueField, uniqueValue);
    const payload = await getCmsPayload();
    if (existing?.id) {
        await payload.update({
            collection: slug,
            id: existing.id,
            data: data,
            overrideAccess: true,
        });
        console.log(`  ok update ${slug}:${uniqueValue}`);
        return;
    }
    await payload.create({
        collection: slug,
        data: data,
        overrideAccess: true,
    });
    console.log(`  ok create ${slug}:${uniqueValue}`);
}
async function seedCollections() {
    console.log("Seeding collections...");
    const testimonials = [
        {
            name: "Rizky Ananda",
            company: "PT Mitra Boga Nusantara",
            role: "Procurement Manager",
            quote: "MRS konsisten menjaga spesifikasi material dan ketepatan pengiriman untuk kebutuhan kemasan kami.",
            rating: 5,
            isPublished: true,
            order: 1,
        },
        {
            name: "Nur Aisyah",
            company: "Sahabat Retail Indonesia",
            role: "Head of Packaging Development",
            quote: "Kolaborasi dengan MRS terasa seperti bekerja dengan mitra operasional, bukan sekadar vendor.",
            rating: 5,
            isPublished: true,
            order: 2,
        },
        {
            name: "Daniel Saputra",
            company: "Aruna Industrial Supply",
            role: "Operations Director",
            quote: "Kapasitas produksi, kontrol kualitas, dan komitmen mereka memberi rasa aman untuk ekspansi jangka panjang.",
            rating: 5,
            isPublished: true,
            order: 3,
        },
    ];
    for (const item of testimonials) {
        await upsertCollectionItem("testimonials", "name", item);
    }
    const team = [
        {
            name: "Ahmad Fauzi",
            role: "Chief Executive Officer",
            bio: "Memimpin arah ekspansi perusahaan dengan fokus pada tata kelola dan kemitraan jangka panjang.",
            linkedIn: "/kontak",
            isPublished: true,
            order: 1,
            photo: mediaFallback("teamAhmad")?.id,
        },
        {
            name: "Budi Santoso",
            role: "Head of Manufacturing Excellence",
            bio: "Mengawal integrasi lini produksi, quality control, dan efisiensi proses.",
            linkedIn: "/kontak",
            isPublished: true,
            order: 2,
            photo: mediaFallback("teamBudi")?.id,
        },
        {
            name: "Muhammad Ilham",
            role: "Commercial & Business Solutions Lead",
            bio: "Menerjemahkan kebutuhan industri menjadi solusi kemasan yang relevan dan scalable.",
            linkedIn: "/kontak",
            isPublished: true,
            order: 3,
            photo: mediaFallback("teamIlham")?.id,
        },
    ];
    for (const item of team) {
        await upsertCollectionItem("team", "name", item);
    }
    const certifications = [
        {
            name: "ISO 9001:2015",
            issuer: "Badan Sertifikasi Nasional",
            description: "Sistem manajemen mutu yang membantu menjaga konsistensi hasil.",
            year: 2027,
            isPublished: true,
            order: 1,
            logo: mediaFallback("blogIso")?.id,
        },
        {
            name: "Halal MUI",
            issuer: "Majelis Ulama Indonesia",
            description: "Dukungan kepatuhan untuk lini produk tertentu.",
            year: 2026,
            isPublished: true,
            order: 2,
            logo: mediaFallback("blogHalal")?.id,
        },
        {
            name: "SNI",
            issuer: "Badan Standardisasi Nasional",
            description: "Pemenuhan standar nasional yang relevan dengan kebutuhan industri.",
            year: 2028,
            isPublished: true,
            order: 3,
            logo: mediaFallback("blogCustom")?.id,
        },
    ];
    for (const item of certifications) {
        await upsertCollectionItem("certifications", "name", item);
    }
    const industries = [
        {
            name: "Food & Beverage",
            icon: "Utensils",
            description: "Kemasan aman untuk kebutuhan makanan dan minuman.",
            expertiseSummary: "Solusi food grade yang rapi dan konsisten.",
            applications: [{ text: "Stand-up pouch" }, { text: "Vacuum bag" }, { text: "Tray sealing" }],
            isPublished: true,
            order: 1,
            image: mediaFallback("blogFood")?.id,
        },
        {
            name: "Retail & E-commerce",
            icon: "ShoppingBag",
            description: "Kemasan yang mendukung pengiriman dan branding retail.",
            expertiseSummary: "Ringan, kuat, dan siap dipakai untuk distribusi.",
            applications: [{ text: "Mailer bag" }, { text: "Shopping bag" }, { text: "Custom box" }],
            isPublished: true,
            order: 2,
            image: mediaFallback("blogEcommerce")?.id,
        },
        {
            name: "Industrial",
            icon: "Factory",
            description: "Kemasan untuk kebutuhan operasional dan manufaktur.",
            expertiseSummary: "Dirancang untuk volume besar dan penggunaan berat.",
            applications: [{ text: "Bulk bag" }, { text: "Drum liner" }, { text: "Protective film" }],
            isPublished: true,
            order: 3,
            image: mediaFallback("blogIndustrial")?.id,
        },
        {
            name: "Custom Solutions",
            icon: "MoreHorizontal",
            description: "Solusi khusus sesuai spesifikasi proyek.",
            expertiseSummary: "Fleksibel untuk kebutuhan unik mitra.",
            applications: [{ text: "Private label" }, { text: "OEM" }, { text: "Design support" }],
            isPublished: true,
            order: 4,
            image: mediaFallback("blogCustom")?.id,
        },
    ];
    for (const item of industries) {
        await upsertCollectionItem("industries", "name", item);
    }
    const innovations = [
        {
            title: "Material development",
            description: "Pengembangan material untuk kualitas dan efisiensi yang lebih baik.",
            icon: "FlaskConical",
            tags: [{ text: "R&D" }, { text: "Material" }],
            isPublished: true,
            order: 1,
            image: mediaFallback("blogEco")?.id,
        },
        {
            title: "Quality intelligence",
            description: "Kontrol kualitas berlapis untuk menjaga hasil produksi tetap stabil.",
            icon: "ScanSearch",
            tags: [{ text: "QC" }, { text: "Traceability" }],
            isPublished: true,
            order: 2,
            image: mediaFallback("blogIndustrial")?.id,
        },
        {
            title: "Operational sustainability",
            description: "Perbaikan proses untuk menekan waste dan meningkatkan efisiensi.",
            icon: "Leaf",
            tags: [{ text: "Efficiency" }, { text: "Sustainability" }],
            isPublished: true,
            order: 3,
            image: mediaFallback("blogFactory")?.id,
        },
    ];
    for (const item of innovations) {
        await upsertCollectionItem("innovations", "title", item);
    }
    const projects = [
        {
            title: "Kemasan Food Grade",
            slug: "kemasan-food-grade",
            description: "Solusi kemasan aman untuk kebutuhan makanan dan minuman.",
            category: "F&B",
            client: "PT Mitra Boga Nusantara",
            year: 2024,
            tags: [{ tag: "Food Grade" }, { tag: "Halal Ready" }],
            isPublished: true,
            order: 1,
            image: mediaFallback("blogFood")?.id,
        },
        {
            title: "Industrial Packaging",
            slug: "industrial-packaging",
            description: "Kemasan kuat untuk kebutuhan manufaktur dan logistik.",
            category: "Industrial",
            client: "PT Manufacturing Jaya",
            year: 2024,
            tags: [{ tag: "Heavy Duty" }, { tag: "Custom Size" }],
            isPublished: true,
            order: 2,
            image: mediaFallback("blogIndustrial")?.id,
        },
        {
            title: "E-commerce Solutions",
            slug: "ecommerce-solutions",
            description: "Kemasan yang membantu pengiriman sekaligus branding digital.",
            category: "E-commerce",
            client: "PT E-Commerce Asia",
            year: 2023,
            tags: [{ tag: "Courier Bag" }, { tag: "Waterproof" }],
            isPublished: true,
            order: 3,
            image: mediaFallback("blogEcommerce")?.id,
        },
    ];
    for (const item of projects) {
        await upsertCollectionItem("projects", "slug", item);
    }
    const posts = [
        {
            title: "Inovasi kemasan yang tetap efisien untuk distribusi",
            slug: "inovasi-kemasan-efisien",
            excerpt: "Bagaimana pendekatan material dan proses membantu kemasan tetap kuat tanpa membuat biaya membengkak.",
            category: "packaging",
            publishedAt: "2025-03-15T00:00:00.000Z",
            isPublished: true,
            author: "Tim Redaksi",
            content: emptyRichText([
                "Inovasi kemasan perlu tetap relevan dengan kebutuhan operasional.",
                "Tujuannya bukan hanya tampil menarik, tetapi juga efisien, aman, dan mudah didistribusikan.",
            ]),
            tags: [{ tag: "Packaging" }, { tag: "Efisiensi" }],
            thumbnail: mediaFallback("blogEco")?.id,
        },
        {
            title: "Tips memilih material untuk produk food grade",
            slug: "tips-material-food-grade",
            excerpt: "Panduan singkat untuk menyesuaikan material kemasan dengan kebutuhan produk makanan dan minuman.",
            category: "industri",
            publishedAt: "2025-03-10T00:00:00.000Z",
            isPublished: true,
            author: "Tim Redaksi",
            content: emptyRichText([
                "Food grade adalah kombinasi antara keamanan, ketahanan, dan kejelasan spesifikasi.",
                "Pemilihan material yang tepat membantu menjaga kualitas produk sampai ke tangan konsumen.",
            ]),
            tags: [{ tag: "Food Grade" }, { tag: "Tips" }],
            thumbnail: mediaFallback("blogFood")?.id,
        },
        {
            title: "Meningkatkan efisiensi dengan alur produksi yang rapi",
            slug: "efisiensi-alur-produksi",
            excerpt: "Alur produksi yang jelas membuat quality control, pengiriman, dan komunikasi mitra lebih mudah dijalankan.",
            category: "umum",
            publishedAt: "2025-02-28T00:00:00.000Z",
            isPublished: true,
            author: "Tim Redaksi",
            content: emptyRichText([
                "Efisiensi lahir dari proses yang sederhana, terukur, dan mudah dipantau.",
                "Saat proses rapi, tim dapat bergerak lebih cepat tanpa kehilangan kontrol atas kualitas.",
            ]),
            tags: [{ tag: "Produksi" }, { tag: "Efisiensi" }],
            thumbnail: mediaFallback("blogIndustrial")?.id,
        },
    ];
    for (const item of posts) {
        await upsertCollectionItem("posts", "slug", item);
    }
}
async function seedGlobals() {
    console.log("Seeding globals...");
    await upsertGlobal("company-profile", {
        siteName: "MRS - Multi National Plastic Packaging",
        tagline: "Mitra kemasan plastik yang value-first, responsif, dan konsisten",
        description: "MRS membantu brand dan distributor menjaga kualitas kemasan, stabilitas pasokan, dan ketenangan operasional di seluruh Indonesia.",
        vision: "Kemitraan kemasan yang kuat, rapi, dan bertumbuh bersama.",
        mission: emptyRichText(companyMissionParagraphs),
        foundedYear: 2001,
        logo: mediaFallback("heroBackground")?.id,
        logoDark: mediaFallback("logoDark")?.id,
        defaultOgImage: mediaFallback("heroBackground")?.id,
        overviewHighlights: [
            { text: "Kemitraan yang transparan dan responsif" },
            { text: "Proses produksi yang rapi dan konsisten" },
            { text: "Dukungan nasional untuk pertumbuhan jangka panjang" },
        ],
        footerDescription: "MRS membantu mitra menjaga kualitas kemasan, kelancaran distribusi, dan konsistensi layanan dengan pendekatan yang value-first.",
        socialLinks: [
            { platform: "linkedin", url: "/kontak" },
            { platform: "instagram", url: "/kontak" },
        ],
        overviewEyebrow: "Company Profile",
        overviewHeadline: "Membangun kemitraan yang rapi dari produksi sampai distribusi",
        overviewDescription: "Kami memadukan fasilitas, proses, dan layanan yang dirancang agar kebutuhan mitra tetap berjalan stabil.",
        overviewBadgeLabel: "Aktif melayani kebutuhan nasional",
        overviewMediaLabel: "Profil perusahaan",
        overviewVideoMode: "video",
        overviewVideoUrl: "/videos/plastic.mp4",
        overviewVideoPoster: mediaFallback("heroPoster")?.id,
        peopleEyebrow: "Tim",
        peopleHeadline: "Orang-orang di balik eksekusi harian",
        peopleDescription: "Tim kami fokus menjaga komunikasi, produksi, dan delivery agar pengalaman mitra tetap nyaman dari awal sampai akhir.",
        peopleCtaLabel: "Kenal tim kami",
        testimonialEyebrow: "Testimoni",
        testimonialHeadline: "Apa kata mitra tentang kerja sama dengan MRS",
        testimonialDescription: "Cuplikan komentar yang menggambarkan bagaimana tim, proses, dan kualitas kami dirasakan di lapangan.",
        certificationEyebrow: "Sertifikasi",
        certificationHeadline: "Penguatan mutu dan kepatuhan yang bisa diverifikasi",
        certificationDescription: "Kami menjaga standar operasional lewat sertifikasi dan praktik kerja yang mendukung kualitas konsisten.",
        certificationBadgeTitle: "Dokumen pendukung siap dibagikan",
        certificationBadgeDescription: "Sertifikasi dan bukti kepatuhan dapat ditinjau saat dibutuhkan.",
        certificationDownloadLabel: "Unduh sertifikat",
        locationEyebrow: "Lokasi",
        locationHeadline: "Jejak operasional yang siap melayani kebutuhan nasional",
        locationHighlight: "nasional",
        locationDescription: "Kami menempatkan titik layanan dan koordinasi di lokasi yang memudahkan distribusi, komunikasi, dan respons yang cepat.",
        locationPrimaryLabel: "Lokasi utama",
        locationMapLabel: "Peta lokasi",
        locationMapHint: "Lihat titik kantor dan fasilitas kami pada peta interaktif.",
        productEyebrow: "Produk",
        productHeadline: "Pilihan produk untuk kebutuhan distribusi dan retail",
        productDescription: "Dari kebutuhan standard hingga custom, kami menyesuaikan bentuk dan spesifikasi produk dengan target penggunaan.",
        productPrompt: "Jelajahi pilihan produk yang paling sesuai dengan kebutuhan Anda.",
        productCtaLabel: "Lihat produk",
        solutionEyebrow: "Business Solutions",
        solutionHeadline: "Pendekatan solusi yang relevan untuk tiap kebutuhan",
        solutionHighlight: "dan terukur",
        solutionDescription: "Setiap industri punya ritme, target, dan tantangan yang berbeda. Kami menyesuaikan material, bentuk, dan alur kerja agar kemasan benar-benar membantu bisnis berjalan lebih lancar.",
        solutionPrompt: "Diskusikan kebutuhan kemasan Anda bersama tim kami.",
        solutionCtaLabel: "Hubungi kami",
        expertiseEyebrow: "Our Expertise",
        expertiseHeadline: "Solusi kemasan untuk kebutuhan industri yang terus bergerak",
        expertiseDescription: "Kami merancang kemasan yang tidak hanya fungsional, tetapi juga membantu alur distribusi, kualitas, dan pengalaman brand.",
        expertiseCtaLabel: "Lihat keahlian",
        expertiseSwipeHint: "Geser untuk melihat area fokus",
        innovationEyebrow: "Inovasi",
        innovationHeadline: "Perbaikan berkelanjutan yang menjaga kualitas tetap stabil",
        innovationHighlight: "yang stabil",
        innovationDescription: "Kami terus menyempurnakan proses produksi, inspeksi, dan efisiensi operasional agar hasil yang diterima mitra tetap konsisten.",
        projectEyebrow: "Proyek Pilihan",
        projectHeadline: "Contoh hasil kerja yang mewakili variasi kebutuhan industri",
        projectHighlight: "hasil kerja",
        projectDescription: "Ragam proyek berikut memberi gambaran bagaimana solusi kemasan kami diterapkan pada kebutuhan yang berbeda-beda.",
        projectCtaLabel: "Lihat semua proyek",
        newsEyebrow: "Berita Terbaru",
        newsHeadline: "Insight, pembaruan, dan cerita produksi",
        newsHighlight: "pembaruan",
        newsDescription: "Konten singkat seputar inovasi, operasional, dan wawasan industri yang bisa membantu pengambilan keputusan.",
        newsCtaLabel: "Baca berita",
        newsAllLabel: "Semua berita",
        blogSearchPlaceholder: "Cari artikel",
        blogNoResultsLabel: "Tidak ada artikel yang cocok.",
        blogResultsPrefix: "Menampilkan",
        blogResultsSuffix: "artikel",
        blogReadMoreLabel: "Baca selengkapnya",
    });
    await upsertGlobal("brand-promise", {
        eyebrow: "Brand Promise",
        headline: "Kemitraan yang kuat dimulai dari proses yang rapi",
        subheadline: "Kami menjaga kualitas, komunikasi, dan ketepatan eksekusi agar mitra dapat fokus pada pertumbuhan bisnis.",
        visionPoints: [
            { text: "Menjaga kualitas yang konsisten di setiap batch" },
            { text: "Memberi respons yang cepat dan jelas" },
            { text: "Membangun hubungan yang adil dan jangka panjang" },
        ],
        valuesTitle: "Nilai utama",
        missionTitle: "Misi operasional",
        items: [
            {
                icon: "Heart",
                title: "Kepercayaan",
                description: "Membangun relasi kerja yang jelas, terbuka, dan mudah diandalkan.",
            },
            {
                icon: "Shield",
                title: "Konsistensi",
                description: "Menjaga standar mutu agar hasil tetap stabil dari waktu ke waktu.",
            },
            {
                icon: "Users",
                title: "Kolaborasi",
                description: "Menyelaraskan kebutuhan mitra dengan kapasitas dan proses yang ada.",
            },
            {
                icon: "Leaf",
                title: "Keberlanjutan",
                description: "Mendorong proses yang lebih efisien dan bertanggung jawab.",
            },
        ],
    });
    await upsertGlobal("contact", {
        sectionHeadline: "Hubungi tim kami",
        sectionDescription: "Ceritakan kebutuhan kemasan Anda, lalu kami bantu arahkan ke solusi yang paling pas.",
        formTitle: "Form Kontak",
        submitLabel: "Kirim Permintaan",
        emailSubject: "Konsultasi kebutuhan kemasan",
        email: "sales.demo@mrs-packaging.test",
        phone: "+62 (21) 5555-1020",
        whatsapp: "6281234567890",
        address: "Jl. Industri Plastik No. 12, Cakung, Jakarta Timur 13910",
        mapsEmbedUrl: "https://www.google.com/maps?q=Jl.%20Industri%20Plastik%20No.%2012%2C%20Cakung%2C%20Jakarta%20Timur%2013910&output=embed",
        operationalHours: "Senin - Jumat: 08:00 - 17:00 WIB",
    });
    await upsertGlobal("locations", {
        locations: [
            {
                label: "Kantor pusat",
                city: "Jakarta",
                address: "Jl. Industri Plastik No. 12, Cakung, Jakarta Timur 13910",
                description: "Koordinasi komersial, layanan pelanggan, dan pusat komunikasi nasional.",
                phone: "+62 (21) 5555-1020",
                isPrimary: true,
            },
            {
                label: "Fasilitas produksi",
                city: "Cikarang",
                address: "Kawasan Industri Delta Silicon, Cikarang, Jawa Barat",
                description: "Area produksi dan quality control untuk kebutuhan skala besar.",
                phone: "+62 (21) 5555-1021",
            },
            {
                label: "Pusat distribusi",
                city: "Surabaya",
                address: "Jl. Margomulyo Industri, Surabaya, Jawa Timur",
                description: "Mempercepat pengiriman untuk Jawa Timur, Bali, dan Indonesia Timur.",
                phone: "+62 (31) 5555-1022",
            },
        ],
    });
    await upsertGlobal("stats", {
        items: [
            { value: "25", suffix: "+", label: "Tahun pengalaman" },
            { value: "500", suffix: "+", label: "Mitra dan klien" },
            { value: "50", suffix: "Juta", label: "Produksi per tahun" },
            { value: "15", suffix: "+", label: "Standar dan sertifikasi" },
        ],
    });
    await upsertGlobal("production-process", {
        headline: "Alur produksi yang terukur dari awal sampai akhir",
        introDescription: "Kami menjaga setiap tahap tetap terkendali agar output yang diterima mitra sesuai spesifikasi dan jadwal.",
        ctaLabel: "Pelajari proses",
        ctaHref: "/tentang-kami",
        stages: [
            {
                step: 1,
                title: "Analisis kebutuhan",
                description: "Tim kami memetakan kebutuhan material, ukuran, dan tujuan penggunaan sebelum produksi dimulai.",
                icon: "Settings",
            },
            {
                step: 2,
                title: "Produksi terkontrol",
                description: "Setiap batch dipantau agar ketebalan, kekuatan, dan hasil akhir tetap stabil.",
                icon: "Shield",
            },
            {
                step: 3,
                title: "Quality control",
                description: "Pemeriksaan visual dan fungsional dilakukan sebelum produk dikirim ke mitra.",
                icon: "Award",
            },
            {
                step: 4,
                title: "Distribusi cepat",
                description: "Produk dikemas dan dikirim dengan alur yang memudahkan penerimaan di lokasi tujuan.",
                icon: "Truck",
            },
        ],
    });
    await upsertGlobal("homepage-hero", {
        titlePrimary: "MRS",
        titleSecondary: "Kemasan Plastik untuk Bisnis yang Bertumbuh",
        description: "Kemitraan value-first untuk produksi, kualitas, dan distribusi kemasan yang stabil di seluruh Indonesia.",
        primaryCtaLabel: "Lihat solusi",
        primaryCtaHref: "/layanan",
        secondaryCtaLabel: "Tonton profil",
        secondaryCtaHref: "/tentang-kami",
        mediaType: "video",
        backgroundVideoUrl: "/videos/plastic.webm",
        backgroundImage: mediaFallback("heroBackground")?.id,
        posterImage: mediaFallback("heroPoster")?.id,
        supportImages: [
            { image: mediaFallback("collage1")?.id, alt: "Produksi kemasan" },
            { image: mediaFallback("collage2")?.id, alt: "Hasil kemasan" },
            { image: mediaFallback("collage4")?.id, alt: "Quality control" },
            { image: mediaFallback("collage5")?.id, alt: "Distribusi" },
        ],
    });
    await upsertGlobal("site-chrome", {
        headerCtaLabel: "Hubungi Kami",
        headerCtaHref: "/kontak",
        navigationItems: [
            { label: "Beranda", href: "/" },
            {
                label: "Tentang Kami",
                href: "/tentang-kami",
                megaMenuGroups: [
                    {
                        title: "Perusahaan",
                        icon: "Blocks",
                        links: [
                            {
                                label: "Profil Perusahaan",
                                href: "/tentang-kami#company-profile",
                                description: "Gambaran singkat tentang perusahaan dan arah kemitraan.",
                                icon: "Sparkles",
                            },
                            {
                                label: "Brand Promise",
                                href: "/tentang-kami#tentang",
                                description: "Nilai inti dan misi operasional yang dijalankan.",
                                icon: "ShieldCheck",
                            },
                        ],
                    },
                    {
                        title: "Tentang Operasi",
                        icon: "Factory",
                        links: [
                            {
                                label: "Proses Produksi",
                                href: "/tentang-kami#proses-produksi",
                                description: "Alur kerja produksi yang terukur.",
                                icon: "Truck",
                            },
                            {
                                label: "Tim",
                                href: "/tentang-kami#people",
                                description: "Orang-orang yang menjalankan eksekusi harian.",
                                icon: "Users",
                            },
                        ],
                    },
                ],
            },
            {
                label: "Layanan",
                href: "/layanan",
                megaMenuGroups: [
                    {
                        title: "Fokus Industri",
                        icon: "Factory",
                        links: [
                            {
                                label: "Food & Beverage",
                                href: "/layanan#business-solutions",
                                description: "Solusi untuk kebutuhan makanan dan minuman.",
                                icon: "Factory",
                            },
                            {
                                label: "Retail & E-commerce",
                                href: "/layanan#business-solutions",
                                description: "Kemasan yang mendukung pengiriman dan branding.",
                                icon: "Blocks",
                            },
                        ],
                    },
                    {
                        title: "Solusi Lain",
                        icon: "Leaf",
                        links: [
                            {
                                label: "Industrial",
                                href: "/layanan#business-solutions",
                                description: "Untuk kebutuhan manufaktur dan distribusi besar.",
                                icon: "Factory",
                            },
                            {
                                label: "Custom Solutions",
                                href: "/layanan#business-solutions",
                                description: "Penyesuaian sesuai spesifikasi proyek.",
                                icon: "Sparkles",
                            },
                        ],
                    },
                ],
            },
            { label: "Proyek", href: "/proyek" },
            { label: "Berita", href: "/berita" },
            { label: "Kontak", href: "/kontak" },
        ],
        footerDescription: "MRS membantu mitra menjaga kualitas kemasan, kelancaran distribusi, dan konsistensi layanan dengan pendekatan yang value-first.",
        footerGroups: [
            {
                title: "Perusahaan",
                links: [
                    { label: "Tentang Kami", href: "/tentang-kami" },
                    { label: "Proyek", href: "/proyek" },
                    { label: "Berita", href: "/berita" },
                ],
            },
            {
                title: "Layanan",
                links: [
                    { label: "Layanan", href: "/layanan" },
                    { label: "Keahlian", href: "/layanan#business-solutions" },
                    { label: "Proses Produksi", href: "/tentang-kami#proses-produksi" },
                ],
            },
            {
                title: "Informasi",
                links: [
                    { label: "Kontak", href: "/kontak" },
                    { label: "Lokasi", href: "/tentang-kami#lokasi" },
                    { label: "Sertifikasi", href: "/tentang-kami#sertifikasi" },
                ],
            },
        ],
        legalLinks: [
            { label: "Kebijakan Privasi", href: "/kebijakan-privasi" },
            { label: "Syarat dan Ketentuan", href: "/syarat-ketentuan" },
            { label: "Cookies", href: "/cookies" },
        ],
    });
}
async function main() {
    console.log("Memulai seed ke Payload CMS...");
    console.log(`CMS URL: ${CMS_URL}`);
    console.log(`Media source dir: ${MEDIA_SOURCE_DIR}`);
    await getCmsPayload();
    await seedMediaAssets();
    await seedCollections();
    await seedGlobals();
    console.log("Seed selesai.");
    process.exit(0);
}
main().catch((error) => {
    console.error("Seed gagal:", error);
    process.exit(1);
});
//# sourceMappingURL=seed.js.map