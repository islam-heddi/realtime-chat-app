import { apiClient } from "@/lib/api-client";
import type { ChannelSchema } from "@/Schema/channel.type";
import { GET_MY_CHANNELS_ROUTE } from "@/utils/constants";
import { useEffect, useState } from "react";
import { useAppChannelStore } from "@/store";
import { useNavigate } from "react-router-dom";
export default function GetChannels() {
  const navigate = useNavigate();
  const [myChannels, setMyChannels] = useState<ChannelSchema[]>([]);
  const { setSelectedChannelId, setSelectedChannelName } = useAppChannelStore();

  useEffect(() => {
    apiClient
      .get(GET_MY_CHANNELS_ROUTE, { withCredentials: true })
      .then((res) => setMyChannels(res.data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChannel = async (value: ChannelSchema) => {
    setSelectedChannelId(value._id);
    setSelectedChannelName(value.name);
    navigate("/channel/chat");
  };

  return (
    <div>
      {myChannels.length > 0 ? (
        <div>
          <p>My Channels</p>
          {myChannels.map((value, index) => (
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
        <>No available channels</>
      )}
    </div>
  );
}
