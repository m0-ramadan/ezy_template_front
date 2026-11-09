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

  // The CMS still contains an old @ezytemplate.com address that does not
  // match the live domain. Normalise it before publishing.
  const fixDomain = (value: any): any => {
    if (typeof value === "string") {
      return value.replace(/ezytemplate\.com/gi, "ezytemplate.pro");
    }
    if (Array.isArray(value)) return value.map(fixDomain);
    if (value && typeof value === "object") {
      return Object.fromEntries(
        Object.entries(value).map(([key, item]) => [key, fixDomain(item)]),
      );
    }
    return value;
  };

  const data = raw
    ? fixDomain({
        ...raw,
        email: sanitize(raw.email),
        phone: sanitize(raw.phone),
        address: sanitize(raw.address),
        working_hours: sanitize(raw.working_hours),
      })
    : raw;

  return (
    <>
      <ContactView initialData={data} />

      {/* Static editorial content: gives visitors (and reviewers) the context
          the contact form alone cannot provide. */}
      <section
        className="container"
        style={{ paddingBottom: "64px", maxWidth: "900px" }}
      >
        <h2 style={{ fontSize: "22px", fontWeight: 800, marginBottom: "12px" }}>
          Before you write to us
        </h2>
        <p style={{ lineHeight: 1.8, color: "var(--muted)", marginBottom: "16px" }}>
          EzyTemplate is a small publisher, so every message is read by a person.
          We normally reply within two working days. To get a useful answer on the
          first try, tell us the page you are looking at and, for download
          problems, the file format and the application you are using.
        </p>

        <h3 style={{ fontSize: "16px", fontWeight: 800, marginBottom: "8px" }}>
          What we can help with
        </h3>
        <ul style={{ paddingInlineStart: "22px", lineHeight: 1.9, margin: "0 0 20px" }}>
          <li>Broken downloads, corrupted files or a template that will not open.</li>
          <li>Questions about which format fits your version of Excel, Word or PowerPoint.</li>
          <li>Licensing questions before using a template in a commercial project.</li>
          <li>Copyright or takedown requests for material you believe we host incorrectly.</li>
        </ul>

        <p style={{ lineHeight: 1.8, color: "var(--muted)" }}>
          Many questions are already answered on the{" "}
          <a href="/faq">FAQ page</a>, including how downloads work, what the
          licence covers and how to request a custom template. If your question is
          not covered there, use the form above and we will take it from there.
        </p>
      </section>
    </>
  );
}
