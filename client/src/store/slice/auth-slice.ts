/* eslint-disable @typescript-eslint/no-explicit-any */
export const createAuthSlice = (set: any) => ({
  userInfo: undefined,
  setUserInfo: (userInfo: any) => set({ userInfo }),
});
