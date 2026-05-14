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

import path from "path";
import { createRequire } from "module";

const CMS_URL = (process.env.NEXT_PUBLIC_CMS_URL || "http://localhost:3001").replace(/\/$/, "");
const MEDIA_SOURCE_DIR =
  process.env.SEED_MEDIA_SOURCE_DIR ||
  path.resolve(process.cwd(), "..", "lms-landing-page", "public");

type MediaDoc = {
  id: string | number;
  filename?: string;
  alt?: string;
};

type SeedMedia = {
  key: string;
  file: string;
  alt: string;
};

type SeedCollectionItem = Record<string, unknown> & {
  slug?: string;
  name?: string;
  title?: string;
};

let payloadPromise: Promise<any> | null = null;
const requireFn = createRequire(import.meta.url);

try {
  const nextEnv = requireFn("@next/env");
  if (nextEnv && !nextEnv.default) {
    nextEnv.default = nextEnv;
  }
} catch (error) {
  console.warn(
    "Tidak bisa memasang shim @next/env lebih awal:",
    error instanceof Error ? error.message : error,
  );
}

const mediaSources: SeedMedia[] = [
  { key: "siteLogoDark", file: "generated-cms/logo-mark.svg", alt: "Logo versi gelap" },
  { key: "homepageHeroBackground", file: "generated-cms/hero-abstract.svg", alt: "Hero utama halaman beranda" },
  { key: "homepageHeroPoster", file: "generated-cms/hero-poster.svg", alt: "Poster hero halaman beranda" },
  { key: "homepageHeroSupportProduction", file: "generated-cms/collage-production.svg", alt: "Support hero produksi" },
  { key: "homepageHeroSupportQc", file: "generated-cms/collage-qc.svg", alt: "Support hero quality control" },
  { key: "homepageHeroSupportDistribution", file: "generated-cms/collage-distribution.svg", alt: "Support hero distribusi" },
  { key: "companyProfileMedia", file: "generated-cms/hero-abstract.svg", alt: "Visual company profile" },
  { key: "expertiseFoodBeverage", file: "generated-cms/blog-packaging.svg", alt: "Visual expertise food and beverage" },
  { key: "expertiseRetailEcommerce", file: "generated-cms/blog-ecommerce.svg", alt: "Visual expertise retail and e-commerce" },
  { key: "expertiseIndustrialPackaging", file: "generated-cms/blog-industry.svg", alt: "Visual expertise industrial" },
  { key: "expertiseCustomSolutions", file: "generated-cms/blog-innovation.svg", alt: "Visual expertise custom solutions" },
  { key: "productPackaging", file: "generated-cms/product-packaging.svg", alt: "Kemasan produk" },
  { key: "productRolls", file: "generated-cms/product-rolls.svg", alt: "Roll material" },
  { key: "projectFoodGrade", file: "generated-cms/blog-packaging.svg", alt: "Proyek food grade" },
  { key: "projectIndustrialPackaging", file: "generated-cms/blog-industry.svg", alt: "Proyek industrial" },
  { key: "projectEcommerceSolutions", file: "generated-cms/blog-ecommerce.svg", alt: "Proyek e-commerce" },
  { key: "innovationRAndD", file: "generated-cms/blog-innovation.svg", alt: "Inovasi riset dan pengembangan" },
  { key: "innovationQuality", file: "generated-cms/blog-certification.svg", alt: "Inovasi quality intelligence" },
  { key: "innovationSustainability", file: "generated-cms/blog-eco.svg", alt: "Inovasi keberlanjutan operasional" },
  { key: "teamLeaderAhmad", file: "generated-cms/team-portrait-1.svg", alt: "Ahmad Fauzi" },
  { key: "teamHeadManufacturing", file: "generated-cms/team-portrait-2.svg", alt: "Budi Santoso" },
  { key: "teamCommercialLead", file: "generated-cms/team-portrait-3.svg", alt: "Muhammad Ilham" },
  { key: "certificationIso", file: "generated-cms/blog-certification.svg", alt: "Sertifikasi ISO 9001:2015" },
  { key: "certificationHalal", file: "generated-cms/blog-innovation.svg", alt: "Sertifikasi Halal MUI" },
  { key: "certificationSni", file: "generated-cms/blog-packaging.svg", alt: "Sertifikasi SNI" },
  { key: "postPackaging", file: "generated-cms/blog-packaging.svg", alt: "Artikel packaging" },
  { key: "postFoodGrade", file: "generated-cms/blog-packaging.svg", alt: "Artikel food grade" },
  { key: "postIndustrial", file: "generated-cms/blog-industry.svg", alt: "Artikel industrial" },
  { key: "postEco", file: "generated-cms/blog-eco.svg", alt: "Artikel sustainability" },
  { key: "postEcommerce", file: "generated-cms/blog-ecommerce.svg", alt: "Artikel e-commerce" },
  { key: "postCustomSolutions", file: "generated-cms/blog-innovation.svg", alt: "Artikel custom packaging" },
  { key: "postCertification", file: "generated-cms/blog-certification.svg", alt: "Artikel sertifikasi" },
];

const seedState: Record<string, MediaDoc> = {};

const emptyRichText = (paragraphs: string[]) => ({
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

const mediaFallback = (key: string): MediaDoc | undefined => seedState[key];

async function getCmsPayload() {
  if (!payloadPromise) {
    const { getPayload } = await import("payload");
    const { default: payloadConfig } = await import("./payload.seed.config.ts");
    payloadPromise = getPayload({ config: payloadConfig });
  }

  return payloadPromise;
}

async function ensureMedia(source: SeedMedia): Promise<MediaDoc | undefined> {
  const fileName = path.basename(source.file);
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
  } catch (error) {
    console.warn(`[media] lookup gagal untuk ${fileName}:`, error instanceof Error ? error.message : error);
  }

  const absPath = path.resolve(MEDIA_SOURCE_DIR, source.file);

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
  } catch (error) {
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
    } else {
      console.log(`  skip media ${source.key}`);
    }
  }
}

async function upsertGlobal(slug: string, data: Record<string, unknown>) {
  const payload = await getCmsPayload();
  const result = await payload.updateGlobal({
    slug: slug as never,
    data: data as never,
    overrideAccess: true,
  });

  console.log(`  ok global ${slug}`);
  return result;
}

async function findCollectionItem(slug: string, field: string, value: string) {
  const payload = await getCmsPayload();
  const result = await payload.find({
    collection: slug as never,
    where: {
      [field]: { equals: value },
    } as never,
    limit: 1,
    depth: 0,
    overrideAccess: true,
  });

  return result.docs?.[0];
}

async function upsertCollectionItem(
  slug: string,
  uniqueField: "slug" | "name" | "title",
  data: SeedCollectionItem,
) {
  const uniqueValue = data[uniqueField];
  if (typeof uniqueValue !== "string" || !uniqueValue.trim()) {
    throw new Error(`Missing unique field ${uniqueField} for collection ${slug}`);
  }

  const existing = await findCollectionItem(slug, uniqueField, uniqueValue);
  const payload = await getCmsPayload();

  if (existing?.id) {
    await payload.update({
      collection: slug as never,
      id: existing.id,
      data: data as never,
      overrideAccess: true,
    });
    console.log(`  ok update ${slug}:${uniqueValue}`);
    return;
  }

  await payload.create({
    collection: slug as never,
    data: data as never,
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
      quote:
        "MRS konsisten menjaga spesifikasi material dan ketepatan pengiriman untuk kebutuhan kemasan kami.",
      rating: 5,
      isPublished: true,
      order: 1,
    },
    {
      name: "Nur Aisyah",
      company: "Sahabat Retail Indonesia",
      role: "Head of Packaging Development",
      quote:
        "Kolaborasi dengan MRS terasa seperti bekerja dengan mitra operasional, bukan sekadar vendor.",
      rating: 5,
      isPublished: true,
      order: 2,
    },
    {
      name: "Daniel Saputra",
      company: "Aruna Industrial Supply",
      role: "Operations Director",
      quote:
        "Kapasitas produksi, kontrol kualitas, dan komitmen mereka memberi rasa aman untuk ekspansi jangka panjang.",
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
      photo: mediaFallback("teamLeaderAhmad")?.id,
    },
    {
      name: "Budi Santoso",
      role: "Head of Manufacturing Excellence",
      bio: "Mengawal integrasi lini produksi, quality control, dan efisiensi proses.",
      linkedIn: "/kontak",
      isPublished: true,
      order: 2,
      photo: mediaFallback("teamHeadManufacturing")?.id,
    },
    {
      name: "Muhammad Ilham",
      role: "Commercial & Business Solutions Lead",
      bio: "Menerjemahkan kebutuhan industri menjadi solusi kemasan yang relevan dan scalable.",
      linkedIn: "/kontak",
      isPublished: true,
      order: 3,
      photo: mediaFallback("teamCommercialLead")?.id,
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
      logo: mediaFallback("certificationIso")?.id,
    },
    {
      name: "Halal MUI",
      issuer: "Majelis Ulama Indonesia",
      description: "Dukungan kepatuhan untuk lini produk tertentu.",
      year: 2026,
      isPublished: true,
      order: 2,
      logo: mediaFallback("certificationHalal")?.id,
    },
    {
      name: "SNI",
      issuer: "Badan Standardisasi Nasional",
      description: "Pemenuhan standar nasional yang relevan dengan kebutuhan industri.",
      year: 2028,
      isPublished: true,
      order: 3,
      logo: mediaFallback("certificationSni")?.id,
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
      image: mediaFallback("expertiseFoodBeverage")?.id,
    },
    {
      name: "Retail & E-commerce",
      icon: "ShoppingBag",
      description: "Kemasan yang mendukung pengiriman dan branding retail.",
      expertiseSummary: "Ringan, kuat, dan siap dipakai untuk distribusi.",
      applications: [{ text: "Mailer bag" }, { text: "Shopping bag" }, { text: "Custom box" }],
      isPublished: true,
      order: 2,
      image: mediaFallback("expertiseRetailEcommerce")?.id,
    },
    {
      name: "Industrial",
      icon: "Factory",
      description: "Kemasan untuk kebutuhan operasional dan manufaktur.",
      expertiseSummary: "Dirancang untuk volume besar dan penggunaan berat.",
      applications: [{ text: "Bulk bag" }, { text: "Drum liner" }, { text: "Protective film" }],
      isPublished: true,
      order: 3,
      image: mediaFallback("expertiseIndustrialPackaging")?.id,
    },
    {
      name: "Custom Solutions",
      icon: "MoreHorizontal",
      description: "Solusi khusus sesuai spesifikasi proyek.",
      expertiseSummary: "Fleksibel untuk kebutuhan unik mitra.",
      applications: [{ text: "Private label" }, { text: "OEM" }, { text: "Design support" }],
      isPublished: true,
      order: 4,
      image: mediaFallback("expertiseCustomSolutions")?.id,
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
      image: mediaFallback("innovationRAndD")?.id,
    },
    {
      title: "Quality intelligence",
      description: "Kontrol kualitas berlapis untuk menjaga hasil produksi tetap stabil.",
      icon: "ScanSearch",
      tags: [{ text: "QC" }, { text: "Traceability" }],
      isPublished: true,
      order: 2,
      image: mediaFallback("innovationQuality")?.id,
    },
    {
      title: "Operational sustainability",
      description: "Perbaikan proses untuk menekan waste dan meningkatkan efisiensi.",
      icon: "Leaf",
      tags: [{ text: "Efficiency" }, { text: "Sustainability" }],
      isPublished: true,
      order: 3,
      image: mediaFallback("innovationSustainability")?.id,
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
      image: mediaFallback("projectFoodGrade")?.id,
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
      image: mediaFallback("projectIndustrialPackaging")?.id,
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
      image: mediaFallback("projectEcommerceSolutions")?.id,
    },
  ];

  for (const item of projects) {
    await upsertCollectionItem("projects", "slug", item);
  }

  const posts = [
    {
      title: "Inovasi kemasan yang tetap efisien untuk distribusi",
      slug: "inovasi-kemasan-efisien",
      excerpt:
        "Bagaimana pendekatan material dan proses membantu kemasan tetap kuat tanpa membuat biaya membengkak.",
      category: "packaging",
      publishedAt: "2025-03-15T00:00:00.000Z",
      isPublished: true,
      author: "Tim Redaksi",
      content: emptyRichText([
        "Inovasi kemasan perlu tetap relevan dengan kebutuhan operasional.",
        "Tujuannya bukan hanya tampil menarik, tetapi juga efisien, aman, dan mudah didistribusikan.",
      ]),
      tags: [{ tag: "Packaging" }, { tag: "Efisiensi" }],
      thumbnail: mediaFallback("postEco")?.id,
    },
    {
      title: "Tips memilih material untuk produk food grade",
      slug: "tips-material-food-grade",
      excerpt:
        "Panduan singkat untuk menyesuaikan material kemasan dengan kebutuhan produk makanan dan minuman.",
      category: "industri",
      publishedAt: "2025-03-10T00:00:00.000Z",
      isPublished: true,
      author: "Tim Redaksi",
      content: emptyRichText([
        "Food grade adalah kombinasi antara keamanan, ketahanan, dan kejelasan spesifikasi.",
        "Pemilihan material yang tepat membantu menjaga kualitas produk sampai ke tangan konsumen.",
      ]),
      tags: [{ tag: "Food Grade" }, { tag: "Tips" }],
      thumbnail: mediaFallback("postFoodGrade")?.id,
    },
    {
      title: "Meningkatkan efisiensi dengan alur produksi yang rapi",
      slug: "efisiensi-alur-produksi",
      excerpt:
        "Alur produksi yang jelas membuat quality control, pengiriman, dan komunikasi mitra lebih mudah dijalankan.",
      category: "umum",
      publishedAt: "2025-02-28T00:00:00.000Z",
      isPublished: true,
      author: "Tim Redaksi",
      content: emptyRichText([
        "Efisiensi lahir dari proses yang sederhana, terukur, dan mudah dipantau.",
        "Saat proses rapi, tim dapat bergerak lebih cepat tanpa kehilangan kontrol atas kualitas.",
      ]),
      tags: [{ tag: "Produksi" }, { tag: "Efisiensi" }],
      thumbnail: mediaFallback("postIndustrial")?.id,
    },
    {
      title: "Kemasan custom yang membantu brand tampil lebih konsisten",
      slug: "kemasan-custom-brand-konsisten",
      excerpt:
        "Kemasan yang seragam membantu brand terlihat lebih rapi di rak, marketplace, dan jalur distribusi.",
      category: "packaging",
      publishedAt: "2025-02-20T00:00:00.000Z",
      isPublished: true,
      author: "Tim Redaksi",
      content: emptyRichText([
        "Desain kemasan bukan hanya soal tampilan, tetapi juga pengalaman brand yang berulang.",
        "Saat ukuran, warna, dan label konsisten, pelanggan lebih mudah mengenali produk.",
      ]),
      tags: [{ tag: "Branding" }, { tag: "Custom Packaging" }],
      thumbnail: mediaFallback("postCustomSolutions")?.id,
    },
    {
      title: "Mengapa sertifikasi penting untuk kepercayaan mitra",
      slug: "sertifikasi-kepercayaan-mitra",
      excerpt:
        "Sertifikasi memberi sinyal bahwa proses, material, dan standar kerja dikelola secara lebih terukur.",
      category: "sertifikasi",
      publishedAt: "2025-02-12T00:00:00.000Z",
      isPublished: true,
      author: "Tim Redaksi",
      content: emptyRichText([
        "Mitra bisnis biasanya ingin kepastian sebelum meningkatkan volume order.",
        "Dokumen yang jelas membantu tim lebih cepat mengambil keputusan dengan rasa aman.",
      ]),
      tags: [{ tag: "Sertifikasi" }, { tag: "Kepercayaan" }],
      thumbnail: mediaFallback("postCertification")?.id,
    },
    {
      title: "Kemasan e-commerce yang aman sampai tujuan",
      slug: "kemasan-ecommerce-aman-sampai-tujuan",
      excerpt:
        "Pengiriman online membutuhkan kemasan yang kuat, rapi, dan tetap menarik saat diterima pelanggan.",
      category: "umum",
      publishedAt: "2025-02-05T00:00:00.000Z",
      isPublished: true,
      author: "Tim Redaksi",
      content: emptyRichText([
        "Produk yang dikirim jauh memerlukan perlindungan ekstra dari tekanan dan gesekan.",
        "Kemasan yang tepat membantu menjaga reputasi brand sejak paket keluar gudang.",
      ]),
      tags: [{ tag: "E-Commerce" }, { tag: "Logistik" }],
      thumbnail: mediaFallback("postEcommerce")?.id,
    },
    {
      title: "Membaca tren kemasan industri yang makin efisien",
      slug: "tren-kemasan-industri-efisien",
      excerpt:
        "Arah industri bergerak ke proses yang lebih ringkas, material yang pas, dan mutu yang lebih stabil.",
      category: "inovasi",
      publishedAt: "2025-01-28T00:00:00.000Z",
      isPublished: true,
      author: "Tim Redaksi",
      content: emptyRichText([
        "Efisiensi produksi kini banyak ditentukan oleh desain proses dan pemilihan material.",
        "Tim operasional membutuhkan kemasan yang tidak menyulitkan saat packing, simpan, dan kirim.",
      ]),
      tags: [{ tag: "Industri" }, { tag: "Efisiensi" }],
      thumbnail: mediaFallback("postIndustrial")?.id,
    },
    {
      title: "Pabrik yang lebih ringkas, kerja yang lebih cepat",
      slug: "pabrik-lebih-ringkas-kerja-lebih-cepat",
      excerpt:
        "Alur kerja yang ringkas membuat koordinasi tim, inspeksi mutu, dan pengiriman berjalan lebih lincah.",
      category: "umum",
      publishedAt: "2025-01-20T00:00:00.000Z",
      isPublished: true,
      author: "Tim Redaksi",
      content: emptyRichText([
        "Perbaikan kecil di pabrik sering memberi dampak besar pada kecepatan kerja harian.",
        "Dengan layout yang rapi, tim bisa fokus pada kualitas tanpa banyak hambatan operasional.",
      ]),
      tags: [{ tag: "Produksi" }, { tag: "Operasional" }],
      thumbnail: mediaFallback("postCertification")?.id,
    },
  ];

  for (const item of posts) {
    await upsertCollectionItem("posts", "slug", item);
  }
}

async function seedGlobals() {
  console.log("Seeding globals...");

  await upsertGlobal("company-profile", {
    siteName: "Makmur Raya Sejahtera",
    tagline: "Halal-Green, Quality & Total Support",
    description:
      "MRS hadir sebagai mitra strategis pertumbuhan bagi distributor kemasan plastik di Indonesia dengan standar Halgreen, total support, dan kemitraan MOP.",
    vision: "Kemitraan yang membawa kemakmuran, keberkahan, dan pertumbuhan berkelanjutan.",
    mission: emptyRichText(companyMissionParagraphs),
    foundedYear: 2001,
    logo: mediaFallback("siteLogoDark")?.id,
    logoDark: mediaFallback("siteLogoDark")?.id,
    defaultOgImage: mediaFallback("companyProfileMedia")?.id,
    overviewHighlights: [
      { text: "Standar Halgreen yang konsisten dan terukur" },
      { text: "Total Support untuk respons operasional yang cepat" },
      { text: "Program MOP untuk kemitraan jangka panjang" },
    ],
    footerDescription:
      "MRS membantu mitra menjaga kualitas, kelancaran distribusi, dan hubungan bisnis yang selaras dengan prinsip Islam.",
    socialLinks: [
      { platform: "linkedin", url: "/kontak" },
      { platform: "instagram", url: "/kontak" },
    ],
    overviewEyebrow: "Company Profile",
    overviewHeadline: "Membangun kemitraan yang rapi dari standar produksi sampai dukungan distribusi",
    overviewDescription:
      "Kami memadukan fasilitas, proses, dan layanan yang dirancang agar kebutuhan mitra tetap berjalan stabil.",
    overviewBadgeLabel: "Mitra strategis distributor nasional",
    overviewMediaLabel: "Profil perusahaan",
    overviewVideoMode: "video",
    overviewVideoUrl: "/videos/plastic.mp4",
    overviewVideoPoster: mediaFallback("companyProfileMedia")?.id,
    peopleEyebrow: "Tim",
    peopleHeadline: "Orang-orang di balik eksekusi yang menjaga komitmen kemitraan",
    peopleDescription:
      "Tim kami fokus menjaga komunikasi, produksi, dan delivery agar pengalaman mitra tetap nyaman dari awal sampai akhir.",
    peopleCtaLabel: "Kenal tim kami",
    testimonialEyebrow: "Testimoni",
    testimonialHeadline: "Apa kata mitra tentang kerja sama yang membawa rasa aman",
    testimonialDescription:
      "Cuplikan komentar yang menggambarkan bagaimana tim, proses, dan kualitas kami dirasakan di lapangan.",
    certificationEyebrow: "Sertifikasi",
    certificationHeadline: "Penguatan mutu, kepatuhan, dan konsistensi yang bisa diverifikasi",
    certificationDescription:
      "Kami menjaga standar operasional lewat sertifikasi dan praktik kerja yang mendukung kualitas konsisten.",
    certificationBadgeTitle: "Dokumen pendukung siap dibagikan",
    certificationBadgeDescription: "Sertifikasi dan bukti kepatuhan dapat ditinjau saat dibutuhkan.",
    certificationDownloadLabel: "Unduh sertifikat",
    locationEyebrow: "Lokasi",
    locationHeadline: "Jejak operasional yang siap melayani kebutuhan distributor nasional",
    locationHighlight: "nasional",
    locationDescription:
      "Kami menempatkan titik layanan dan koordinasi di lokasi yang memudahkan distribusi, komunikasi, dan respons yang cepat.",
    locationPrimaryLabel: "Lokasi utama",
    locationMapLabel: "Peta lokasi",
    locationMapHint: "Lihat titik kantor dan fasilitas kami pada peta interaktif.",
    productEyebrow: "Produk",
    productHeadline: "Pilihan produk dan pengetahuan yang relevan untuk distributor aktif",
    productDescription:
      "Dari kebutuhan standar sampai custom, kami menyesuaikan bentuk, spesifikasi, dan ritme suplai dengan target penggunaan.",
    productPrompt: "Jelajahi pilihan produk yang paling sesuai dengan kebutuhan Anda.",
    productCtaLabel: "Lihat produk",
    solutionEyebrow: "Business Solutions",
    solutionHeadline: "Pendekatan solusi yang relevan untuk tiap kebutuhan",
    solutionHighlight: "dan terukur",
    solutionDescription:
      "Setiap distributor punya ritme, target, dan tantangan yang berbeda. Kami menyesuaikan material, bentuk, dan alur kerja agar kemasan benar-benar membantu bisnis berjalan lebih lancar.",
    solutionPrompt: "Diskusikan kebutuhan kemasan Anda bersama tim kami.",
    solutionCtaLabel: "Hubungi kami",
    expertiseEyebrow: "Our Expertise",
    expertiseHeadline: "Solusi kemasan untuk kebutuhan industri yang terus bergerak",
    expertiseDescription:
      "Kami merancang kemasan yang tidak hanya fungsional, tetapi juga membantu alur distribusi, kualitas, dan pengalaman mitra.",
    expertiseCtaLabel: "Lihat keahlian",
    expertiseSwipeHint: "Geser untuk melihat area fokus",
    innovationEyebrow: "Inovasi",
    innovationHeadline: "Perbaikan berkelanjutan yang menjaga kualitas tetap stabil",
    innovationHighlight: "yang stabil",
    innovationDescription:
      "Kami terus menyempurnakan proses produksi, inspeksi, dan efisiensi operasional agar hasil yang diterima mitra tetap konsisten.",
    projectEyebrow: "Program Mitra",
    projectHeadline: "Ekosistem kemitraan yang mendorong distributor naik kelas",
    projectHighlight: "naik kelas",
    projectDescription:
      "Ragam program berikut memberi gambaran bagaimana MRS mendampingi distributor melalui Halgreen, MOP, dan total support.",
    projectCtaLabel: "Lihat program mitra",
    newsEyebrow: "Pengetahuan Produk",
    newsHeadline: "Insight, pembaruan, dan cerita produksi",
    newsHighlight: "pengetahuan",
    newsDescription:
      "Konten singkat seputar produk, operasional, dan wawasan industri yang membantu pengambilan keputusan.",
    newsCtaLabel: "Baca artikel",
    newsAllLabel: "Semua artikel",
    blogSearchPlaceholder: "Cari artikel",
    blogNoResultsLabel: "Tidak ada artikel yang cocok.",
    blogResultsPrefix: "Menampilkan",
    blogResultsSuffix: "artikel",
    blogReadMoreLabel: "Baca selengkapnya",
  });

  await upsertGlobal("brand-promise", {
    eyebrow: "Brand Promise",
    headline: "Kemitraan yang kuat dimulai dari proses yang rapi",
    subheadline:
      "Kami menjaga kualitas, komunikasi, dan ketepatan eksekusi agar mitra dapat fokus pada pertumbuhan bisnis.",
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

  await upsertGlobal("product-knowledge", {
    eyebrow: "Pengetahuan Produk",
    headline: "Panduan singkat agar distributor memahami nilai di balik produk",
    subheadline:
      "MRS tidak hanya menjual kemasan, tetapi juga membantu mitra membaca konteks kualitas, operasional, dan peluang pertumbuhan di balik setiap solusi.",
    introLabel: "Insight yang relevan",
    topicsTitle: "Topik utama",
    topicsDescription:
      "Ringkasan area pengetahuan yang paling sering dibutuhkan saat distributor menilai kualitas, kelancaran stok, dan kesiapan kerja sama.",
    topics: [
      {
        title: "Standar Halgreen",
        description:
          "Bagaimana konsistensi produksi, kebersihan proses, dan kontrol kualitas dijaga agar hasil stabil.",
        icon: "ShieldCheck",
      },
      {
        title: "Program MOP",
        description:
          "Kenapa pola kemitraan jangka panjang lebih sehat daripada jual-beli putus untuk distributor aktif.",
        icon: "Users",
      },
      {
        title: "Total Support",
        description:
          "Dukungan responsif untuk kebutuhan operasional, penyesuaian order, dan komunikasi harian.",
        icon: "Truck",
      },
    ],
    ctaLabel: "Hubungi tim",
    ctaHref: "/kontak",
  });

  await upsertGlobal("program-mitra", {
    eyebrow: "Program Mitra",
    headline: "Ekosistem kemitraan yang mendorong distributor naik kelas",
    subheadline:
      "Program MRS dirancang untuk distributor yang ingin bertumbuh bersama, dengan pola kerja yang transparan, suportif, dan selaras dengan prinsip kemitraan jangka panjang.",
    introLabel: "Kemitraan strategis",
    valueTitle: "Kenapa program ini ada",
    valueDescription:
      "MRS membangun program mitra sebagai wasilah agar distributor mendapat kepastian kualitas, respons cepat, dan pendampingan yang konsisten di sepanjang perjalanan bisnis.",
    valuePoints: [
      {
        title: "Stabilitas pasokan",
        description: "Memberi rasa aman agar mitra bisa menjaga order dan reputasi dengan lebih tenang.",
      },
      {
        title: "Kualitas yang konsisten",
        description: "Mencegah komplain yang tidak perlu melalui kontrol mutu yang ketat dan terukur.",
      },
      {
        title: "Pertumbuhan bersama",
        description: "Mendorong hubungan jangka panjang yang saling menguntungkan, bukan transaksi sesaat.",
      },
    ],
    processTitle: "Bagaimana program berjalan",
    processDescription:
      "Alur kemitraan dibuat sederhana supaya mudah dipahami tim sales, operasional, maupun distributor yang ingin masuk ke program.",
    steps: [
      {
        step: "01",
        title: "Diskusi kebutuhan",
        description: "Tim MRS memetakan kebutuhan produk, volume, dan target pasar mitra.",
      },
      {
        step: "02",
        title: "Penyelarasan solusi",
        description: "Spesifikasi, ritme suplai, dan struktur kerja disesuaikan dengan konteks bisnis mitra.",
      },
      {
        step: "03",
        title: "Pendampingan aktif",
        description: "Mitra mendapat respons cepat, update yang jelas, dan dukungan saat kebutuhan berubah.",
      },
      {
        step: "04",
        title: "Upgrade bersama",
        description: "Kemitraan berkembang ke level berikutnya ketika volume, kualitas, dan trust semakin kuat.",
      },
    ],
    ctaLabel: "Ajukan kemitraan",
    ctaHref: "/kontak",
  });

  await upsertGlobal("contact", {
    sectionHeadline: "Hubungi tim kami",
    sectionDescription:
      "Ceritakan kebutuhan kemasan Anda, lalu kami bantu arahkan ke solusi yang paling pas.",
    formTitle: "Form Kontak",
    submitLabel: "Kirim Permintaan",
    emailSubject: "Konsultasi kebutuhan kemasan",
    email: "sales.demo@mrs-packaging.test",
    phone: "+62 (21) 5555-1020",
    whatsapp: "6281234567890",
    address: "Jl. Pertanian No.22, Area Sawah, Pondok, Kec. Babadan, Kabupaten Ponorogo, Jawa Timur 63491",
    mapsEmbedUrl:
      "https://www.google.com/maps?q=Jl.%20Pertanian%20No.22%2C%20Area%20Sawah%2C%20Pondok%2C%20Kec.%20Babadan%2C%20Kabupaten%20Ponorogo%2C%20Jawa%20Timur%2063491&output=embed",
    operationalHours: "Senin - Jumat: 08:00 - 17:00 WIB",
  });

  await upsertGlobal("locations", {
    locations: [
      {
        label: "Kantor pusat",
        city: "Ponorogo",
        address: "Jl. Pertanian No.22, Area Sawah, Pondok, Kec. Babadan, Kabupaten Ponorogo, Jawa Timur 63491",
        description: "Koordinasi komersial, layanan pelanggan, dan pusat komunikasi nasional.",
        phone: "+62 (21) 5555-1020",
        isPrimary: true,
      },
    ],
  });

  await upsertGlobal("stats", {
    items: [
      { value: "25", suffix: "+", label: "Tahun pengalaman", icon: "Factory" },
      { value: "500", suffix: "+", label: "Mitra dan klien", icon: "Users" },
      { value: "50", suffix: "Juta", label: "Produksi per tahun", icon: "Truck" },
      { value: "15", suffix: "+", label: "Standar dan sertifikasi", icon: "ShieldCheck" },
    ],
  });

  await upsertGlobal("production-process", {
    headline: "Alur produksi yang terukur dari awal sampai akhir",
    introDescription:
      "Kami menjaga setiap tahap tetap terkendali agar output yang diterima mitra sesuai spesifikasi dan jadwal.",
    ctaLabel: "Pelajari proses",
    ctaHref: "/tentang-kami",
    stages: [
      {
        step: 1,
        title: "Analisis kebutuhan",
        description:
          "Tim kami memetakan kebutuhan material, ukuran, dan tujuan penggunaan sebelum produksi dimulai.",
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

  const homepageHeroSupportImages = [
    { image: mediaFallback("homepageHeroSupportProduction")?.id, alt: "Produksi kemasan" },
    { image: mediaFallback("homepageHeroSupportQc")?.id, alt: "Quality control" },
    { image: mediaFallback("homepageHeroSupportDistribution")?.id, alt: "Distribusi" },
  ].filter((item) => Boolean(item.image));

  await upsertGlobal("homepage-hero", {
    titlePrimary: "MRS",
    titleSecondary: "Kemasan Plastik untuk Bisnis yang Bertumbuh",
    description:
      "Kemitraan value-first untuk produksi, kualitas, dan distribusi kemasan yang stabil di seluruh Indonesia.",
    primaryCtaLabel: "Pengetahuan Produk",
    primaryCtaHref: "/pengetahuan-produk",
    secondaryCtaLabel: "Program Mitra",
    secondaryCtaHref: "/program-mitra",
    mediaType: "video",
    backgroundVideoUrl: "/videos/plastic.webm",
    backgroundImage: mediaFallback("homepageHeroBackground")?.id,
    posterImage: mediaFallback("homepageHeroPoster")?.id,
    supportImages: homepageHeroSupportImages,
  });

  await upsertGlobal("site-chrome", {
    headerCtaLabel: "Hubungi Kami",
    headerCtaHref: "/kontak",
    navigationItems: [
      { label: "Beranda", href: "/" },
      { label: "Tentang Kami", href: "/tentang-kami" },
      { label: "Pengetahuan Produk", href: "/pengetahuan-produk" },
      { label: "Program Mitra", href: "/program-mitra" },
      { label: "Kontak", href: "/kontak" },
    ],
    footerDescription:
      "MRS membantu mitra menjaga kualitas kemasan, kelancaran distribusi, dan konsistensi layanan dengan pendekatan value-first dan berbasis keberkahan.",
    footerGroups: [
      {
        title: "Perusahaan",
        links: [
          { label: "Tentang Kami", href: "/tentang-kami" },
          { label: "Program Mitra", href: "/program-mitra" },
          { label: "Pengetahuan Produk", href: "/pengetahuan-produk" },
        ],
      },
      {
        title: "Akses Cepat",
        links: [
          { label: "Beranda", href: "/" },
          { label: "Berita", href: "/berita" },
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
