import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import {
  getCanonicalTemplateMap,
  getCollectionData,
  getPublishedResources,
  type CollectionKey,
} from "@/lib/catalog";
import { getArticlesSSR } from "@/lib/articles";
import { TOOL_CATEGORIES, TOOL_ROUTES } from "@/data/tool-catalog";

export const revalidate = 3600;

const COLLECTION_PATHS: Record<CollectionKey, string> = {
  excel: "excel-templates",
  word: "word-templates",
  design: "design-templates",
  canva: "canva-templates",
  presentation: "presentation-templates",
  website: "website-templates",
};

const STATIC_PATHS = [
  "/",
  "/templates",
  "/about",
  "/contact",
  "/faq",
  "/services",
  "/resources",
  "/tools",
  "/support",
  "/custom-requests",
  "/privacy",
  "/terms",
  "/cookie-policy",
  "/copyright",
];

function entry(
  url: string,
  priority: number,
  changeFrequency: "daily" | "weekly" | "monthly",
  lastModified?: string | null,
): MetadataRoute.Sitemap[number] {
  return {
    url: `${SITE_URL}${url}`,
    changeFrequency,
    priority,
    ...(lastModified ? { lastModified: new Date(lastModified) } : {}),
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) =>
    entry(
      path,
      path === "/" ? 1 : path === "/templates" ? 0.9 : 0.6,
      path === "/" ? "daily" : "weekly",
    ),
  );

  // Collection hubs and their real, non-empty sub-category facets. The same
  // loader that renders the pages supplies these slugs, so the sitemap can
  // never advertise a URL that returns "not found".
  const collectionResults = await Promise.all(
    (Object.keys(COLLECTION_PATHS) as CollectionKey[]).map(async (key) => ({
      key,
      data: await getCollectionData(key, {}),
    })),
  );

  for (const { key, data } of collectionResults) {
    if (data.unavailable || data.total <= 0) continue;
    entries.push(entry(`/${COLLECTION_PATHS[key]}`, 0.8, "weekly"));

    for (const facet of data.facets) {
      if (facet.count > 0) {
        entries.push(
          entry(`/${COLLECTION_PATHS[key]}/${facet.slug}`, 0.6, "weekly"),
        );
      }
    }
  }

  // Every tool category and every tool page. These are real, self-canonical
  // pages; they were missing from the sitemap, which left 26 indexable tool
  // URLs discovered but never crawled.
  for (const category of TOOL_CATEGORIES) {
    entries.push(entry(`/tools/${category}`, 0.6, "monthly"));
  }
  for (const tool of TOOL_ROUTES) {
    entries.push(entry(`/tools/${tool.slug}`, 0.7, "monthly"));
  }

  // Every published resource detail page. Rows that duplicate another row's
  // content are left out: their canonical points at the primary URL.
  const [resources, duplicates] = await Promise.all([
    getPublishedResources({ per_page: 2000, sort: "latest" }),
    getCanonicalTemplateMap(),
  ]);
  for (const resource of resources) {
    if (resource?.slug && !duplicates[resource.slug]) {
      entries.push(
        entry(
          `/templates/${resource.slug}`,
          0.7,
          "monthly",
          resource.updated_at || resource.published_at,
        ),
      );
    }
  }

  // Blog index and articles, only when real published articles exist.
  const { articles, total } = await getArticlesSSR({ perPage: 1000 });
  if (total > 0) {
    entries.push(entry("/blog", 0.7, "weekly"));
    for (const article of articles) {
      if (article?.slug) {
        entries.push(entry(`/blog/${article.slug}`, 0.6, "monthly"));
      }
    }
  }

  // De-duplicate by URL while keeping the first (highest priority) occurrence.
  const seen = new Set<string>();
  return entries.filter((item) => {
    if (seen.has(item.url)) return false;
    seen.add(item.url);
    return true;
  });
}
