import { create } from "zustand";
import { getBookmarksRequest, createBookmarkRequest } from "../api/bookmarkApi";
import type { BookmarkModel, IBookmark } from "../types";

// Helper
const countOccurrences = (arr: string[]) =>
  arr.reduce((list, tag) => {
    list.set(tag, (list.get(tag) ?? 0) + 1);
    return list;
  }, new Map<string, number>());

interface BookmarksStore {
  // States
  bookmarks: BookmarkModel[];
  setBookmarks: (query?: Record<string, unknown>) => Promise<void>;

  tags: Map<string, number>;
  setTags: () => void;

  formState: "open" | "close";
  openForm: () => void;
  closeForm: () => void;

  // Api Actions
  createBookmark: (bookmark: IBookmark) => Promise<void>;

  // Helper
  fetchBookmarks: (query?: Record<string, unknown>) => Promise<BookmarkModel[]>;
  syncBookmarks: () => Promise<void>;
}

export const useBookmarksStore = create<BookmarksStore>((set, get) => ({
  // States
  bookmarks: [],
  setBookmarks: async (query) =>
    set({ bookmarks: await get().fetchBookmarks(query) }),

  tags: new Map(),
  setTags: async () => {
    const bookmarks = await get().fetchBookmarks();
    if (!bookmarks || bookmarks.length === 0) return;
    const tags = bookmarks.flatMap((b) => b.tags);
    set({ tags: countOccurrences(tags) });
  },

  formState: "close",
  openForm: () => set({ formState: "open" }),
  closeForm: () => set({ formState: "close" }),

  // Api Actions
  createBookmark: async (bookmark) => {
    const res = await createBookmarkRequest(bookmark);
    if (!res.ok) throw new Error(res.message);
    get().syncBookmarks();
  },

  // Helpers
  fetchBookmarks: async (query) => {
    const res = await getBookmarksRequest(query ?? {});
    if (!res.ok) throw new Error(res.message);
    return res.data;
  },

  syncBookmarks: async () => {
    await get().setBookmarks();
    get().setTags();
  },
}));
