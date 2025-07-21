import { Tabs, TabsTrigger, TabsContent, TabsList } from "@/components/ui/tabs";
import MyFriends from "./MyFriends";
import GetChannels from "./GetChannels";

export default function FriendChannelList() {
  return (
    <div>
      <Tabs defaultValue="friends">
        <TabsList className="w-full">
          <TabsTrigger value="friends">Friends</TabsTrigger>
          <TabsTrigger value="channels">Channels</TabsTrigger>
        </TabsList>
        <TabsContent value="friends">
          <MyFriends />
        </TabsContent>
        <TabsContent value="channels">
          <GetChannels />
        </TabsContent>
      </Tabs>
    </div>
  );
}
