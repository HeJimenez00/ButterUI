import { z, defineCollection } from "astro:content";

const docsContent = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
  }),
});

export const collections = { docs: docsContent };
