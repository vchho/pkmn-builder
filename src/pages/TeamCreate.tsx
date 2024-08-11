import { Shell } from "@/components/shell";
import TeamBuilder from "@/components/TeamCreate/TeamBuilder";
import { Card } from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TeamCreate = () => {
  return (
    <Shell>
      <Card className="">
        <Tabs defaultValue="buider">
          <div className="px-4 py-2">
            <TabsList className="ml-auto">
              <TabsTrigger
                value="buider"
                className="text-zinc-600 dark:text-zinc-200"
              >
                Team Builder
              </TabsTrigger>
              <TabsTrigger
                value="stats"
                className="text-zinc-600 dark:text-zinc-200"
              >
                Stats
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="buider">
            <TeamBuilder />
          </TabsContent>
          <TabsContent value="stats" className="m-0">
            <h1>Stats</h1>
          </TabsContent>
        </Tabs>
      </Card>
    </Shell>
  );
};

export default TeamCreate;
