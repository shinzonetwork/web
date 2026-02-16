import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
} from "@payloadcms/plugin-seo/fields";
import type { GlobalConfig } from "payload";

export const BlogLanding: GlobalConfig = {
  label: "Blog Global",
  slug: "blogLanding",
  access: {
    read: () => true,
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Content",
          fields: [
            {
              name: "title",
              type: "text",
            },
            {
              name: "subtitle",
              type: "text",
            },
            {
              name: "featuredPost",
              type: "relationship",
              relationTo: "posts",
              hasMany: false,
            },
          ],
        },
        {
          name: "meta",
          label: "SEO",
          fields: [
            OverviewField({}),
            MetaTitleField({}),
            MetaImageField({ relationTo: "media" }),
            MetaDescriptionField({}),
          ],
        },
      ],
    },
  ],
};
