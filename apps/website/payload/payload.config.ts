import {
  CloudflareContext,
  getCloudflareContext,
} from "@opennextjs/cloudflare";
import { sqliteD1Adapter } from "@payloadcms/db-d1-sqlite";
import { resendAdapter } from "@payloadcms/email-resend";
import { seoPlugin } from "@payloadcms/plugin-seo";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { r2Storage } from "@payloadcms/storage-r2";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import { GetPlatformProxyOptions } from "wrangler";

import { Authors } from "./collections/Authors";
import { Media } from "./collections/Media";
import { Posts } from "./collections/Posts";
import { Users } from "./collections/Users";
import { BlogLanding } from "./globals/BlogLanding";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const isCLI = process.argv.some((value) =>
  value.match(/^(generate|migrate):?/)
);
const isProduction = process.env.NODE_ENV === "production";

const cloudflare =
  isCLI || !isProduction
    ? await getCloudflareContextFromWrangler()
    : await getCloudflareContext({ async: true });

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Posts, Authors],
  globals: [BlogLanding],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: sqliteD1Adapter({ binding: cloudflare.env.D1 }),
  plugins: [
    r2Storage({
      bucket: cloudflare.env.R2,
      collections: { media: true },
    }),
    seoPlugin({
      collections: [],
      uploadsCollection: "media",
      generateTitle: ({ doc }) => `Shinzo | ${doc.title}`,
      generateDescription: ({ doc }) => doc?.excerpt || "",
    }),
  ],
  email: resendAdapter({
    defaultFromAddress: "updates@web-mail.shinzo.network",
    defaultFromName: "Shinzo Website",
    apiKey: process.env.RESEND_API_KEY || "",
  }),
});

// Adapted from https://github.com/opennextjs/opennextjs-cloudflare/blob/d00b3a13e42e65aad76fba41774815726422cc39/packages/cloudflare/src/api/cloudflare-context.ts#L328C36-L328C46
function getCloudflareContextFromWrangler(): Promise<CloudflareContext> {
  return import(
    /* webpackIgnore: true */ `${"__wrangler".replaceAll("_", "")}`
  ).then(({ getPlatformProxy }) =>
    getPlatformProxy({
      environment: process.env.CLOUDFLARE_ENV,
      remoteBindings: isProduction,
    } satisfies GetPlatformProxyOptions)
  );
}
