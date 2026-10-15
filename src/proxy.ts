import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);
const handleBlogRouting = createMiddleware({
  ...routing,
  alternateLinks: false,
});

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/zh_tw" || pathname.startsWith("/zh_tw/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/zh_tw/, "/zh-TW");
    return NextResponse.redirect(url);
  }

  // Blog metadata owns hreflang, including the first page's x-default.
  // Automatic Link headers use different defaults and cannot pair article slugs.
  const isArticle = /^\/(en|zh-TW)\/blog\/(?!tags(?:\/|$)).+/.test(pathname);
  const isBlogIndex = /^\/(en|zh-TW)\/blog\/?$/.test(pathname);
  // A tag can have published articles in only one locale.
  const isTagDetail = /^\/(en|zh-TW)\/blog\/tags\/[^/]+\/?$/.test(pathname);
  return isArticle || isBlogIndex || isTagDetail
    ? handleBlogRouting(request)
    : handleI18nRouting(request);
}

export const config = {
  matcher: ["/", "/(en|zh_tw|zh-TW)/:path*"],
};
