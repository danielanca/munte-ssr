import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import type { UserConfig } from "vitest/config";

const test = {
  globals: true,
  environment: "jsdom",
  setupFiles: ["src/__tests__/setupTests.ts"],
  threads: false,
  watch: false,
} as UserConfig["test"];

const isProd = process.env.NODE_ENV === "production";
const isHttps = process.env.USE_HTTPS === "true";
const hmrProtocol = isHttps ? "wss" : "ws";

export default defineConfig({
  plugins: [react()],
  server: {
    port: parseInt("8000", 10),
    https: isHttps,
    hmr: { protocol: hmrProtocol, host: "diniubire.ro", port: 24678 },
  },
  build: { minify: isProd, sourcemap: !isProd },
  test,
  css: { preprocessorOptions: { scss: { additionalData: `@import "./src/client/styles/mixins.scss";\n` } } },

  // 👇 aici vine fixul
  optimizeDeps: { include: ["html-react-parser"] },
  ssr: { noExternal: ["html-react-parser"] },
});
