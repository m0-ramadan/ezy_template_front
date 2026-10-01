const BASE_URL = "https://ezytemplate.pro";

const testTargets = [
  { url: "/", expectedDbCount: 130, isCategory: false, allowNoindex: false },
  { url: "/privacy", expectedDbCount: null, isCategory: false, allowNoindex: false },
  { url: "/templates", expectedDbCount: 130, isCategory: false, allowNoindex: false },
  { url: "/excel-templates", expectedDbCount: 113, isCategory: true, allowNoindex: false },
  { url: "/website-templates", expectedDbCount: 8, isCategory: true, allowNoindex: false },
  { url: "/word-templates", expectedDbCount: 6, isCategory: true, allowNoindex: false },
  { url: "/design-templates", expectedDbCount: 1, isCategory: true, allowNoindex: false },
  { url: "/ui-kits", expectedDbCount: 0, isCategory: false, allowNoindex: true },
  { url: "/blog", expectedDbCount: 6, isCategory: false, allowNoindex: false },
  { url: "/blog/10-modern-web-design-trends-for-2026", expectedDbCount: null, isArticle: true },
  { url: "/blog/complete-guide-to-next-js-for-beginners", expectedDbCount: null, isArticle: true },
  { url: "/blog/build-a-complete-laravel-ecommerce-project", expectedDbCount: null, isArticle: true },
  { url: "/blog/ui-ux-best-practices-for-higher-conversions", expectedDbCount: null, isArticle: true },
  { url: "/blog/how-to-create-a-high-converting-product-page", expectedDbCount: null, isArticle: true },
  { url: "/blog/top-10-free-wordpress-themes-for-2026", expectedDbCount: null, isArticle: true },
];

const strip = (s = "") =>
  s
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();

async function run() {
  const results = [];
  const articleTitles = new Map();
  let hasFailed = false;

  for (const target of testTargets) {
    const fullUrl = `${BASE_URL}${target.url}`;
    const res = await fetch(fullUrl, {
      cache: "no-store",
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
        Accept: "text/html,application/xhtml+xml",
      },
    });

    const status = res.status;
    const html = await res.text();

    const h1Match = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i);
    const h1 = h1Match ? strip(h1Match[1]) : "";

    const mainMatch = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i);
    const mainContent = mainMatch ? strip(mainMatch[1]) : "";
    const hasMainContent = mainContent.length >= 100 ? "YES" : "NO";

    const isNoindex = /<meta[^>]+name="robots"[^>]+content="[^"]*noindex/i.test(html);
    const indexStatus = isNoindex ? "noindex" : "index";

    let renderedCount = "-";
    if (target.isCategory) {
      const catTotalMatch = html.match(/data-catalog-total="(\d+)"/i);
      const renderedTotalMatch = html.match(/data-rendered-count="(\d+)"/i);
      if (catTotalMatch) {
        renderedCount = catTotalMatch[1];
      } else if (renderedTotalMatch) {
        renderedCount = renderedTotalMatch[1];
      } else {
        const matches = [...html.matchAll(/href="\/templates\/[^"]+"/g)];
        const unique = new Set(matches.map((m) => m[0]));
        renderedCount = String(unique.size);
      }
    } else if (target.url === "/templates") {
      const match = html.match(/Browse all ([\d,]+) published templates/i);
      renderedCount = match ? match[1].replace(/,/g, "") : "-";
    } else if (target.url === "/blog") {
      const articles = [...html.matchAll(/<article\b/gi)];
      renderedCount = String(articles.length);
    }

    if (target.isArticle) {
      articleTitles.set(target.url, h1);
    }

    let pass = status === 200 && h1.length > 0 && hasMainContent === "YES";
    if (target.allowNoindex && !isNoindex) pass = false;
    if (!target.allowNoindex && isNoindex) pass = false;
    if (target.expectedDbCount !== null && target.isCategory) {
      if (parseInt(renderedCount, 10) !== target.expectedDbCount) {
        pass = false;
      }
    }

    if (!pass) hasFailed = true;

    results.push({
      url: target.url,
      status,
      h1,
      hasMainContent,
      dbCount: target.expectedDbCount !== null ? String(target.expectedDbCount) : "-",
      renderedCount,
      indexStatus,
      pass: pass ? "PASS" : "FAIL",
    });
  }

  // Check article uniqueness
  const titles = Array.from(articleTitles.values());
  const uniqueTitles = new Set(titles);
  const allUnique = titles.length === uniqueTitles.size;
  if (!allUnique) hasFailed = true;

  console.log("FINAL PRODUCTION VALIDATION TABLE\n");
  console.log("| URL | HTTP status | H1 from raw HTML | Main content in raw HTML: YES/NO | DB count | Rendered count | Index/noindex | PASS/FAIL |");
  console.log("|---|---|---|---|---|---|---|---|");
  for (const r of results) {
    console.log(`| ${r.url} | ${r.status} | ${r.h1.replace(/\|/g, "/")} | ${r.hasMainContent} | ${r.dbCount} | ${r.renderedCount} | ${r.indexStatus} | ${r.pass} |`);
  }

  console.log("\nArticle Titles Uniqueness Check:", allUnique ? "ALL UNIQUE (PASS)" : "DUPLICATES FOUND (FAIL)");
  for (const [url, title] of articleTitles) {
    console.log(`- ${url} => "${title}"`);
  }

  // Also test 404 for unknown blog slug
  const notFoundRes = await fetch(`${BASE_URL}/blog/non-existent-article-slug-404-test`, {
    cache: "no-store",
  });
  console.log(`\nUnknown Blog Slug Status (expected 404): ${notFoundRes.status} -> ${notFoundRes.status === 404 ? "PASS" : "FAIL"}`);
  if (notFoundRes.status !== 404) hasFailed = true;

  // Check for presence of fake counts anywhere on key pages
  console.log("\nChecking for old fake counts (500+, 350+, 200+, 400+, 150+, 120+, 600+, 250+)...");
  const badPatterns = /\b(500\+|350\+|200\+|400\+|150\+|120\+|600\+|250\+)\b/;
  let fakeCountFound = false;
  for (const t of testTargets.slice(0, 9)) {
    const res = await fetch(`${BASE_URL}${t.url}`, { cache: "no-store" });
    const text = await res.text();
    if (badPatterns.test(text)) {
      console.log(`FAIL: Found forbidden pattern in ${t.url}`);
      fakeCountFound = true;
      hasFailed = true;
    }
  }
  if (!fakeCountFound) {
    console.log("PASS: No old fake counts found on any tested pages.");
  }

  // Check footer documentation link
  console.log("\nChecking for Documentation -> /blog link in footer...");
  let docLinkFound = false;
  for (const t of ["/", "/templates", "/excel-templates", "/blog"]) {
    const res = await fetch(`${BASE_URL}${t}`, { cache: "no-store" });
    const text = await res.text();
    if (text.includes('href="/blog">Documentation') || text.includes('href="/blog">الشروحات')) {
      console.log(`FAIL: Found Documentation -> /blog link on ${t}`);
      docLinkFound = true;
      hasFailed = true;
    }
  }
  if (!docLinkFound) {
    console.log("PASS: No Documentation link in footer.");
  }

  if (hasFailed) {
    process.exit(1);
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
