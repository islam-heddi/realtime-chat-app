import { Tabs, TabsTrigger, TabsContent, TabsList } from "@/components/ui/tabs";

export default function FriendChannelList() {
  return (
    <div>
      <Tabs defaultValue="friends">
        <TabsList className="w-full">
          <TabsTrigger value="friends">Friends</TabsTrigger>
          <TabsTrigger value="channels">Channels</TabsTrigger>
        </TabsList>
        <TabsContent value="friends">No available friends</TabsContent>
        <TabsContent value="channels">No available channels</TabsContent>
      </Tabs>
    </div>
  );
}
