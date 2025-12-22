import type { Config, Media, Post } from "@/payload/payload-types";
import { Metadata } from "next";
import { isPopulated } from "./utils";

export const getImageURL = (
  image?: Media | Config["db"]["defaultIDType"] | null
) => {
  const serverUrl = getServerSideURL();

  let url = serverUrl + "/opengraph-image.png";

  if (image && isPopulated(image)) {
    url = serverUrl + image.url;
  }

  return url;
};

export const getServerSideURL = () => {
  return process.env.NEXT_PUBLIC_URL || "http://localhost:3000";
};

export const generateMeta = async (args: {
  doc: Partial<Post> | null;
  type: "post";
}): Promise<Metadata> => {
  const { doc, type } = args;

  const paths = {
    post: `/blog/${doc?.slug}`,
    page: `/${doc?.slug}`,
  };

  const image = {
    post: getImageURL(doc?.meta?.image || (doc as Post)?.featuredImage),
    page: getImageURL(doc?.meta?.image),
  };

  console.log("image", image);
  console.log("metaImage", doc?.meta?.image);
  console.log("featuredImage", doc?.featuredImage);

  const title = doc?.meta?.title
    ? doc?.meta?.title
    : doc?.title
      ? `${doc?.title} | Shinzō`
      : "Shinzō";

  const description = doc?.meta?.description
    ? doc?.meta?.description
    : doc?.excerpt
      ? doc?.excerpt
      : "";

  const ogImage = image[type];

  const path = paths[type];
  const canonicalUrl = `${getServerSideURL()}${path}`;

  return {
    title,
    description,
    openGraph: {
      description,
      images: ogImage ? [{ url: ogImage }] : undefined,
      url: canonicalUrl,
    },
  };
};
