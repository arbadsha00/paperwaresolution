// @ts-check
import { defineConfig } from "astro/config";
import glsl from "vite-plugin-glsl";
import react from "@astrojs/react";
import icon from "astro-icon";
import tailwindcss from "@tailwindcss/vite";

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
    plugins: [tailwindcss(), glsl()],
    optimizeDeps: {
      include: ["gsap"],
    },
  },
});
