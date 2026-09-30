import { API_BASE_URL } from "@/lib/api";

/**
 * Server-side blog access.
 *
 * Articles are fetched directly from the Laravel API. A slug that does not
 * exist resolves to `null` and the page returns a real 404 - there is no
 * fallback that renders a different article.
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

export async function getArticlesSSR(
  params: { page?: number; perPage?: number } = {},
): Promise<{ articles: RawArticle[]; total: number; unavailable: boolean }> {
  try {
    const sp = new URLSearchParams({
      page: String(params.page ?? 1),
      per_page: String(params.perPage ?? 24),
    });
    const res = await fetch(`${API_BASE_URL}/articles?${sp.toString()}`, {
      next: { revalidate: ARTICLES_REVALIDATE_SECONDS },
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return { articles: [], total: 0, unavailable: true };
    const json = (await res.json()) as ArticlesResponse;
    return { articles: json.data ?? [], total: json.total ?? 0, unavailable: false };
  } catch {
    return { articles: [], total: 0, unavailable: true };
  }
}

export async function getArticleBySlugResult(
  slug: string,
): Promise<{ article: RawArticle | null; unavailable: boolean }> {
  try {
    const res = await fetch(`${API_BASE_URL}/articles/${encodeURIComponent(slug)}`, {
      next: { revalidate: ARTICLES_REVALIDATE_SECONDS },
      headers: { Accept: "application/json" },
    });
    if (res.status === 404) return { article: null, unavailable: false };
    if (!res.ok) return { article: null, unavailable: true };
    const article = (await res.json()) as RawArticle;
    // Guard against a malformed API response ever rendering under the wrong URL.
    if (!article || article.slug !== slug) return { article: null, unavailable: false };
    return { article, unavailable: false };
  } catch {
    return { article: null, unavailable: true };
  }
}

export async function getArticleBySlugSSR(slug: string): Promise<RawArticle | null> {
  const { article } = await getArticleBySlugResult(slug);
  return article;
}
