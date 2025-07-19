/* eslint-disable @typescript-eslint/no-explicit-any */
import type { StateCreator } from "zustand";

export interface ChatSlice {
  selectedChatData:
    | {
        _id?: string;
        senderId?: string;
        receiverId?: string;
        name?: string | null;
        email?: string | null;
      }
    | undefined;
  selectedChatType: "friend" | "channel" | null | undefined;
  selectedChatMessage: any[];
  addMessage: (message: any) => void;
  setSelectedChatData: (selectedChatData: any) => void;
  setSelectedChatType: (
    selectedChatType: "friend" | "channel" | null | undefined
  ) => void;
  setSelectedChatMessage: any;
}

export const createChatSlice: StateCreator<ChatSlice> = (set, get) => ({
  selectedChatData: undefined,
  selectedChatType: undefined,
  selectedChatMessage: [],
  setSelectedChatData: (selectedChatData: any) => {
    set({ selectedChatData });
  },
  setSelectedChatType: (selectedChatType: any) => {
    set({ selectedChatType });
  },
  setSelectedChatMessage: (
    selectedChatMessage:
      | ChatSlice
      | Partial<ChatSlice>
      | ((state: ChatSlice) => ChatSlice | Partial<ChatSlice>)
  ) => {
    return set(selectedChatMessage);
  },
  closeChat: () => {
    set({
      selectedChatData: undefined,
      selectedChatType: undefined,
      selectedChatMessage: [],
    });
  },
  addMessage: (message: any) => {
    const selectedChatMessage = get().selectedChatMessage;
    set({
      selectedChatMessage: [
        ...selectedChatMessage,
        {
          senderId: message.senderId,
          receiverId: message.receiverId,
          content: message.content,
          createdAt: message.createdAt,
        },
      ],
    });
  },
});
