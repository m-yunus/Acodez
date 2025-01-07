import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Fix for __dirname in ESM
const __dirname = path.resolve();

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Alias for easier imports
    },
  },
});
