import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useUIVisibilityStore } from "@/shared/stores";
import type { BookmarkSchema } from "../types";

interface BookmarkStore {
  selectedBookmark: BookmarkSchema | null;
  setSelectedBookmark: (bookmark: BookmarkSchema | null) => void;

  activeForm: "create" | "update" | null;
  openCreateForm: () => void;
  openUpdateForm: () => void;
  closeForm: (check?: boolean) => void;

  activeTitle: string;
  setActiveTitle: (text: string) => void;
}

export const useBookmarksStore = create<BookmarkStore>()(
  persist(
    (set, get) => {
      const toggle = useUIVisibilityStore.getState().toggle;

      return {
        selectedBookmark: null,
        setSelectedBookmark: (bookmark) => set({ selectedBookmark: bookmark }),

        activeForm: null,
        openCreateForm: () => {
          set({ activeForm: "create" });
          toggle("createForm");
        },
        openUpdateForm: () => {
          set({ activeForm: "update" });
          toggle("updateForm");
        },
        closeForm: (check?: boolean) => {
          const isCreateForm =
            typeof check === "boolean" ? !check : get().activeForm === "create";

          toggle(isCreateForm ? "createForm" : "updateForm");
          set({ activeForm: null });
        },

        activeTitle: "All bookmarks",
        setActiveTitle: (text) => set({ activeTitle: text }),
      };
    },
    {
      name: "bookmarks",
      partialize: (state) => ({
        selectedBookmark: state.selectedBookmark,
        activeForm: state.activeForm,
        activeTitle: state.activeTitle,
      }),
    },
  ),
);
