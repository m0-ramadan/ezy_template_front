import Link from "next/link";
import type { Metadata } from "next";
import { getCatalogStats } from "@/lib/catalog";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "UI Kits",
  description:
    "UI kits are not part of the published EzyTemplate catalogue yet. Browse the design, website and Canva collections while this section is being prepared.",
  alternates: { canonical: "/ui-kits" },
  // No published UI kit exists yet, so this page must not be indexed or
  // advertised to AdSense as if it were a content page.
  robots: { index: false, follow: true },
};

export default async function UiKitsPage() {
  const stats = await getCatalogStats();
  const designCount =
    stats?.by_main_category.find((m) => m.slug === "design-templates")?.total ?? 0;
  const websiteCount =
    stats?.by_main_category.find((m) => m.slug === "website-templates")?.total ?? 0;
  const canvaCount = stats?.canva_templates ?? 0;

  const alternatives = [
    { href: "/design-templates", label: `Design Templates (${designCount})` },
    { href: "/website-templates", label: `Website Templates (${websiteCount})` },
    { href: "/canva-templates", label: `Canva Templates (${canvaCount})` },
  ];

  return (
    <main className="container section" style={{ paddingBottom: "80px" }}>
      <div className="breadcrumbs">
        <Link href="/">Home</Link>　›　
        <Link href="/templates">Templates</Link>　›　<b>UI Kits</b>
      </div>

      <h1 style={{ fontSize: "30px", fontWeight: 800, marginBottom: "14px" }}>
        UI Kits
      </h1>
      <p style={{ maxWidth: "720px", color: "var(--muted)", lineHeight: 1.7 }}>
        There are no published UI kit files in the EzyTemplate catalogue yet.
        Rather than show placeholder cards, this page is withheld from search
        until real, documented UI kits are added. The collections below are fully
        populated and can be browsed now.
      </p>

      <ul style={{ marginTop: "24px", lineHeight: 2 }}>
        {alternatives.map((a) => (
          <li key={a.href}>
            <Link href={a.href}>{a.label}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
