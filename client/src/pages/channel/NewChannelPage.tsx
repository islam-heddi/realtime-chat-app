import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppStore } from "@/store";
export default function NewChannelPage() {
  const { userInfo } = useAppStore();
  const navigate = useNavigate();
  const [channelName, setChannelName] = useState<string>("");
  if (!userInfo) return <div>please log in to create a channel</div>;
  const handleSubmit = () => {};
  return (
    <div className="h-[100vh] w-[100vw] max-[833px]:w-full max-[833px]:h-full inline-flex items-center justify-center bg-[#deffff] p-6 rounded-2xl ">
      <div className="bg-white p-6 rounded-2xl shadow-black w-1/2 shadow-xl/30 max-[833px]:w-full">
        <div className="flex flex-wrap flex-row items-center justify-between mb-4">
          <h1 className="text-2xl font-bold mb-4">New Channel</h1>
          <p>{userInfo.name}</p>
          <Button onClick={() => navigate("/dashboard")}>Dashboard</Button>
        </div>
        <div className="flex flex-row gap-3 items-center">
          <Input
            type="text"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            placeholder="enter the name of your channel"
          />
          <Button onClick={() => handleSubmit()}>Submit</Button>
        </div>
      </div>
    </div>
  );
}
