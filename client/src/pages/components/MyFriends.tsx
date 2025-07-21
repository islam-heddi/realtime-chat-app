import { apiClient } from "@/lib/api-client";
import type { friendSchema } from "@/Schema/friend.type";
import { GET_MY_FRIENDS } from "@/utils/constants";
import { useEffect, useState } from "react";
import { useAppStore, useAppChatStore } from "@/store";
import { useNavigate } from "react-router-dom";
import type { UserSchema } from "@/Schema/user.type";

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
  return (
    <div>
      {friends.length > 0
        ? friends.map((value, index) => (
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
              className="flex flex-row gap-6 items-center p-6 mb-4 hover:bg-green-200 cursor-pointer hover:shadow-xl/30 hover:shadow-black rounded-lg"
            >
              <span>{value.friendName}</span>
              <span className="text-gray-500">{value.friendEmail}</span>
            </div>
          ))
        : "No available friends"}
    </div>
  );
}
