import { Shell } from "@/components/shell";
import TeamBuilder from "@/components/TeamCreate/TeamBuilder";
import { Card } from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TeamCreate = () => {
  return (
    <Shell>
      <Card className="">
        <Tabs defaultValue="all">
          <div className="px-4 py-2">
            <TabsList className="ml-auto">
              <TabsTrigger
                value="all"
                className="text-zinc-600 dark:text-zinc-200"
              >
                Team Builder
              </TabsTrigger>
              <TabsTrigger
                value="unread"
                className="text-zinc-600 dark:text-zinc-200"
              >
                Stats
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="all">
            <TeamBuilder />
          </TabsContent>
          <TabsContent value="unread" className="m-0">
            <h1>Stats</h1>
            {/* <MailList items={mails.filter((item) => !item.read)} /> */}
          </TabsContent>
        </Tabs>
        {/* </div> */}
      </Card>
    </Shell>
  );
};

export default TeamCreate;
