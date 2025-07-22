import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createAuthSlice } from "./slice/auth-slice";
import { createChatSlice } from "./slice/chat-slice";
import { createChannelSlice } from "./slice/channel-slice";
import type { AuthSlice } from "./slice/auth-slice";
import type { ChatSlice } from "./slice/chat-slice";
import type { ChannelSlice } from "./slice/channel-slice";

export const useAppStore = create<AuthSlice>()(
  persist(
    (...a) => ({
      ...createAuthSlice(...a),
    }),
    {
      name: "app-store",
    }
  )
);

export const useAppChatStore = create<ChatSlice>()(
  persist(
    (...a) => ({
      ...createChatSlice(...a),
    }),
    {
      name: "app-chat-store",
    }
  )
);

export const useAppChannelStore = create<ChannelSlice>()(
  persist(
    (...a) => ({
      ...createChannelSlice(...a),
    }),
    {
      name: "app-channel-store",
    }
  )
);
