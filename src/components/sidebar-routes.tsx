import { BarChart, HardDriveDownload, List, Settings } from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import { useLocation } from "react-router-dom";

const teacherRoutes = [
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
    icon: Settings,
    label: "Settings",
    href: "/settings",
  },
  {
    icon: HardDriveDownload,
    label: "Importer / Exporter",
    href: "/exporter",
  },
];

export const SidebarRoutes = () => {
  const location = useLocation();

  return (
    <div className="flex w-full flex-col">
      {teacherRoutes.map((route) => (
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
