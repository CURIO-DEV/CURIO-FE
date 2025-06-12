export const END_POINTS = {
  GET_TREND_KEYWORD: "/trends/keywords",
  GET_POPULAR_ARTICLES: "/trends/popular-articles",
  GET_INTEREST_KEYWORDS: "/trends/interests/keywords",
  PATCH_NEWSLETTER_SUBSCRIBE: "/users/newsletter/subscribe",
  GET_USER_PROFILE: "/users/profile",
  GET_USER_ME: "/users/me",
  GET_CURIO_GO: "/curio-go",

  USER_INTEREST: "/users/interests",
  GET_USER_INTEREST_NEWS: (interestNews: string) =>
    `/users/interests/${interestNews}/news`,
  GET_BOOKMARK_FOLDER_LIST: "/bookmarks/list",
  GET_BOOKMARK_ARTICLES: (folderId: number) => `/bookmarks/${folderId}/news`,
  CREATE_BOOKMARK_FOLDER: "/bookmarks/create",
};
