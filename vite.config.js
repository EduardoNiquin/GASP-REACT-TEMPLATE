import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "gas", // <-- FOLDER GAS FOR DEPLOYMENT
    emptyOutDir: true,
  },
});
