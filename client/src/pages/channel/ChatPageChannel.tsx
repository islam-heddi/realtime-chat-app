import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { useAppStore } from "@/store";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send, Users, MoreVertical, Paperclip, Smile } from "lucide-react";

import { useAppChannelStore } from "@/store/index";
import { useSocket } from "@/context/SocketContext";
import { Button } from "@/components/ui/button";

export default function ChatPageChannel() {
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
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (userInfo == null) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedChannelMessages]);

  useEffect(() => {
    if (socket) {
      const handleReceiveMessage = (message: any) => {
        if (message.channelId === selectedChannelId) {
          console.log(message);
          addMessage({
            senderId: message.emiterId,
            senderName: message.emiterName,
            receiverId: message.channelId,
            content: message.content,
            createdAt: message.createdAt,
            isSeened: false,
          });
        }
      };

      socket.on("recieve-message-channel", handleReceiveMessage);

      return () => {
        socket.off("recieve-message-channel", handleReceiveMessage);
      };
    }
  }, [socket, selectedChannelId, addMessage]);

  const handleSendMessage = () => {
    if (content.trim() === "") return;
    const msgContent = content;
    setContent("");
    addMessage({
      senderId: userInfo?._id,
      senderName: userInfo?.name,
      receiverId: selectedChannelId,
      content: msgContent,
      createdAt: new Date(),
      isSeened: false,
    });
    socket.emit("send-message-channel", {
      senderId: userInfo?._id,
      receiverId: selectedChannelId,
      content: msgContent,
    });
  };

  return (
    <div className="flex flex-col h-screen w-full bg-slate-50 overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200 shrink-0 z-10">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="rounded-full hover:bg-slate-100"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Button>

          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold overflow-hidden">
              <Users className="w-6 h-6" />
            </div>
          </div>

          <div>
            <h1 className="text-base font-semibold text-slate-900 leading-tight">
              {selectedChannelName || "Channel Chat"}
            </h1>
            <p className="text-xs text-slate-500 font-medium tracking-tight">Channel</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="rounded-full">
            <MoreVertical className="w-5 h-5 text-slate-500" />
          </Button>
        </div>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
        <div className="flex flex-col gap-3 max-w-4xl mx-auto w-full">
          {selectedChannelMessages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-12 text-slate-400">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-300">
                <Users className="w-8 h-8" />
              </div>
              <p className="text-sm">No messages yet. Start the conversation in #{selectedChannelName}!</p>
            </div>
          ) : (
            selectedChannelMessages.map((value, index) => {
              const isMe = value.senderId === userInfo?._id;
              return (
                <div
                  key={index}
                  className={`flex flex-col ${isMe ? "items-end" : "items-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}
                >
                  {!isMe && (
                    <span className="text-[11px] font-semibold text-slate-500 ml-2 mb-1">
                      {value.senderName}
                    </span>
                  )}
                  <div
                    className={`max-w-[85%] md:max-w-[70%] lg:max-w-[60%] p-3.5 rounded-2xl shadow-sm ${isMe
                      ? "bg-indigo-600 text-white rounded-tr-none"
                      : "bg-white text-slate-800 border border-slate-100 rounded-tl-none"
                      }`}
                  >
                    <p className="text-[15px] leading-relaxed break-words">{value.content}</p>
                    <div className={`mt-1.5 flex items-center gap-1.5 ${isMe ? "justify-end" : "justify-start"}`}>
                      <span className={`text-[10px] font-medium opacity-70 ${isMe ? "text-indigo-100" : "text-slate-400"}`}>
                        {value.createdAt ? new Date(value.createdAt as string).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ""}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
          <div ref={bottomRef} className="h-4" />
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto flex items-end gap-2">
          <div className="flex gap-1 mb-1">
            <Button variant="ghost" size="icon" className="hidden sm:flex rounded-full text-slate-500 hover:text-indigo-600 hover:bg-indigo-50">
              <Paperclip className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden sm:flex rounded-full text-slate-500 hover:text-indigo-600 hover:bg-indigo-50">
              <Smile className="w-5 h-5" />
            </Button>
          </div>

          <div className="flex-1 relative">
            <Input
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder={`Message #${selectedChannelName}`}
              className="w-full bg-slate-50 border-slate-200 focus:bg-white transition-colors py-6 pl-4 pr-12 rounded-2xl ring-offset-0 focus-visible:ring-1 focus-visible:ring-indigo-400"
            />
            <div className="absolute right-2 bottom-1.5">
              <Button
                onClick={handleSendMessage}
                disabled={!content.trim()}
                size="icon"
                className={`rounded-xl h-9 w-9 transition-all duration-200 ${content.trim() ? "bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-200 scale-100" : "bg-slate-200 text-slate-400 scale-95"
                  }`}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
