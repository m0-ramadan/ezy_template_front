import Link from "next/link";
import type { Metadata } from "next";
import { getCollectionData } from "@/lib/catalog";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Graphic Assets",
  description:
    "Standalone graphic asset packs are not part of the published EzyTemplate catalogue yet. Browse the design and Canva collections in the meantime.",
  alternates: { canonical: "/graphic-assets" },
  // No published graphic asset pack exists yet, so this page must not be
  // indexed or treated as a content page.
  robots: { index: false, follow: true },
};

export default async function GraphicAssetsPage() {
  const [design, canva] = await Promise.all([
    getCollectionData("design", { perPage: 1 }),
    getCollectionData("canva", { perPage: 1 }),
  ]);

  const alternatives = [
    { href: "/design-templates", label: `Design Templates (${design.total})`, count: design.total },
    { href: "/canva-templates", label: `Canva Templates (${canva.total})`, count: canva.total },
  ].filter((item) => item.count > 0);

  return (
    <main className="container section" style={{ paddingBottom: "80px" }}>
      <div className="breadcrumbs">
        <Link href="/">Home</Link>　›　
        <Link href="/templates">Templates</Link>　›　<b>Graphic Assets</b>
      </div>

      <h1 style={{ fontSize: "30px", fontWeight: 800, marginBottom: "14px" }}>
        Graphic Assets
      </h1>
      <p style={{ maxWidth: "720px", color: "var(--muted)", lineHeight: 1.7 }}>
        There are no published graphic asset packs in the EzyTemplate catalogue
        yet. This page stays out of search results until real, documented asset
        packs are added, so visitors are not shown empty placeholders. The
        collections below are fully populated and can be browsed now.
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
