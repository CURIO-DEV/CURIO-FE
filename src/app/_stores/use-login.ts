import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LoginStore {
  isLogin: boolean;
  setIsLogin: (value: boolean) => void;
}

export const useLoginStore = create<LoginStore>()(
  persist(
    (set) => ({
      isLogin: false,
      setIsLogin: (value) => set({ isLogin: value }),
    }),
    {
      name: "user-login-storage",
    },
  ),
);
