import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "About EzyTemplate - Free Templates and Browser Tools",
  description:
    "What EzyTemplate is, who builds it and how the catalogue works: free Excel, Word, design, presentation, Canva and website templates plus browser tools, with live publication and download counts.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About EzyTemplate",
    description:
      "How the EzyTemplate catalogue and free browser tools are built, with live publication and download counts.",
    url: `${SITE_URL}/about`,
    type: "website",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
