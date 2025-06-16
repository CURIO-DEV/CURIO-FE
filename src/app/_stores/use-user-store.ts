import { GetUserProfileResponse } from "app/_types/user";
import { create } from "zustand";

interface UserStore {
  profile: GetUserProfileResponse | null;
  isLogin: boolean;
  setProfile: (profile: GetUserProfileResponse) => void;
  clearProfile: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  profile: null,
  isLogin: false,
  setProfile: (profile) => set({ profile, isLogin: true }),
  clearProfile: () => set({ profile: null, isLogin: false }),
}));
