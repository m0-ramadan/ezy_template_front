import { unstable_cache } from "next/cache";
import { API_BASE_URL } from "@/lib/api";

/**
 * Server-side blog access.
 *
 * Articles are fetched directly from the Laravel API, but the responses are
 * cached. The previous implementation used `cache: "no-store"` on every render
 * and threw on any API hiccup, which turned six published articles into HTTP
 * 500 pages (and made Google drop them) every time the backend was busy.
 */

export const ARTICLES_REVALIDATE_SECONDS = 300;

export type RawArticle = {
  id: number;
  slug: string;
  title: string;
  title_ar?: string | null;
  excerpt: string | null;
  excerpt_ar?: string | null;
  content: string | null;
  content_ar?: string | null;
  cover_image: string | null;
  category: string | null;
  author_name: string | null;
  author_name_ar?: string | null;
  published_at: string | null;
  meta_title?: string | null;
  meta_description?: string | null;
};

type ArticlesResponse = {
  data: RawArticle[];
  total: number;
};

type ArticleLookup = {
  status: "found" | "missing";
  article: RawArticle | null;
};

const WORDS_PER_MINUTE = 220;

/** Real reading time derived from the article body, never a fixed value. */
export function readingTimeFromContent(content: string | null | undefined): number {
  const text = String(content || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!text) return 1;
  const words = text.split(" ").filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

export function wordCount(content: string | null | undefined): number {
  const text = String(content || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text ? text.split(" ").filter(Boolean).length : 0;
}


const RETRYABLE_STATUS = new Set([429, 500, 502, 503, 504]);

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Retry transient host errors; a 404 is returned immediately. */
async function fetchWithRetry(url: string): Promise<Response> {
  let lastError: unknown = new Error(`Request failed: ${url}`);
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const res = await fetch(url, {
        cache: "no-store",
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(15000),
      });
      if (res.ok || !RETRYABLE_STATUS.has(res.status)) return res;
      lastError = new Error(`API responded ${res.status}`);
    } catch (error) {
      lastError = error;
    }
    if (attempt < 2) await sleep(250 * (attempt + 1));
  }
  throw lastError;
}

async function fetchArticlesPage(
  page: number,
  perPage: number,
): Promise<ArticlesResponse> {
  const sp = new URLSearchParams({
    page: String(page),
    per_page: String(perPage),
  });
  const res = await fetchWithRetry(`${API_BASE_URL}/articles?${sp.toString()}`);
  // Throw so a failed request is never written to the data cache.
  if (!res.ok) throw new Error(`Articles API responded ${res.status}`);
  return (await res.json()) as ArticlesResponse;
}

const cachedArticlesPage = unstable_cache(
  fetchArticlesPage,
  ["articles-page"],
  { revalidate: ARTICLES_REVALIDATE_SECONDS },
);

export async function getArticlesSSR(
  params: { page?: number; perPage?: number } = {},
): Promise<{ articles: RawArticle[]; total: number; unavailable: boolean }> {
  try {
    const json = await cachedArticlesPage(params.page ?? 1, params.perPage ?? 24);
    return {
      articles: json.data ?? [],
      total: json.total ?? 0,
      unavailable: false,
    };
  } catch {
    return { articles: [], total: 0, unavailable: true };
  }
}

async function fetchArticleBySlug(slug: string): Promise<ArticleLookup> {
  const res = await fetchWithRetry(
    `${API_BASE_URL}/articles/${encodeURIComponent(slug)}`,
  );
  // A 404 is a real answer and may be cached. Anything else is an outage, and
  // throwing keeps the failure out of the data cache.
  if (res.status === 404) return { status: "missing", article: null };
  if (!res.ok) throw new Error(`Article API responded ${res.status}`);
  const article = (await res.json()) as RawArticle;
  // Guard against a malformed API response ever rendering under the wrong URL.
  if (!article || article.slug !== slug) {
    return { status: "missing", article: null };
  }
  return { status: "found", article };
}

const cachedArticleBySlug = unstable_cache(
  fetchArticleBySlug,
  ["article-by-slug"],
  { revalidate: ARTICLES_REVALIDATE_SECONDS },
);

export async function getArticleBySlugResult(
  slug: string,
): Promise<{ article: RawArticle | null; unavailable: boolean }> {
  try {
    const lookup = await cachedArticleBySlug(slug);
    return { article: lookup.article, unavailable: false };
  } catch {
    return { article: null, unavailable: true };
  }
}

export async function getArticleBySlugSSR(slug: string): Promise<RawArticle | null> {
  const { article } = await getArticleBySlugResult(slug);
  return article;
}
