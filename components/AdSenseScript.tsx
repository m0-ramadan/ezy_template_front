"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ADSENSE_PUBLISHER_ID } from "@/lib/site";
import { CONSENT_EVENT, readConsent, type ConsentChoice } from "@/lib/consent";

// Pages without indexable content must not load ad code (AdSense policy).
const excludedPrefixes = [
  "/login",
  "/signup",
  "/profile",
  "/download",
  "/preview",
];

/**
 * AdSense loader.
 *
 * It is mounted only after the visitor has accepted advertising cookies, which
 * is what prevents Google's IDE/NID/3PSID cookies (and Chrome's third-party
 * cookie warnings) from appearing on first visit. Once consent is granted the
 * script is injected immediately, without a reload.
 */
export default function AdSenseScript() {
  const pathname = usePathname();
  const [consent, setConsent] = useState<ConsentChoice>("unknown");

  useEffect(() => {
    setConsent(readConsent());
    const onChange = (event: Event) => {
      const detail = (event as CustomEvent<ConsentChoice>).detail;
      setConsent(detail === "granted" || detail === "denied" ? detail : "unknown");
    };
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  if (consent !== "granted") return null;
  if (excludedPrefixes.some((prefix) => pathname.startsWith(prefix))) return null;

  return (
    <Script
      id="ezytemplate-adsense"
      async
      strategy="afterInteractive"
      crossOrigin="anonymous"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUBLISHER_ID}`}
    />
  );
}
