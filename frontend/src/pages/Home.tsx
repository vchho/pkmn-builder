import { Shell } from "@/components/shell";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Shell>
      <Link
        to="/create/"
        className={cn(
          buttonVariants({ variant: "default" }),
          // "text-md tracking-tighter",
        )}
      >
        Create Team
      </Link>

      <div>Home</div>
    </Shell>
  );
};

export default Home;
