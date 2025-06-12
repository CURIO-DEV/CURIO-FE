export interface NewsletterSubscribeData {
  "newsletter-email": string;
}

export interface GetUserProfileResponse {
  email: string;
  profile_image_url: string;
  nickname: string;
}

export interface GetUserMeResponse {
  isLogin: boolean;
}

export interface GetUserInterestsResponse {
  interests: string[];
}

export type UserInterestsData = string[];

export interface GetUserInterestsNewsResponse {
  title: string;
  content: string;
  imageUrl: string;
  articleId: number;
}
