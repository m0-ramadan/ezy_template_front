import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * Utility and account routes are kept out of the crawl because they carry no
 * indexable content. `/_next/` must stay crawlable: it serves the CSS and JS
 * Googlebot needs to render every page, and blocking it (the previous config)
 * is a documented cause of pages being crawled but not indexed.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/profile",
          "/login",
          "/signup",
          "/download",
          "/preview",
          "/api/",
        ],
      },
      { userAgent: "Googlebot", allow: "/" },
      { userAgent: "AdsBot-Google", allow: "/" },
      // AdSense crawler: must be able to read the pages where ads may run.
      { userAgent: "Mediapartners-Google", allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
