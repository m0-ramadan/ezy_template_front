import { templates as fallbackTemplates } from "@/data/templates";
import { getResources, normalizeTemplate } from "@/lib/api";
import DetailView from "@/components/DetailView";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import {
  getCanonicalTemplateSlug,
  getTemplateDetailResult,
  hasAmbiguousTitle,
} from "@/lib/catalog";

function plainText(value: unknown, max = 160): string {
  const text = String(value || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trimEnd()}…`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { resource, unavailable } = await getTemplateDetailResult(slug);
  // A missing slug is a genuine 404. An unreachable API is not: the URL keeps
  // its canonical but stays out of the index for this render.
  if (!resource) notFound();

  // Rows that were seeded twice under two category paths share one canonical.
  const canonicalSlug = await getCanonicalTemplateSlug(slug);
  const normalized = normalizeTemplate(resource);
  const baseTitle = plainText(resource.title || slug, 110);
  // Two published rows can share a title (Excel and presentation versions).
  // Give those pages distinct titles instead of competing with each other.
  const ambiguous = await hasAmbiguousTitle(resource.title);
  const typeLabel = resource.resource_type
    ? resource.resource_type.charAt(0).toUpperCase() + resource.resource_type.slice(1)
    : "";
  const categoryLabel = resource.subcategory?.name || resource.category?.name || "";
  const title =
    ambiguous && (typeLabel || categoryLabel)
      ? `${baseTitle} – ${[typeLabel, categoryLabel].filter(Boolean).join(", ")}`
      : baseTitle;
  const description =
    plainText(resource.short_description, 155) ||
    plainText(resource.description, 155) ||
    `Download and preview ${title} on ${SITE_NAME}.`;
  const image = normalized?.detail_image || normalized?.preview_image;

  return {
    title,
    description,
    alternates: { canonical: `/templates/${canonicalSlug}` },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: `${SITE_URL}/templates/${canonicalSlug}`,
      type: "website",
      images: image ? [{ url: image, alt: title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function Detail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // 1. Fetch live resource from API or fallback
  const { resource: apiResource, unavailable } = await getTemplateDetailResult(slug);
  const t = normalizeTemplate(apiResource) || fallbackTemplates.find((x) => x.slug === slug);
  // Only a confirmed miss is a 404, so a temporary API problem never removes
  // a real template URL from the index.
  // The snapshot fallback covers every published template, so a slug that is
  // still unknown here does not exist.
  if (!t) notFound();

  // 2. Fetch related resources
  const relatedRes = await getResources({ per_page: 3 });
  const relatedList =
    relatedRes?.data?.length > 0
      ? relatedRes.data
          .filter((r: any) => r.slug !== slug)
          .slice(0, 3)
          .map(normalizeTemplate)
      : fallbackTemplates.filter((x) => x.slug !== slug).slice(0, 3);

  const mainDetailImage =
    (t as any).detail_image ||
    (t as any).preview_image ||
    (t as any).image ||
    "";
  const galleryScreenshots = Array.isArray(t.screenshots) ? t.screenshots : [];

  const displayFeatures = t.features && t.features.length > 0 ? t.features : [];

  const url = `${SITE_URL}/templates/${slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Templates",
            item: `${SITE_URL}/templates`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: t.name_en || t.name || t.title,
            item: url,
          },
        ],
      },
      {
        "@type": "CreativeWork",
        name: t.name_en || t.name || t.title,
        description: plainText(
          (t as any).description_en || (t as any).description,
          500,
        ),
        url,
        ...(mainDetailImage ? { image: mainDetailImage } : {}),
        ...((t as any).category ? { genre: (t as any).category } : {}),
        inLanguage: "en",
        isAccessibleForFree: (t as any).price === "Free",
        publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DetailView
        t={t}
        relatedList={relatedList}
        mainDetailImage={mainDetailImage}
        galleryScreenshots={galleryScreenshots}
        displayFeatures={displayFeatures}
      />
    </>
  );
}
