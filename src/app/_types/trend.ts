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
