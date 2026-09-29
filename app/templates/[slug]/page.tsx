import { templates as fallbackTemplates } from "@/data/templates";
import { getResourceBySlug, getResources, normalizeTemplate } from "@/lib/api";
import DetailView from "@/components/DetailView";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const resource = await getResourceBySlug(slug);
  if (!resource) return { title: "Template not found", robots: { index: false, follow: true } };
  const title = resource.title || resource.name || slug;
  const description = String(resource.short_description || resource.description || `Template details for ${title}.`).replace(/<[^>]+>/g, "").slice(0, 160);
  return { title, description, alternates: { canonical: `/templates/${slug}` }, openGraph: { title, description } };
}

export default async function Detail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // 1. Fetch live resource from API or fallback
  const apiResource = await getResourceBySlug(slug);
  const t = normalizeTemplate(apiResource) || fallbackTemplates.find((x) => x.slug === slug);
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

  return (
    <DetailView
      t={t}
      relatedList={relatedList}
      mainDetailImage={mainDetailImage}
      galleryScreenshots={galleryScreenshots}
      displayFeatures={displayFeatures}
    />
  );
}
