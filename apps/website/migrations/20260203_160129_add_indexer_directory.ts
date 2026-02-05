import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`chains\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`icon_id\` integer NOT NULL,
  	\`description\` text,
  	\`token\` text,
  	\`is_supported\` integer DEFAULT false,
  	\`generate_slug\` integer DEFAULT true,
  	\`slug\` text NOT NULL,
  	\`spots_limit\` numeric DEFAULT 0 NOT NULL,
  	\`upvotes\` numeric DEFAULT 0,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`icon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`chains_icon_idx\` ON \`chains\` (\`icon_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`chains_slug_idx\` ON \`chains\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`chains_updated_at_idx\` ON \`chains\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`chains_created_at_idx\` ON \`chains\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`claims_social_media\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`platform\` text,
  	\`link\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`claims\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`claims_social_media_order_idx\` ON \`claims_social_media\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`claims_social_media_parent_id_idx\` ON \`claims_social_media\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`claims\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`network_id\` integer NOT NULL,
  	\`validator_address\` text NOT NULL,
  	\`signature\` text NOT NULL,
  	\`email\` text NOT NULL,
  	\`domain\` text,
  	\`verified\` integer DEFAULT false,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`network_id\`) REFERENCES \`chains\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`claims_network_idx\` ON \`claims\` (\`network_id\`);`)
  await db.run(sql`CREATE INDEX \`claims_updated_at_idx\` ON \`claims\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`claims_created_at_idx\` ON \`claims\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`suggestions\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`count\` numeric DEFAULT 1 NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`suggestions_name_idx\` ON \`suggestions\` (\`name\`);`)
  await db.run(sql`CREATE INDEX \`suggestions_updated_at_idx\` ON \`suggestions\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`suggestions_created_at_idx\` ON \`suggestions\` (\`created_at\`);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`chains_id\` integer REFERENCES chains(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`claims_id\` integer REFERENCES claims(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`suggestions_id\` integer REFERENCES suggestions(id);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_chains_id_idx\` ON \`payload_locked_documents_rels\` (\`chains_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_claims_id_idx\` ON \`payload_locked_documents_rels\` (\`claims_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_suggestions_id_idx\` ON \`payload_locked_documents_rels\` (\`suggestions_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`chains\`;`)
  await db.run(sql`DROP TABLE \`claims_social_media\`;`)
  await db.run(sql`DROP TABLE \`claims\`;`)
  await db.run(sql`DROP TABLE \`suggestions\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`media_id\` integer,
  	\`posts_id\` integer,
  	\`authors_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`authors_id\`) REFERENCES \`authors\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "users_id", "media_id", "posts_id", "authors_id") SELECT "id", "order", "parent_id", "path", "users_id", "media_id", "posts_id", "authors_id" FROM \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_posts_id_idx\` ON \`payload_locked_documents_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_authors_id_idx\` ON \`payload_locked_documents_rels\` (\`authors_id\`);`)
}
