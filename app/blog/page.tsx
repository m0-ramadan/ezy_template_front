import Link from "next/link";
import type { Metadata } from "next";
import { getArticlesSSR, readingTimeFromContent } from "@/lib/articles";
import { getAssetUrl } from "@/lib/api";
import { SITE_URL } from "@/lib/site";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const { total } = await getArticlesSSR({ perPage: 1 });
  return {
    title: "Blog - Template Guides and Practical Tutorials",
    description:
      total > 0
        ? `Read ${total} published EzyTemplate articles: template selection guides, spreadsheet and document workflows, design tips and file-format how-tos.`
        : "The EzyTemplate blog publishes guides on choosing and using templates. New articles are added as they are reviewed and completed.",
    alternates: { canonical: "/blog" },
    openGraph: {
      title: "Blog | EzyTemplate",
      description: "Template guides, file-format how-tos and practical tutorials.",
      url: `${SITE_URL}/blog`,
      type: "website",
    },
    // An empty blog index has no content to rank and would be a thin page.
    ...(total > 0 ? {} : { robots: { index: false, follow: true } as Metadata["robots"] }),
  };
}

function formatDate(value: string | null) {
  if (!value) return "";
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function Blog() {
  const { articles, total, unavailable } = await getArticlesSSR({ perPage: 24 });

  return (
    <main className="container section blog-page">
      <div className="breadcrumbs">
        <Link href="/">Home</Link>　›　<b>Blog</b>
      </div>

      <span className="eyebrow">Insights &amp; Tutorials</span>
      <h1>The EzyTemplate Blog</h1>
      <p className="lead">
        Guides on picking, formatting and licensing templates, plus practical
        workflows for Excel, Word, Canva and presentation files.
      </p>

      {articles.length > 0 ? (
        <div className="article-grid" style={{ marginTop: "28px" }}>
          {articles.map((article) => {
            const cover = getAssetUrl(
              article.cover_image || "/assets/blog-web-card.png",
            );
            const minutes = readingTimeFromContent(article.content);
            return (
              <article className="article-card" key={article.slug}>
                <Link href={`/blog/${article.slug}`} className="thumb">
                  <img src={cover} alt={article.title} loading="lazy" />
                  {article.category && (
                    <span className="category-badge">{article.category}</span>
                  )}
                </Link>
                <div className="article-body">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      fontSize: "10px",
                      color: "var(--muted)",
                      marginBottom: "8px",
                    }}
                  >
                    <span>{article.author_name || "EzyTemplate Team"}</span>
                    <span>•</span>
                    <span>{formatDate(article.published_at)}</span>
                    <span>•</span>
                    <span>{minutes} min read</span>
                  </div>
                  <Link href={`/blog/${article.slug}`}>
                    <h2 style={{ fontSize: "17px", fontWeight: 800 }}>
                      {article.title}
                    </h2>
                  </Link>
                  <p>{article.excerpt}</p>
                  <Link className="read-more" href={`/blog/${article.slug}`}>
                    Read article →
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div
          style={{
            marginTop: "28px",
            padding: "56px 24px",
            borderRadius: "18px",
            border: "1px dashed var(--line, #e2e8f0)",
            background: "var(--card-bg, #ffffff)",
            maxWidth: "720px",
          }}
        >
          <h2 style={{ fontSize: "20px", fontWeight: 800, marginBottom: "10px" }}>
            {unavailable
              ? "The blog feed is temporarily unavailable"
              : "No articles are published yet"}
          </h2>
          <p style={{ color: "var(--muted)", lineHeight: 1.65 }}>
            {unavailable
              ? "Please try again shortly."
              : "EzyTemplate only publishes articles once they are written, reviewed and sourced. Rather than show sample posts, this page will list real guides as they go live. In the meantime, the template catalogue and the free browser tools are fully available."}
          </p>
          <p style={{ marginTop: "16px", display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <Link className="smallprimary" href="/templates">
              Browse templates
            </Link>
            <Link className="smallprimary" href="/tools">
              Open the tools
            </Link>
          </p>
        </div>
      )}
    </main>
  );
}
