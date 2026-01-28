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
import { User, Check, X, Clock, Inbox } from "lucide-react";

export default function FriendRequestComponent() {
  const { userInfo } = useAppStore();
  const navigate = useNavigate();
  const [data, setData] = useState<friendSchema[]>([]);

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
      return;
    }
    apiClient
      .get(GET_FRIENDS_ROUTE, { withCredentials: true })
      .then((res) => {
        setData(res.data);
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
        // Update local state to reflect change immediately
        setData(prev => prev.map(item => item._id === id ? { ...item, status } : item));
      })
      .catch((err) => {
        console.log(err);
        toast.error(`Error applying the friend request: ${err.message}`);
      });
  };

  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  return (
    <div className="w-full">
      <Tabs defaultValue="request" className="w-full">
        <TabsList className="w-full bg-white/20 p-1 rounded-xl mb-6">
          <TabsTrigger
            value="request"
            className="flex-1 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all"
          >
            My Requests
          </TabsTrigger>
          <TabsTrigger
            value="reply"
            className="flex-1 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all"
          >
            Pending Invites
          </TabsTrigger>
        </TabsList>

        <TabsContent value="request" className="space-y-4 outline-none">
          {data.filter((a) => a?.userId == userInfo?._id && a.status !== "accepted").length > 0 ? (
            data
              .filter((a) => a?.userId == userInfo?._id && a.status !== "accepted")
              .map((value, index) => (
                <div
                  className="flex items-center justify-between gap-4 p-4 bg-white/40 hover:bg-white/60 border border-white/20 rounded-2xl transition-all group"
                  key={index}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 font-bold border border-purple-200">
                      {getInitials(value.friendName)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 leading-none mb-1">{value.friendName}</h4>
                      <p className="text-xs text-gray-500">{value.friendEmail}</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 ${value.status === 'rejected' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'
                    }`}>
                    {value.status === 'rejected' ? <X size={12} /> : <Clock size={12} />}
                    {value.status}
                  </div>
                </div>
              ))
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-gray-400">
              <Inbox size={48} className="mb-4 opacity-20" />
              <p>No sent requests</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="reply" className="space-y-4 outline-none">
          {data.filter((a) => a?.friendId === userInfo?._id && a.status === "pending").length > 0 ? (
            data
              .filter((a) => a?.friendId === userInfo?._id && a.status === "pending")
              .map((value, index) => (
                <div
                  className="flex items-center justify-between gap-4 p-4 bg-white/40 hover:bg-white/60 border border-white/20 rounded-2xl transition-all"
                  key={index}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 font-bold border border-blue-200">
                      {getInitials(value.friendName)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 leading-none mb-1">{value.friendName}</h4>
                      <p className="text-xs text-gray-500">{value.friendEmail}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleApplyFriendRequest(value._id, "accepted")}
                      className="h-9 px-3 bg-green-500 hover:bg-green-600 text-white rounded-xl shadow-sm border-0 transition-all flex items-center gap-1.5"
                    >
                      <Check size={16} />
                      <span className="hidden sm:inline">Accept</span>
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleApplyFriendRequest(value._id, "rejected")}
                      className="h-9 px-3 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                    >
                      <X size={18} />
                    </Button>
                  </div>
                </div>
              ))
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-gray-400">
              <User size={48} className="mb-4 opacity-20" />
              <p>No pending invites</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
