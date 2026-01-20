import { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-d1-sqlite";

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  // Migration code
  await payload.update({
    collection: "posts",
    where: {},
    data: { _status: "published" },
  });
}

export async function down({}: MigrateDownArgs): Promise<void> {
  // Migration code
}
