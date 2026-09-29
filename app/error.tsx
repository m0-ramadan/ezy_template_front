"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return (
    <main className="container section" style={{ textAlign: "center", minHeight: "60vh" }}>
      <h1>Something went wrong</h1>
      <p>We could not load this page. You can retry or return to the home page.</p>
      <p><button className="btn primary" onClick={reset}>Try again</button> <Link className="btn" href="/">Home</Link></p>
    </main>
  );
}

