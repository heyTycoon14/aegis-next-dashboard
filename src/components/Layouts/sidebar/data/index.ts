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
            title: "New Workspace",
            url: "/workspaces/create",
          },
          {
            title: "Workspaces",
            url: "/workspaces/list",
          },
        ],
      },
      {
        title: "Domains",
        icon: Icons.Table,
        items: [
          {
            title: "New Domain",
            url: "/domain/create",
          },
          {
            title: "Domains",
            url: "/domain/list",
          },
        ],
      },
      {
        title: "Products",
        icon: Icons.Alphabet,
        items: [
          {
            title: "Supported Platforms",
            url: "/products/platforms",
          },
          {
            title: "All Products",
            url: "/products/all",
          },
          {
            title: "Sales Tracker",
            url: "/products/sales",
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
        icon: Icons.User,
        items: [
          {
            title: "User info",
            url: "/profile",
          },
          {
            title: "Setting",
            url: "/profile/settings",
          },
        ],
      },
      {
        title: "Subscription",
        icon: Icons.PieChart,
        items: [
          {
            title: "Current Plan",
            url: "/subscription/current-plan",
          },
          {
            title: "Upgrade Subscription",
            url: "/subscription/upgrade-subscription",
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
        url: "/about",
        icon: Icons.ChevronUp,
        items: [],
      },
      {
        title: "How to use",
        url: "/how-to-use",
        icon: Icons.PieChart,
        items: [],
      },
      {
        title: "Contact Us",
        icon: Icons.ArrowLeftIcon,
        url: "/contact-us",
        items: [],
      },
    ],
  },
];
