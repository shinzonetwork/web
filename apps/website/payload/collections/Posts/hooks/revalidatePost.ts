import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from "payload";

import { Post } from "@/payload/payload-types";
import { revalidatePath, revalidateTag } from "next/cache";

export const revalidatePost: CollectionAfterChangeHook<Post> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === "published") {
      const path = `/blog/${doc.slug}`;

      payload.logger.info(`Revalidating post at path: ${path}`);

      revalidatePath(path);
      revalidatePath("/blog");
      revalidateTag("sitemap", {});
    }

    // If the post was previously published, we need to revalidate the old path
    if (previousDoc._status === "published" && doc._status !== "published") {
      const oldPath = `/blog/${previousDoc.slug}`;

      payload.logger.info(`Revalidating old post at path: ${oldPath}`);

      revalidatePath(oldPath);
      revalidatePath("/blog");
      revalidateTag("sitemap", {});
    }
  }
  return doc;
};

export const revalidateDelete: CollectionAfterDeleteHook<Post> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    const path = `/blog/${doc?.slug}`;

    revalidatePath(path);
    revalidatePath("/blog");
    revalidateTag("sitemap", {});
  }

  return doc;
};
