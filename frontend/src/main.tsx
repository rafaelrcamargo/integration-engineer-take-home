import React from "react";
import { createRoot } from "react-dom/client";

import "./styles/globals.css";

import { Toaster } from "sonner";
import App from "./App";

createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
    <Toaster richColors closeButton duration={1500} />
  </React.StrictMode>,
);
