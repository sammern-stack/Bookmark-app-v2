import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    modules: {
      localsConvention: "camelCase",
    },
    preprocessorOptions: {
      scss: {
        additionalData: (src: string, filename: string) => {
          const normalize = filename.replace("/\\/", "/");
          const shouldExclude = normalize.includes("/shared/styles");

          if (shouldExclude) return src;
          return `@use "@/shared/styles/mixins" as *;\n${src}`;
        },
      },
    },
  },
});
