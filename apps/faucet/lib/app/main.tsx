import "@fontsource-variable/inter/wght.css";
import "@fontsource-variable/geist-mono/wght.css";
import "./globals.css";

import { FaucetPage } from "@/pages/faucet";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Faucet root element was not found.");
}

createRoot(rootElement).render(
  <StrictMode>
    <FaucetPage />
  </StrictMode>
);
