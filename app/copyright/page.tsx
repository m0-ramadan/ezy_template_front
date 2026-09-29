import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Copyright and Takedown Policy",
  description: "How to report copyright or licensing concerns about content on EzyTemplate.",
  alternates: { canonical: "/copyright" },
};

export default function CopyrightPage() {
  return (
    <main className="container section" style={{ maxWidth: 900 }}>
      <h1>Copyright and Takedown Policy</h1>
      <p><strong>Last updated: September 29, 2026</strong></p>
      <p>
        EzyTemplate respects intellectual-property rights. Downloads may have their own licence terms; availability on this site does not expand the rights granted by the applicable licence.
      </p>
      <h2>Reporting a concern</h2>
      <p>Use the <Link href="/contact">contact form</Link> and select a copyright-related inquiry. Include:</p>
      <ul>
        <li>Your name and a reliable contact method.</li>
        <li>The copyrighted work or right you believe is affected.</li>
        <li>The exact EzyTemplate URL and template name or ID.</li>
        <li>The source URL and evidence of ownership or authority to act.</li>
        <li>A clear explanation of the suspected infringement or licence conflict.</li>
        <li>A good-faith statement that the disputed use is not authorised.</li>
      </ul>
      <h2>Review process</h2>
      <p>
        We review sufficiently detailed notices, may temporarily restrict a download while investigating, contact the relevant contributor or rights holder, and remove or correct material when appropriate. Incomplete or abusive reports may require clarification.
      </p>
      <h2>Counter-information</h2>
      <p>
        If material you supplied is restricted, you may respond with evidence of ownership, redistribution permission, attribution compliance or another valid basis for use. This page is an operational policy, not jurisdiction-specific legal advice.
      </p>
    </main>
  );
}

