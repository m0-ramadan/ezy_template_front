import type { Metadata } from "next";
import { getCollectionData } from "@/lib/catalog";
import MarketplaceListing from "@/components/MarketplaceListing";
import { SITE_URL } from "@/lib/site";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const { total } = await getCollectionData("canva", { perPage: 1 });
  return {
    title: "Canva Templates - Editable Social, Menu and Branding Designs",
    description: `Browse ${total} published editable Canva designs: social media posts, menus, flyers, invitations, branding graphics and event artwork you can customise online.`,
    alternates: { canonical: "/canva-templates" },
    ...(total > 0 ? {} : { robots: { index: false, follow: true } as Metadata["robots"] }),
    openGraph: {
      title: "Canva Templates | EzyTemplate",
      description: `${total} editable Canva designs ready to customise online.`,
      url: `${SITE_URL}/canva-templates`,
      type: "website",
    },
  };
}

export default async function CanvaMarketplace() {
  const { resources, total, facets, unavailable } = await getCollectionData("canva");

  return (
    <MarketplaceListing
      basePath="/canva-templates"
      bannerTitle="Canva Templates Collection"
      bannerTitleAr="مجموعة قوالب كانفا"
      bannerSubtitle="Editable Canva designs for social media, menus, flyers, invitations and branding."
      bannerSubtitleAr="تصاميم كانفا قابلة للتعديل للسوشيال ميديا والمنيوهات والفلوقات والدعوات والهوية."
      sectionLabel="Canva Templates"
      sectionLabelAr="قوالب كانفا"
      theme="canva"
      accent="#14b8a6"
      hubLabel="Templates"
      hubLabelAr="مركز القوالب"
      initialResources={resources}
      totalCount={total}
      unavailable={unavailable}
      facets={facets}
      facetKey="subcategory"
    />
  );
}
