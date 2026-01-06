import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  Payload,
} from "payload";
import type { Post } from "../../../payload-types";

import { revalidatePath, revalidateTag } from "next/cache";

export const revalidatePost: CollectionAfterChangeHook<Post> = async ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    const path = `/blog/${doc.slug}`;
    payload.logger.info(`Revalidating post at path: ${path}`);

    revalidatePath(path);
    revalidatePath("/blog");
    revalidateTag("sitemap");

    if (previousDoc?.slug !== doc.slug) {
      payload.logger.info(
        `Revalidating previous post at path: /blog/${previousDoc?.slug}`
      );
      revalidatePath(`/blog/${previousDoc?.slug}`);
    }

    await revalidateAdjacentPosts({
      payload,
      date: doc.publishedAt,
      slug: doc.slug,
    });
  }

  return doc;
};

export const revalidateDelete: CollectionAfterDeleteHook<Post> = async ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    const path = `/blog/${doc?.slug}`;
    payload.logger.info(`Revalidating post at path: ${path}`);

    revalidatePath(path);
    revalidatePath("/blog");
    revalidateTag("sitemap");

    await revalidateAdjacentPosts({
      payload,
      date: doc.publishedAt,
      slug: doc.slug,
    });
  }

  return doc;
};

const revalidateAdjacentPosts = async ({
  payload,
  date,
  slug,
}: {
  payload: Payload;
  date: string | null | undefined;
  slug: string | null | undefined;
}) => {
  const adjacentPosts = await queryAdjacentPosts({
    payload,
    date,
    slug,
  });

  adjacentPosts.forEach((post) => {
    const slug = post.docs?.[0]?.slug;

    if (slug) {
      payload.logger.info(`Revalidating adjacent post at path: /blog/${slug}`);
      revalidatePath(`/blog/${slug}`);
    }
  });
};

const queryAdjacentPosts = async ({
  payload,
  date,
  slug,
}: {
  payload: Payload;
  date: string | null | undefined;
  slug: string | null | undefined;
}) => {
  const filters = [
    {
      sort: "publishedAt",
      where: {
        publishedAt: { greater_than: date },
        slug: { not_equals: slug },
      },
    },
    {
      sort: "-publishedAt",
      where: {
        publishedAt: { less_than: date },
        slug: { not_equals: slug },
      },
    },
  ];

  const posts = await Promise.all(
    filters.map(async (filter) => {
      return payload.find({
        collection: "posts",
        overrideAccess: false,
        limit: 1,
        ...filter,
      });
    })
  );

  return posts;
};
