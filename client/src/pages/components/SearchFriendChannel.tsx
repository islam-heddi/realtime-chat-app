import { apiClient } from "@/lib/api-client";
import { useEffect, useState } from "react";
import { SEARCH_USER } from "@/utils/constants";
import { useAppStore } from "@/store";
import { useAppChatStore } from "@/store";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
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
  const handleAddFriend = (value: User) => {};
  return (
    <div>
      <p>Search for "{search}" Friend or Channel</p>
      <div>
        {users
          .filter(({ _id }) => userInfo?._id !== _id)
          .map((value, index) => (
            <div
              className="cursor-pointer p-5 m-5 w-full hover:bg-gray-400 hover:shadow-xl/30 hover:shadow-black rounded-2xl"
              key={index}
              onClick={() => handleSelectUser(value, "friend")}
            >
              <span className="text-black">{value?.name}</span>{" "}
              <span className="text-gray-700"> {value?.email}</span>
              <Button onClick={() => handleAddFriend(value)}>+</Button>
            </div>
          ))}
      </div>
    </div>
  );
}
