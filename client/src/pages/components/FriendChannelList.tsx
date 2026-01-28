import { Tabs, TabsTrigger, TabsContent, TabsList } from "@/components/ui/tabs";
import MyFriends from "./MyFriends";
import GetChannels from "./GetChannels";
import Otherchannel from "./OtherChannels";

export default function FriendChannelList() {
  return (
    <div className="w-full h-full flex flex-col gap-6">
      <Tabs defaultValue="friends" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-gray-100/50 p-1 rounded-xl mb-6 backdrop-blur-sm border border-white/20">
          <TabsTrigger
            value="friends"
            className="py-2.5 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-300 font-medium"
          >
            Friends
          </TabsTrigger>
          <TabsTrigger
            value="channels"
            className="py-2.5 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-300 font-medium"
          >
            Channels
          </TabsTrigger>
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
