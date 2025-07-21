import { SIGNOUT_AUTH_ROUTE } from "@/utils/constants";
import { apiClient } from "@/lib/api-client";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import FriendChannelList from "./components/FriendChannelList";
import { useState } from "react";
import SearchFriendChannel from "./components/SearchFriendChannel";

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const { userInfo, setUserInfo } = useAppStore();
  const navigate = useNavigate();

  const handleSignOut = () => {
    setUserInfo(undefined);
    apiClient
      .get(SIGNOUT_AUTH_ROUTE, { withCredentials: true })
      .then(() => navigate("/"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="h-[100vh] w-[100vw] max-[833px]:w-full max-[833px]:h-full inline-flex items-center justify-center bg-[#deffff] p-6 rounded-2xl ">
      {userInfo == null ? (
        <>Try to authenticate again</>
      ) : (
        <div className="bg-white p-6 rounded-2xl shadow-black w-1/2 shadow-xl/30 max-[833px]:w-full">
          <div className="flex flex-wrap flex-row items-center justify-between">
            <p
              className="text-red-800 cursor-pointer inline p-4"
              onClick={() => handleSignOut()}
            >
              Sign Out
            </p>
            <Button>+ New Channel</Button>
            <div
              className="cursor-pointer inline text-green-500"
              onClick={() => navigate("/friendRequest")}
            >
              Friend Requests
            </div>
          </div>
          <div>{userInfo.name} Dashboard</div>
          <div className="p-7">
            <div className="border-2 flex flex-row items-center justify-center">
              <Input
                className="rounded-white ring-0 border-0 focus:ring-0 focus-within:ring-0 focus-visible:ring-0"
                type="text"
                placeholder="Search for a friend or a channel"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Search />
            </div>
            {search == "" ? (
              <FriendChannelList />
            ) : (
              <SearchFriendChannel search={search} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
