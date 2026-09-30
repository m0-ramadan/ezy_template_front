import type { Metadata } from "next";
import { getCustomPageContent } from "@/lib/api";
import { SITE_URL } from "@/lib/site";
import TermsView from "./TermsView";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms and conditions that govern your use of EzyTemplate, including downloads, licences, acceptable use and copyright reports.",
  alternates: { canonical: "/terms" },
  openGraph: {
    title: "Terms of Service | EzyTemplate",
    description:
      "Terms and conditions governing use of EzyTemplate and downloaded products.",
    url: `${SITE_URL}/terms`,
    type: "website",
  },
};

export default async function TermsPage() {
  const data = await getCustomPageContent("terms");
  return <TermsView initialData={data} />;
}
