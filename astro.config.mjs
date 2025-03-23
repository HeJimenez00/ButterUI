// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

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
    AutoImport({
      imports: [
        {
          "./src/components/PreviewComponent.astro": [
            ["default", "PreviewComponent"],
          ],
        },
        {
          "./src/components/TerminalCodeBlock.astro": [
            ["default", "TerminalCodeBlock"],
          ],
        },
        {
          "./src/components/SimpleCodeBlock.astro": [
            ["default", "SimpleCodeBlock"],
          ],
        },
        {
          "./src/components/ExternalLink.astro": [["default", "ExternalLink"]],
        },
        {
          "./src/components/HTMLRender.astro": [["default", "HTMLRender"]],
        },
      ],
    }),
    MDXCodeBlocks(),
    mdx(),
  ],
});
