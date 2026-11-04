import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getArticleBySlugResult,
  readingTimeFromContent,
  wordCount,
} from "@/lib/articles";
import { getAssetUrl } from "@/lib/api";
import { SITE_NAME, SITE_URL } from "@/lib/site";

// Data is cached in lib/articles.ts, so no route-level opt-out is needed.
export const revalidate = 300;

function plainExcerpt(value: string | null | undefined, max = 158) {
  const text = String(value || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= max) return text;
  return `${text.slice(0, max - 3).trimEnd()}...`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { article, unavailable } = await getArticleBySlugResult(slug);
  // A missing slug is a genuine 404, never a duplicate of another article.
  // An unreachable API is not a 404: the URL keeps its canonical but stays
  // out of the index for this render.
  if (unavailable) {
    return {
      title: "Article temporarily unavailable",
      description:
        "This article could not be loaded right now. Please try again in a few minutes.",
      alternates: { canonical: `/blog/${slug}` },
      robots: { index: false, follow: true },
    };
  }
  if (!article) notFound();

  const description =
    article.meta_description ||
    plainExcerpt(article.excerpt) ||
    plainExcerpt(article.content, 158) ||
    `${article.title} - a guide published on EzyTemplate.`;

  const image = getAssetUrl(article.cover_image || "/assets/blog-web-card.png");

  return {
    title: article.meta_title || article.title,
    description,
    alternates: { canonical: `/blog/${article.slug}` },
    openGraph: {
      title: article.title,
      description,
      url: `${SITE_URL}/blog/${article.slug}`,
      type: "article",
      images: image.startsWith("http") ? [image] : undefined,
      publishedTime: article.published_at || undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description,
    },
  };
}

export default async function Article({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { article, unavailable } = await getArticleBySlugResult(slug);
  if (!article && !unavailable) notFound();

  // Never answer a temporary backend outage with HTTP 500: that is what made
  // Google drop these article URLs. Serve a readable notice instead.
  if (!article) {
    return (
      <main className="container article-detail">
        <div className="breadcrumbs">
          <Link href="/">Home</Link>　›　<Link href="/blog">Blog</Link>
        </div>
        <h1>Article temporarily unavailable</h1>
        <p className="lead">
          We could not load this article right now. It is still published — please
          try again in a few minutes.
        </p>
        <p>
          <Link className="smallprimary" href="/blog">
            ← Back to Blog
          </Link>
        </p>
      </main>
    );
  }

  const minutes = readingTimeFromContent(article.content);
  const words = wordCount(article.content);
  const cover = getAssetUrl(article.cover_image || "/assets/article-web.png");
  const date = article.published_at
    ? new Date(article.published_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
          {
            "@type": "ListItem",
            position: 3,
            name: article.title,
            item: `${SITE_URL}/blog/${article.slug}`,
          },
        ],
      },
      {
        "@type": "BlogPosting",
        headline: article.title,
        description:
          article.meta_description || plainExcerpt(article.excerpt || article.content),
        image: [cover],
        datePublished: article.published_at || undefined,
        dateModified: article.published_at || undefined,
        author: {
          "@type": "Organization",
          name: article.author_name || SITE_NAME,
        },
        publisher: {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
        },
        mainEntityOfPage: `${SITE_URL}/blog/${article.slug}`,
        inLanguage: "en",
      },
    ],
  };

  return (
    <main className="container article-detail">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="breadcrumbs">
        <Link href="/">Home</Link>　›　
        <Link href="/blog">Blog</Link>　›　
        {article.category && <span>{article.category}　›　</span>}
        <b>{article.title}</b>
      </div>

      {article.category && <span className="eyebrow">{article.category}</span>}
      <h1>{article.title}</h1>
      <div className="meta">
        {article.author_name || "EzyTemplate Team"} • {date}
        {` • ${minutes} min read`}
        {words > 0 ? ` • ${words} words` : ""}
      </div>

      <img className="article-cover" src={cover} alt={article.title} />

      <div
        className="article-content"
        style={{ maxWidth: "780px", margin: "0 auto", lineHeight: 1.7 }}
      >
        {article.excerpt && (
          <p className="lead" style={{ fontSize: "17px", fontWeight: 500, marginBottom: "24px" }}>
            {article.excerpt}
          </p>
        )}

        {article.content ? (
          <div
            className="rich-content"
            style={{ fontSize: "15px" }}
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        ) : (
          <p>This article does not have published body content yet.</p>
        )}

        <div
          style={{
            marginTop: "40px",
            borderTop: "1px solid var(--line)",
            paddingTop: "24px",
          }}
        >
          <Link className="smallprimary" href="/blog">
            ← Back to Blog
          </Link>
        </div>
      </div>
    </main>
  );
}
