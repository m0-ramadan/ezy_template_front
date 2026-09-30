const site = process.env.SITE_URL || "https://ezytemplate.pro";
const api = process.env.API_URL || "https://dashboard.ezytemplate.pro/api";
const categories = [
  ["website", "website-templates"], ["excel", "excel-templates"],
  ["word", "word-templates"], ["design", "design-templates"],
  ["presentation", "presentation-templates"], ["canva", "canva-templates"],
];
const statsRes = await fetch(`${api}/stats/catalog`, { cache: "no-store" });
if (!statsRes.ok) throw new Error(`Catalogue stats returned ${statsRes.status}`);
const stats = await statsRes.json();
let failed = false;
console.log("category\tdatabase_count\tapi_count\tfrontend_rendered_count\tindex_status\tresult");
for (const [type, path] of categories) {
  const apiUrl = type === "canva" ? `${api}/resources?type=canva&per_page=1` : `${api}/resources?type=${type}&per_page=1${type === "design" ? "&exclude_canva=1" : ""}`;
  const apiPayload = await (await fetch(apiUrl, { cache: "no-store" })).json();
  const databaseCount = type === "canva" ? Number(stats.canva_templates || 0) : Number(stats.by_type?.[type] || 0);
  const apiCount = Number(apiPayload.total || 0);
  const page = await fetch(`${site}/${path}`, { cache: "no-store", redirect: "follow" });
  const html = await page.text();
  const rendered = Number(html.match(/data-rendered-count="(\d+)"/)?.[1] || 0);
  const noindex = /<meta[^>]+name="robots"[^>]+content="[^"]*noindex/i.test(html);
  const expectedIndexed = databaseCount > 0;
  const pass = databaseCount === apiCount && (expectedIndexed ? rendered === apiCount && !noindex : noindex);
  console.log(`${path}\t${databaseCount}\t${apiCount}\t${rendered}\t${noindex ? "noindex" : "index"}\t${pass ? "PASS" : "FAIL"}`);
  if (!pass) failed = true;
}
if (failed) process.exit(1);
