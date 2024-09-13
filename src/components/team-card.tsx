import useStore from "@/store/store";
import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Link } from "react-router-dom";
import {
  generationColors,
  generationPolygons,
} from "@/constants/tailwind-colors";
import { cn } from "@/lib/utils";

const TeamCard = ({
  teamId,
  generation,
  teamIndex,
}: {
  teamId: string;
  generation: string;
  teamIndex: number;
}) => {
  const deleteTeam = useStore((state) => state.deleteTeam);

  return (
    <div className="relative col-span-1 w-full max-w-md overflow-hidden rounded-md sm:col-span-2">
      <div className="absolute inset-0 z-[-1] blur-md backdrop-blur-lg">
        <div
          className={cn(
            "h-full w-full bg-gradient-to-tr opacity-30",
            generationColors[generation],
          )}
          style={{
            clipPath: generationPolygons[generation],
          }}
        />
      </div>

      <div className="relative flex flex-col items-start gap-2 text-white">
        <h3 className="text-2xl font-bold text-black">
          Generation: {generation}
        </h3>
      </div>
      <div className="mt-3 flex content-center items-center justify-between truncate pb-1 text-left">
        <Link to={`create/${teamId}`} className="font-medium">
          View Team
        </Link>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Trash2 className="h-5 w-5 cursor-pointer" />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                team and remove your data.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => deleteTeam(teamIndex)}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default TeamCard;
