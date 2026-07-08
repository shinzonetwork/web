import type { CollectionConfig } from "payload";
import { slugField } from "payload";

import { authenticated } from "../../access/authenticated";
import { anyone } from "../../access/anyone";
import { upvoteEndpoint } from "./endpoints/upvote";

export const Chains: CollectionConfig = {
  slug: "chains",
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ["name", "slug", "upvotes"],
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "icon",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
    },
    {
      name: "token",
      type: "text",
      label: "Token Symbol",
      admin: {
        description: "Native token symbol (e.g., ETH, SOL)",
      },
    },
    {
      name: "isSupported",
      type: "checkbox",
      label: "Is Supported",
      admin: {
        description: "Whether this chain is currently supported (live) or planned",
      },
      defaultValue: false,
    },
    slugField({ useAsSlug: 'name' }),
    {
      name: "upvotes",
      type: "number",
      label: "Upvotes",
      admin: {
        description: "Number of upvotes from connected wallets",
      },
      defaultValue: 0,
    },
  ],
  endpoints: [upvoteEndpoint],
};
