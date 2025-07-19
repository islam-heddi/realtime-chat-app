import { apiClient } from "@/lib/api-client";
import { useEffect, useState } from "react";
import { SEARCH_USER } from "@/utils/constants";
import { useAppStore } from "@/store";
import { useAppChatStore } from "@/store";

type User = {
  _id: string;
  name: string;
  email: string;
};

export default function SearchFriendChannel({ search }: { search: string }) {
  const [users, setUsers] = useState<User[]>([]);
  const { userInfo } = useAppStore();
  const { setSelectedChatData, setSelectedChatType } = useAppChatStore();
  console.log(userInfo);
  useEffect(() => {
    apiClient
      .post(SEARCH_USER, { name: search })
      .then((res) => {
        setUsers(res.data);
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, [search]);
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
              onClick={() => {
                window.location.href = `/chat/${value._id}`;
                setSelectedChatType("friend");
                setSelectedChatData({
                  senderId: userInfo?._id,
                  receiverId: value._id,
                  name: value.name,
                  email: value.email,
                });
              }}
            >
              <span className="text-black">{value?.name}</span>{" "}
              <span className="text-gray-700"> {value?.email}</span>
            </div>
          ))}
      </div>
    </div>
  );
}
