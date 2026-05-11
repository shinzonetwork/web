type ImageAsset = string | { src: string };

export const getImageUrl = (image: ImageAsset): string =>
  typeof image === "string" ? image : image.src;
