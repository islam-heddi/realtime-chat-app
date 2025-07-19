import { createContext, useContext, useEffect, useRef } from "react";
import { useAppStore } from "@/store";
import { HOST } from "@/utils/constants";
import { io } from "socket.io-client";
import { Socket } from "socket.io-client";
import type { DefaultEventsMap } from "@socket.io/component-emitter";

const SocketContext = createContext<Socket<
  DefaultEventsMap,
  DefaultEventsMap
> | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useSocket = () => {
  useContext(SocketContext);
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
