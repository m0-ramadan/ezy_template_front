import { NextRequest, NextResponse } from "next/server";
import { TOOL_CATEGORIES, TOOL_ROUTES } from "@/data/tool-catalog";

const privateOrUtility = /^\/(login|signup|profile|preview)(\/|$)/;

const toolPaths = new Set<string>([
  ...TOOL_ROUTES.map((tool) => `/tools/${tool.slug}`),
  ...TOOL_CATEGORIES.map((category) => `/tools/${category}`),
]);

const NOT_FOUND_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex, follow" />
<title>Page not found | EzyTemplate</title>
<style>
  body { font-family: system-ui, -apple-system, "Segoe UI", Arial, sans-serif; margin: 0; min-height: 100vh; display: grid; place-items: center; background: #f8fafc; color: #0f172a; }
  main { text-align: center; padding: 32px; }
  p.k { font-weight: 800; color: #2563eb; letter-spacing: .08em; margin: 0 0 8px; }
  h1 { font-size: 30px; margin: 0 0 12px; }
  a { display: inline-block; margin-top: 16px; background: #2563eb; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 10px; font-weight: 700; }
</style>
</head>
<body>
<main>
  <p class="k">404</p>
  <h1>Page not found</h1>
  <p>The page may have moved, or the address may be incorrect.</p>
  <a href="/">Return home</a>
</main>
</body>
</html>`;

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname.replace(/\/+$/, "") || "/";

  // Next streams dynamic routes, and a notFound() thrown after streaming
  // still answers 200. Unknown tool URLs are rejected here so search engines
  // receive a real 404 instead of a soft-404 page.
  if (pathname.startsWith("/tools/") && !toolPaths.has(pathname)) {
    return new NextResponse(NOT_FOUND_HTML, {
      status: 404,
      headers: {
        "content-type": "text/html; charset=utf-8",
        "X-Robots-Tag": "noindex, follow",
      },
    });
  }

  const response = NextResponse.next();
  const hasLowValueQuery = ["q", "search", "filter", "sort"].some((key) =>
    request.nextUrl.searchParams.has(key),
  );

  if (privateOrUtility.test(pathname) || hasLowValueQuery) {
    response.headers.set("X-Robots-Tag", "noindex, follow");
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
