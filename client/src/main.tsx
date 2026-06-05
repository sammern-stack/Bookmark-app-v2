// ——— Imports —————————————————————————————————————————————————————————————————
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.scss";

import App from "./App.tsx";

// ——— Root ————————————————————————————————————————————————————————————————————
const root = document.getElementById("root");

createRoot(root!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
