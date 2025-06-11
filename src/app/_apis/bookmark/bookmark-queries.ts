import { queryOptions } from "@tanstack/react-query";
import { GetBookmarkFolderList } from "./bookmark";

export const BOOKMARK_KEY = {
  FOLDER_LIST: () => ["bookmark-folder-list"],
} as const;

export const BOOKMARK_OPTION = {
  FOLDER_LIST: () =>
    queryOptions({
      queryKey: BOOKMARK_KEY.FOLDER_LIST(),
      queryFn: GetBookmarkFolderList,
    }),
};
