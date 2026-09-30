import type { Metadata } from "next";
import { getCustomPageContent } from "@/lib/api";
import { SITE_URL } from "@/lib/site";
import ContactView from "./ContactView";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact EzyTemplate for questions, feedback, licensing or partnership enquiries. Send us a message and we will reply as soon as possible.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Us | EzyTemplate",
    description:
      "Contact EzyTemplate for questions, feedback, licensing or partnership enquiries.",
    url: `${SITE_URL}/contact`,
    type: "website",
  },
};

export default async function ContactPage() {
  const raw = await getCustomPageContent("contact");

  // Strip obvious placeholder values before they reach the client payload, so
  // unverified contact details are never published. Real values come from the CMS.
  const sanitize = (v?: string) => {
    const s = (v || "").trim();
    if (
      !s ||
      /example\.com|100 000 0000|0000 0000|placeholder|lorem ipsum/i.test(s)
    ) {
      return "";
    }
    return s;
  };

  const data = raw
    ? {
        ...raw,
        email: sanitize(raw.email),
        phone: sanitize(raw.phone),
        address: sanitize(raw.address),
        working_hours: sanitize(raw.working_hours),
      }
    : raw;

  return <ContactView initialData={data} />;
}
