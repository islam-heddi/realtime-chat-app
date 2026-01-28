import { apiClient } from "@/lib/api-client";
import type { ChannelSchema } from "@/Schema/channel.type";
import { JOINED_CHANNELS } from "@/utils/constants";
import { useEffect, useState } from "react";
import { useAppChannelStore } from "@/store";
import { useNavigate } from "react-router-dom";
import { getMessagesChannels } from "@/utils/functions";
import { useAppStore } from "@/store";
import type { User } from "@/store/slice/auth-slice";
import { Hash, ChevronRight } from "lucide-react";

export default function OtherChannels() {
  const navigate = useNavigate();
  const [myChannels, setMyChannels] = useState<ChannelSchema[]>([]);
  const {
    setSelectedChannelId,
    setSelectedChannelName,
    setSelectedChannelMessages,
  } = useAppChannelStore();

  const { userInfo } = useAppStore();
  useEffect(() => {
    apiClient
      .get(JOINED_CHANNELS + (userInfo as User)._id, { withCredentials: true })
      .then((res) => setMyChannels(res.data))
      .catch((err) => {
        console.log(err);
      });
  }, [userInfo]);

  const handleChannel = async (value: ChannelSchema) => {
    setSelectedChannelId(value._id);
    setSelectedChannelName(value.name);
    const PrevMsg = await getMessagesChannels(value._id);
    setSelectedChannelMessages(PrevMsg);
    navigate("/channel/chat");
  };

  return (
    <div className="space-y-4 mt-8">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-tight flex items-center gap-2">
          <div className="w-1.5 h-4 bg-blue-500 rounded-full" />
          Joined Channels
        </h2>
        <span className="text-xs font-medium text-gray-400">
          {myChannels.filter((a) => a.creatorId !== userInfo?._id).length} total
        </span>
      </div>

      {myChannels.length > 0 ? (
        <div className="grid grid-cols-1 gap-3">
          {myChannels
            .filter((a) => a.creatorId !== userInfo?._id)
            .map((value, index) => (
              <div
                key={index}
                onClick={() => handleChannel(value)}
                className="group flex items-center justify-between p-4 bg-white/40 hover:bg-white/60 border border-white/40 rounded-2xl transition-all shadow-sm hover:shadow-md backdrop-blur-sm cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-100 to-indigo-100 flex items-center justify-center text-blue-600 font-bold border border-white shadow-inner">
                    <Hash size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                      {value.name}
                    </h4>
                    <p className="text-xs text-gray-500 line-clamp-1">{value.description}</p>
                  </div>
                </div>
                <ChevronRight size={18} className="text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
              </div>
            ))}
        </div>
      ) : (
        <div className="p-8 text-center bg-gray-50/50 rounded-2xl border border-dashed border-gray-200 text-gray-400 text-sm">
          No other channels joined
        </div>
      )}
    </div>
  );
}
