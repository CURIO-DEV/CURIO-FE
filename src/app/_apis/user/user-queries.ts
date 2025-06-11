import { queryOptions } from "@tanstack/react-query";
import { GetUserInterests, GetUserMe, GetUserProfile } from "./user";

export const USER_KEY = {
  USER_PROFILE: () => ["profile"],
  USER_ME: () => ["user-me"],
  USER_INTERESTS: () => ["user-interests"],
} as const;

export const USER_OPTION = {
  USER_PROFILE: (enabled: boolean) =>
    queryOptions({
      queryKey: USER_KEY.USER_PROFILE(),
      queryFn: () => GetUserProfile(),
      enabled,
    }),
  USER_ME: () => {
    return queryOptions({
      queryKey: USER_KEY.USER_ME(),
      queryFn: () => GetUserMe(),
    });
  },
  USER_INTERESTS: () => {
    return queryOptions({
      queryKey: USER_KEY.USER_INTERESTS(),
      queryFn: () => GetUserInterests(),
    });
  },
};
