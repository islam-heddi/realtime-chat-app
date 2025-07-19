import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useAppStore } from "@/store";
import { useNavigate, useParams } from "react-router-dom";
import { apiClient } from "@/lib/api-client";
import type { messageType } from "@/Schema/message.type";
import type { UserSchema } from "@/Schema/user.type";

type dataType = {
  messages: messageType[];
  receiver: UserSchema;
};

export default function ChatPage() {
  const friendId = useParams().friendId;
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const { userInfo } = useAppStore();
  const [data, setData] = useState<dataType>();

  useEffect(() => {
    if (userInfo == null) {
      navigate("/");
    }
    apiClient
      .get(`/chat/messages/${friendId}`, { withCredentials: true })
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      });
  }, [userInfo, navigate, friendId]);
  return (
    <div className="h-[100vh] w-[100vw] max-[833px]:w-full max-[833px]:h-full inline-flex items-center justify-center bg-[#deffff] p-6 rounded-2xl ">
      <div className="bg-white p-6 rounded-2xl shadow-black w-1/2 shadow-xl/30 max-[833px]:w-full">
        <h1 className="text-2xl font-bold mb-4">
          Chat with {data?.receiver.name || "Friend"}
        </h1>
        <Input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter a message"
        />
      </div>
    </div>
  );
}
