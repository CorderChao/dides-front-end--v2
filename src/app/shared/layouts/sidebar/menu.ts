import { MenuItem } from "./menu.model";

export const MENU: MenuItem[] = [
  {
    label: "MENUITEMS.MENU.TEXT",
    isTitle: true,
  },
  // {
  //   label: "MENUITEMS.DASHBOARD.TEXT",
  //   icon: "ri-dashboard-2-line",
  //   link: "/dashboard",
  //   isCollapsed: false,
  // },
  {
    label: "MENUITEMS.OVERVIEW.TEXT",
    icon: "ri-dashboard-2-line",
    link: "/dashboard",
    isCollapsed: false,
  },
  {
    label: "MENUITEMS.PROJECTS.TEXT",
    icon: "ri-file-list-fill",
    link: "/projects",
    isCollapsed: true,
    subItems: [
      // {
      //   label: "MENUITEMS.PROJECTS.LIST.LISTOFPROJECTS.TEXT",
      //   link: "/projects",
      // },
      // {
  
      //   label: "MENUITEMS.PROJECTS.LIST.PACKAGES.TEXT",
      //   link: "/projects/packages",
      // },
      // {
  
      //   label: "MENUITEMS.PROJECTS.LIST.SUBPROJECTS.TEXT",
      //   link: "/projects/sub-projects",
      // },
    ],
  },
  // {
  //   label: "MENUITEMS.FIELDNOTES.TEXT",
  //   icon: "ri-dashboard-2-line",
  //   link: "/dashboard",
  //   isCollapsed: false,
  // },
  // {
  //   label: "MENUITEMS.OHSANDSAFEGUARD.TEXT",
  //   icon: "ri-dashboard-2-line",
  //   link: "/dashboard",
  //   isCollapsed: false,
  // },
  {
    label: "User Management",
    icon: "ri-group-fill",
    link: "/users",
    isCollapsed: true,
    subItems: [
      {
        label: "List Of Users",
        link: "/users/users-accounts",
      },
      {
  
        label: "Role Management",
        link: "/users/roles-permissions",
      },
    ],
  },
  {
    label: "MENUITEMS.SETTINGS.TEXT",
    icon: "ri-list-settings-fill",
    link: "/settings",
    isCollapsed: true,
  },
  {
    label: "MENUITEMS.MAP.TEXT",
    icon: "ri-dashboard-2-line",
    link: "/map",
    isCollapsed: false,
  },
  {
    label: "Reports",
    icon: " ri-file-list-2-line",
    link: "/reports",
    isCollapsed: false,
  },
];
