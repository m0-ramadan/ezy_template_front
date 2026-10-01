import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-dynamic";
export const revalidate = 0;

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

export default function PrivacyPage() {
  return (
    <main className="container section" style={{ maxWidth: 900, minHeight: "80vh", padding: "40px 16px 80px" }}>
      <h1>Privacy Policy</h1>
      <p><strong>Last Updated: September 29, 2026</strong></p>
      <p>
        At EzyTemplate, accessible from {SITE_URL}, one of our main priorities is the privacy of our visitors. This Privacy Policy document outlines the types of information that is collected and recorded by EzyTemplate and how we use it.
      </p>

      <h2>Data Collection and Usage</h2>
      <p>
        Our data collection practices are limited to what is strictly necessary to provide and improve our services. We collect information you provide directly to us when filling out contact forms, subscribing to newsletters, requesting custom templates, or creating an account. In addition, our servers automatically collect log data such as IP address, browser type, referring pages, and access timestamps for diagnostic and security purposes.
      </p>

      <h2>Cookies and Tracking Technologies</h2>
      <p>
        EzyTemplate uses cookies to store information about visitors&apos; preferences, record user-specific information on which pages the user accesses or visits, and customize web page content based on browser type or other information. You can choose to disable cookies through your individual browser options. For more detailed information, please read our <Link href="/cookie-policy">Cookie Policy</Link>.
      </p>

      <h2>Google AdSense and Advertising Partners</h2>
      <p>
        Google is one of our third-party advertising vendors. Google uses cookies, including Google AdSense cookies and DoubleClick cookies, to serve ads to our site visitors based upon their visit to EzyTemplate and other sites on the internet. For users in the European Economic Area (EEA), the UK, and Switzerland, Google-certified Consent Management Platforms (CMP) are utilized to manage user consent for cookies and personalized advertising.
      </p>

      <h2>Third-Party Services</h2>
      <p>
        We may employ third-party services and individuals to facilitate our service, provide cloud hosting, monitor infrastructure, process payments, or perform technical analytics. These third-party services have access to your personal data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
      </p>

      <h2>User Rights and Contact</h2>
      <p>
        Under applicable data protection laws (including GDPR and CCPA), you are entitled to exercise your user rights, including the right to access, rectify, erase, restrict processing of, or object to the processing of your personal data.
      </p>
      <p>
        If you have any questions about this Privacy Policy or wish to exercise your user rights/contact our team, please reach out to us via our <Link href="/contact">contact page</Link> or by email at support@ezytemplate.com.
      </p>
    </main>
  );
}
