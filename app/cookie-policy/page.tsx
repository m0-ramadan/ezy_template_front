import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "How EzyTemplate uses essential, preference, analytics and advertising cookies.",
  alternates: { canonical: "/cookie-policy" },
};

export default function CookiePolicyPage() {
  return (
    <main className="container section" style={{ maxWidth: 900 }}>
      <h1>Cookie Policy</h1>
      <p><strong>Last updated: September 29, 2026</strong></p>
      <p>
        This policy explains how EzyTemplate uses cookies and similar browser storage. It should be read with our <Link href="/privacy">Privacy Policy</Link>.
      </p>
      <h2>Cookies we use</h2>
      <ul>
        <li><strong>Essential and preference storage:</strong> language, theme and session choices needed to provide requested features.</li>
        <li><strong>Account storage:</strong> sign-in and local account preferences when you use account features.</li>
        <li><strong>Advertising:</strong> Google AdSense may use cookies or similar technologies to deliver and measure ads when advertising is enabled.</li>
        <li><strong>Analytics:</strong> first-party operational records may measure page and resource usage. We do not intentionally send contact-form content or other direct personal identifiers to advertising analytics.</li>
      </ul>
      <h2>Your choices</h2>
      <p>
        You can clear or block cookies in your browser. Some preferences or account features may stop working. For visitors in the EEA, UK and Switzerland, advertising consent must be collected through a Google-certified consent management platform before applicable personalised advertising is enabled.
      </p>
      <h2>Managing advertising consent</h2>
      <p>
        When the certified consent message is active, use its Accept, Reject or Manage options to change your choices. Consent can also be withdrawn through the privacy controls made available by that platform.
      </p>
      <h2>Contact</h2>
      <p>Questions about cookies can be sent through our <Link href="/contact">contact page</Link>.</p>
    </main>
  );
}

