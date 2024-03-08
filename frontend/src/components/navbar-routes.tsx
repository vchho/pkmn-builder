import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// import { SearchInput } from "./search-input";

export const NavbarRoutes = () => {
  // const { userId } = useAuth();
  // const pathname = usePathname();

  // const isTeacherPage = pathname?.startsWith("/teacher");
  // const isCoursePage = pathname?.includes("/courses");
  // const isSearchPage = pathname === "/search";

  return (
    <>
      <div className="hidden md:block">{/* <SearchInput /> */}</div>

      <div className="ml-auto flex gap-x-2">
        <Link to="/">
          <Button size="sm" variant="ghost">
            <LogOut className="mr-2 h-4 w-4" />
            Exit
          </Button>
        </Link>

        <Link to="/teacher/courses">
          <Button size="sm" variant="ghost">
            Teacher mode
          </Button>
        </Link>

        {/* <UserButton
          afterSignOutUrl="/"
        /> */}
      </div>
    </>
  );
};
