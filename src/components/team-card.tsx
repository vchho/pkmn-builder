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
