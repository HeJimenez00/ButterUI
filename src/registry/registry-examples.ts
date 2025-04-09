import type { RegistryEntry } from "./schema";

export const examplesRegistry: RegistryEntry[] = [
  {
    name: "AvatarListMain",
    type: "example",
    files: [{ path: "src/registry/examples/AvatarListMain.astro" }],
  },
  {
    name: "AvatarListVertical",
    type: "example",
    files: [{ path: "src/registry/examples/AvatarListVertical.astro" }],
  },
  {
    name: "AvatarListBlog",
    type: "example",
    files: [{ path: "src/registry/examples/AvatarListBlog.astro" }],
  },
  {
    name: "JumpyMain",
    type: "example",
    files: [{ path: "src/registry/examples/JumpyMain.astro" }],
  },
  {
    name: "JumpyText",
    type: "example",
    files: [{ path: "src/registry/examples/JumpyText.astro" }],
  },
  {
    name: "GlimpseMain",
    type: "example",
    files: [{ path: "src/registry/examples/GlimpseMain.astro" }],
  },
  {
    name: "GlimpseCards",
    type: "example",
    files: [{ path: "src/registry/examples/GlimpseCards.astro" }],
  },
];
