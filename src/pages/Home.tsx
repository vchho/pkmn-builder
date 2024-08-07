import { Shell } from "@/components/shell";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useStore from "@/store/store";
import { Link } from "react-router-dom";
import { nanoid } from "nanoid";
// import { generationColors } from "@/constants/tailwind-colors";
import { Header } from "@/components/header";
import TeamCard from "@/components/team-card";

const Home = () => {
  const addTeam = useStore((state) => state.addTeam);
  const teams = useStore((state) => state.teams);

  const id = nanoid();

  return (
    <Shell>
      <Header title="Teams" description="Wanna see your teams?" />

      {/* <div className="relative mx-auto grid w-full grid-flow-row-dense grid-cols-2 gap-x-8 gap-y-6 px-6 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-10 xl:gap-x-10 xl:px-0"> */}
      <div className="relative mx-auto grid w-full grid-flow-row-dense grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4 md:grid-cols-6">
        {teams.map((team, index) => {
          return (
            <TeamCard
              teamId={team.teamId}
              generation={team.generation}
              teamIndex={index}
              key={team.teamId}
            />
          );
        })}
      </div>
      <Link
        to={`create/${id}`}
        className={cn(buttonVariants({ variant: "default" }))}
        onClick={() => addTeam(id)}
      >
        Create Team
      </Link>
    </Shell>
  );
};

export default Home;
