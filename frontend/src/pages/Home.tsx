import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Link
        to={`/${3423424242}`}
        className={cn(
          buttonVariants({ variant: "default" }),
          // "text-md tracking-tighter",
        )}
      >
        Create Team
      </Link>

      <div>Home</div>
    </>
  )
}

export default Home;
