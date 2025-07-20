/* eslint-disable @typescript-eslint/no-explicit-any */
import type { chatSchema, messageType } from "@/Schema/message.type";
import type { StateCreator } from "zustand";

export interface ChatSlice {
  selectedChatData: chatSchema | undefined;
  selectedChatType: "friend" | "channel" | null | undefined;
  selectedChatMessage: messageType[];
  addMessage: (message: messageType) => void;
  setSelectedChatData: (selectedChatData: chatSchema | undefined) => void;
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
  addMessage: (message: messageType) => {
    const selectedChatMessage = get().selectedChatMessage;
    set({
      selectedChatMessage: [
        ...selectedChatMessage,
        {
          _id: message._id,
          emiterId: message.emiterId,
          receiverId: message.receiverId,
          content: message.content,
          createdAt: message.createdAt,
          isSeened: message.isSeened,
        },
      ],
    });
  },
});
