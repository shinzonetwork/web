import {
  CloudflareContext,
  getCloudflareContext,
} from "@opennextjs/cloudflare";
import { sqliteD1Adapter } from "@payloadcms/db-d1-sqlite";
import { resendAdapter } from "@payloadcms/email-resend";
import { seoPlugin } from "@payloadcms/plugin-seo";
import {
  BlocksFeature,
  FixedToolbarFeature,
  lexicalEditor,
  LinkFeature,
} from "@payloadcms/richtext-lexical";
import { r2Storage, R2StorageOptions } from "@payloadcms/storage-r2";
import path from "path";
import { buildConfig, type PayloadLogger } from "payload";
import { fileURLToPath } from "url";
import { GetPlatformProxyOptions } from "wrangler";
import { Authors } from "./collections/Authors";
import { Chains } from "./collections/Chains";
import { Leads } from "./collections/Leads";
import { Media } from "./collections/Media";
import { Posts } from "./collections/Posts";
import { Suggestions } from "./collections/Suggestions";
import { Users } from "./collections/Users";
import { Code } from "./fields/code";
import { BlogLanding } from "./globals/BlogLanding";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const isCLI = process.argv.some((value) =>
  value.match(/^(generate|migrate):?/),
);
const isProduction = process.env.NODE_ENV === "production";

const createLog =
  (level: string, fn: typeof console.log) =>
  (objOrMsg: object | string, msg?: string) => {
    if (typeof objOrMsg === "string") {
      fn(JSON.stringify({ level, msg: objOrMsg }));
    } else {
      fn(
        JSON.stringify({
          level,
          ...objOrMsg,
          msg: msg ?? (objOrMsg as { msg?: string }).msg,
        }),
      );
    }
  };

const cloudflareLogger = {
  level: process.env.PAYLOAD_LOG_LEVEL || "info",
  trace: createLog("trace", console.debug),
  debug: createLog("debug", console.debug),
  info: createLog("info", console.log),
  warn: createLog("warn", console.warn),
  error: createLog("error", console.error),
  fatal: createLog("fatal", console.error),
  silent: () => {},
} as unknown as PayloadLogger;

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
  collections: [Users, Media, Posts, Authors, Chains, Leads, Suggestions],
  globals: [BlogLanding],
  editor: lexicalEditor({
    features: ({ defaultFeatures, rootFeatures }) => [
      ...defaultFeatures,
      ...rootFeatures,
      FixedToolbarFeature(),
      LinkFeature({
        enabledCollections: ["posts"],
      }),
      BlocksFeature({
        blocks: [Code],
      }),
    ],
  }),
  graphQL: { disable: true },
  logger: isProduction ? cloudflareLogger : undefined,
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: sqliteD1Adapter({ binding: cloudflare.env.D1 }),
  plugins: [
    r2Storage({
      bucket: cloudflare.env.R2 as R2StorageOptions["bucket"],
      collections: {
        media: true,
      },
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
    defaultFromName: "Shinzō",
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
    } satisfies GetPlatformProxyOptions),
  );
}
