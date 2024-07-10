import { useRef } from "react";

import { Shell } from "@/components/shell";
import { ShowBack } from "@/components/show-back";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import useStore from "@/store/store";
import { Input } from "@/components/ui/input";

const Settings = () => {
  const inputFile = useRef<HTMLInputElement | null>(null);

  const nukeTeams = useStore((state) => state.nukeTeams);

  // https://stackoverflow.com/questions/37457128/react-open-file-browser-on-click-a-div
  const onButtonClick = () => {
    // `current` points to the mounted file input element
    if (inputFile.current) {
      inputFile.current.click();
    }
  };

  // https://stackoverflow.com/questions/55830414/how-to-read-text-file-in-react
  const readFile = (file: File) => {
    if (file.type !== "application/json") {
      alert("Please import a valid JSON file.");
    } else {
      const reader = new FileReader();
      reader.onload = () => {
        const content = reader.result as string;
        console.log("content here", content);

        localStorage.setItem("pkmn-bldr", content);

        alert(
          "Import has been successful. Please refresh your browser to see your teams.",
        );
      };

      reader.readAsText(file);
    }
  };

  const downloadJSON = (fileName: string) => {
    const localData = localStorage.getItem("pkmn-bldr");

    const jsonData = new Blob([localData!], {
      type: "application/json",
    });

    const jsonURL = URL.createObjectURL(jsonData);
    const link = document.createElement("a");
    link.href = jsonURL;
    link.download = `${fileName}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Shell>
      <Card className="flex h-full flex-col">
        <CardHeader className="flex-1">
          <ShowBack href="/" />
          <CardTitle>Settings</CardTitle>
          <CardDescription className="line-clamp-2">
            Misc settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="">
            <div className="">
              <Label>Import / Export Data</Label>
              <p className="flex text-sm text-slate-500 dark:text-slate-400">
                Want to use your team data onto another browser or have team
                data from another browser? Use this tool!
              </p>
              <div className="my-2">
                <Input
                  id="picture"
                  type="file"
                  style={{ display: "none" }}
                  ref={inputFile}
                  onChange={(a) => {
                    const file = a.target.files![0];
                    readFile(file);
                  }}
                />
                <Button
                  className={cn("mr-2", buttonVariants({ variant: "default" }))}
                  onClick={() => onButtonClick()}
                >
                  Import
                </Button>
                <Button
                  onClick={() => downloadJSON("pkmn-builder")}
                  className={cn(buttonVariants({ variant: "default" }))}
                >
                  Export
                </Button>
              </div>
            </div>
            <Separator className="my-2" />
            <div className="">
              <Label className="flex">Delete all teams</Label>
              <p className="flex text-sm text-slate-500 dark:text-slate-400">
                Don't like your teams? Lets nuke them.
              </p>
              <Button
                className={cn(
                  "my-2",
                  buttonVariants({ variant: "destructive" }),
                )}
                onClick={() => nukeTeams()}
              >
                Reset Teams
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Shell>
  );
};

export default Settings;
