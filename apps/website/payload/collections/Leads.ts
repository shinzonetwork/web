import type { CollectionBeforeChangeHook, CollectionConfig } from "payload";
import { APIError } from "payload";

import { authenticated } from "../access/authenticated";
import { anyone } from "../access/anyone";

const preventDuplicateLead: CollectionBeforeChangeHook = async ({
  data,
  operation,
  req,
}) => {
  if (operation !== "create") return data;

  const existing = await req.payload.find({
    collection: "leads",
    where: {
      and: [
        { network: { equals: data?.network } },
        { email: { equals: data?.email } },
      ],
    },
    limit: 1,
  });

  if (existing.totalDocs > 0) {
    throw new APIError(
      "You have already registered your interest for this network with this email address.",
      400
    );
  }

  return data;
};

export const Leads: CollectionConfig = {
  slug: "leads",
  labels: {
    singular: "Generator Lead",
    plural: "Generator Leads",
  },
  access: {
    admin: authenticated,
    create: anyone,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ["name", "network", "email", "confirmed", "createdAt"],
    useAsTitle: "name",
  },
  hooks: {
    beforeChange: [preventDuplicateLead],
  },
  fields: [
    {
      name: "network",
      type: "relationship",
      relationTo: "chains",
      required: true,
    },
    {
      name: "name",
      type: "text",
      required: true,
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
      name: "otherChains",
      type: "text",
      label: "Other Chains Secured",
    },
    {
      name: "confirmed",
      type: "checkbox",
      label: "Email Confirmed",
      defaultValue: false,
      admin: {
        readOnly: true,
        description: "Set automatically when the user confirms their email address.",
      },
    },
    {
      name: "skipMailingList",
      type: "checkbox",
      label: "Skip mailing list",
      defaultValue: false,
      access: {
        create: ({ req }) => !!req.user,
      },
      admin: {
        description: "If checked, this lead will not be added to the Resend mailing list.",
        condition: (data) => !data?.id,
      },
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
  ],
};
