export interface NavItem {
  title: string;
  href?: string;
  icon?: string;
  external?: boolean;
  disabled?: boolean;
}

export interface SidebarNavbarItem extends NavItem {
  items?: NavItem[];
}

export interface MainNavbarItem extends NavItem {
  items?: SidebarNavbarItem[];
}

export interface SideBarNavbarItem extends SidebarNavbarItem {}
