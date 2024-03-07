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
      <div className="hidden md:block">
        {/* <SearchInput /> */}
      </div>

      <div className="flex gap-x-2 ml-auto">
        
          <Link to="/">
            <Button size="sm" variant="ghost">
              <LogOut className="h-4 w-4 mr-2" />
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
  )
}