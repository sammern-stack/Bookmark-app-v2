import { create } from "zustand";
import { getBookmarksRequest, createBookmarkRequest } from "../api/bookmarkApi";
import type { BookmarkModel, IBookmark } from "../types";

interface BookmarksStore {
  bookmarks: BookmarkModel[];
  tags: Map<string, number>;

  setBookmarks: () => Promise<void>;
  createBookmark: (bookmark: IBookmark) => Promise<void>;
  fetchTags: () => void;

  // Helper
  syncBookmarks: () => Promise<void>;
}

export const useBookmarksStore = create<BookmarksStore>((set, get) => ({
  bookmarks: [],
  tags: new Map(),

  setBookmarks: async () => {
    const res = await getBookmarksRequest({});
    if (!res.ok) throw new Error(res.message);

    const bookmarks = res.data;
    get().fetchTags();

    set({ bookmarks });
  },

  createBookmark: async (bookmark) => {
    const res = await createBookmarkRequest(bookmark);
    if (!res.ok) throw new Error(res.message);
    get().syncBookmarks();
  },

  fetchTags: async () => {
    if (!get().bookmarks || get().bookmarks.length === 0) return;

    const tags = get()
      .bookmarks.flatMap((b) => b.tags)
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
