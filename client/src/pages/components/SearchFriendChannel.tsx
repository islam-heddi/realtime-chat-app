import { apiClient } from "@/lib/api-client";
import { useEffect, useState } from "react";
import {
  SEARCH_USER,
  SEND_FRIEND_REQUEST_ROUTE,
  SEARCH_CHANNEL,
} from "@/utils/constants";
import { useAppStore } from "@/store";
import { useAppChatStore, useAppChannelStore } from "@/store";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { ChannelSchema } from "@/Schema/channel.type";
type User = {
  _id: string;
  name: string;
  email: string;
};

export default function SearchFriendChannel({ search }: { search: string }) {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [channels, setChannels] = useState<ChannelSchema[]>([]);
  const { userInfo } = useAppStore();
  const { setSelectedChatData, setSelectedChatType, setSelectedChatMessage } =
    useAppChatStore();
  const { setSelectedChannelId, setSelectedChannelName } = useAppChannelStore();
  useEffect(() => {
    apiClient
      .post(SEARCH_USER, { name: search })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
    apiClient
      .get(SEARCH_CHANNEL + `?search=${search}`)
      .then((res) => setChannels(res.data))
      .catch((err) => console.log(err));
  }, [search]);

  const handleSelectUser = (value: User, type: "friend" | "channel") => {
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
  const handleAddFriend = (value: User) => {
    apiClient
      .post(
        SEND_FRIEND_REQUEST_ROUTE,
        { friendId: value._id },
        { withCredentials: true }
      )
      .then(() => {
        toast.success("Friend request sent successfully!");
      })
      .catch((error) => {
        console.error("Error sending friend request:", error);
        toast.error("Failed to send friend request.");
      });
  };
  const handleSelectChannel = (value: ChannelSchema) => {
    setSelectedChannelId(value._id);
    setSelectedChannelName(value.name);
    navigate("/channel/chat");
  };
  return (
    <div>
      <p>Search for "{search}" Friend or Channel</p>
      <div>
        {users.length > 0 ? <p>Users</p> : ""}
        {users
          .filter(({ _id }) => userInfo?._id !== _id)
          .map((value, index) => (
            <div
              className="flex flex-row items-center justify-between"
              key={index}
            >
              <div
                className="flex flex-row justify-between cursor-pointer p-5 m-5 w-full hover:bg-gray-400 hover:shadow-xl/30 hover:shadow-black rounded-2xl"
                key={index}
                onClick={() => handleSelectUser(value, "friend")}
              >
                <div>
                  <span className="text-black">{value?.name}</span>{" "}
                  <span className="text-gray-700"> {value?.email}</span>
                </div>
              </div>
              <Button onClick={() => handleAddFriend(value)}>+</Button>
            </div>
          ))}
      </div>
      <div>
        {channels.length > 0 ? <p>Channels</p> : ""}
        {channels.map((value, index) => (
          <div
            className="flex flex-row items-center justify-between"
            key={index}
          >
            <div
              className="flex flex-row justify-between cursor-pointer p-5 m-5 w-full hover:bg-gray-400 hover:shadow-xl/30 hover:shadow-black rounded-2xl"
              onClick={() => handleSelectChannel(value)}
            >
              <div>
                <span className="text-black">{value.name}</span>{" "}
                <span className="text-gray-700"> {value.description}</span>
                {value.creatorId === userInfo?._id ? (
                  <span className="text-green-600"> Your Channel</span>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
