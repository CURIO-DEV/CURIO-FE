import { END_POINTS } from "@/constants/api";
import { apiGet, apiPatch } from "../api";
import {
  GetUserProfileResponse,
  NewsletterSubscribeData,
} from "app/_types/user";

export const PatchNewsletterSubscribe = (body: NewsletterSubscribeData) => {
  return apiPatch(END_POINTS.PATCH_NEWSLETTER_SUBSCRIBE, body);
};

export const GetUserProfile = () => {
  return apiGet<GetUserProfileResponse>(END_POINTS.GET_USER_PROFILE);
};
