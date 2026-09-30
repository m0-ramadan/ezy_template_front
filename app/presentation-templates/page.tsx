import type { Metadata } from "next";
import { getCollectionData } from "@/lib/catalog";
import MarketplaceListing from "@/components/MarketplaceListing";
import { SITE_URL } from "@/lib/site";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const { total } = await getCollectionData("presentation", { perPage: 1 });
  return {
    title: "Presentation Templates - Pitch Decks and Slide Designs",
    description: `Browse ${total} published presentation templates: pitch decks and slide designs for PowerPoint, Google Slides and Keynote.`,
    alternates: { canonical: "/presentation-templates" },
    openGraph: {
      title: "Presentation Templates | EzyTemplate",
      description: `${total} downloadable presentation decks and slide designs.`,
      url: `${SITE_URL}/presentation-templates`,
      type: "website",
    },
  };
}

export default async function PresentationMarketplace() {
  const { resources, total, facets, unavailable } =
    await getCollectionData("presentation");

  return (
    <MarketplaceListing
      basePath="/presentation-templates"
      bannerTitle="Presentation Templates Collection"
      bannerTitleAr="مجموعة قوالب العروض التقديمية"
      bannerSubtitle="Pitch decks and slide templates for PowerPoint, Google Slides and Keynote."
      bannerSubtitleAr="قوالب شرائح وعروض تقديمية لبوربوينت وجوجل سلايدز وكينوت."
      sectionLabel="Presentation Templates"
      sectionLabelAr="العروض التقديمية"
      theme="presentation"
      accent="#8b5cf6"
      hubLabel="Templates"
      hubLabelAr="مركز القوالب"
      initialResources={resources}
      totalCount={total}
      unavailable={unavailable}
      facets={facets}
      facetKey="subcategory"
      showFormatFilter={false}
    />
  );
}
