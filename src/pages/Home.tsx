import { Shell } from "@/components/shell";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useStore from "@/store/store";
import { Link } from "react-router-dom";
import { nanoid } from "nanoid";
import { generationColors } from "@/constants/tailwind-colors";
import { Header } from "@/components/header";

const TeamCard = ({
  teamId,
  generation,
}: {
  teamId: string;
  generation: string;
}) => {
  return (
    <Link
      to={`create/${teamId}`}
      className={cn(
        `relative col-span-1 rounded-md sm:col-span-2`,
        generationColors[generation],
      )}
      key={teamId}
    >
      <div className="relative overflow-hidden rounded-md">
        <div className="h-[150px] w-[300px] object-cover object-top"> </div>
        Generation: {generation} - {teamId}
      </div>
    </Link>
  );
};

const Home = () => {
  const addTeam = useStore((state) => state.addTeam);
  const teams = useStore((state) => state.teams);

  const id = nanoid();

  return (
    <Shell>
      <Header title="Teams" description="Wanna see your teams?" />

      <div className="relative mx-auto grid w-full grid-flow-row-dense grid-cols-2 gap-x-8 gap-y-6 px-6 text-center sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-10 xl:gap-x-10 xl:px-0">
        {teams.map((team) => {
          return (
            <TeamCard
              teamId={team.teamId}
              generation={team.generation}
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
