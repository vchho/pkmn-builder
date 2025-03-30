import { BarChart, List, Settings, Album } from "lucide-react";
import { SidebarItem } from "./sidebar-item";

const routes = [
  {
    icon: List,
    label: "Teams",
    href: "/",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/analytics",
  },
  {
    icon: Album,
    label: "Guides",
    href: "/guides",
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/settings",
  },
];

export const SidebarRoutes = () => {
  return (
    <div className="flex w-full flex-col">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};
