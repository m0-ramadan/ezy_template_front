import type { Metadata } from "next";
import Link from "next/link";
import { GUIDES } from "@/data/guides";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Guides – Practical Help with Templates and Files",
  description:
    "Long-form guides on choosing, editing and using business templates: spreadsheet formats, Word layouts, licensing, budgeting and invoicing.",
  alternates: { canonical: "/guides" },
  openGraph: {
    title: "Guides | EzyTemplate",
    description:
      "Long-form guides on choosing, editing and using business templates.",
    url: `${SITE_URL}/guides`,
    type: "website",
  },
};

export default function GuidesIndex() {
  return (
    <main className="container section">
      <div className="breadcrumbs">
        <Link href="/">Home</Link>
        <span className="sep">›</span>
        <b>Guides</b>
      </div>

      <span className="eyebrow">Guides</span>
      <h1>Practical guides for templates and documents</h1>
      <p className="lead" style={{ maxWidth: "760px" }}>
        How to pick the right file format, edit a template without breaking it,
        and use business documents correctly. Written by the people who maintain
        the EzyTemplate catalogue.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "20px",
          marginTop: "32px",
        }}
      >
        {GUIDES.map((guide) => (
          <article
            key={guide.slug}
            style={{
              border: "1px solid var(--line)",
              borderRadius: "16px",
              padding: "22px",
              background: "var(--card-bg)",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <span
              className="eyebrow"
              style={{ fontSize: "11px", margin: 0 }}
            >
              {guide.topic} · {guide.readingMinutes} min read
            </span>
            <h2 style={{ fontSize: "19px", fontWeight: 800, margin: 0, lineHeight: 1.35 }}>
              <Link href={`/guides/${guide.slug}`}>{guide.title}</Link>
            </h2>
            <p style={{ color: "var(--muted)", fontSize: "14px", lineHeight: 1.7, margin: 0 }}>
              {guide.description}
            </p>
            <Link
              href={`/guides/${guide.slug}`}
              style={{ fontWeight: 700, fontSize: "14px", marginTop: "auto" }}
            >
              Read the guide →
            </Link>
          </article>
        ))}
      </div>

      <section style={{ marginTop: "48px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 800 }}>Keep exploring</h2>
        <ul style={{ lineHeight: 1.9, paddingInlineStart: "22px" }}>
          <li>
            <Link href="/templates">Every template collection</Link>
          </li>
          <li>
            <Link href="/excel-templates">Excel workbooks</Link>
          </li>
          <li>
            <Link href="/word-templates">Word documents</Link>
          </li>
          <li>
            <Link href="/tools">Free browser tools</Link>
          </li>
        </ul>
      </section>
    </main>
  );
}
