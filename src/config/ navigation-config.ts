import type {
  MainNavbarItem,
  SideBarNavbarItem,
  SidebarNavbarItem,
} from "../types/index";
interface DocsConfig {
  mainNavbar: MainNavbarItem[];
  sidebarNavbar: SideBarNavbarItem[];
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
  sidebarNavbar: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Introduction",
          icon: "introduction",
          href: "/docs/introduction",
        },
        {
          title: "Installation",
          href: "/docs/installation",
          icon: "installation",
        },
      ],
    },
  ],
};
