import { PatchNewsletterSubscribe, PatchUserInterests } from "@/apis/user/user";
import { USER_KEY, USER_OPTION } from "@/apis/user/user-queries";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { NewsletterSubscribeData, UserInterestsData } from "app/_types/user";

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

export const useGetUserInterests = () => {
  return useQuery(USER_OPTION.USER_INTERESTS());
};

export const usePatchUserInterests = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: UserInterestsData) => PatchUserInterests(body),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: USER_KEY.USER_INTERESTS() });
      // TODO: 토스트
    },
  });
};

export const useGetUserInterestsNews = (interestNews: string) => {
  return useQuery(USER_OPTION.USER_INTERESTS_NEWS(interestNews));
};
