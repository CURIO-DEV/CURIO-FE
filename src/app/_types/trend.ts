export interface GetTrendKeywordResponse {
  keyword: string[];
}

export interface GetPopularArticlesResponse {
  articleId: number;
  title: string;
  imageUrl: string;
  likeCount: number;
  saveCount: number;
}

export interface GetInterestKeywordResponse {
  keyword: string;
  weight: number;
}
