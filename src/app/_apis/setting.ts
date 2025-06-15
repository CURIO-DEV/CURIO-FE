import { apiGet, apiPatch } from "@/apis/api";

export interface UserCustomSettings {
  socialType: number;
  summaryType: "short" | "medium" | "long";
  receiveNewsletter: boolean;
  newsletterEmail: string | null;
  categories: string[];
  fontSize: "small" | "medium" | "large";
}

export const getUserSettings = () =>
  apiGet<UserCustomSettings>("/users/settings");

export type UserCustomSettingsPatch = Omit<
  Partial<UserCustomSettings>,
  "socialType"
>;

export const patchUserSettings = (payload: UserCustomSettingsPatch) =>
  apiPatch<void, UserCustomSettingsPatch>("/users/settings", payload);
