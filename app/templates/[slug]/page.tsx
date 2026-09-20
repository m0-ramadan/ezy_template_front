import { templates as fallbackTemplates } from "@/data/templates";
import { getResourceBySlug, getResources, normalizeTemplate } from "@/lib/api";
import DetailView from "@/components/DetailView";

export default async function Detail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // 1. Fetch live resource from API or fallback
  const apiResource = await getResourceBySlug(slug);
  const t =
    normalizeTemplate(apiResource) ||
    fallbackTemplates.find((x) => x.slug === slug) ||
    fallbackTemplates[0];

  // 2. Fetch related resources
  const relatedRes = await getResources({ per_page: 3 });
  const relatedList =
    relatedRes?.data?.length > 0
      ? relatedRes.data
          .filter((r: any) => r.slug !== slug)
          .slice(0, 3)
          .map(normalizeTemplate)
      : fallbackTemplates.filter((x) => x.slug !== slug).slice(0, 3);

  const mainDetailImage = t.detail_image || t.preview_image || t.image || "";
  const galleryScreenshots = Array.isArray(t.screenshots) ? t.screenshots : [];

  const displayFeatures =
    t.features && t.features.length > 0
      ? t.features
      : [
          "Fully Responsive Design",
          "Clean & Modern UI",
          "Well Documented Code",
          "Easy to Customize",
          "Commercial Use Allowed",
        ];

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
