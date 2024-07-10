import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { buttonVariants } from "./ui/button";

export const ShowBack = ({ href }: { href: string }) => {
  return (
    <Link
      to={href}
      className={cn(buttonVariants({ variant: "link" }), "w-fit px-0")}
    >
      Go back
    </Link>
  );
};
