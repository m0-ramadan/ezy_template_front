import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GUIDES, getGuide } from "@/data/guides";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return GUIDES.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};

  const url = `${SITE_URL}/guides/${guide.slug}`;
  const image = `${SITE_URL}/assets/logo.png`;

  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: `/guides/${guide.slug}` },
    openGraph: {
      title: `${guide.title} | ${SITE_NAME}`,
      description: guide.description,
      url,
      type: "article",
      publishedTime: guide.published,
      modifiedTime: guide.updated,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: guide.title,
      description: guide.description,
    },
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const url = `${SITE_URL}/guides/${guide.slug}`;
  const date = new Date(guide.published).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const related = GUIDES.filter((item) => item.slug !== guide.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Guides",
            item: `${SITE_URL}/guides`,
          },
          { "@type": "ListItem", position: 3, name: guide.title, item: url },
        ],
      },
      {
        "@type": "Article",
        headline: guide.title,
        description: guide.description,
        datePublished: guide.published,
        dateModified: guide.updated,
        inLanguage: "en",
        mainEntityOfPage: url,
        author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
        publisher: {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
          logo: { "@type": "ImageObject", url: `${SITE_URL}/assets/logo.png` },
        },
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
        <Link href="/">Home</Link>
        <span className="sep">›</span>
        <Link href="/guides">Guides</Link>
        <span className="sep">›</span>
        <b>{guide.title}</b>
      </div>

      <span className="eyebrow">{guide.topic}</span>
      <h1>{guide.title}</h1>
      <div className="meta">
        {SITE_NAME} Team • {date} • {guide.readingMinutes} min read
      </div>

      <div
        className="article-content"
        style={{ maxWidth: "780px", margin: "0 auto" }}
      >
        <p className="lead" style={{ fontSize: "17px" }}>
          {guide.description}
        </p>

        <div
          className="rich-content"
          style={{ fontSize: "15px", lineHeight: 1.8 }}
          dangerouslySetInnerHTML={{ __html: guide.html }}
        />

        <div
          style={{
            marginTop: "40px",
            borderTop: "1px solid var(--line)",
            paddingTop: "24px",
          }}
        >
          <Link className="smallprimary" href="/guides">
            ← All guides
          </Link>
        </div>
      </div>

      <section style={{ maxWidth: "780px", margin: "48px auto 0" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 800 }}>More guides</h2>
        <ul style={{ lineHeight: 1.9, paddingInlineStart: "22px" }}>
          {related.map((item) => (
            <li key={item.slug}>
              <Link href={`/guides/${item.slug}`}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
