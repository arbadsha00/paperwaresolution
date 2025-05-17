// // @ts-check
import { defineConfig } from "astro/config";
import glsl from "vite-plugin-glsl";
import react from "@astrojs/react";
import icon from "astro-icon";
import tailwindcss from "@tailwindcss/vite";
import compress from "vite-plugin-compression";
import { visualizer } from "rollup-plugin-visualizer";
// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    icon({
      include: {
        tabler: ["cloud-download", "shopping-cart"],
        lsicon: ["open-new-outline"],
        ix: ["product"],
        "material-symbols": ["home-rounded", "eco"],
        ri: ["building-2-fill"],
        "line-md": ["phone-filled"],
      },
    }),
  ],

  vite: {
    plugins: [
      tailwindcss(),
      glsl({
        compress: true, // Compress shaders
      }),
      compress({
        ext: ".br",
        algorithm: "brotliCompress",
        filter: /\.(js|glb|hdr|glsl)$/,
      }),
      visualizer({
        gzipSize: true,
        brotliSize: true,
        emitFile: true,
        filename: "stats.html",
      }),
    ],

    optimizeDeps: {
      include: ["gsap", "three", "@react-three/fiber", "@react-three/drei"],
      exclude: [
        "@react-three/postprocessing", // If not used
      ],
    },
    ssr: {
      noExternal: ["@react-three/fiber"], // Better SSR handling
    },
  },
});
