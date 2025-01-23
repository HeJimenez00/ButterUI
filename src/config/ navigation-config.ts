import type { MainNavbarItem } from "../types/index";
interface DocsConfig {
  mainNavbar: MainNavbarItem[];
}

export const navigationConfig: DocsConfig = {
  mainNavbar: [
    {
      title: "mainItems",
      items: [
        {
          title: "Docs",
          href: "/docs/introduction",
        },
        {
          title: "Components",
          href: "/docs/avatar",
        },
        {
          title: "Blog",
          href: "/blog",
        },
      ],
    },
  ],
};
