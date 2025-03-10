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
          href: "/docs/components/avatar",
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
      title: "Getting started",
      items: [
        {
          title: "Introduction",
          href: "/docs/introduction",
          icon: "introduction",
        },
        {
          title: "Installation",
          href: "/docs/installation",
          icon: "installation",
        },
      ],
    },
    {
      title: "Components",
      items: [
        {
          title: "Avatar",
          href: "/docs/components/avatar",
        },
        {
          title: "Jumpy",
          href: "/docs/components/jumpy",
        },
        {
          title: "Jelly",
          href: "/docs/components/jelly",
        },
        {
          title: "Deep focus",
          href: "/docs/components/deepfocus",
        },
      ],
    },
  ],
};
