const site = process.env.SITE_URL || "https://ezytemplate.pro";
const paths = ["/", "/templates", "/website-templates", "/excel-templates", "/word-templates", "/ui-kits", "/blog", "/about", "/contact", "/privacy", "/terms"];
const strip = (s = "") => s.replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();
let failed = false;
console.log("URL\tHTTP\tH1\tMAIN\tINDEX\tCANONICAL\tRESULT");
for (const path of paths) {
  const res = await fetch(`${site}${path}`, { redirect: "follow", cache: "no-store" });
  const html = await res.text();
  const h1 = strip(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1] || "");
  const main = strip(html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] || "");
  const noindex = /<meta[^>]+name="robots"[^>]+content="[^"]*noindex/i.test(html);
  const canonical = html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i)?.[1] || "";
  const pass = res.status === 200 && Boolean(h1) && main.length >= 120 && Boolean(canonical) && (path === "/ui-kits" ? noindex : !noindex);
  console.log(`${site}${path}\t${res.status}\t${h1 || "MISSING"}\t${main.length ? `${main.length} chars` : "MISSING"}\t${noindex ? "noindex" : "index"}\t${canonical || "MISSING"}\t${pass ? "PASS" : "FAIL"}`);
  if (!pass) failed = true;
}
if (failed) process.exit(1);
