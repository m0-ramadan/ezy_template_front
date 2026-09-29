"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { ADSENSE_PUBLISHER_ID } from "@/lib/site";

const excludedPrefixes = [
  "/login",
  "/signup",
  "/profile",
  "/download",
  "/preview",
];

export default function AdSenseScript() {
  const pathname = usePathname();
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

