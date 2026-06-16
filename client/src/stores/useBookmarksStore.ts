import { create } from "zustand";
import { persist } from "zustand/middleware";

import {
  getBookmarksRequest,
  createBookmarkRequest,
  updateIsArchivedRequest,
  deleteBookmarkRequest,
  updatePinnedRequest,
  updateBookmarkRequest,
} from "../api/bookmarkApi";

import type { ApiResponse, BookmarkModel, IBookmark } from "../types";

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

  activeTitle: string;
  setActiveTitle: (text: string) => void;

  // Api Actions
  createBookmark: (bookmark: IBookmark) => Promise<void>;
  updateIsArchived: (id: string) => Promise<void>;
  updatePinned: (id: string) => Promise<void>;
  updateBookmark: (id: string, updates: IBookmark) => Promise<void>;
  deleteBookmark: (id: string) => Promise<void>;

  // Helper
  fetchBookmarks: (query?: Record<string, unknown>) => Promise<BookmarkModel[]>;
  syncBookmarks: () => Promise<void>;
  runApiRequest: <A extends unknown[], T>(
    fn: (...args: A) => Promise<ApiResponse<T>>,
    ...args: A
  ) => Promise<void>;
}

export const useBookmarksStore = create<BookmarksStore>()(
  persist(
    (set, get) => ({
      // States
      bookmarks: [],
      setBookmarks: async (query) => {
        set({ bookmarks: await get().fetchBookmarks(query) });
      },

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

      activeTitle: "All bookmarks",
      setActiveTitle: (text) => set({ activeTitle: text }),

      // Api Actions
      createBookmark: async (bookmark) =>
        await get().runApiRequest(createBookmarkRequest, bookmark),

      updateIsArchived: async (id) =>
        await get().runApiRequest(updateIsArchivedRequest, id),

      updatePinned: async (id) =>
        await get().runApiRequest(updatePinnedRequest, id),

      updateBookmark: async (id, updates) =>
        await get().runApiRequest(updateBookmarkRequest, id, updates),

      deleteBookmark: async (id) =>
        await get().runApiRequest(deleteBookmarkRequest, id),

      // Helpers
      fetchBookmarks: async (query) => {
        const res = await getBookmarksRequest(query ?? {});
        if (!res.ok) throw new Error(res.message);
        return res.data;
      },

      runApiRequest: async <A extends unknown[], T>(
        fn: (...args: A) => Promise<ApiResponse<T>>,
        ...args: A
      ) => {
        const res = await fn(...args);
        if (!res.ok) throw new Error(res.message);
        await get().syncBookmarks();
      },

      syncBookmarks: async () => {
        await get().setBookmarks();
        get().setTags();
      },
    }),
    {
      name: "bookmarks",
      partialize: (s) => ({
        activeTitle: s.activeTitle,
      }),
    },
  ),
);
