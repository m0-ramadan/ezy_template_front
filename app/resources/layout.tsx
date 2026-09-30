import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Free Resources Hub - Graphics, UI Kits, Tools and Licenses",
  description:
    "Browse the EzyTemplate resource hub: free graphic assets, UI kits, colour and gradient tools, file converters and the licence terms that apply to every template you download.",
  alternates: { canonical: "/resources" },
  openGraph: {
    title: "Free Resources Hub | EzyTemplate",
    description:
      "Free graphic assets, UI kits, browser tools and the licence terms that apply to every EzyTemplate download.",
    url: `${SITE_URL}/resources`,
    type: "website",
  },
};

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
