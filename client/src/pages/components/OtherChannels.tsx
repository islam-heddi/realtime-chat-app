import { apiClient } from "@/lib/api-client";
import type { ChannelSchema } from "@/Schema/channel.type";
import { JOINED_CHANNELS } from "@/utils/constants";
import { useEffect, useState } from "react";
import { useAppChannelStore } from "@/store";
import { useNavigate } from "react-router-dom";
import { getMessagesChannels } from "@/utils/functions";
import { useAppStore } from "@/store";
import type { User } from "@/store/slice/auth-slice";

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
    <div>
      <h1>Other Channels</h1>
      {myChannels.length > 0 ? (
        <div>
          {myChannels
            .filter((a) => a.creatorId !== userInfo?._id)
            .map((value, index) => (
              <div
                className="p-6 flex flex-row gap-4 cursor-pointer hover:bg-gray-200 rounded-2xl"
                key={index}
                onClick={() => handleChannel(value)}
              >
                <span>{value.name}</span>
                <span className="text-gray-800">{value.description}</span>
              </div>
            ))}
        </div>
      ) : (
        <div className="p-5">No available channels</div>
      )}
    </div>
  );
}
