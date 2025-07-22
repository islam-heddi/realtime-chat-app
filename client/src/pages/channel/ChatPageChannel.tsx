import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { useAppStore } from "@/store";
import { useNavigate } from "react-router-dom";

import { useAppChannelStore } from "@/store/index";
import { useSocket } from "@/context/SocketContext";
import { Button } from "@/components/ui/button";

export default function ChatPageFr() {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const { userInfo } = useAppStore();
  const {
    selectedChannelId,
    selectedChannelName,
    selectedChannelMessages,
    addMessage,
  } = useAppChannelStore();
  const socket = useSocket();
  useEffect(() => {
    if (userInfo == null) {
      navigate("/");
    }
  }, [userInfo, navigate]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedChannelMessages]);

  socket.on("recieve-message-channel", (message) => {
    addMessage({
      emiterId: message.senderId,
      emiterName: message.emiterName,
      receiverId: message.recieverId,
      content: message.content,
      createdAt: message.createdAt,
      isSeened: false,
    });
  });

  const handleSendMessage = () => {
    if (content == "") return;
    const msgContent = content;
    setContent("");
    socket.emit("send-message-channel", {
      senderId: userInfo?._id,
      receiverId: selectedChannelId,
      content: msgContent,
    });
  };

  return (
    <div className="h-[100vh] w-[100vw] max-[833px]:w-full inline-flex items-center justify-center bg-[#deffff] p-6 rounded-2xl ">
      <div className="bg-white p-6 rounded-2xl shadow-black w-1/2 h-full shadow-xl/30 max-[833px]:w-full">
        <h1 className="text-2xl font-bold mb-4">
          Chat in {selectedChannelName} Channel
        </h1>
        <div className="h-[80%] overflow-y-auto border-2 border-gray-950">
          {selectedChannelMessages.map((value, index) => (
            <div
              key={index}
              className={`m-3.5 mb-2 p-2 rounded-lg ${
                value.emiterId == userInfo?._id
                  ? "bg-blue-100 text-right"
                  : "bg-gray-100 text-left"
              }`}
            >
              <p>{value.emiterName}</p>
              <p>{value.content}</p>
              <span className="text-xs text-gray-500">
                {value.createdAt as string}
              </span>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
        <div className="flex flex-row items-center justify-between m-4 gap-4">
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
          <Button onClick={() => handleSendMessage()}>Send</Button>
        </div>
      </div>
    </div>
  );
}
