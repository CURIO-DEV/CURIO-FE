import { queryOptions } from "@tanstack/react-query";
import { GetBookmarkArticles, GetBookmarkFolderList } from "./bookmark";

export const BOOKMARK_KEY = {
  FOLDER_LIST: () => ["bookmark-folder-list"],
} as const;

export const BOOKMARK_OPTION = {
  FOLDER_LIST: () =>
    queryOptions({
      queryKey: BOOKMARK_KEY.FOLDER_LIST(),
      queryFn: GetBookmarkFolderList,
    }),
  ARTICLES_IN_FOLDER: (folderId: number, enabled: boolean) =>
    queryOptions({
      queryKey: ["bookmark-articles", folderId],
      queryFn: () => GetBookmarkArticles(folderId),
      enabled,
    }),
};
