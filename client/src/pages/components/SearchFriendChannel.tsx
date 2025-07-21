import { apiClient } from "@/lib/api-client";
import { useEffect, useState } from "react";
import { SEARCH_USER, SEND_FRIEND_REQUEST_ROUTE } from "@/utils/constants";
import { useAppStore } from "@/store";
import { useAppChatStore } from "@/store";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
type User = {
  _id: string;
  name: string;
  email: string;
};

export default function SearchFriendChannel({ search }: { search: string }) {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const { userInfo } = useAppStore();
  const { setSelectedChatData, setSelectedChatType, setSelectedChatMessage } =
    useAppChatStore();
  useEffect(() => {
    apiClient
      .post(SEARCH_USER, { name: search })
      .then((res) => {
        setUsers(res.data);
      })
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
  return (
    <div>
      <p>Search for "{search}" Friend or Channel</p>
      <div>
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
    </div>
  );
}
