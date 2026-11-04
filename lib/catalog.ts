import type { Metadata } from "next";
import { unstable_cache } from "next/cache";
import {
  API_BASE_URL,
  getResourceBySlugResult,
  normalizeTemplate,
} from "@/lib/api";
import catalogueSnapshot from "@/data/catalogue-snapshot.json";

/**
 * Server-side catalogue access.
 *
 * These helpers run in React Server Components so the first HTML response
 * already contains the real template rows and real counts. Every value is read
 * from the Laravel API, which in turn counts the database directly - nothing is
 * hard coded, estimated or padded.
 *
 * The language is deliberately fixed to English here. Language switching is a
 * client concern; the crawler's HTML must always contain the canonical English
 * content so an Arabic cookie can never hide it from the index.
 */

export const CATALOG_REVALIDATE_SECONDS = 300;

export type CatalogStats = {
  total_templates: number;
  by_type: Record<string, number>;
  canva_templates: number;
  by_main_category: Array<{
    id: number;
    slug: string;
    name: string;
    name_ar: string | null;
    total: number;
  }>;
  by_category: Array<{
    slug: string;
    name: string;
    name_ar: string | null;
    total: number;
  }>;
  total_tools: number;
  published_articles: number;
};

export type RawResource = {
  id: number;
  slug: string;
  title: string;
  title_ar?: string | null;
  resource_type: string;
  category_id: number | null;
  main_category_id: number | null;
  subcategory_id: number | null;
  preview_image: string | null;
  detail_image: string | null;
  short_description: string | null;
  description: string | null;
  is_free: boolean | number;
  featured?: boolean | number;
  rating?: number | string | null;
  price: string | number | null;
  downloads_count: number;
  published_at: string | null;
  updated_at: string | null;
  canva_design_id: string | null;
  category?: { id: number; slug: string; name: string; name_ar?: string | null } | null;
  subcategory?: { id: number; slug: string; name: string; name_ar?: string | null } | null;
};

export type ResourcePage = {
  data: RawResource[];
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
};

const RETRYABLE_STATUS = new Set([429, 500, 502, 503, 504]);

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchJson<T>(path: string): Promise<T> {
  let lastError: unknown = new Error(`Catalogue API failed for ${path}`);

  // The shared host answers a share of PHP requests with 503 while the next
  // request succeeds. Retry before giving up, and only throw after the last
  // attempt so a failed response is never written to the data cache.
  for (let attempt = 0; attempt < 3; attempt += 1) {
    let res: Response;
    try {
      res = await fetch(`${API_BASE_URL}${path}`, {
        cache: "no-store",
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(15000),
      });
    } catch (error) {
      lastError = error;
      if (attempt < 2) await sleep(250 * (attempt + 1));
      continue;
    }

    if (res.ok) return (await res.json()) as T;

    // A 404 is a real answer: do not retry it.
    if (!RETRYABLE_STATUS.has(res.status)) {
      throw new Error(`Catalogue API responded ${res.status} for ${path}`);
    }
    lastError = new Error(`Catalogue API responded ${res.status} for ${path}`);
    if (attempt < 2) await sleep(250 * (attempt + 1));
  }

  throw lastError;
}

const cachedFetchJson = unstable_cache(fetchJson, ["catalog-api"], {
  revalidate: CATALOG_REVALIDATE_SECONDS,
});

async function apiGet<T>(path: string): Promise<T | null> {
  try {
    const data = (await cachedFetchJson(path)) as T;
    return data ?? null;
  } catch {
    return null;
  }
}

export async function getCatalogStats(): Promise<CatalogStats | null> {
  return apiGet<CatalogStats>("/stats/catalog");
}

/** Build a query string from defined values only. */
function qs(params: Record<string, string | number | boolean | undefined | null>) {
  const sp = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === "") continue;
    sp.set(key, String(value));
  }
  const s = sp.toString();
  return s ? `?${s}` : "";
}

export async function getResourcePage(
  params: {
    type?: string;
    category?: string;
    subcategory?: string;
    platform?: string;
    search?: string;
    featured?: boolean;
    sort?: string;
    page?: number;
    per_page?: number;
    exclude_canva?: boolean;
  } = {},
): Promise<ResourcePage | null> {
  const query = qs({ ...params, page: params.page ?? 1, per_page: params.per_page ?? 24 });
  const page = await apiGet<ResourcePage>(`/resources${query}`);
  // Last-known-good fallback: a checked-in snapshot of the published
  // catalogue. It is only used when the live API cannot be reached, so a
  // hosting hiccup never empties the site or the sitemap.
  return page ?? snapshotResourcePage(params);
}

/** Snapshot rows, typed as the API rows they were captured from. */
const SNAPSHOT_ROWS = (catalogueSnapshot as unknown) as RawResource[];

type ResourceQuery = NonNullable<Parameters<typeof getResourcePage>[0]>;

function matchesSnapshotFilters(
  row: RawResource,
  params: ResourceQuery,
): boolean {
  const type = (params.type || "").toLowerCase();
  if (type && type !== "canva" && row.resource_type !== type) return false;
  if (type === "canva") {
    const isCanva =
      !!row.canva_design_id ||
      (row.category?.slug || "").includes("canva") ||
      row.resource_type === "canva";
    if (!isCanva) return false;
  }
  if (params.exclude_canva) {
    const isCanva =
      !!row.canva_design_id || (row.category?.slug || "").includes("canva");
    if (isCanva) return false;
  }
  if (params.category && row.category?.slug !== params.category) return false;
  if (params.subcategory) {
    const slug = row.subcategory?.slug || "";
    if (slug !== params.subcategory && !slug.endsWith(`-${params.subcategory}`)) {
      return false;
    }
  }
  if (params.platform) {
    const platform = params.platform.toLowerCase();
    if (platform === "canva" && !row.canva_design_id) return false;
    if (["excel", "xlsx"].includes(platform) && row.resource_type !== "excel") return false;
    if (["word", "docx"].includes(platform) && row.resource_type !== "word") return false;
    if (
      ["powerpoint", "pptx", "presentation"].includes(platform) &&
      row.resource_type !== "presentation"
    ) {
      return false;
    }
  }
  if (params.featured && !row.featured) return false;
  if (params.search) {
    const term = params.search.toLowerCase();
    const haystack = [row.title, row.short_description, row.title_ar]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    if (!haystack.includes(term)) return false;
  }
  return true;
}

function snapshotResourcePage(params: ResourceQuery): ResourcePage {
  const filtered = SNAPSHOT_ROWS.filter((row) =>
    matchesSnapshotFilters(row, params),
  );

  const sort = params.sort || "latest";
  const sorted = [...filtered].sort((a, b) => {
    if (sort === "popular") return (b.downloads_count || 0) - (a.downloads_count || 0);
    if (sort === "rating") return Number(b.rating || 0) - Number(a.rating || 0);
    return String(b.published_at || "").localeCompare(String(a.published_at || ""));
  });

  const perPage = params.per_page ?? 24;
  const currentPage = params.page ?? 1;
  const start = (currentPage - 1) * perPage;

  return {
    data: sorted.slice(start, start + perPage),
    total: sorted.length,
    per_page: perPage,
    current_page: currentPage,
    last_page: Math.max(1, Math.ceil(sorted.length / perPage)),
  };
}

/**
 * Detail lookup that tolerates a live-API outage.
 *
 * A real 404 from the API still 404s. Only an unreachable API falls back to
 * the snapshot, so a published template never disappears from Google because
 * the backend had a bad minute.
 */
export async function getTemplateDetailResult(
  slug: string,
): Promise<{ resource: RawResource | null; unavailable: boolean }> {
  const { data, unavailable } = await getResourceBySlugResult(slug);
  if (data) return { resource: data as RawResource, unavailable: false };
  if (unavailable) {
    const snapshot = SNAPSHOT_ROWS.find((row) => row.slug === slug);
    if (snapshot) return { resource: snapshot, unavailable: false };
  }
  return { resource: null, unavailable };
}

export async function getPublishedResources(
  params: Parameters<typeof getResourcePage>[0] = {},
): Promise<RawResource[]> {
  const page = await getResourcePage(params);
  return page?.data ?? [];
}

/**
 * Canonical, indexable description for a single resource.
 *
 * Only returns text that exists in the database. If the stored description is
 * missing or shorter than the excerpt, the better of the two real strings is
 * used - never generated filler.
 */
export function buildDescription(
  r: Pick<RawResource, "title" | "short_description" | "description" | "resource_type">,
  categoryName?: string | null,
): string {
  const short = (r.short_description || "").trim();
  const long = (r.description || "").trim();

  if (long.length >= 80) {
    return long.length > 320 ? `${long.slice(0, 317).trimEnd()}...` : long;
  }
  if (short) {
    const base = short.length > 300 ? `${short.slice(0, 297).trimEnd()}...` : short;
    return categoryName
      ? `${base} Part of the ${categoryName} collection on EzyTemplate.`
      : base;
  }
  const label = r.resource_type
    ? `${r.resource_type.charAt(0).toUpperCase()}${r.resource_type.slice(1)} template`
    : "template";
  return `${r.title} is a downloadable ${label} on EzyTemplate.`;
}

export function formatCount(n: number): string {
  return new Intl.NumberFormat("en-US").format(n);
}

export type CollectionFacet = {
  slug: string;
  label: string;
  labelAr: string;
  count: number;
};

export type CollectionKey =
  | "excel"
  | "word"
  | "design"
  | "canva"
  | "presentation"
  | "website";

type CollectionSpec = {
  type?: string;
  exclude_canva?: boolean;
  /** Main-category slug the count is taken from. */
  countKey: string;
  /** Which relation drives the sidebar facets. */
  facet: "subcategory" | "category";
  /** Strip the per-collection prefix (excel-, word-) from a sub-category slug. */
  stripPrefix?: boolean;
};

const COLLECTIONS: Record<CollectionKey, CollectionSpec> = {
  excel: { type: "excel", countKey: "excel-templates", facet: "subcategory", stripPrefix: true },
  word: { type: "word", countKey: "word-templates", facet: "subcategory", stripPrefix: true },
  design: { type: "design", exclude_canva: true, countKey: "design-templates", facet: "subcategory" },
  canva: { type: "canva", countKey: "canva-templates", facet: "subcategory" },
  presentation: { type: "presentation", countKey: "presentation-templates", facet: "subcategory" },
  website: { type: "website", countKey: "website-templates", facet: "subcategory" },
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function facetSlug(raw: string | undefined | null, stripPrefix?: boolean) {
  if (!raw) return "";
  const lower = raw.toLowerCase();
  const stripped = stripPrefix ? lower.replace(/^[a-z]+-/, "") : lower;
  return slugify(stripped);
}

export type CollectionData = {
  resources: any[];
  total: number;
  facets: CollectionFacet[];
  unavailable: boolean;
};

/**
 * Server-side loader for a collection page.
 *
 * Returns every published row for the collection (cached), plus the facet list
 * with counts derived from those same rows, so the sidebar, the heading total
 * and the rendered cards can never disagree.
 */
export async function getCollectionData(
  key: CollectionKey,
  options: { perPage?: number; subcategory?: string | null } = {},
): Promise<CollectionData> {
  const spec = COLLECTIONS[key];
  const perPage = options.perPage ?? 600;

  const page = await getResourcePage({
    type: spec.type,
    exclude_canva: spec.exclude_canva,
    subcategory: options.subcategory ?? undefined,
    per_page: perPage,
    sort: "latest",
  });

  // The heading count comes from the same query that produces the rendered
  // cards. Main-category counts are deliberately not used here: they cover a
  // different slice of the catalogue (for example every `design` row also
  // carries a design main-category id, including the Canva rows), so mixing
  // them made the number disagree with the templates actually listed.
  const total = page?.total ?? 0;

  if (!page || !page.data) {
    return { resources: [], total, facets: [], unavailable: true };
  }

  const resources = page.data.map((r) => normalizeTemplate(r, "en"));

  // Build facets from the rows actually rendered for this request. Some
  // catalogue rows (notably older Excel imports) have a category but no
  // subcategory. Fall back to their category so every published resource is
  // represented in the sidebar totals instead of silently disappearing.
  const counts = new Map<string, { count: number; label: string; labelAr: string }>();
  for (const r of page.data) {
    const primaryNode =
      spec.facet === "subcategory" ? r.subcategory : r.category;
    const node =
      primaryNode || (spec.facet === "subcategory" ? r.category : null);
    if (!node) continue;
    // Only subcategory slugs carry collection prefixes such as `excel-`.
    // Category fallback slugs (for example `timesheets-hr`) are already
    // canonical and must not be shortened.
    const slug = facetSlug(node.slug, !!primaryNode && spec.stripPrefix);
    if (!slug) continue;
    const entry = counts.get(slug) ?? {
      count: 0,
      label: node.name,
      labelAr: (node as any).name_ar || node.name,
    };
    entry.count += 1;
    counts.set(slug, entry);
  }

  const facets: CollectionFacet[] = [...counts.entries()]
    .map(([slug, v]) => ({ slug, label: v.label, labelAr: v.labelAr, count: v.count }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));

  const scopedTotal = options.subcategory
    ? page.total
    : total;

  return { resources, total: scopedTotal, facets, unavailable: false };
}

export function collectionCountFromStats(
  stats: CatalogStats | null,
  key: CollectionKey,
): number {
  if (!stats) return 0;
  if (key === "canva") return stats.canva_templates;
  return stats.by_main_category.find((m) => m.slug === COLLECTIONS[key].countKey)?.total ?? 0;
}

/**
 * Metadata for a collection facet page whose catalogue request failed.
 *
 * The URL itself is valid, so it keeps its canonical, but the content could
 * not be verified. Returning a 404 here would tell search engines the page
 * does not exist every time the API has a bad moment, so the page is served
 * and kept out of the index instead.
 */
export function unavailableCollectionMetadata(
  basePath: string,
  category: string,
): Metadata {
  return {
    title: "Collection temporarily unavailable",
    description:
      "This template collection could not be loaded right now. Please try again in a few minutes.",
    alternates: { canonical: `${basePath}/${category}` },
    robots: { index: false, follow: true },
  };
}

/** Normalise a title so "Small Business Budget" and "small  business budget"
 *  are recognised as the same template. */
function titleKey(value: string | null | undefined): string {
  return String(value || "")
    .toLowerCase()
    .replace(/&[a-z]+;/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/**
 * The catalogue contains a handful of rows seeded twice under different
 * category paths (same title, same content). Search Console reported them as
 * "Duplicate without user-selected canonical". Each duplicate points its
 * canonical at one primary URL instead of competing with itself.
 */
async function buildCanonicalMap(): Promise<Record<string, string>> {
  const resources = await getPublishedResources({ per_page: 2000 });
  const groups = new Map<
    string,
    Array<{ slug: string; downloads: number; published: string }>
  >();

  for (const resource of resources) {
    const slug = resource?.slug;
    const title = titleKey(resource?.title);
    if (!slug || !title) continue;
    // Only merge rows whose actual copy is identical. Two different templates
    // can legitimately share a title (an Excel and a presentation version),
    // and collapsing those would hide real content.
    const body = `${resource.short_description || ""}|${resource.description || ""}`
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();
    const key = `${title}::${body.slice(0, 400)}`;
    const list = groups.get(key) ?? [];
    list.push({
      slug,
      downloads: Number(resource.downloads_count || 0),
      published: resource.published_at || "",
    });
    groups.set(key, list);
  }

  const map: Record<string, string> = {};
  for (const list of groups.values()) {
    if (list.length < 2) continue;
    const [primary] = [...list].sort((a, b) => {
      if (b.downloads !== a.downloads) return b.downloads - a.downloads;
      if (a.published !== b.published) return a.published < b.published ? -1 : 1;
      return a.slug.localeCompare(b.slug);
    });
    for (const item of list) {
      if (item.slug !== primary.slug) map[item.slug] = primary.slug;
    }
  }
  return map;
}

const cachedCanonicalMap = unstable_cache(buildCanonicalMap, ["template-canonicals"], {
  revalidate: CATALOG_REVALIDATE_SECONDS,
});

export async function getCanonicalTemplateMap(): Promise<Record<string, string>> {
  try {
    return await cachedCanonicalMap();
  } catch {
    return {};
  }
}

export async function getCanonicalTemplateSlug(slug: string): Promise<string> {
  try {
    const map = await cachedCanonicalMap();
    return map[slug] || slug;
  } catch {
    return slug;
  }
}

/**
 * Cached server-side helpers for the home page. They share the same data cache
 * as the rest of the catalogue, so the dynamic home route no longer issues
 * four uncached requests to PHP on every visitor.
 */
export function getHomeContentCached(): Promise<any | null> {
  return apiGet<any>("/content/home");
}

export function getCategoriesCached(): Promise<any[] | null> {
  return apiGet<any[]>("/categories");
}

export function getLatestResourcesCached(perPage = 50): Promise<any | null> {
  return apiGet<any>(`/resources?per_page=${perPage}`);
}
