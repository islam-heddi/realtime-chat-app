import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useAppStore } from "@/store";
import { toast } from "sonner";
import { CREATE_CHANNELS_ROUTE } from "@/utils/constants";
import { apiClient } from "@/lib/api-client";
import { PlusCircle, LayoutDashboard, Hash, MessageSquarePlus, User } from "lucide-react";

export default function NewChannelPage() {
  const { userInfo } = useAppStore();
  const navigate = useNavigate();
  const [channelName, setChannelName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  if (!userInfo) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-linear-to-br from-blue-50 to-cyan-100 p-4">
        <div className="bg-white p-8 rounded-3xl shadow-2xl text-center max-w-sm w-full border border-white/20 backdrop-blur-sm">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <User size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-6">Please log in to create a new channel and start chatting.</p>
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-6 text-lg transition-all duration-300"
            onClick={() => navigate("/login")}
          >
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  const handleSubmit = async () => {
    if (!channelName || !description) {
      return toast.error("Please fill all the fields");
    }

    try {
      await apiClient.post(
        CREATE_CHANNELS_ROUTE,
        {
          name: channelName,
          description,
        },
        { withCredentials: true }
      );
      toast.success("Channel created successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error("Failed to create channel");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-linear-to-br from-blue-50 to-cyan-100 p-4 md:p-8">
      <div className="bg-white/90 backdrop-blur-md p-6 md:p-10 rounded-[2.5rem] shadow-2xl w-full max-w-2xl border border-white/50 animate-in fade-in zoom-in duration-500">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-200">
              <PlusCircle size={28} />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">New Channel</h1>
              <p className="text-gray-500 text-sm font-medium flex items-center gap-1.5 mt-0.5">
                <User size={14} className="text-blue-500" />
                Logged in as <span className="text-blue-600">{userInfo.name}</span>
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate("/dashboard")}
            className="rounded-2xl border-2 hover:bg-gray-50 transition-all duration-300 px-6 font-semibold flex items-center gap-2 h-12"
          >
            <LayoutDashboard size={18} />
            Dashboard
          </Button>
        </div>

        <div className="space-y-8">
          <div className="space-y-6">
            <div className="group space-y-2.5">
              <Label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-2">
                <Hash size={16} className="text-blue-500" />
                Channel Name
              </Label>
              <Input
                type="text"
                value={channelName}
                onChange={(e) => setChannelName(e.target.value)}
                placeholder="Ex: general-discussion"
                className="h-14 rounded-2xl border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all duration-300 px-5 text-lg"
              />
            </div>

            <div className="group space-y-2.5">
              <Label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-2">
                <MessageSquarePlus size={16} className="text-blue-500" />
                Channel Description
              </Label>
              <Input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What is this channel about?"
                className="h-14 rounded-2xl border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all duration-300 px-5 text-lg"
              />
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-2xl h-14 text-xl font-bold shadow-xl shadow-blue-100 hover:shadow-blue-200 transition-all duration-300 flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
          >
            Create Channel
            <PlusCircle size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}
