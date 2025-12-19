import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from "payload";
import type { Post } from "../../../payload-types";

import { revalidatePath, revalidateTag } from "next/cache";

export const revalidatePost: CollectionAfterChangeHook<Post> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    const path = `/blog/${doc.slug}`;

    payload.logger.info(`Revalidating post at path: ${path}`);

    revalidatePath(path);
    revalidatePath("/blog");
    revalidateTag("sitemap");
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
    revalidateTag("sitemap");
  }

  return doc;
};
