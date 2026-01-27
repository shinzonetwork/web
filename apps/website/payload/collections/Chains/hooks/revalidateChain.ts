import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from "payload";
import type { Chain } from "../../../payload-types";

import { revalidatePath, revalidateTag } from "next/cache";

export const revalidateChain: CollectionAfterChangeHook<Chain> = async ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    const path = `/chains/${doc.slug}`;
    payload.logger.info(`Revalidating chain at path: ${path}`);

    revalidatePath(path);
    revalidatePath("/chains");
    revalidateTag("sitemap");

    if (previousDoc?.slug !== doc.slug) {
      payload.logger.info(
        `Revalidating previous chain at path: /chains/${previousDoc?.slug}`
      );
      revalidatePath(`/chains/${previousDoc?.slug}`);
    }
  }

  return doc;
};

export const revalidateDelete: CollectionAfterDeleteHook<Chain> = async ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    const path = `/chains/${doc?.slug}`;
    payload.logger.info(`Revalidating chain at path: ${path}`);

    revalidatePath(path);
    revalidatePath("/chains");
    revalidateTag("sitemap");
  }

  return doc;
};