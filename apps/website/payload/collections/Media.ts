import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: false,
    },
  ],
  upload: {
    modifyResponseHeaders: ({ headers }) => {
      // Bump cache control age - cloudflare r2 defaults to 4 hours
      headers.set("Cache-Control", "max-age=31536000");
      return headers;
    },
  },
};
