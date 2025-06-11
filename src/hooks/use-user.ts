import { PatchNewsletterSubscribe } from "@/apis/user/user";
import { USER_OPTION } from "@/apis/user/user-queries";
import { useMutation, useQuery } from "@tanstack/react-query";
import { NewsletterSubscribeData } from "app/_types/user";

export const usePatchSubscribe = () => {
  return useMutation({
    mutationFn: (body: NewsletterSubscribeData) =>
      PatchNewsletterSubscribe(body),
  });
};

export const useGetUserProfile = (p0: { enabled: boolean }) => {
  return useQuery(USER_OPTION.USER_PROFILE(p0.enabled));
};

export const useGetUserMe = () => {
  return useQuery(USER_OPTION.USER_ME());
};
