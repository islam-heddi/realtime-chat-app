import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useAppStore } from "@/store";
import { useNavigate } from "react-router-dom";

import { useAppChatStore } from "@/store/index";
import { useSocket } from "@/context/SocketContext";
import { apiClient } from "@/lib/api-client";

export default function ChatPageFr() {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const { userInfo } = useAppStore();
  const { selectedChatData, selectedChatMessage, setSelectedChatMessage } =
    useAppChatStore();
  const socket = useSocket();
  //console.log("Socket in ChatPageFr:", socket);
  console.log(selectedChatMessage);
  useEffect(() => {
    if (userInfo == null) {
      navigate("/");
    }
    apiClient
      .get(`/chat/messages/${selectedChatData?.receiverId}`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data.messages);
        setSelectedChatMessage(response.data.messages);
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
      });
  }, [userInfo, navigate, selectedChatData, apiClient, setSelectedChatMessage]);

  const handleSendMessage = () => {
    const msgContent = content;
    console.log("Sending message:", msgContent);
    setContent("");
    socket.emit("sendMessage", {
      senderId: userInfo?._id,
      receiverId: selectedChatData?.receiverId,
      content: msgContent,
      createdAt: new Date().toISOString(),
    });
  };

  return (
    <div className="h-[100vh] w-[100vw] max-[833px]:w-full max-[833px]:h-full inline-flex items-center justify-center bg-[#deffff] p-6 rounded-2xl ">
      <div className="bg-white p-6 rounded-2xl shadow-black w-1/2 shadow-xl/30 max-[833px]:w-full">
        <h1 className="text-2xl font-bold mb-4">
          Chat with {selectedChatData?.name}
        </h1>
        <div>
          {selectedChatMessage.map((value, index) => (
            <div
              key={index}
              className={`mb-2 p-2 rounded-lg ${
                value.emiterId == userInfo?._id
                  ? "bg-blue-100 text-right"
                  : "bg-gray-100 text-left"
              }`}
            >
              <p>{value.content}</p>
              <span className="text-xs text-gray-500">
                {value.createdAt as string}
              </span>
            </div>
          ))}
        </div>
        <Input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && content.trim() !== "") {
              handleSendMessage();
            }
          }}
          placeholder="Enter a message"
        />
      </div>
    </div>
  );
}
