import { END_POINTS } from "@/constants/api";
import { apiPatch } from "../api";

export const PatchNewsletterSubscribe = (body: NewsletterSubscribeData) => {
  return apiPatch(END_POINTS.PATCH_NEWSLETTER_SUBSCRIBE, body);
};
