import type { Metadata } from "next";
import {
  getHomeContent,
  getResources,
  getCategories,
} from "@/lib/api";
import { getCatalogStats } from "@/lib/catalog";
import { SITE_URL } from "@/lib/site";
import HomeView from "./HomeView";

export const revalidate = 300;

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
    getHomeContent(),
    getResources({ per_page: 50 }),
    getCategories(),
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

  return (
    <HomeView
      initialHomeData={homeData}
      initialResources={resources}
      initialCategories={categories}
      initialCatalogTotal={catalogTotal}
    />
  );
}
