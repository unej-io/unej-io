import { resolve } from "path";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const createIncludes =
  (id: string) =>
  (...ms: string[]) =>
    ms.some((m) => id.includes(["node_modules", m].join("/")));

const createBase =
  (name: string) =>
  (...ps: string[]) =>
    [name].concat(ps).join(".");

export default defineConfig({
  plugins: [react()],
  server: { host: true, port: 3001 },
  preview: { host: true, port: 3001 },
  resolve: {
    alias: {
      "~": resolve(__dirname, "src"),
    },
  },
  esbuild: {
    legalComments: "none",
  },
  build: {
    minify: process.env.UNMINIFY === "true" ? false : "esbuild",

    rollupOptions: {
      output: {
        manualChunks: (id) => {
          const enable: boolean = false;

          if (enable) {
            const includes = createIncludes(id);

            if (includes("react", "react-dom")) return "react";

            if (includes("@emotion", "@mantine")) {
              const base = createBase("ui");
              if (includes("@mantine/carousel")) return base("carousel");
              if (includes("@mantine/dates")) return base("dates");
              if (includes("@mantine/dropzone")) return base("dropzone");
              if (includes("@mantine/form")) return base("form");
              if (includes("@mantine/modals")) return base("modals");
              if (includes("@mantine/notifications")) return base("notifications");
              if (includes("@mantine/prism")) return base("prism");
              if (includes("@mantine/spotlight")) return base("spotlight");
              if (includes("@mantine/tiptap")) return base("tiptap");
              return base();
            }
          }
        },
      },
    },
  },
});
