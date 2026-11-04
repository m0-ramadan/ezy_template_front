import type { Metadata } from "next";
import {
  getCatalogStats,
  getCategoriesCached,
  getHomeContentCached,
  getLatestResourcesCached,
} from "@/lib/catalog";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import HomeView from "./HomeView";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: {
    absolute: "EzyTemplate — Templates and Practical Online Tools",
  },
  description:
    "Browse downloadable design, Word, Excel and website templates, plus practical browser-based tools for everyday tasks.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "EzyTemplate — Templates and Practical Online Tools",
    description:
      "Browse downloadable templates and practical browser-based tools.",
    url: SITE_URL,
    type: "website",
  },
};

export default async function HomePage() {
  const [homeRes, resourcesRes, catRes, statsRes] = await Promise.allSettled([
    getHomeContentCached(),
    getLatestResourcesCached(50),
    getCategoriesCached(),
    getCatalogStats(),
  ]);

  const homeData = homeRes.status === "fulfilled" ? homeRes.value : null;
  const resources =
    resourcesRes.status === "fulfilled" ? resourcesRes.value?.data ?? [] : [];
  const categories =
    catRes.status === "fulfilled" && Array.isArray(catRes.value)
      ? catRes.value
      : [];
  const catalogTotal =
    statsRes.status === "fulfilled" && statsRes.value
      ? statsRes.value.total_templates
      : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/assets/logo.png`,
      },
      {
        "@type": "WebSite",
        name: SITE_NAME,
        url: SITE_URL,
        potentialAction: {
          "@type": "SearchAction",
          target: `${SITE_URL}/templates?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeView
        initialHomeData={homeData}
        initialResources={resources}
        initialCategories={categories}
        initialCatalogTotal={catalogTotal}
      />
    </>
  );
}
