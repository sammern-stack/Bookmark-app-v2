import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { BookmarkModel } from "../types";

interface BookmarksStore {
  selectedBookmark: BookmarkModel | null;
  setSelectedBookmark: (b: BookmarkModel | null) => void;

  activeTitle: string;
  setActiveTitle: (text: string) => void;
}

export const useBookmarksStore = create<BookmarksStore>()(
  persist(
    (set) => ({
      selectedBookmark: null,
      setSelectedBookmark: (b) => set({ selectedBookmark: b }),

      activeTitle: "All bookmarks",
      setActiveTitle: (text) => set({ activeTitle: text }),
    }),
    {
      name: "bookmarks",
      partialize: (s) => ({
        selectedBookmark: s.selectedBookmark,
        activeTitle: s.activeTitle,
      }),
    },
  ),
);
