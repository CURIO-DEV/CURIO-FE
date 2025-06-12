import { queryOptions } from "@tanstack/react-query";
import {
  GetUserInterests,
  GetUserInterestsNews,
  GetUserMe,
  GetUserProfile,
} from "./user";

export const USER_KEY = {
  USER_PROFILE: () => ["profile"],
  USER_ME: () => ["user-me"],
  USER_INTERESTS: () => ["user-interests"],
  USER_INTERESTS_NEWS: (interestNews: string) => [
    "user-interests-news",
    interestNews,
  ],
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
  USER_INTERESTS_NEWS: (interestNews: string) => {
    return queryOptions({
      queryKey: USER_KEY.USER_INTERESTS_NEWS(interestNews),
      queryFn: () => GetUserInterestsNews(interestNews),
    });
  },
};
