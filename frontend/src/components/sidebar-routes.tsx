import { BarChart, Compass, Layout, List } from "lucide-react";
// import { usePathname } from "next/navigation";

import { SidebarItem } from "./sidebar-item";
import { useLocation } from "react-router-dom";

const guestRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: Compass,
    label: "Browse",
    href: "/search",
  },
];

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
]

export const SidebarRoutes = () => {
  // const pathname = usePathname();
  const location = useLocation();


  // const isTeacherPage = location.pathname?.includes("/teacher");

  // const routes = isTeacherPage ? teacherRoutes : guestRoutes;

  return (
    <div className="flex flex-col w-full">
      
      {teacherRoutes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  )
}