import { cn } from "@/lib/utils";

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string | null;
  size?: "default" | "sm";
  // goBackLink?: string;
  trimDesc?: boolean;
}

export function Header({
  title,
  description,
  size = "default",
  // goBackLink,
  className,
  ...props
}: HeaderProps) {
  return (
    <div className={cn("grid gap-1", className)} {...props}>
      {/* {goBackLink && <ShowBack href={goBackLink} />} */}
      <h1
        className={cn(
          "line-clamp-1 py-1 text-3xl font-bold tracking-tight",
          size === "default" && "md:text-4xl",
        )}
      >
        {title}
      </h1>
      {description ? (
        <p className="text-muted-foreground text-md">{description}</p>
      ) : null}
    </div>
  );
}
