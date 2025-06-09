import { PatchNewsletterSubscribe } from "@/apis/user/user";
import { USER_OPTION } from "@/apis/user/user-queries";
import { useMutation, useQuery } from "@tanstack/react-query";

export const usePatchSubscribe = () => {
  return useMutation({
    mutationFn: (body: NewsletterSubscribeData) =>
      PatchNewsletterSubscribe(body),
  });
};

export const useGetUserProfile = () => {
  return useQuery(USER_OPTION.USER_PROFILE());
};
