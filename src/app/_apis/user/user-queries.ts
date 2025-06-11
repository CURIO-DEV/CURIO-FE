import { queryOptions } from "@tanstack/react-query";
import { GetUserMe, GetUserProfile } from "./user";
import Cookies from "js-cookie";

export const USER_KEY = {
  USER_PROFILE: () => ["profile"],
  USER_ME: () => ["user-me"],
} as const;

export const USER_OPTION = {
  USER_PROFILE: () => {
    const token = Cookies.get("accessToken");

    return queryOptions({
      queryKey: USER_KEY.USER_PROFILE(),
      queryFn: () => GetUserProfile(),
    });
  },
  USER_ME: () => {
    return queryOptions({
      queryKey: USER_KEY.USER_ME(),
      queryFn: () => GetUserMe(),
    });
  },
};
