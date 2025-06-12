import { END_POINTS } from "@/constants/api";
import { apiGet, apiPatch } from "../api";
import {
  GetUserInterestsNewsResponse,
  GetUserInterestsResponse,
  GetUserMeResponse,
  GetUserProfileResponse,
  NewsletterSubscribeData,
  UserInterestsData,
} from "app/_types/user";

export const PatchNewsletterSubscribe = (body: NewsletterSubscribeData) => {
  return apiPatch(END_POINTS.PATCH_NEWSLETTER_SUBSCRIBE, body);
};

export const GetUserProfile = () => {
  return apiGet<GetUserProfileResponse>(END_POINTS.GET_USER_PROFILE);
};

export const GetUserMe = () => {
  return apiGet<GetUserMeResponse>(END_POINTS.GET_USER_ME);
};

export const GetUserInterests = () => {
  return apiGet<GetUserInterestsResponse>(END_POINTS.USER_INTEREST);
};

export const PatchUserInterests = (body: UserInterestsData) => {
  return apiPatch(END_POINTS.USER_INTEREST, body);
};

export const GetUserInterestsNews = (interestNews: string) => {
  return apiGet<GetUserInterestsNewsResponse[]>(
    END_POINTS.GET_USER_INTEREST_NEWS(interestNews),
  );
};
