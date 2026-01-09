import configPromise from "@payload-config";
import type { MetadataRoute } from "next";
import { unstable_cache } from "next/dist/server/web/spec-extension/unstable-cache";
import { getPayload } from "payload";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemap = await getPagesSitemap();

  return sitemap.map((item) => ({
    url: item.loc,
    lastModified: item.lastmod,
    changeFrequency: "monthly",
    priority: 1,
  }));
}

const getPagesSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config: configPromise });

    const SITE_URL = process.env.NEXT_PUBLIC_URL || "https://shinzo.network";

    const collections: {
      slug: "posts";
      route: string;
    }[] = [{ slug: "posts", route: "/blog/" }];

    const results = await Promise.all(
      collections.map(async ({ slug, route }) => {
        return {
          route,
          slug,
          data: await payload.find({
            collection: slug,
            draft: false,
            limit: 1000,
            depth: 0,
            overrideAccess: false,
            pagination: false,
            select: { slug: true, updatedAt: true },
          }),
        };
      })
    );

    const dateFallback = new Date().toISOString();

    const defaultSitemap = [
      {
        loc: SITE_URL,
        lastmod: dateFallback,
      },
      {
        loc: `${SITE_URL}/blog`,
        lastmod: dateFallback,
      },
      {
        loc: `${SITE_URL}/about`,
        lastmod: dateFallback,
      },
      {
        loc: `${SITE_URL}/chain-validators`,
        lastmod: dateFallback,
      },
      {
        loc: `${SITE_URL}/data-hosts`,
        lastmod: dateFallback,
      },
      {
        loc: `${SITE_URL}/builders`,
        lastmod: dateFallback,
      },
      {
        loc: `${SITE_URL}/protocols-and-foundations`,
        lastmod: dateFallback,
      },
    ];

    const sitemap = results
      .map(({ route, data }) => {
        return data?.docs
          ?.filter((item) => Boolean(item?.slug))
          .map((item) => {
            const routePath = `${route}`;

            const loc = `${SITE_URL}${routePath}${item?.slug}`;

            return {
              loc,
              lastmod: item?.updatedAt || dateFallback,
            };
          });
      })
      .flat();

    return [...defaultSitemap, ...sitemap];
  },
  ["sitemap"],
  { tags: ["sitemap"] }
);
