import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { BookmarkSchema } from "../types";

interface BookmarkStore {
  selectedBookmark: BookmarkSchema | null;
  setSelectedBookmark: (bookmark: BookmarkSchema | null) => void;

  activeTitle: string;
  setActiveTitle: (text: string) => void;
}

export const useBookmarksStore = create<BookmarkStore>()(
  persist(
    (set) => ({
      selectedBookmark: null,
      setSelectedBookmark: (bookmark) => set({ selectedBookmark: bookmark }),

      activeTitle: "All bookmarks",
      setActiveTitle: (text) => set({ activeTitle: text }),
    }),
    {
      name: "bookmarks",
      partialize: (state) => ({
        selectedBookmark: state.selectedBookmark,
        activeTitle: state.activeTitle,
      }),
    },
  ),
);
