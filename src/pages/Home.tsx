import { Shell } from "@/components/shell";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useStore from "@/store/store";
import { Link } from "react-router-dom";
import { nanoid } from "nanoid";
// import { generationColors } from "@/constants/tailwind-colors";
import { Header } from "@/components/header";

const TeamCard = ({
  teamId,
  generation,
}: {
  teamId: string;
  generation: string;
}) => {
  return (
    <div className="relative col-span-1 w-full max-w-md overflow-hidden rounded-md sm:col-span-2">
      <div className="absolute inset-0 z-[-1] blur-md backdrop-blur-lg">
        <div
          className="h-full w-full bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
          style={{
            clipPath:
              "polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%",
          }}
        />
      </div>

      <div className="relative m-1 flex flex-col items-start gap-2 text-white">
        <h3 className="text-2xl font-bold text-black">
          Generation: {generation}
        </h3>
        <Link
          to={`create/${teamId}`}
          className="inline-flex h-10 items-center justify-center rounded-md bg-black px-8 text-sm font-medium shadow transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
        >
          View Teams
        </Link>
      </div>
    </div>
  );
};

const Home = () => {
  const addTeam = useStore((state) => state.addTeam);
  const teams = useStore((state) => state.teams);

  const id = nanoid();

  return (
    <Shell>
      <Header title="Teams" description="Wanna see your teams?" />

      {/* <div className="relative mx-auto grid w-full grid-flow-row-dense grid-cols-2 gap-x-8 gap-y-6 px-6 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-10 xl:gap-x-10 xl:px-0"> */}
      <div className="relative mx-auto grid w-full grid-flow-row-dense grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4 md:grid-cols-6">
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
