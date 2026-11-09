import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: { unoptimized: true },
  poweredByHeader: false,
  experimental: {
    // The production host is a shared Hostinger account with a hard limit on
    // the number of processes/threads a single user may spawn. Next size the
    // page-data workers from the host CPU count (63 on that machine), which
    // aborted every deploy with "OS can't spawn worker thread: Resource
    // temporarily unavailable". Capping the workers keeps the build inside
    // the account limit.
    cpus: 2,
    workerThreads: false,
    memoryBasedWorkersCount: false,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
        ],
      },
      {
        source: "/ads.txt",
        headers: [
          { key: "Content-Type", value: "text/plain; charset=utf-8" },
          { key: "Cache-Control", value: "public, max-age=3600" },
        ],
      },
    ];
  },
  async redirects() {
    // Sub-categories that only ever existed as hard-coded menu links (they are
    // not in the catalogue) used to answer 404. Search Console still lists
    // them, so they now redirect to the collection that really contains them.
    const deadFacets: Array<[string, string]> = [
      ["/website-templates/html-css", "/website-templates"],
      ["/website-templates/corporate", "/website-templates"],
      ["/website-templates/business", "/website-templates"],
      ["/website-templates/landing-pages", "/website-templates"],
      ["/website-templates/e-commerce", "/website-templates"],
      ["/website-templates/portfolio", "/website-templates"],
      ["/website-templates/website-templates", "/website-templates"],
      ["/excel-templates/sales-reporting", "/excel-templates"],
      ["/excel-templates/excel-templates", "/excel-templates"],
      ["/word-templates/word-templates", "/word-templates"],
      ["/design-templates/business-cards", "/design-templates"],
      ["/design-templates/certificates-awards", "/design-templates"],
      ["/design-templates/corporate-identity", "/design-templates"],
      ["/design-templates/events-invitations", "/design-templates"],
    ];

    const deadTools = [
      "age-calculator",
      "base64-encoder-decoder",
      "excel-formula-helper",
      "image-cropper",
      "lorem-ipsum-generator",
      "po-generator",
      "robots-txt-generator",
      "sitemap-generator",
      "text-cleaner",
      "timesheet-calculator",
    ];

    return [
      ...deadFacets.map(([source, destination]) => ({
        source,
        destination,
        permanent: true,
      })),
      // Tools that were listed in an old seed file but never shipped.
      ...deadTools.map((slug) => ({
        source: `/tools/${slug}`,
        destination: "/tools",
        permanent: true,
      })),
    ];
  },
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
