import Link from "next/link";
import type { Metadata } from "next";
import {
  Globe,
  FileSpreadsheet,
  FileText,
  Palette,
  Presentation,
  LayoutGrid,
  ArrowRight,
} from "lucide-react";
import {
  getCollectionData,
  formatCount,
  type CollectionKey,
} from "@/lib/catalog";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Free and Premium Templates for Excel, Word, Design and Canva",
  description:
    "Browse every downloadable template published on EzyTemplate: Excel trackers and budgets, Word documents, print and brand design files, presentation decks and editable Canva designs.",
  alternates: { canonical: "/templates" },
  openGraph: {
    title: "Templates Hub | EzyTemplate",
    description:
      "Every published EzyTemplate template in one place: Excel, Word, design, presentation and Canva collections with live catalogue counts.",
    url: `${SITE_URL}/templates`,
    type: "website",
  },
};

type Marketplace = {
  id: string;
  title: string;
  titleAr: string;
  desc: string;
  descAr: string;
  icon: React.ReactNode;
  color: string;
  href: string;
  count: number;
  subcategories: Array<{ slug: string; label: string }>;
};

/**
 * Maps a marketplace id to the collection loader whose facet slugs the
 * `[category]` pages accept. Facets are read from the same loader the
 * collection pages use, so a chip can never point at a missing facet.
 */
const COLLECTION_KEYS: Record<string, CollectionKey> = {
  excel: "excel",
  design: "design",
  canva: "canva",
  website: "website",
  word: "word",
  presentation: "presentation",
};

export default async function TemplatesHub() {
  // Load the real facet list for every collection in parallel. These are the
  // exact slugs the `[category]` routes validate against, so the chips below
  // always resolve to a published page. `getCollectionData` already falls back
  // to the listing's own `total` when `/stats/catalog` is unavailable, so the
  // hub never depends on that endpoint being deployed.
  const collectionData = new Map<
    string,
    Awaited<ReturnType<typeof getCollectionData>>
  >();
  await Promise.all(
    Object.entries(COLLECTION_KEYS).map(async ([id, key]) => {
      collectionData.set(id, await getCollectionData(key));
    }),
  );

  const definitions: Array<Omit<Marketplace, "count" | "subcategories">> = [
    {
      id: "excel",
      title: "Excel Templates",
      titleAr: "قوالب إكسيل",
      desc: "Budget, invoice, inventory, timesheet, calendar and planning workbooks you can edit in Microsoft Excel or a compatible spreadsheet app.",
      descAr: "ملفات ميزانيات وفواتير ومخزون وسجلات دوام وتقويمات قابلة للتعديل في إكسيل.",
      icon: <FileSpreadsheet className="text-emerald-500" size={32} />,
      color: "#10b981",
      href: "/excel-templates",
    },
    {
      id: "design",
      title: "Design Templates",
      titleAr: "قوالب التصميم",
      desc: "Business cards, certificates, menus, invitations and wall art files for print and editorial design work.",
      descAr: "كروت أعمال وشهادات ومنيوهات ودعوات وملصقات للتصميم والمطبوعات.",
      icon: <Palette className="text-pink-500" size={32} />,
      color: "#ec4899",
      href: "/design-templates",
    },
    {
      id: "canva",
      title: "Canva Templates",
      titleAr: "قوالب كانفا (Canva)",
      desc: "Editable Canva designs you can open and customise online for social posts, menus, flyers and branding.",
      descAr: "تصاميم كانفا قابلة للتعديل مباشرة لبوابات السوشيال ميديا والمنيوهات والفلوقات.",
      icon: <LayoutGrid className="text-teal-500" size={32} />,
      color: "#14b8a6",
      href: "/canva-templates",
    },
    {
      id: "website",
      title: "Website Templates",
      titleAr: "قوالب المواقع الإلكترونية",
      desc: "HTML, CSS, React, Next.js, Tailwind and WordPress starter projects for building websites.",
      descAr: "مشاريع جاهزة بـ HTML و React و Next.js و Tailwind و WordPress لبناء المواقع.",
      icon: <Globe className="text-blue-500" size={32} />,
      color: "#2563eb",
      href: "/website-templates",
    },
    {
      id: "word",
      title: "Word Templates",
      titleAr: "قوالب وورد",
      desc: "Resumes, cover letters, formal letters, contracts, proposals, reports and invoices in Word format.",
      descAr: "سير ذاتية وخطابات رسمية وعقود ومقترحات وتقارير وفواتير بصيغة وورد.",
      icon: <FileText className="text-blue-600" size={32} />,
      color: "#3b82f6",
      href: "/word-templates",
    },
    {
      id: "presentation",
      title: "Presentation Templates",
      titleAr: "العروض التقديمية",
      desc: "Pitch decks and slide templates for PowerPoint, Google Slides and Keynote.",
      descAr: "قوالب شرائح وعروض تقديمية لبوربوينت وجوجل سلايدز وكينوت.",
      icon: <Presentation className="text-purple-500" size={32} />,
      color: "#8b5cf6",
      href: "/presentation-templates",
    },
  ];

  const marketplaces: Marketplace[] = definitions
    .map((def) => {
      const data = collectionData.get(def.id);
      const facets = data?.facets ?? [];
      return {
        ...def,
        count: data?.total ?? 0,
        // Facets are already sorted by published-row count, so the first six
        // are the strongest sub-categories that actually hold resources.
        subcategories: facets
          .slice(0, 6)
          .map((f) => ({ slug: f.slug, label: f.label })),
      };
    })
    .filter((m) => m.count > 0);

  const totalTemplates = [...collectionData.values()].reduce(
    (sum, d) => sum + (d?.total ?? 0),
    0,
  );

  return (
    <main className="container section templates-hub" style={{ paddingBottom: "80px" }}>
      <div className="breadcrumbs templates-hub-breadcrumbs" style={{ marginBottom: "20px" }}>
        <Link href="/">Home</Link>　›　
        <b>Templates &amp; Resources Hub</b>
      </div>

      <header style={{ maxWidth: "760px", marginBottom: "34px" }}>
        <span className="eyebrow">All Template Marketplaces</span>
        <h1 style={{ fontSize: "34px", fontWeight: 800, lineHeight: 1.2, margin: "10px 0 14px" }}>
          Browse all {formatCount(totalTemplates)} published templates
        </h1>
        <p style={{ color: "var(--muted)", fontSize: "15px", lineHeight: 1.65 }}>
          Every number below is counted live from the EzyTemplate catalogue. Each
          collection opens a filtered listing with previews, file details and a
          direct download when the source file is available.
        </p>
      </header>

      {marketplaces.length > 0 ? (
        <div
          className="templates-hub-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: "28px",
          }}
        >
          {marketplaces.map((m) => (
            <article
              key={m.id}
              style={{
                background: "var(--card-bg, #ffffff)",
                border: "1px solid var(--line, #e2e8f0)",
                borderRadius: "20px",
                padding: "32px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
              }}
              className="marketplace-hub-card"
            >
              <div>
                <div
                  className="marketplace-hub-card-header"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "20px",
                  }}
                >
                  <div
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "16px",
                      background: "rgba(37,99,235,0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {m.icon}
                  </div>
                  <span
                    className="marketplace-hub-count"
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      padding: "4px 12px",
                      borderRadius: "12px",
                      background: "rgba(37, 99, 235, 0.1)",
                      color: m.color,
                    }}
                  >
                    {formatCount(m.count)} templates
                  </span>
                </div>

                <h2 style={{ fontSize: "22px", fontWeight: 800, color: "var(--text)", marginBottom: "10px" }}>
                  {m.title}
                </h2>

                <p style={{ fontSize: "14px", color: "var(--muted)", lineHeight: 1.6, marginBottom: "18px" }}>
                  {m.desc}
                </p>

                {m.subcategories.length > 0 && (
                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: "0 0 20px",
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "8px",
                    }}
                  >
                    {m.subcategories.map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={`${m.href}/${s.slug}`}
                          style={{
                            fontSize: "11px",
                            fontWeight: 600,
                            padding: "5px 11px",
                            borderRadius: "999px",
                            border: "1px solid var(--line)",
                            color: "var(--muted)",
                            textDecoration: "none",
                          }}
                        >
                          {s.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <Link
                href={m.href}
                className="marketplace-hub-link"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  padding: "14px",
                  borderRadius: "12px",
                  background: m.color,
                  color: "#ffffff",
                  fontWeight: 700,
                  fontSize: "14px",
                  textDecoration: "none",
                }}
              >
                <span>{`Explore ${m.title}`}</span>
                <ArrowRight size={16} />
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <p style={{ color: "var(--muted)" }}>
          The catalogue is being prepared. No published templates are available
          right now.
        </p>
      )}

      <section style={{ marginTop: "48px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 800, marginBottom: "12px" }}>
          Not sure which file format you need?
        </h2>
        <p style={{ color: "var(--muted)", maxWidth: "720px", lineHeight: 1.65 }}>
          Use the free browser tools to check file sizes, convert CSV files to
          Excel, generate meta tags and compress documents before you download a
          template.
        </p>
        <Link className="smallprimary" href="/tools" style={{ display: "inline-block", marginTop: "14px" }}>
          Open the free tools →
        </Link>
      </section>
    </main>
  );
}
