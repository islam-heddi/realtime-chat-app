import { SIGNOUT_AUTH_ROUTE } from "@/utils/constants";
import { apiClient } from "@/lib/api-client";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store";
import { Input } from "@/components/ui/input";
import { Search, LogOut, PlusCircle, UserCheck, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import FriendChannelList from "./components/FriendChannelList";
import { useState } from "react";
import SearchFriendChannel from "./components/SearchFriendChannel";
import { Toaster } from "@/components/ui/sonner";

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
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#deffff] via-[#f0f9ff] to-[#e0e7ff] p-4 sm:p-6 md:p-10 font-sans">
      {userInfo == null ? (
        <div className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl border border-white/40 shadow-xl text-center">
          <p className="text-xl font-medium text-gray-800 mb-4">Try to authenticate again</p>
          <Button onClick={() => navigate("/")}>Go to Login</Button>
        </div>
      ) : (
        <div className="relative overflow-hidden w-full max-w-[1000px] min-h-[600px] bg-white/70 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl flex flex-col p-6 md:p-10">
          {/* Glow effects */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-purple-200/40 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-blue-200/40 rounded-full blur-3xl -z-10" />

          {/* Header Section */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => navigate("/profile")}
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110">
                <User size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors">
                  {userInfo.name}'s Dashboard
                </h1>
                <p className="text-sm text-gray-500">Welcome back!</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="outline"
                className="bg-white/50 border-white/60 hover:bg-white/80 gap-2 rounded-xl transition-all"
                onClick={() => navigate("/friendRequest")}
              >
                <UserCheck size={18} />
                <span className="hidden sm:inline">Requests</span>
              </Button>
              <Button
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white gap-2 rounded-xl shadow-md border-0 transition-all"
                onClick={() => navigate("/channel/new")}
              >
                <PlusCircle size={18} />
                <span>New Channel</span>
              </Button>
              <Button
                variant="ghost"
                className="text-red-500 hover:text-red-600 hover:bg-red-50/50 gap-2 rounded-xl"
                onClick={handleSignOut}
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Sign Out</span>
              </Button>
            </div>
          </div>

          {/* Search Section */}
          <div className="mb-8">
            <div className="relative group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-purple-500 transition-colors">
                <Search size={20} />
              </div>
              <Input
                className="pl-12 h-14 bg-white/50 border-white/60 rounded-2xl focus:bg-white/80 focus:ring-2 focus:ring-purple-200 focus:border-purple-400 transition-all text-lg"
                type="text"
                placeholder="Search for a friend or a channel..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 bg-white/30 border border-white/40 rounded-2xl p-4 md:p-6 overflow-auto">
            {search === "" ? (
              <FriendChannelList />
            ) : (
              <SearchFriendChannel search={search} />
            )}
          </div>
        </div>
      )}
      <Toaster />
    </div>
  );
}
