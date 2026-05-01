interface ImportMetaEnv {
  readonly VITE_APP_URL?: string;
  readonly VITE_SHINZOHUB_BLOCK_EXPLORER_URL?: string;
  readonly VITE_SHINZOHUB_CHAIN_ID?: string;
  readonly VITE_WALLETCONNECT_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "*.css";

declare module "*.svg" {
  import type { FC, SVGProps } from "react";
  const ReactComponent: FC<SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}

declare module "*.svg?url" {
  const url: string;
  export default url;
}

declare module "*.png" {
  const url: string;
  export default url;
}

declare module "*.png?url" {
  const url: string;
  export default url;
}
