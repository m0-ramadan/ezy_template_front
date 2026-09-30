import { templates as fallbackTemplates } from "@/data/templates";
import { getResourceBySlugResult, getResources, normalizeTemplate } from "@/lib/api";
import LoadUnavailable from "@/components/LoadUnavailable";
import DetailView from "@/components/DetailView";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const { data: resource, unavailable } = await getResourceBySlugResult(slug);
  // A missing slug is a genuine 404. An unreachable API is not: the URL keeps
  // its canonical but stays out of the index for this render.
  if (unavailable) {
    return {
      title: "Template temporarily unavailable",
      alternates: { canonical: `/templates/${slug}` },
      robots: { index: false, follow: true },
    };
  }
  if (!resource) notFound();
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
  const { data: apiResource, unavailable } = await getResourceBySlugResult(slug);
  const t = normalizeTemplate(apiResource) || fallbackTemplates.find((x) => x.slug === slug);
  // Only a confirmed miss is a 404, so a temporary API problem never removes
  // a real template URL from the index.
  if (!t && !unavailable) notFound();
  if (!t) {
    return (
      <LoadUnavailable
        title="This template is temporarily unavailable"
        description="The template catalogue could not be reached while this page was being built. Please try again in a few minutes."
      />
    );
  }

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
