import type { CollectionConfig } from "payload";

import { authenticated } from "../access/authenticated";
import { anyone } from "../access/anyone";

export const Authors: CollectionConfig = {
  slug: "authors",
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: "name",
  },
  defaultPopulate: {
    name: true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
  ],
};
