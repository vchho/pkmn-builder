import { Shell } from "@/components/shell";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useStore from "@/store/store";
import { Link } from "react-router-dom";

const Home = () => {
  const addTeam = useStore((state) => state.addTeam);

  return (
    <Shell>
      <Link
        to="/create/"
        className={cn(
          buttonVariants({ variant: "default" }),
          // "text-md tracking-tighter",
        )}
        onClick={() => addTeam}
      >
        Create Team
      </Link>

      <div>Teams</div>
    </Shell>
  );
};

export default Home;
