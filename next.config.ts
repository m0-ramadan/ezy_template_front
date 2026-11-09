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
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
