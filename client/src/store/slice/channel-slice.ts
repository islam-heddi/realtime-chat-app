import type { messageType } from "@/Schema/message.type";
import type { StateCreator } from "zustand";

export interface ChannelSlice {
  selectedChannelId: string;
  selectedChannelName: string;
  selectedChannelMessages: messageType[];
  setSelectedChannelId: (selectedChannelId: string) => void;
  setSelectedChannelMessages: (selectedChannelMessage: messageType[]) => void;
}

export const createChannelSlice: StateCreator<ChannelSlice> = (set, get) => ({
  selectedChannelId: "",
  selectedChannelMessages: [],
  selectedChannelName: "",
  setSelectedChannelId: (selectedChannelId: string) =>
    set({ selectedChannelId }),
  setSelectedChannelMessages: (selectedChannelMessages: messageType[]) =>
    set({ selectedChannelMessages }),
  addMessage: (message: messageType) => {
    const selectedChannelMessages = get().selectedChannelMessages;
    set({ selectedChannelMessages: [...selectedChannelMessages, message] });
  },
});
