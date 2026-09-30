import type { Metadata } from "next";
import { getCollectionData } from "@/lib/catalog";
import MarketplaceListing from "@/components/MarketplaceListing";
import { SITE_URL } from "@/lib/site";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const { total } = await getCollectionData("website", { perPage: 1 });
  return {
    title: "Website Templates - HTML, React, Next.js and WordPress Starters",
    description: `Browse ${total} published website templates and starter projects built with HTML, CSS, React, Next.js, Tailwind CSS and WordPress.`,
    alternates: { canonical: "/website-templates" },
    openGraph: {
      title: "Website Templates | EzyTemplate",
      description: `${total} website templates and starter projects for modern development stacks.`,
      url: `${SITE_URL}/website-templates`,
      type: "website",
    },
  };
}

export default async function WebsiteMarketplace() {
  const { resources, total, facets, unavailable } = await getCollectionData("website");

  return (
    <MarketplaceListing
      basePath="/website-templates"
      bannerTitle="Website Templates Collection"
      bannerTitleAr="مجموعة قوالب المواقع"
      bannerSubtitle="Starter projects and themes for HTML, CSS, React, Next.js, Tailwind CSS and WordPress."
      bannerSubtitleAr="مشاريع وقوالب جاهزة بـ HTML و CSS و React و Next.js و Tailwind و WordPress."
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
      facetKey="subcategory"
    />
  );
}
