import { SIGNOUT_AUTH_ROUTE } from "@/utils/constants";
import { apiClient } from "@/lib/api-client";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store";
import { Button } from "@/components/ui/button";
import { LogOut, LayoutDashboard, UserCheck } from "lucide-react";
import FriendRequestComponent from "./components/FriendRequestComponent";

export default function FriendRequestPage() {
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
        <div className="relative overflow-hidden w-full max-w-[800px] min-h-[500px] bg-white/70 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl flex flex-col p-6 md:p-10">
          {/* Glow effects */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-purple-200/40 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-blue-200/40 rounded-full blur-3xl -z-10" />

          {/* Header Section */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center text-white shadow-lg">
                <UserCheck size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Friend Requests</h1>
                <p className="text-sm text-gray-500">Manage your connections</p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Button
                variant="outline"
                className="flex-1 sm:flex-none bg-white/50 border-white/60 hover:bg-white/80 gap-2 rounded-xl transition-all"
                onClick={() => navigate("/dashboard")}
              >
                <LayoutDashboard size={18} />
                <span>Dashboard</span>
              </Button>
              <Button
                variant="ghost"
                className="flex-1 sm:flex-none text-red-500 hover:text-red-600 hover:bg-red-50/50 gap-2 rounded-xl"
                onClick={handleSignOut}
              >
                <LogOut size={18} />
                <span>Sign Out</span>
              </Button>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 bg-white/30 border border-white/40 rounded-2xl p-2 md:p-4 overflow-auto">
            <FriendRequestComponent />
          </div>
        </div>
      )}
    </div>
  );
}
