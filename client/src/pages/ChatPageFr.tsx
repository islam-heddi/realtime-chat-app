import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { useAppStore } from "@/store";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send, User, MoreVertical, Paperclip, Smile } from "lucide-react";

import { useAppChatStore } from "@/store/index";
import { useSocket } from "@/context/SocketContext";
import { Button } from "@/components/ui/button";
import type { messageType } from "@/Schema/message.type";

export default function ChatPageFr() {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const { userInfo } = useAppStore();
  const { selectedChatData, selectedChatMessage, addMessage } =
    useAppChatStore();
  const socket = useSocket();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (userInfo == null) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedChatMessage]);

  useEffect(() => {
    if (socket) {
      socket.on("recieveMessage", (message: messageType) => {
        addMessage({
          emiterId: message.senderId,
          receiverId: message.receiverId,
          content: message.content,
          createdAt: message.createdAt,
          isSeened: false,
        });
      });
    }
    return () => {
      if (socket) {
        socket.off("recieveMessage");
      }
    };
  }, [socket, addMessage]);

  const handleSendMessage = () => {
    if (content.trim() === "") return;
    const msgContent = content;
    setContent("");
    socket.emit("sendMessage", {
      senderId: userInfo?._id,
      receiverId: selectedChatData?.receiverId,
      content: msgContent,
      createdAt: new Date().toISOString(),
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
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold overflow-hidden">
              {selectedChatData?.name ? (
                selectedChatData.name.charAt(0).toUpperCase()
              ) : (
                <User className="w-6 h-6" />
              )}
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
          </div>

          <div>
            <h1 className="text-base font-semibold text-slate-900 leading-tight">
              {selectedChatData?.name || "Chat"}
            </h1>
            <p className="text-xs text-slate-500 font-medium">Online</p>
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
          {selectedChatMessage.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-12 text-slate-400">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <User className="w-8 h-8" />
              </div>
              <p className="text-sm">Start a conversation with {selectedChatData?.name}</p>
            </div>
          ) : (
            selectedChatMessage.map((value, index) => {
              const isMe = value.emiterId === userInfo?._id;
              return (
                <div
                  key={index}
                  className={`flex ${isMe ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}
                >
                  <div
                    className={`max-w-[80%] md:max-w-[70%] lg:max-w-[60%] p-3.5 rounded-2xl shadow-sm ${isMe
                      ? "bg-blue-600 text-white rounded-tr-none"
                      : "bg-white text-slate-800 border border-slate-100 rounded-tl-none"
                      }`}
                  >
                    <p className="text-[15px] leading-relaxed break-words">{value.content}</p>
                    <div className={`mt-1.5 flex items-center gap-1.5 ${isMe ? "justify-end" : "justify-start"}`}>
                      <span className={`text-[10px] font-medium opacity-70 ${isMe ? "text-blue-100" : "text-slate-400"}`}>
                        {new Date(value.createdAt as string).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      {isMe && (
                        <div className="flex">
                          <div className="w-2.5 h-2.5 text-blue-200">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
          <div ref={bottomRef} className="h-2" />
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto flex items-end gap-2">
          <div className="flex gap-1 mb-1">
            <Button variant="ghost" size="icon" className="hidden sm:flex rounded-full text-slate-500 hover:text-blue-600 hover:bg-blue-50">
              <Paperclip className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden sm:flex rounded-full text-slate-500 hover:text-blue-600 hover:bg-blue-50">
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
              placeholder="Type your message..."
              className="w-full bg-slate-50 border-slate-200 focus:bg-white transition-colors py-6 pl-4 pr-12 rounded-2xl ring-offset-0 focus-visible:ring-1 focus-visible:ring-blue-400"
            />
            <div className="absolute right-2 bottom-1.5">
              <Button
                onClick={handleSendMessage}
                disabled={!content.trim()}
                size="icon"
                className={`rounded-xl h-9 w-9 transition-all duration-200 ${content.trim() ? "bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-200 scale-100" : "bg-slate-200 text-slate-400 scale-95"
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

