import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCollectionData, unavailableCollectionMetadata } from "@/lib/catalog";
import LoadUnavailable from "@/components/LoadUnavailable";
import MarketplaceListing from "@/components/MarketplaceListing";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function titleCase(value: string) {
  return value
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const { facets, unavailable } = await getCollectionData("excel");
  const facet = facets.find((f) => f.slug === category);
  // A missing facet is a real 404, thrown from generateMetadata so the
  // HTTP status is 404 before any body is streamed. An unreachable
  // catalogue is not a 404: the page keeps its canonical but is kept
  // out of the index for this render.
  if (unavailable) return unavailableCollectionMetadata("/excel-templates", category);
  if (!facet) notFound();
  return {
    title: `${facet.label} Excel Templates`,
    description: `Download ${facet.count} ${facet.label.toLowerCase()} Excel templates from the EzyTemplate catalogue. Preview each workbook and open the file details before downloading.`,
    alternates: { canonical: `/excel-templates/${category}` },
    openGraph: {
      title: `${facet.label} Excel Templates | EzyTemplate`,
      description: `${facet.count} downloadable ${facet.label.toLowerCase()} Excel templates.`,
      url: `${SITE_URL}/excel-templates/${category}`,
      type: "website",
    },
  };
}

export default async function ExcelCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const base = await getCollectionData("excel");
  const facet = base.facets.find((f) => f.slug === category);
  // Only a confirmed miss is a 404. When the catalogue is unreachable the
  // page still renders, so a temporary API problem never tells search
  // engines that these URLs do not exist.
  if (!facet && !base.unavailable) notFound();
  if (!facet) return <LoadUnavailable />;

  // Keep the complete parent collection in the client listing. The URL facet
  // remains selected, while the sidebar can show (and switch to) every sibling
  // sub-category without another request.
  const { resources, total, facets, unavailable } = base;

  return (
    <MarketplaceListing
      basePath="/excel-templates"
      bannerTitle={`${titleCase(category)} Excel Templates`}
      bannerTitleAr={`قوالب إكسيل - ${facet.labelAr}`}
      bannerSubtitle={`${facet.count} published ${facet.label.toLowerCase()} workbooks ready to download and edit.`}
      bannerSubtitleAr={`${facet.count} ملف عمل منشور في قسم ${facet.labelAr}.`}
      sectionLabel={`Excel Templates`}
      sectionLabelAr="قوالب إكسيل"
      theme="excel"
      accent="#10b981"
      hubLabel="Templates"
      hubLabelAr="مركز القوالب"
      initialResources={resources}
      totalCount={total}
      unavailable={unavailable}
      facets={facets}
      initialFacet={category}
      facetKey="subcategory"
    />
  );
}
