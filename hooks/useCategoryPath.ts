"use client";

import { useEffect, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";

export function useCategoryPath(basePath: string) {
  const pathname = usePathname();
  const router = useRouter();

  const category = useMemo(() => {
    const rest = pathname.slice(basePath.length).replace(/^\/+|\/+$/g, "");
    return rest ? decodeURIComponent(rest.split("/")[0]) : "all";
  }, [pathname, basePath]);

  // Preserve old shared/bookmarked URLs, but immediately canonicalize them.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const legacy = params.get("t") || params.get("category");
    if (legacy && category === "all") {
      router.replace(`${basePath}/${encodeURIComponent(legacy)}`);
    }
  }, [basePath, category, router]);

  const hrefFor = (slug: string) =>
    slug === "all" ? basePath : `${basePath}/${encodeURIComponent(slug)}`;

  return { category, hrefFor };
}
