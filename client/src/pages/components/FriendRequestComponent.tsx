import { Tabs, TabsTrigger, TabsContent, TabsList } from "@/components/ui/tabs";

export default function FriendChannelList() {
  return (
    <div>
      <Tabs defaultValue="friends">
        <TabsList className="w-full">
          <TabsTrigger value="request">My Requests</TabsTrigger>
          <TabsTrigger value="reply">Reply</TabsTrigger>
        </TabsList>
        <TabsContent value="request">No available friends</TabsContent>
        <TabsContent value="reply">No available channels</TabsContent>
      </Tabs>
    </div>
  );
}
