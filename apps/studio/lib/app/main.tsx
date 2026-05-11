import "@fontsource-variable/inter/wght.css";
import "@fontsource-variable/geist-mono/wght.css";
import "./globals.css";

import { StudioPage } from "@/pages/studio";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Providers } from "./providers";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Studio root element was not found.");
}

createRoot(rootElement).render(
  <StrictMode>
    <Providers>
      <StudioPage />
    </Providers>
  </StrictMode>
);
