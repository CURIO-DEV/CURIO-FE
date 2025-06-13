import { apiDelete, apiGet, apiPatch, apiPost } from "../api";
import { END_POINTS } from "@/constants/api";

export interface BookmarkFolderResponse {
  bookmarkId: number;
  name: string;
  color: string;
  members: string[];
}

export interface BookmarkArticle {
  articleId: number;
  title: string;
  content: string;
  imageUrl: string;
}

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

export const GetBookmarkFolderList = () => {
  return apiGet<BookmarkFolderResponse[]>(END_POINTS.GET_BOOKMARK_FOLDER_LIST);
};

export const CreateBookmarkFolder = (body: CreateBookmarkBody) => {
  return apiPost<BookmarkFolderResponse, CreateBookmarkBody>(
    END_POINTS.CREATE_BOOKMARK_FOLDER,
    body,
  );
};

export const UpdateBookmarkFolder = (
  bookmarkId: number,
  body: {
    name: string;
    color: string;
    members: string[];
  },
) => {
  return apiPatch(`/bookmarks/${bookmarkId}/update`, body);
};

export const AddBookmarkArticle = (
  folderId: number,
  newsId: number,
): Promise<{ message: string }> => {
  return apiPost<{ message: string }>(`/bookmarks/${folderId}/news/${newsId}`);
};

export const GetBookmarkArticles = (folderId: number) => {
  return apiGet<BookmarkArticle[]>(END_POINTS.GET_BOOKMARK_ARTICLES(folderId));
};

export const DeleteBookmarkFolder = async (id: number): Promise<string> => {
  const res = await apiDelete<{ message: string }>(`/bookmarks/${id}/delete`);
  return res.message;
};

export const GetBookmarkSummary = async (
  bookmarkId: number,
): Promise<{ summary: string }> => {
  return await apiGet(`/bookmarks/${bookmarkId}/summary`);
};

export const RemoveBookmarkArticle = (
  folderId: number,
  newsId: number,
): Promise<{ message: string }> => {
  return apiDelete(`/bookmarks/${folderId}/news/${newsId}`);
};
