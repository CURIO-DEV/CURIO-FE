import { apiGet, apiPatch, apiPost } from "../api";
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

// export const GetBookmarkArticles = (folderId: number) => {
//   return apiGet<BookmarkArticle[]>(END_POINTS.GET_BOOKMARK_ARTICLES(folderId));
// };

export interface BookmarkFolderResponse {
  bookmarkId: number;
  name: string;
  color: string;
  members: string[];
}

export interface CreateBookmarkBody {
  name: string;
  color: string;
  members: string[];
}

export const CreateBookmarkFolder = (body: CreateBookmarkBody) => {
  return apiPost<BookmarkFolderResponse, CreateBookmarkBody>(
    END_POINTS.CREATE_BOOKMARK_FOLDER,
    body,
  );
};

export const UpdateBookmarkFolder = (
  bookmarkId: number,
  body: CreateBookmarkBody,
) => {
  return apiPatch<BookmarkFolderResponse, CreateBookmarkBody>(
    `/bookmarks/${bookmarkId}/update`,
    body,
  );
};

export const AddBookmarkArticle = async (folderId: number, newsId: number) => {
  return apiPost<string>(`/bookmarks/${folderId}/news/${newsId}`);
};
