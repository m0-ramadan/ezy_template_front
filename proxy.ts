import { NextRequest, NextResponse } from "next/server";

const privateOrUtility = /^\/(login|signup|profile|download|preview)(\/|$)/;

export function proxy(request: NextRequest) {
  const response = NextResponse.next();
  const hasLowValueQuery = ["q", "search", "filter", "sort"].some((key) =>
    request.nextUrl.searchParams.has(key),
  );

  if (privateOrUtility.test(request.nextUrl.pathname) || hasLowValueQuery) {
    response.headers.set("X-Robots-Tag", "noindex, follow");
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
