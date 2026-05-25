import "@fontsource-variable/inter/wght.css";
import "@fontsource-variable/geist-mono/wght.css";
import "./globals.css";

import { DeployPage } from "@/pages/deploy";
import { ViewsPage } from "@/pages/views";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Providers } from "./providers";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Studio root element was not found.");
}

const App = () => {
  if (window.location.pathname === "/deploy") {
    return <DeployPage />;
  }

  return <ViewsPage />;
};

createRoot(rootElement).render(
  <StrictMode>
    <Providers>
      <App />
    </Providers>
  </StrictMode>
);
