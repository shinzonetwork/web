import type { CollectionBeforeChangeHook, CollectionConfig } from "payload";
import { APIError } from "payload";

import { authenticated } from "../access/authenticated";
import { anyone } from "../access/anyone";

const preventDuplicateClaim: CollectionBeforeChangeHook = async ({
  data,
  operation,
  req,
}) => {
  if (operation !== "create") return data;

  const existing = await req.payload.find({
    collection: "claims",
    where: {
      and: [
        { network: { equals: data?.network } },
        { validatorAddress: { equals: data?.validatorAddress } },
      ],
    },
    limit: 1,
  });

  if (existing.totalDocs > 0) {
    throw new APIError(
      "You have already submitted a claim for this network with this wallet address.",
      400
    );
  }

  return data;
};

export const Claims: CollectionConfig = {
  slug: "claims",
  access: {
    admin: authenticated,
    create: anyone,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ["network", "validatorAddress", "email", "verified", "createdAt"],
    useAsTitle: "validatorAddress",
  },
  hooks: {
    beforeChange: [preventDuplicateClaim],
  },
  fields: [
    {
      name: "network",
      type: "text",
      required: true,
    },
    {
      name: "validatorAddress",
      type: "text",
      label: "Validator Address",
      required: true,
    },
    {
      name: "signature",
      type: "text",
      required: true,
      admin: {
        description: "Wallet signature proving ownership",
      },
    },
    {
      name: "email",
      type: "email",
      required: true,
    },
    {
      name: "domain",
      type: "text",
      label: "Website",
    },
    {
      name: "socialMedia",
      type: "array",
      label: "Social Media",
      fields: [
        {
          name: "platform",
          type: "text",
        },
        {
          name: "link",
          type: "text",
        },
      ],
    },
    {
      name: "verified",
      type: "checkbox",
      label: "Verified",
      defaultValue: false,
      admin: {
        description: "Whether this claim has been verified by an admin",
      },
    },
  ],
};