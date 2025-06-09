import { PatchNewsletterSubscribe } from "@/apis/user/user";
import { useMutation } from "@tanstack/react-query";

export const usePatchSubscribe = () => {
  return useMutation({
    mutationFn: (body: NewsletterSubscribeData) =>
      PatchNewsletterSubscribe(body),
  });
};
