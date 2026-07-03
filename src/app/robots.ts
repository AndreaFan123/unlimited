import type { MetadataRoute } from "next";
import { SITE_URL } from "@/src/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Avoid indexing paginated list variants as duplicate content.
      disallow: "/*?page=",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
