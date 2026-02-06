
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import App from "./App.tsx";
import "./index.css";

console.log("%c🚀 PedLife Turbo v3.1 Ativado (Performance & AI Fix)", "color: #8b5cf6; font-weight: bold; font-size: 14px;");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider attribute="class" defaultTheme="light">
      <App />
      <Toaster position="top-center" richColors closeButton expand={true} />
    </ThemeProvider>
  </StrictMode>,
);
