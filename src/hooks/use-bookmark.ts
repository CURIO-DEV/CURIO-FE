import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  BOOKMARK_KEY,
  BOOKMARK_OPTION,
} from "@/apis/bookmark/bookmark-queries";
import {
  CreateBookmarkBody,
  CreateBookmarkFolder,
  UpdateBookmarkFolder,
} from "@/apis/bookmark/bookmark";

export const useGetBookmarkFolders = () => {
  return useQuery(BOOKMARK_OPTION.FOLDER_LIST());
};

export const useGetBookmarkArticles = (folderId: number | null) => {
  return useQuery(
    BOOKMARK_OPTION.ARTICLES_IN_FOLDER(folderId ?? -1, folderId !== null),
  );
};

export const usePostBookmarkFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: CreateBookmarkBody) => CreateBookmarkFolder(body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: BOOKMARK_KEY.FOLDER_LIST(),
      });
    },
  });
};

export const usePatchBookmarkFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      bookmarkId,
      body,
    }: {
      bookmarkId: number;
      body: CreateBookmarkBody;
    }) => UpdateBookmarkFolder(bookmarkId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: BOOKMARK_KEY.FOLDER_LIST(),
      });
    },
  });
};
