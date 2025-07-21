import { Tabs, TabsTrigger, TabsContent, TabsList } from "@/components/ui/tabs";
import { apiClient } from "@/lib/api-client";
import { useAppStore } from "@/store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GET_FRIENDS_ROUTE } from "@/utils/constants";
import type { friendSchema } from "@/Schema/friend.type";
import { APPLY_FRIEND_REQUEST_ROUTE } from "@/utils/constants";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function FriendRequestComponent() {
  const { userInfo } = useAppStore();
  const navigate = useNavigate();
  const [data, setData] = useState<friendSchema[]>([]);
  console.log("userInfo", userInfo);

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
      return;
    }
    apiClient
      .get(GET_FRIENDS_ROUTE, { withCredentials: true })
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => console.error(err));
  }, [userInfo, navigate]);

  const handleApplyFriendRequest = (
    id: string,
    status: "accepted" | "rejected"
  ) => {
    apiClient
      .patch(
        APPLY_FRIEND_REQUEST_ROUTE,
        { id, status },
        { withCredentials: true }
      )
      .then(() => {
        toast.success(`Friend request ${status} successfully!`);
      })
      .catch((err) => {
        console.log(err);
        toast.error(`error applying the friend request: ${err.message} `);
      });
  };

  return (
    <div>
      <Tabs defaultValue="request" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="request">My Requests</TabsTrigger>
          <TabsTrigger value="reply">Reply</TabsTrigger>
        </TabsList>
        <TabsContent value="request">
          {data.length > 0
            ? data
                .filter(
                  (a) => a?.userId == userInfo?._id && a.status !== "accepted"
                )
                .map((value, index) => (
                  <div
                    className="flex flex-row gap-3 cursor-pointer w-full hover:bg-gray-400 rounded-2xl p-6 mb-4 shadow-xs/2"
                    key={index}
                  >
                    <span
                      className={
                        value.status == "rejected"
                          ? "text-red-500"
                          : "text-black"
                      }
                    >
                      {value.friendName} - {value.status}
                    </span>
                    <span className="text-gray-600">{value.friendEmail}</span>
                  </div>
                ))
            : "No friend requests found"}
        </TabsContent>
        <TabsContent value="reply">
          {data.length > 0
            ? data
                .filter(
                  (a) => a?.friendId === userInfo?._id && a.status === "pending"
                )
                .map((value, index) => (
                  <div
                    className="flex flex-row gap-3 cursor-pointer w-full hover:bg-gray-400 rounded-2xl p-6 mb-4 shadow-xs/2"
                    key={index}
                  >
                    <span>
                      {value.friendName} - {value.status}
                    </span>
                    <span className="text-gray-600">{value.friendEmail}</span>
                    <Button
                      onClick={() =>
                        handleApplyFriendRequest(value._id, "accepted")
                      }
                      className="bg-green-300"
                    >
                      Done
                    </Button>
                    <Button
                      onClick={() =>
                        handleApplyFriendRequest(value._id, "rejected")
                      }
                      className="bg-red-500"
                    >
                      X
                    </Button>
                  </div>
                ))
            : "No one sent you a request"}
        </TabsContent>
      </Tabs>
    </div>
  );
}
