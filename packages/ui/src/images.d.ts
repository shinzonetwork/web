declare module "*.png" {
  const image: string | { src: string; height: number; width: number };
  export default image;
}
