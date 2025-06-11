import { useQuery } from "@tanstack/react-query";
import { BOOKMARK_OPTION } from "@/apis/bookmark/bookmark-queries";

export const useGetBookmarkFolders = () => {
  return useQuery(BOOKMARK_OPTION.FOLDER_LIST());
};

export const useGetBookmarkArticles = (folderId: number | null) => {
  return useQuery(
    BOOKMARK_OPTION.ARTICLES_IN_FOLDER(folderId ?? -1, folderId !== null),
  );
};
