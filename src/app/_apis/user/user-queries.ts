import { queryOptions } from "@tanstack/react-query";
import { GetUserProfile } from "./user";

export const USER_KEY = {
  USER_PROFILE: () => ["profile"],
} as const;

export const USER_OPTION = {
  USER_PROFILE: () =>
    queryOptions({
      queryKey: USER_KEY.USER_PROFILE(),
      queryFn: () => GetUserProfile(),
    }),
};
