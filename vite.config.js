import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "gas", // FOLDER TO BUILD
    emptyOutDir: true,
  },
  server: {
    port: 5173, // YOU CAN CHANGE THIS
    open: true, // OPENS BROWSER
  },
});
