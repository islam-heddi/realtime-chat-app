import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useAppStore } from "@/store";
import { toast } from "sonner";
import { CREATE_CHANNELS_ROUTE } from "@/utils/constants";
import { apiClient } from "@/lib/api-client";
export default function NewChannelPage() {
  const { userInfo } = useAppStore();
  const navigate = useNavigate();
  const [channelName, setChannelName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  if (!userInfo) return <div>please log in to create a channel</div>;
  const handleSubmit = () => {
    if (!channelName || !description)
      return toast.error("please fill all the fields");

    apiClient
      .post(
        CREATE_CHANNELS_ROUTE,
        {
          name: channelName,
          description,
        },
        { withCredentials: true }
      )
      .then(() => navigate("/dashboard"))
      .catch((err) => {
        console.error(err);
        toast.error("Failed to create channel");
      });
  };
  return (
    <div className="h-[100vh] w-[100vw] max-[833px]:w-full max-[833px]:h-full inline-flex items-center justify-center bg-[#deffff] p-6 rounded-2xl ">
      <div className="bg-white p-6 rounded-2xl shadow-black w-1/2 shadow-xl/30 max-[833px]:w-full">
        <div className="flex flex-wrap flex-row items-center justify-between mb-4">
          <h1 className="text-2xl font-bold mb-4">New Channel</h1>
          <p>{userInfo.name}</p>
          <Button onClick={() => navigate("/dashboard")}>Dashboard</Button>
        </div>
        <div className="flex flex-col gap-3 items-center">
          <div className="w-full flex flex-col gap-2 justify-start">
            <Label>Channel Name</Label>
            <Input
              type="text"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
              placeholder="enter the name of your channel"
            />
            <Label>Channel Description</Label>
            <Input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description of the channel"
            />
          </div>
          <Button onClick={() => handleSubmit()}>Submit</Button>
        </div>
      </div>
    </div>
  );
}
