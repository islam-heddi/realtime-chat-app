import type { StateCreator } from "zustand";
export interface User {
  _id: string;
  email: string;
  name: string;
  image?: string;
  color?: number;
  profileSetup?: boolean;
}

export interface AuthSlice {
  userInfo: User | undefined;
  socketId: String | undefined;
  setUserInfo: (userInfo: User | undefined) => void;
  setSocketId: (socketId: String | undefined) => void;
}

export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  userInfo: undefined,
  socketId: undefined,
  setUserInfo: (userInfo: User | undefined) => set({ userInfo }),
  setSocketId: (socketId: String | undefined) => set({ socketId })
});
