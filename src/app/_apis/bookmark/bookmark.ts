import { apiGet } from "../api";
import { END_POINTS } from "@/constants/api";

export interface BookmarkFolderResponse {
  bookmarkId: number;
  name: string;
  color: string;
  members: string[];
}

export const GetBookmarkFolderList = () => {
  return apiGet<BookmarkFolderResponse[]>(END_POINTS.GET_BOOKMARK_FOLDER_LIST);
};

export interface BookmarkArticle {
  articleId: number;
  title: string;
  content: string;
  imageUrl: string;
}

export const GetBookmarkArticles = (folderId: number) => {
  return apiGet<BookmarkArticle[]>(END_POINTS.GET_BOOKMARK_ARTICLES(folderId));
};
