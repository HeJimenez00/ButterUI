// @ts-check
import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";

import icon from "astro-icon";

import mdx from "@astrojs/mdx";

import AutoImport from "astro-auto-import";

import MDXCodeBlocks from "astro-mdx-code-blocks";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
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

