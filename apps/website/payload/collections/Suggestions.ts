import type { CollectionBeforeChangeHook, CollectionConfig } from "payload";
import { APIError } from "payload";

import { authenticated } from "../access/authenticated";
import { anyone } from "../access/anyone";

/** on POST, create a new row with "name" and "count:1". On the 2+ creation of the same name, only increment count */
const handleSuggestionUpsert: CollectionBeforeChangeHook = async ({
  data,
  operation,
  req,
}) => {
  if (operation !== "create") return data;

  const networkName = data?.name?.toLowerCase().trim();
  if (!networkName) return data;

  const existing = await req.payload.find({
    collection: "suggestions",
    where: {
      name: { equals: networkName },
    },
    limit: 1,
  });

  if (existing.totalDocs > 0) {
    const existingDoc = existing.docs[0];
    await req.payload.update({
      collection: "suggestions",
      id: existingDoc.id,
      data: {
        count: (existingDoc.count || 1) + 1,
      },
    });

    // actually success, but needed to be error for payload to not create a new entry
    throw new APIError("SUGGESTION_INCREMENTED", 200);
  }

  return {
    ...data,
    name: networkName,
  };
};

export const Suggestions: CollectionConfig = {
  slug: "suggestions",
  access: {
    admin: authenticated,
    create: anyone,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ["name", "count", "createdAt"],
    useAsTitle: "name",
  },
  hooks: {
    beforeChange: [handleSuggestionUpsert],
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      unique: true,
      admin: {
        description: "Network name (stored lowercase)",
      },
    },
    {
      name: "count",
      type: "number",
      required: true,
      defaultValue: 1,
      admin: {
        description: "Number of users who suggested this network",
      },
    },
  ],
};
