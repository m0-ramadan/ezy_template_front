import type { Metadata } from "next";
import Link from "next/link";
import ToolsClientPage from "./ToolsClientPage";
import { SITE_URL } from "@/lib/site";
import { TOOL_CATEGORIES, toolsInCategory } from "@/data/tool-catalog";

const CATEGORY_LABELS: Record<string, string> = {
  pdf: "PDF Tools",
  images: "Image Tools",
  business: "Business Tools",
  calculators: "Calculators",
  excel: "Spreadsheet Tools",
  text: "Text Tools",
  developer: "Developer Tools",
  seo: "SEO Tools",
};

export const metadata: Metadata = {
  title: "Free Online Tools – PDF, Images, Invoices, QR Codes and Calculators",
  description:
    "Use free browser-based tools for PDF and image processing, invoices and quotes, QR codes, Excel/CSV conversion, text utilities, SEO helpers and everyday calculators. No signup required.",
  keywords: [
    "free online tools",
    "pdf tools",
    "image tools",
    "invoice generator",
    "qr code generator",
    "vat calculator",
    "excel to csv",
  ],
  alternates: { canonical: "/tools" },
  openGraph: {
    title: "Free Online Tools | EzyTemplate",
    description:
      "Free browser tools for PDFs, images, invoices, QR codes, spreadsheets, text and everyday calculations.",
    url: `${SITE_URL}/tools`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Tools | EzyTemplate",
    description:
      "Free browser tools for PDFs, images, invoices, QR codes, spreadsheets and calculators.",
  },
};

export default function ToolsPage() {
  return (
    <>
      <ToolsClientPage />
      {/* Server-rendered index of every tool. The interactive grid above is
          client-side, so crawlers need real anchors to discover each page. */}
      <section
        className="container"
        style={{ paddingBottom: "64px", maxWidth: "1100px" }}
        aria-labelledby="all-tools"
      >
        <h2
          id="all-tools"
          style={{ fontSize: "22px", fontWeight: 800, marginBottom: "18px" }}
        >
          All free tools on EzyTemplate
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "20px",
          }}
        >
          {TOOL_CATEGORIES.map((category) => (
            <div key={category}>
              <h3 style={{ fontSize: "14px", fontWeight: 800, marginBottom: "8px" }}>
                <Link href={`/tools/${category}`}>
                  {CATEGORY_LABELS[category]}
                </Link>
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {toolsInCategory(category).map((tool) => (
                  <li key={tool.slug} style={{ marginBottom: "6px" }}>
                    <Link href={`/tools/${tool.slug}`} style={{ fontSize: "13px" }}>
                      {tool.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
