import { TOOLS, Tool } from "@/data/tools";
import { TOOL_SLUGS, getToolCategory } from "@/data/tool-catalog";

/**
 * Only expose tools that have a real route under `app/tools/*`. Older seed
 * data still lists tools that were never shipped; linking to them produced
 * empty 200 pages (soft 404s) and wasted crawl budget.
 */
export const AVAILABLE_TOOLS: Tool[] = TOOLS.filter((tool) =>
  TOOL_SLUGS.has(tool.slug),
);

export function getToolBySlug(slug: string): Tool | undefined {
  if (!TOOL_SLUGS.has(slug)) return undefined;
  return AVAILABLE_TOOLS.find((t) => t.slug === slug);
}

export function getRelatedTools(
  currentSlug: string,
  count: number = 3,
): Tool[] {
  const category = getToolCategory(currentSlug);
  const sameCategory = AVAILABLE_TOOLS.filter(
    (t) => t.slug !== currentSlug && getToolCategory(t.slug) === category,
  );
  const rest = AVAILABLE_TOOLS.filter(
    (t) => t.slug !== currentSlug && !sameCategory.includes(t),
  );
  return [...sameCategory, ...rest].slice(0, count);
}

export function formatCurrencyAmount(
  amount: number,
  currency: string = "EGP",
): string {
  const formatted = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
  return `${formatted} ${currency}`;
}

export function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}
