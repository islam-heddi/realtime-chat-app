import { Tabs, TabsTrigger, TabsContent, TabsList } from "@/components/ui/tabs";
import MyFriends from "./MyFriends";

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
        <TabsContent value="channels">No available channels</TabsContent>
      </Tabs>
    </div>
  );
}
