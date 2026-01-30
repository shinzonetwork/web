import "dotenv/config";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { getPayload } from "payload";
import configPromise from "../payload/payload.config";
import { networks } from "./networks";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function seed() {
  const payload = await getPayload({ config: configPromise });

  for await (const network of networks) {
    const existing = await payload.find({
      collection: "chains",
      where: { slug: { equals: network.slug } },
      limit: 1,
    });

    if (existing.docs.length > 0) {
      /* eslint-disable no-console -- it is useful for scripts */
      console.info(`Skipping "${network.name}" — already exists`);
      continue;
    }

    // Upload image to Media
    const imageName = path.basename(network.image);
    const imagePath = path.resolve(
      __dirname,
      "../public/network-images",
      imageName,
    );

    if (!fs.existsSync(imagePath)) {
      console.warn(
        `Image not found for "${network.name}" at ${imagePath}, skipping`,
      );
      continue;
    }

    const fileBuffer = fs.readFileSync(imagePath);
    const uint8 = new Uint8Array(fileBuffer.buffer, fileBuffer.byteOffset, fileBuffer.byteLength);
    const media = await payload.create({
      collection: "media",
      data: { alt: `${network.name} logo` },
      file: {
        data: uint8,
        mimetype: "image/svg+xml",
        name: imageName,
        size: uint8.length,
      },
    });

    // Create chain entry
    await payload.create({
      collection: "chains",
      context: { disableRevalidate: true },
      data: {
        name: network.name,
        slug: network.slug,
        icon: media.id,
        description: network.description,
        token: network.token ?? null,
        isSupported: network.isSupported,
        spotsLimit: network.spotsLimit,
        claimedSpots: 0,
        upvotes: 0,
      },
    });

    console.info(`Seeded "${network.name}"`);
  }

  console.info("Done seeding chains.");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
