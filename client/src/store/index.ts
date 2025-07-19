import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createAuthSlice } from "./slice/auth-slice";
import { createChatSlice } from "./slice/chat-slice";
import type { AuthSlice } from "./slice/auth-slice";
import type { ChatSlice } from "./slice/chat-slice";

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
