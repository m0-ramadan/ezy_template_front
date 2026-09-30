import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Custom Services - Bespoke Templates, Design and Web Development",
  description:
    "Need something that is not in the catalogue? EzyTemplate takes custom work for branded template packs, document and workbook design, presentation decks and small website builds, scoped before any work starts.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Custom Services | EzyTemplate",
    description:
      "Bespoke template packs, design and small web projects, scoped and delivered on request.",
    url: `${SITE_URL}/services`,
    type: "website",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
