import { create } from "zustand";

interface BookmarkStore {
  bookmarkedArticles: Set<string>;
  toggleBookmark: (id: string) => void;
  setInitialBookmarks: (ids: string[]) => void;
}

export const useBookmarkStore = create<BookmarkStore>((set) => ({
  bookmarkedArticles: new Set(),

  toggleBookmark: (id: string) =>
    set((state) => {
      const newSet = new Set(state.bookmarkedArticles);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return { bookmarkedArticles: newSet };
    }),

  setInitialBookmarks: (ids: string[]) =>
    set({ bookmarkedArticles: new Set(ids) }),
}));
