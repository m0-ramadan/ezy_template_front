import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCollectionData, unavailableCollectionMetadata } from "@/lib/catalog";
import LoadUnavailable from "@/components/LoadUnavailable";
import MarketplaceListing from "@/components/MarketplaceListing";
import { SITE_URL } from "@/lib/site";

export const revalidate = 300;

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
  const { facets, unavailable } = await getCollectionData("website");
  const facet = facets.find((f) => f.slug === category);
  // A missing facet is a real 404, thrown from generateMetadata so the
  // HTTP status is 404 before any body is streamed. An unreachable
  // catalogue is not a 404: the page keeps its canonical but is kept
  // out of the index for this render.
  if (unavailable) return unavailableCollectionMetadata("/website-templates", category);
  if (!facet) notFound();
  return {
    title: `${facet.label} - Website Templates`,
    description: `Download ${facet.count} ${facet.label.toLowerCase()} website templates from the EzyTemplate catalogue. Preview every project and read its details before downloading.`,
    alternates: { canonical: `/website-templates/${category}` },
    openGraph: {
      title: `${facet.label} - Website Templates | EzyTemplate`,
      description: `${facet.count} downloadable ${facet.label.toLowerCase()} website templates.`,
      url: `${SITE_URL}/website-templates/${category}`,
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
  const base = await getCollectionData("website");
  const facet = base.facets.find((f) => f.slug === category);
  // Only a confirmed miss is a 404. When the catalogue is unreachable the
  // page still renders, so a temporary API problem never tells search
  // engines that these URLs do not exist.
  if (!facet && !base.unavailable) notFound();
  if (!facet) return <LoadUnavailable />;

  const { resources, total, facets, unavailable } = await getCollectionData("website", {
    subcategory: category,
  });

  return (
    <MarketplaceListing
      basePath="/website-templates"
      bannerTitle={`${titleCase(category)} - Website Templates`}
      bannerTitleAr={`قوالب المواقع - ${facet.labelAr}`}
      bannerSubtitle={`${facet.count} published ${facet.label.toLowerCase()} website templates ready to download.`}
      bannerSubtitleAr={`${facet.count} قالب موقع منشور في قسم ${facet.labelAr}.`}
      sectionLabel="Website Templates"
      sectionLabelAr="قوالب المواقع"
      theme="website"
      accent="#2563eb"
      hubLabel="Templates"
      hubLabelAr="مركز القوالب"
      initialResources={resources}
      totalCount={total}
      unavailable={unavailable}
      facets={facets}
      initialFacet={category}
      facetKey="subcategory"
      showFormatFilter={false}
    />
  );
}
