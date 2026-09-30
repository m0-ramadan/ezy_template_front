import Link from "next/link";
import type { Metadata } from "next";
import { getCollectionData } from "@/lib/catalog";

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
  const [design, website, canva] = await Promise.all([
    getCollectionData("design", { perPage: 1 }),
    getCollectionData("website", { perPage: 1 }),
    getCollectionData("canva", { perPage: 1 }),
  ]);

  const alternatives = [
    { href: "/design-templates", label: `Design Templates (${design.total})`, count: design.total },
    { href: "/website-templates", label: `Website Templates (${website.total})`, count: website.total },
    { href: "/canva-templates", label: `Canva Templates (${canva.total})`, count: canva.total },
  ].filter((item) => item.count > 0);

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
