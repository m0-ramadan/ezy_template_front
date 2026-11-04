import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CategoryToolsClientPage from "./CategoryToolsClientPage";
import { SITE_URL } from "@/lib/site";
import {
  TOOL_CATEGORIES,
  isToolCategory,
  toolsInCategory,
  type ToolCategory,
} from "@/data/tool-catalog";

const CATEGORY_COPY: Record<
  ToolCategory,
  { name: string; description: string; intro: string }
> = {
  pdf: {
    name: "PDF Tools",
    description:
      "Compress, merge, split and convert PDF files online for free. No signup, no watermark and no upload limits beyond your browser.",
    intro:
      "Process PDF documents in the browser: shrink large files, combine several documents into one, split by page range, or turn images into a ready-to-share PDF.",
  },
  images: {
    name: "Image Tools",
    description:
      "Compress, resize and convert images, or generate ready-to-use colour palettes. Free browser tools that keep your files on your device.",
    intro:
      "Prepare images for the web and for print: reduce file size, change dimensions, convert between PNG, JPG and WebP, or build a consistent palette for a brand.",
  },
  business: {
    name: "Business Tools",
    description:
      "Create invoices and quotes, generate QR codes and strong passwords with free online business tools from EzyTemplate.",
    intro:
      "Everything you need to run day-to-day business tasks without installing software: professional invoices, client quotes, QR codes and secure passwords.",
  },
  calculators: {
    name: "Calculators",
    description:
      "Free online calculators for VAT, percentages, loan EMIs, discounts and profit margins, with clear formulas and instant results.",
    intro:
      "Work out everyday business and personal numbers in seconds: tax, margins, discounts, instalments and percentage changes, all with the formula shown.",
  },
  excel: {
    name: "Spreadsheet Tools",
    description:
      "Convert CSV files to Excel workbooks and Excel sheets back to CSV online, free and without uploading your data to a server.",
    intro:
      "Move data between spreadsheets and plain text safely: turn CSV exports into formatted .xlsx workbooks or flatten an Excel sheet into a CSV file.",
  },
  text: {
    name: "Text Tools",
    description:
      "Convert text case and count words, characters and reading time with free online text utilities.",
    intro:
      "Clean up copy before publishing: switch between upper, lower and title case, or measure words, characters and reading time for articles and social posts.",
  },
  developer: {
    name: "Developer Tools",
    description:
      "Format and validate JSON, generate UUIDs and build CSS gradients with free developer utilities.",
    intro:
      "Small utilities that remove repetitive work: pretty-print JSON, generate RFC-compliant UUIDs and design CSS gradients with copy-ready code.",
  },
  seo: {
    name: "SEO Tools",
    description:
      "Generate meta tags and build UTM campaign links with free SEO tools for marketers and site owners.",
    intro:
      "Improve how your pages appear in search and measure your campaigns: create complete meta tag sets and tag outbound links with UTM parameters.",
  },
};

// Anything outside this list is a real 404 at the routing layer, before the
// response starts streaming.
export const dynamicParams = false;

export function generateStaticParams() {
  return TOOL_CATEGORIES.map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  // An unknown category used to render an empty 200 page, which search
  // engines record as a soft 404. It is a real 404 now.
  if (!isToolCategory(category)) notFound();
  const copy = CATEGORY_COPY[category];
  return {
    title: `${copy.name} – Free Online Utilities`,
    description: copy.description,
    alternates: { canonical: `/tools/${category}` },
    openGraph: {
      title: `${copy.name} | EzyTemplate`,
      description: copy.description,
      url: `${SITE_URL}/tools/${category}`,
      type: "website",
    },
    twitter: { card: "summary_large_image", title: `${copy.name} | EzyTemplate` },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  if (!isToolCategory(category)) notFound();

  const copy = CATEGORY_COPY[category];
  const tools = toolsInCategory(category);

  return (
    <>
      <CategoryToolsClientPage categorySlug={category} />
      {/* Server-rendered index of the tools in this category. The interactive
          grid above is client-rendered, so this list guarantees every tool URL
          has a crawlable, server-rendered link. */}
      <section
        className="container"
        style={{ paddingBottom: "64px", maxWidth: "1100px" }}
      >
        <h2 style={{ fontSize: "20px", fontWeight: 800, marginBottom: "8px" }}>
          {copy.name} on EzyTemplate
        </h2>
        <p style={{ color: "var(--muted)", marginBottom: "18px", maxWidth: "760px" }}>
          {copy.intro}
        </p>
        <ul
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "10px",
            listStyle: "none",
            padding: 0,
            margin: 0,
          }}
        >
          {tools.map((tool) => (
            <li key={tool.slug}>
              <Link
                href={`/tools/${tool.slug}`}
                style={{
                  display: "block",
                  padding: "12px 14px",
                  border: "1px solid var(--line)",
                  borderRadius: "10px",
                  fontWeight: 600,
                }}
              >
                {tool.name}
              </Link>
            </li>
          ))}
        </ul>
        <p style={{ marginTop: "18px" }}>
          <Link href="/tools">Browse all free tools →</Link>
        </p>
      </section>
    </>
  );
}
