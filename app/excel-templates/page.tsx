import type { Metadata } from "next";
import { getCollectionData } from "@/lib/catalog";
import MarketplaceListing from "@/components/MarketplaceListing";
import { SITE_URL } from "@/lib/site";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const { total } = await getCollectionData("excel", { perPage: 1 });
  return {
    title: "Excel Templates - Budgets, Invoices, Inventory and Planners",
    description: `Download ${total} published Excel templates: budgets, invoice and quote trackers, inventory sheets, timesheets, calendars and project planners. Preview each workbook before downloading.`,
    alternates: { canonical: "/excel-templates" },
    openGraph: {
      title: "Excel Templates | EzyTemplate",
      description: `${total} downloadable Excel workbooks for budgets, invoices, inventory, HR and planning.`,
      url: `${SITE_URL}/excel-templates`,
      type: "website",
    },
  };
}

export default async function ExcelMarketplace() {
  const { resources, total, facets, unavailable } = await getCollectionData("excel");

  return (
    <MarketplaceListing
      basePath="/excel-templates"
      bannerTitle="Excel Templates Collection"
      bannerTitleAr="مجموعة قوالب إكسيل"
      bannerSubtitle="Editable workbooks for budgets, invoicing, inventory, HR, calendars and project planning."
      bannerSubtitleAr="ملفات عمل قابلة للتعديل للميزانيات والفواتير والمخزون والموارد البشرية والتقويمات."
      sectionLabel="Excel Templates"
      sectionLabelAr="قوالب إكسيل"
      theme="excel"
      accent="#10b981"
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
