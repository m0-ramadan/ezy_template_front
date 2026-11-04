/** Small browser-safe formatting helpers (safe to import from client components). */
export function formatCount(n: number): string {
  return new Intl.NumberFormat("en-US").format(n);
}
