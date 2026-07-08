import { ROUTES, convertRoutesToMenuItems } from "@/common/routes";

export interface MenuItem {
  id: string;
  translationKey: string;
  path: string;
  icon: any;
  children?: MenuItem[];
  isGroup?: boolean;
  groupName?: string;
}

export const menuItems: MenuItem[] = convertRoutesToMenuItems(ROUTES) as MenuItem[];
