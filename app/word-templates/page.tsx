import type { Metadata } from "next";
import { getCollectionData } from "@/lib/catalog";
import MarketplaceListing from "@/components/MarketplaceListing";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const { total } = await getCollectionData("word", { perPage: 1 });
  return {
    title: "Word Templates - Resumes, Letters, Contracts and Reports",
    description: `Download ${total} published Word document templates: resumes and CVs, cover letters, formal business letters, contracts, proposals, monthly reports and invoices.`,
    alternates: { canonical: "/word-templates" },
    openGraph: {
      title: "Word Templates | EzyTemplate",
      description: `${total} downloadable Word documents for resumes, letters, contracts and reports.`,
      url: `${SITE_URL}/word-templates`,
      type: "website",
    },
  };
}

export default async function WordMarketplace() {
  const { resources, total, facets, unavailable } = await getCollectionData("word");

  return (
    <MarketplaceListing
      basePath="/word-templates"
      bannerTitle="Word Templates Collection"
      bannerTitleAr="مجموعة قوالب وورد"
      bannerSubtitle="Editable Word documents for resumes, cover letters, contracts, proposals, reports and invoices."
      bannerSubtitleAr="مستندات وورد قابلة للتعديل للسير الذاتية والخطابات والعقود والمقترحات والتقارير."
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
      facetKey="subcategory"
    />
  );
}
