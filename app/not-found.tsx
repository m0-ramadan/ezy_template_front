import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="container section" style={{ textAlign: "center", minHeight: "60vh" }}>
      <p style={{ fontWeight: 700 }}>404</p>
      <h1>Page not found</h1>
      <p>The page may have moved, or the address may be incorrect.</p>
      <p><Link className="btn primary" href="/">Return home</Link></p>
    </main>
  );
}

