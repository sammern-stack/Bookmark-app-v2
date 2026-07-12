import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useBookmarksStore } from "@/features/bookmark/stores/bookmarkStore";

type MainFilter = "home" | "archived";
export type SortBy = "Recently added" | "Recently visited" | "Most visited";

interface FilterStore {
  mainFilter: MainFilter;
  setMainFilter: (filter: MainFilter) => void;

  tagFilters: string[];
  addTagFilter: (tag: string) => void;
  removeTagFilter: (tag: string) => void;
  clearTagsFilters: () => void;

  sortByFilter: SortBy;
  setSortByFilter: (sortBy: SortBy) => void;

  updatePageTitle: (title: string) => void;
}

export const useFiltersStore = create<FilterStore>()(
  persist(
    (set, get) => ({
      mainFilter: "home",
      setMainFilter: (filter) => {
        const { updatePageTitle } = get();
        updatePageTitle(
          filter === "home" ? "All bookmarks" : "Archived bookmarks",
        );
        set({ mainFilter: filter });
      },

      tagFilters: [],
      addTagFilter: (tag) => {
        set((state) => {
          const nextTags = [...state.tagFilters, tag];
          get().updatePageTitle(`Bookmarks tagged: ${nextTags.join(", ")}`);
          return { tagFilters: nextTags };
        });
      },

      removeTagFilter: (tag) => {
        set((state) => {
          const nextTags = state.tagFilters.filter((t) => t !== tag);
          const pageTitle =
            nextTags.length !== 0
              ? `Bookmarks tagged: ${nextTags.join(", ")}`
              : state.mainFilter === "home"
                ? "All bookmarks"
                : "Archived bookmarks";

          get().updatePageTitle(pageTitle);
          return { tagFilters: nextTags };
        });
      },

      clearTagsFilters: () => {
        const { mainFilter, updatePageTitle } = get();
        updatePageTitle(
          mainFilter === "home" ? "All bookmarks" : "Archived bookmarks",
        );
        set({ tagFilters: [] });
      },

      sortByFilter: "Recently added",
      setSortByFilter: (sortBy) => set({ sortByFilter: sortBy }),

      updatePageTitle: (title) => {
        useBookmarksStore.getState().setActiveTitle(title);
      },
    }),
    {
      name: "filters",
      partialize: (state) => ({
        mainFilter: state.mainFilter,
        tagFilters: state.tagFilters,
        sortByFilter: state.sortByFilter,
      }),
    },
  ),
);
