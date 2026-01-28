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
import { getMessagesChannels, joinChannel } from "@/utils/functions";
import { UserPlus, MessageSquare, Shield, Hash, Search as SearchIcon } from "lucide-react";

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
  const {
    setSelectedChannelId,
    setSelectedChannelName,
    setSelectedChannelMessages,
  } = useAppChannelStore();

  useEffect(() => {
    if (!search) return;

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
        toast.success(`Friend request sent to ${value.name}`);
      })
      .catch((error) => {
        console.error("Error sending friend request:", error);
        toast.error("Failed to send friend request.");
      });
  };

  const handleSelectChannel = async (value: ChannelSchema) => {
    setSelectedChannelId(value._id);
    setSelectedChannelName(value.name);
    const PrevMsg = await getMessagesChannels(value._id);
    await joinChannel(value._id, userInfo?._id as string);
    setSelectedChannelMessages(PrevMsg);
    navigate("/channel/chat");
  };

  if (users.length === 0 && channels.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-gray-500 gap-4">
        <SearchIcon size={48} className="opacity-20" />
        <p className="text-lg">No results found for "{search}"</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex items-center gap-2 text-gray-400 text-sm font-medium uppercase tracking-wider">
        <span className="w-8 h-px bg-gray-200"></span>
        Search Results for "{search}"
        <span className="w-8 h-px bg-gray-200"></span>
      </div>

      {users.length > 0 && (
        <section className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-500 flex items-center gap-2 ml-1">
            <UserPlus size={16} /> Users
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {users
              .filter(({ _id }) => userInfo?._id !== _id)
              .map((value, index) => (
                <div
                  key={index}
                  className="group flex items-center justify-between p-4 bg-white/40 hover:bg-white/60 border border-white/40 rounded-2xl transition-all shadow-sm hover:shadow-md backdrop-blur-sm"
                >
                  <div
                    className="flex flex-1 items-center gap-4 cursor-pointer"
                    onClick={() => handleSelectUser(value, "friend")}
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-100 to-blue-100 flex items-center justify-center text-purple-600 font-bold border border-white shadow-inner">
                      {value.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 group-hover:text-purple-700 transition-colors">
                        {value.name}
                      </h4>
                      <p className="text-xs text-gray-500">{value.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleAddFriend(value)}
                      className="rounded-full hover:bg-purple-100/50 text-purple-600 h-9 w-9"
                      title="Add Friend"
                    >
                      <UserPlus size={18} />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleSelectUser(value, "friend")}
                      className="rounded-full hover:bg-blue-100/50 text-blue-600 h-9 w-9"
                      title="Message"
                    >
                      <MessageSquare size={18} />
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </section>
      )}

      {channels.length > 0 && (
        <section className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-500 flex items-center gap-2 ml-1">
            <Hash size={16} /> Channels
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {channels.map((value, index) => (
              <div
                key={index}
                className="group flex items-center justify-between p-4 bg-white/40 hover:bg-white/60 border border-white/40 rounded-2xl transition-all shadow-sm hover:shadow-md backdrop-blur-sm cursor-pointer"
                onClick={() => handleSelectChannel(value)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-100 to-blue-100 flex items-center justify-center text-indigo-600 font-bold border border-white shadow-inner">
                    <Hash size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 group-hover:text-indigo-700 transition-colors">
                      {value.name}
                    </h4>
                    <p className="text-xs text-gray-500 line-clamp-1">{value.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {value.creatorId === userInfo?._id ? (
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-green-100/50 text-green-700 text-xs font-medium rounded-full border border-green-200">
                      <Shield size={12} /> Owner
                    </span>
                  ) : (
                    <span className="text-xs text-indigo-500 font-medium group-hover:underline">Join Channel</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
