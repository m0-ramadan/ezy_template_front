import type { Metadata } from "next";
import { getCollectionData } from "@/lib/catalog";
import MarketplaceListing from "@/components/MarketplaceListing";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const { total } = await getCollectionData("design", { perPage: 1 });
  return {
    title: "Design Templates - Cards, Certificates, Menus and Posters",
    description: `Browse ${total} published print and brand design templates: business cards, certificates and awards, corporate identity, invitations, restaurant menus, flyers and wall art.`,
    alternates: { canonical: "/design-templates" },
    openGraph: {
      title: "Design Templates | EzyTemplate",
      description: `${total} downloadable print and brand design files.`,
      url: `${SITE_URL}/design-templates`,
      type: "website",
    },
  };
}

export default async function DesignMarketplace() {
  const { resources, total, facets, unavailable } = await getCollectionData("design");

  return (
    <MarketplaceListing
      basePath="/design-templates"
      bannerTitle="Design Templates Collection"
      bannerTitleAr="مجموعة قوالب التصميم"
      bannerSubtitle="Print and brand design files: business cards, certificates, corporate identity, invitations, menus and posters."
      bannerSubtitleAr="ملفات تصميم للمطبوعات والهوية: كروت أعمال، شهادات، هوية مؤسسية، دعوات، منيوهات وملصقات."
      sectionLabel="Design Templates"
      sectionLabelAr="قوالب التصميم"
      theme="design"
      accent="#ec4899"
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
