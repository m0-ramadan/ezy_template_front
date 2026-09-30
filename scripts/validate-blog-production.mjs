import { createHash } from "node:crypto";

const site = process.env.SITE_URL || "https://ezytemplate.pro";
const api = process.env.API_URL || "https://dashboard.ezytemplate.pro/api";
const strip = (s = "") => s.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/&#x27;/g, "'").replace(/\s+/g, " ").trim();

const response = await fetch(`${api}/articles?per_page=1000`, { cache: "no-store" });
if (!response.ok) throw new Error(`Article list API returned ${response.status}`);
const payload = await response.json();
const seenTitles = new Map();
const seenBodies = new Map();
let failed = false;

for (const article of payload.data || []) {
  const res = await fetch(`${site}/blog/${encodeURIComponent(article.slug)}`, { redirect: "follow", cache: "no-store" });
  const html = await res.text();
  const h1 = strip(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1] || "");
  const body = strip(html.match(/<div\b[^>]*class="[^"]*rich-content[^"]*"[^>]*>([\s\S]*?)<\/div>/i)?.[1] || "");
  const hash = createHash("sha256").update(body).digest("hex");
  const duplicateTitle = seenTitles.get(h1);
  const duplicateBody = body && seenBodies.get(hash);
  const pass = res.status === 200 && h1 === article.title && !duplicateTitle && !duplicateBody;
  console.log(`${pass ? "PASS" : "FAIL"}\t${article.slug}\t${h1}`);
  if (!pass) failed = true;
  if (h1) seenTitles.set(h1, article.slug);
  if (body) seenBodies.set(hash, article.slug);
}

if (failed) process.exit(1);
