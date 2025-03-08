import type { RegistryEntry } from "./schema";

export const astraRegistry: RegistryEntry[] = [
  {
    name: "AvatarList",
    type: "astra",
    files: [{ path: "src/registry/astra/AvatarList.astro" }],
  },
  {
    name: "Jumpy",
    type: "astra",
    files: [{ path: "src/registry/astra/Jumpy.astro" }],
  },
  {
    name: "Jelly",
    type: "astra",
    files: [{ path: "src/registry/astra/Jelly.astro" }],
  },
  {
    name: "JellyReveal",
    type: "astra",
    files: [{ path: "src/registry/astra/JellyReveal.astro" }],
  },
  {
    name: "DeepFocus",
    type: "astra",
    files: [{ path: "src/registry/astra/DeepFocus.astro" }],
  },
];
