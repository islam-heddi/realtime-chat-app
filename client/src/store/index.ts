import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createAuthSlice } from "./slice/auth-slice";
import type { AuthSlice } from "./slice/auth-slice";

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
