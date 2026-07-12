import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useBookmarksStore } from "./useBookmarksStore";

type MainFilter = "home" | "archived";
export type SortBy = "Recently added" | "Recently visited" | "Most visited";

interface FiltersStore {
  mainFilter: MainFilter;
  setMainFilter: (filter: MainFilter) => void;

  tagFilters: string[];
  addTagFilter: (tag: string) => void;
  removeTagFilter: (tag: string) => void;
  clearTagsFilters: () => void;

  sortByFilter: SortBy;
  setSortByFilter: (sortBy: SortBy) => void;

  // Helper
  updatePageTitle: (title: string) => void;
}

export const useFiltersStore = create<FiltersStore>()(
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
        const { updatePageTitle, tagFilters } = get();
        updatePageTitle(`Bookmarks tagged: ${tagFilters.join(", ")}`);
        set((s) => ({ tagFilters: [...s.tagFilters, tag] }));
      },

      removeTagFilter: (tag) => {
        const { tagFilters, mainFilter, updatePageTitle } = get();

        const pageTitle =
          tagFilters.length !== 0
            ? `Bookmarks tagged: ${tagFilters.join(", ")}`
            : mainFilter === "home"
              ? "All bookmarks"
              : "Archived bookmarks";

        updatePageTitle(pageTitle);
        set((s) => ({ tagFilters: s.tagFilters.filter((t) => t !== tag) }));
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
      partialize: (s) => ({
        mainFilter: s.mainFilter,
        tagFilters: s.tagFilters,
        sortByFilter: s.sortByFilter,
      }),
    },
  ),
);
