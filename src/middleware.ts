import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/zh_tw" || pathname.startsWith("/zh_tw/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/zh_tw/, "/zh-TW");
    return NextResponse.redirect(url);
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: ["/", "/(en|zh_tw|zh-TW)/:path*"],
};
