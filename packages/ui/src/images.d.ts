declare module "*.png" {
  const image: string | { src: string; height: number; width: number };
  export default image;
}

declare module "*.svg" {
  const component: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  export default component;
}
