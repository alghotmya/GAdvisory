import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ControlTowerProvider } from "./controlTower/ControlTowerContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ControlTowerProvider>
      <App />
    </ControlTowerProvider>
  </StrictMode>,
);
