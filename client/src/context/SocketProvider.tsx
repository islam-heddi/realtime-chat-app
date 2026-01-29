import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAppStore } from "@/store";
import { HOST } from "@/utils/constants";
import type { DefaultEventsMap } from "@socket.io/component-emitter";
import { SocketContext } from "./SocketContext";

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { userInfo } = useAppStore();
  const [socket, setSocket] =
    useState<Socket<DefaultEventsMap, DefaultEventsMap> | null>(null);

  useEffect(() => {
    if (!userInfo) return;

    const newSocket = io(HOST, {
      withCredentials: true,
      query: {
        userId: userInfo._id,
      },
    });

    newSocket.on("connect", () => {
      console.log("Socket connected:", newSocket.id);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
      console.log("Socket disconnected");
    };

  }, [userInfo]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
