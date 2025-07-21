/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useEffect, useRef } from "react";
import { useAppChatStore, useAppStore } from "@/store";
import { HOST } from "@/utils/constants";
import { io } from "socket.io-client";
import { Socket } from "socket.io-client";
import type { DefaultEventsMap } from "@socket.io/component-emitter";
import type { User } from "@/store/slice/auth-slice";

const SocketContext = createContext<Socket<
  DefaultEventsMap,
  DefaultEventsMap
> | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useSocket = () => {
  //useContext(SocketContext);
  const { userInfo } = useAppStore();
  return io(HOST, {
    withCredentials: true,
    query: {
      userId: (userInfo as User)._id as string | "",
    },
  }) as Socket<DefaultEventsMap, DefaultEventsMap>;
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { userInfo } = useAppStore();
  const socket = useRef<Socket<DefaultEventsMap, DefaultEventsMap>>(null);

  useEffect(() => {
    if (userInfo) {
      socket.current = io(HOST, {
        withCredentials: true,
        query: {
          userId: userInfo._id,
        },
      }) as Socket<DefaultEventsMap, DefaultEventsMap>;
      socket.current.on("connect", () => {
        console.log("Socket connected:", socket.current?.id);
      });
    }

    const handleReceiveMessage = (message: {
      senderId: any;
      recieverId: any;
      content: string;
      createdAt: string;
    }) => {
      console.log("Received message:", message);
      const { addMessage } = useAppChatStore();

      addMessage({
        emiterId: message.senderId,
        receiverId: message.recieverId,
        content: message.content,
        createdAt: message.createdAt,
        isSeened: false,
      });
    };

    socket.current?.on("recieveMessage", (message) =>
      handleReceiveMessage(message)
    );

    return () => {
      socket.current?.disconnect();
      console.log("Socket disconnected");
    };
  }, [userInfo]);

  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
