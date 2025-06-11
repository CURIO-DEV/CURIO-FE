import { queryOptions } from "@tanstack/react-query";
import { GetUserProfile } from "./user";
import Cookies from "js-cookie";

export const USER_KEY = {
  USER_PROFILE: () => ["profile"],
} as const;

export const USER_OPTION = {
  USER_PROFILE: () => {
    const token = Cookies.get("accessToken");

    return queryOptions({
      queryKey: USER_KEY.USER_PROFILE(),
      queryFn: () => GetUserProfile(),
      enabled: !!token,
    });
  },
};
