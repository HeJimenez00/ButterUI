// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

import icon from "astro-icon";

import mdx from "@astrojs/mdx";

import AutoImport from "astro-auto-import";

import MDXCodeBlocks from "astro-mdx-code-blocks";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    react(),
    icon(),
    AutoImport({
      imports: [
        {
          "./src/components/PreviewComponent.astro": [
            ["default", "PreviewComponent"],
          ],
        },
      ],
    }),
    MDXCodeBlocks(),
    mdx(),
  ],
});
