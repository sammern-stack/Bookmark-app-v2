import { create } from "zustand";
import { getBookmarksRequest, createBookmarkRequest } from "../api/bookmarkApi";
import type { BookmarkModel, IBookmark } from "../types";

interface BookmarksStore {
  bookmarks: BookmarkModel[];
  tags: Map<string, number>;

  fetchBookmarks: (query?: Record<string, unknown>) => Promise<BookmarkModel[]>;
  setBookmarks: (query?: Record<string, unknown>) => Promise<void>;
  createBookmark: (bookmark: IBookmark) => Promise<void>;
  fetchTags: () => void;

  // Helper
  syncBookmarks: () => Promise<void>;
}

export const useBookmarksStore = create<BookmarksStore>((set, get) => ({
  bookmarks: [],
  tags: new Map(),

  fetchBookmarks: async (query) => {
    const res = await getBookmarksRequest(query ?? {});
    if (!res.ok) throw new Error(res.message);
    return res.data;
  },

  setBookmarks: async (query) => {
    const bookmarks = await get().fetchBookmarks(query);
    get().fetchTags();

    set({ bookmarks });
  },

  createBookmark: async (bookmark) => {
    const res = await createBookmarkRequest(bookmark);
    if (!res.ok) throw new Error(res.message);
    get().syncBookmarks();
  },

  fetchTags: async () => {
    const bookmarks = await get().fetchBookmarks();
    if (!bookmarks || bookmarks.length === 0) return;

    const tags = bookmarks
      .flatMap((b) => b.tags)
      .reduce((list, tag) => {
        list.set(tag, (list.get(tag) ?? 0) + 1);
        return list;
      }, new Map<string, number>());

    set({ tags });
  },

  syncBookmarks: async () => {
    await get().setBookmarks();
    get().fetchTags();
  },
}));
