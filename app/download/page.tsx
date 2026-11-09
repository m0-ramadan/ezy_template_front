import type { Metadata } from "next";
import DownloadClient from "./DownloadClient";
import { getTemplateDetailResult } from "@/lib/catalog";

export const dynamic = "force-dynamic";

/**
 * The download screen is a utility page: it repeats the template that the
 * visitor just came from, so it must never be indexed as a separate page.
 * It used to be blocked in robots.txt and marked noindex, which is why Search
 * Console reported it as "URL is not available to Google" for months.
 *
 * It is now crawlable and declares a canonical pointing at the template page,
 * which is the correct signal for a parameterised duplicate: Google reads the
 * URL, follows the canonical and drops it from the index without an error.
 */
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ template?: string | string[] }>;
}): Promise<Metadata> {
  const params = await searchParams;
  const raw = Array.isArray(params.template)
    ? params.template[0]
    : params.template;
  const slug = (raw || "").trim();

  if (!slug) {
    return {
      title: "Download a template",
      robots: { index: false, follow: true },
    };
  }

  // Only point the canonical at a template that really exists.
  const { resource } = await getTemplateDetailResult(slug);
  if (!resource) {
    return {
      title: "Template not found",
      robots: { index: false, follow: true },
    };
  }

  return {
    title: `Download ${resource.title}`,
    description: `Download page for ${resource.title}. The template details, formats and licence are on the template page.`,
    alternates: { canonical: `/templates/${slug}` },
    robots: { index: true, follow: true },
  };
}

export default async function DownloadPage({
  searchParams,
}: {
  searchParams: Promise<{ template?: string | string[] }>;
}) {
  const params = await searchParams;
  const raw = Array.isArray(params.template)
    ? params.template[0]
    : params.template;

  return <DownloadClient templateSlug={(raw || "").trim()} />;
}
