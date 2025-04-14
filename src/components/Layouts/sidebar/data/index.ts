import { url } from "inspector";
import * as Icons from "../icons";

export const NAV_DATA = [
  {
    label: "Dashboard",
    items: [
      {
        title: "Summary",
        icon: Icons.HomeIcon,
        url: "/",
        items: [],
      },
      {
        title: "Workspaces",
        icon: Icons.FourCircle,
        items: [
          {
            title: "Workspaces",
            url: "/pages/settings",
          },
          {
            title: "Settings",
            url: "/pages/settings",
          },
        ],
      },
      {
        title: "Domains",
        url: "/tables",
        icon: Icons.Table,
        items: [],
      },
      {
        title: "Products",
        icon: Icons.Alphabet,
        items: [
          {
            title: "Settings",
            url: "/pages/settings",
          },
        ],
      },
    ],
  },
  {
    label: "User Settings",
    items: [
      {
        title: "Profile",
        url: "/profile",
        icon: Icons.User,
        items: [],
      },
      {
        title: "Subscription",
        icon: Icons.PieChart,
        items: [
          {
            title: "Basic Chart",
            url: "/charts/basic-chart",
          },
        ],
      },
    ],
  },
  {
    label: "Help",
    items: [
      {
        title: "About Aegis",
        url: "/profile",
        icon: Icons.User,
        items: [],
      },
      {
        title: "How to use",
        icon: Icons.PieChart,
        items: [
          {
            title: "Basic Chart",
            url: "/charts/basic-chart",
          },
        ],
      },
      {
        title: "Contact Us",
        icon: Icons.ArrowLeftIcon,
        url: "/forms/form-layout",
        items: [],
      },
    ],
  },
];
