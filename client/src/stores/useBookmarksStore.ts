import { create } from "zustand";
import { getBookmarksRequest, createBookmarkRequest } from "../api/bookmarkApi";
import type { BookmarkModel, IBookmark } from "../types";

interface BookmarksStore {
  bookmarks: BookmarkModel[];
  setBookmarks: () => Promise<void>;
  createBookmark: (bookmark: IBookmark) => Promise<void>;

  // Helper
  syncBookmarks: () => Promise<void>;
}

export const useBookmarksStore = create<BookmarksStore>((set, get) => ({
  bookmarks: [],

  setBookmarks: async () => {
    const res = await getBookmarksRequest({});
    if (!res.ok) throw new Error(res.message);
    const bookmarks = res.data;
    set({ bookmarks });
  },

  createBookmark: async (bookmark) => {
    const res = await createBookmarkRequest(bookmark);
    if (!res.ok) throw new Error(res.message);
    get().syncBookmarks();
  },

  syncBookmarks: () => get().setBookmarks(),
}));
