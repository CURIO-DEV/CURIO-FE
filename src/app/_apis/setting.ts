import { apiGet, apiPatch } from "@/apis/api";

export interface UserCustomSettings {
  summaryType: "short" | "medium" | "long";
  receiveNewsletter: boolean;
  newsletterEmail: string | null;
  categories: string[];
  fontSize: "small" | "medium" | "large";
}

export const getUserSettings = () =>
  apiGet<UserCustomSettings>("/users/custom");

export const patchUserSettings = (payload: Partial<UserCustomSettings>) =>
  apiPatch<void, Partial<UserCustomSettings>>("/users/settings", payload);
