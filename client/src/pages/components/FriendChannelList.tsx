import { Tabs, TabsTrigger, TabsContent, TabsList } from "@/components/ui/tabs";
import MyFriends from "./MyFriends";
import GetChannels from "./GetChannels";
import Otherchannel from "./OtherChannels";

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
          <Otherchannel />
        </TabsContent>
      </Tabs>
    </div>
  );
}
