import { apiClient } from "@/lib/api-client";
import { useEffect, useState } from "react";
import { SEARCH_USER } from "@/utils/constants";

type User = {
  _id: string;
  name: string;
  email: string;
};

export default function SearchFriendChannel({ search }: { search: string }) {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    apiClient
      .post(SEARCH_USER, { search })
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, [search]);
  return (
    <div>
      <p>Search for "{search}" Friend or Channel</p>
      <div>
        {users.map((value, index) => (
          <div
            className="cursor-pointer p-5 m-5 w-full hover:bg-gray-400 hover:shadow-xl/30 hover:shadow-black rounded-2xl"
            key={index}
          >
            <span className="text-black">{value?.name}</span>{" "}
            <span className="text-gray-700"> {value?.email}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
