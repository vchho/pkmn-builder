import { useRef } from "react";

import { Shell } from "@/components/shell";
import { Button, buttonVariants } from "@/components/ui/button";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import useStore from "@/store/store";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/header";

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
      <Header title="Settings" />

      <Separator />

      <div>
        <h2 className="font-heading mt-12 scroll-m-20 pb-2 text-2xl font-semibold tracking-tight first:mt-0">
          Import / Export Data
        </h2>
        <p className="leading-7 text-slate-500 dark:text-slate-400">
          Want to use your team data onto another browser or have team data from
          another browser? Use this tool!
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
        <Separator className="my-4" />

        <h2 className="font-heading scroll-m-20 pb-2 text-2xl font-semibold tracking-tight first:mt-0">
          Delete all teams
        </h2>
        {/* <p className="flex text-sm font-light text-slate-500 dark:text-slate-400"> */}
        <p className="leading-7">Don't like your teams? Lets nuke them.</p>
        <Button
          className={cn("my-2", buttonVariants({ variant: "destructive" }))}
          onClick={() => nukeTeams()}
        >
          Reset Teams
        </Button>

        <Separator className="my-4" />
      </div>
    </Shell>
  );
};

export default Settings;
