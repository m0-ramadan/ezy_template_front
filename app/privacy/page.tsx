import type { Metadata } from "next";
import { getCustomPageContent } from "@/lib/api";
import { SITE_URL } from "@/lib/site";
import PrivacyView from "./PrivacyView";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How EzyTemplate collects, uses, stores and protects personal data, including the use of Google AdSense cookies and advertising consent.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy Policy | EzyTemplate",
    description:
      "How EzyTemplate collects, uses, stores and protects personal data.",
    url: `${SITE_URL}/privacy`,
    type: "website",
  },
};

export default async function PrivacyPage() {
  const data = await getCustomPageContent("privacy");
  return <PrivacyView initialData={data} />;
}
