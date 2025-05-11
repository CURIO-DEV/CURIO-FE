import { create } from "zustand";

interface Folder {
  id: number;
  name: string;
  members: string[];
  color: string;
}

interface BookmarkStore {
  bookmarkedArticles: Set<string>;
  toggleBookmark: (id: string) => void;
  setInitialBookmarks: (ids: string[]) => void;

  isFolderModalOpen: boolean;
  openFolderModal: () => void;
  closeFolderModal: () => void;

  isFolderEditModalOpen: boolean;
  openFolderEditModal: (mode: "create" | "edit") => void;
  closeFolderEditModal: () => void;

  folderEditMode: "create" | "edit";

  shouldReturnToFolderModal: boolean;
  setShouldReturnToFolderModal: (value: boolean) => void;

  folders: Folder[];
  addFolder: (folder: Folder) => void;
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

  isFolderModalOpen: false,
  openFolderModal: () => set({ isFolderModalOpen: true }),
  closeFolderModal: () => set({ isFolderModalOpen: false }),

  isFolderEditModalOpen: false,
  folderEditMode: "create",
  openFolderEditModal: (mode) =>
    set({ isFolderEditModalOpen: true, folderEditMode: mode }),
  closeFolderEditModal: () => set({ isFolderEditModalOpen: false }),

  shouldReturnToFolderModal: false,
  setShouldReturnToFolderModal: (value: boolean) =>
    set({ shouldReturnToFolderModal: value }),

  folders: [],
  addFolder: (folder) =>
    set((state) => ({
      folders: [...state.folders, folder],
    })),
}));
