import { apiClient } from "@/lib/api-client";
import type { friendSchema } from "@/Schema/friend.type";
import { GET_MY_FRIENDS } from "@/utils/constants";
import { useEffect, useState } from "react";
import { useAppStore, useAppChatStore } from "@/store";
import { useNavigate } from "react-router-dom";
import type { UserSchema } from "@/Schema/user.type";
import { MessageSquare, User } from "lucide-react";

export default function MyFriends() {
  const [friends, setFriends] = useState<friendSchema[]>([]);
  const { userInfo } = useAppStore();
  const navigate = useNavigate();
  const { setSelectedChatData, setSelectedChatType, setSelectedChatMessage } =
    useAppChatStore();

  useEffect(() => {
    apiClient
      .get(GET_MY_FRIENDS, { withCredentials: true })
      .then((res) => setFriends(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleSelectUser = (value: UserSchema, type: "friend" | "channel") => {
    apiClient
      .get(`/chat/messages/${value._id}`, {
        withCredentials: true,
      })
      .then((response) => {
        setSelectedChatMessage(response.data.messages);
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
      });
    setSelectedChatType(type);
    setSelectedChatData({
      senderId: userInfo?._id,
      receiverId: value._id,
      name: value.name,
      email: value.email,
    });
    navigate(`/chat`);
  };

  if (friends.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-gray-500 gap-4">
        <User size={48} className="opacity-20" />
        <p className="text-lg">No available friends yet</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 animate-in fade-in duration-500">
      {friends.map((value, index) => (
        <div
          key={index}
          onClick={() =>
            handleSelectUser(
              {
                _id: value.friendId,
                name: value.friendName,
                email: value.friendEmail,
              },
              "friend"
            )
          }
          className="group flex items-center justify-between p-4 bg-white/40 hover:bg-white/60 border border-white/40 rounded-2xl transition-all shadow-sm hover:shadow-md backdrop-blur-sm cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-green-100 to-blue-100 flex items-center justify-center text-green-600 font-bold border border-white shadow-inner">
              {value.friendName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 group-hover:text-green-700 transition-colors">
                {value.friendName}
              </h4>
              <p className="text-xs text-gray-500">{value.friendEmail}</p>
            </div>
          </div>
          <div className="p-2 rounded-full bg-white/50 group-hover:bg-green-100 transition-colors">
            <MessageSquare size={18} className="text-gray-400 group-hover:text-green-600" />
          </div>
        </div>
      ))}
    </div>
  );
}
