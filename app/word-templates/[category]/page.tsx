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
  const { facets, unavailable } = await getCollectionData("word");
  const facet = facets.find((f) => f.slug === category);
  // A missing facet is a real 404, thrown from generateMetadata so the
  // HTTP status is 404 before any body is streamed. An unreachable
  // catalogue is not a 404: the page keeps its canonical but is kept
  // out of the index for this render.
  if (unavailable) return unavailableCollectionMetadata("/word-templates", category);
  if (!facet) notFound();
  return {
    title: `${facet.label} - Word Templates`,
    description: `Download ${facet.count} ${facet.label.toLowerCase()} Word documents from the EzyTemplate catalogue. Preview every file and read its details before downloading.`,
    alternates: { canonical: `/word-templates/${category}` },
    openGraph: {
      title: `${facet.label} - Word Templates | EzyTemplate`,
      description: `${facet.count} downloadable ${facet.label.toLowerCase()} Word documents.`,
      url: `${SITE_URL}/word-templates/${category}`,
      type: "website",
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const base = await getCollectionData("word");
  const facet = base.facets.find((f) => f.slug === category);
  // Only a confirmed miss is a 404. When the catalogue is unreachable the
  // page still renders, so a temporary API problem never tells search
  // engines that these URLs do not exist.
  if (!facet && !base.unavailable) notFound();
  if (!facet) return <LoadUnavailable />;

  const { resources, total, facets, unavailable } = await getCollectionData("word", {
    subcategory: category,
  });

  return (
    <MarketplaceListing
      basePath="/word-templates"
      bannerTitle={`${titleCase(category)} - Word Templates`}
      bannerTitleAr={`قوالب وورد - ${facet.labelAr}`}
      bannerSubtitle={`${facet.count} published ${facet.label.toLowerCase()} Word documents ready to download.`}
      bannerSubtitleAr={`${facet.count} مستند وورد منشور في قسم ${facet.labelAr}.`}
      sectionLabel="Word Templates"
      sectionLabelAr="قوالب وورد"
      theme="word"
      accent="#3b82f6"
      hubLabel="Templates"
      hubLabelAr="مركز القوالب"
      initialResources={resources}
      totalCount={total}
      unavailable={unavailable}
      facets={facets}
      initialFacet={category}
      facetKey="subcategory"
      showFormatFilter
    />
  );
}
