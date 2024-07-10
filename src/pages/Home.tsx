import { Shell } from "@/components/shell";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useStore from "@/store/store";
import { Link } from "react-router-dom";
import { nanoid } from "nanoid";

const Home = () => {
  const addTeam = useStore((state) => state.addTeam);
  const teams = useStore((state) => state.teams);

  const id = nanoid();

  return (
    <Shell>
      <Link
        to={`create/${id}`}
        className={cn(
          buttonVariants({ variant: "default" }),
          // "text-md tracking-tighter",
        )}
        onClick={() => addTeam(id)}
      >
        Create Team
      </Link>

      <div>Teams</div>

      {teams.map((team) => {
        return (
          <div key={team.teamId}>
            <Link to={`create/${team.teamId}`}>
              Generation: {team.generation} - {team.teamId}
            </Link>
          </div>
        );
      })}
    </Shell>
  );
};

export default Home;
