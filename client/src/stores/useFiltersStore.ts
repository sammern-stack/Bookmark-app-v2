import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useBookmarksStore } from "./useBookmarksStore";

type MainFilter = "home" | "archived";
export type SortBy = "Recently added" | "Recently visited" | "Most visited";

// Helper
const buildQuery = (mainFilter: MainFilter, tagFilters: string[]) => {
  const query: Record<string, unknown> = {};

  if (mainFilter === "archived") query.isArchived = true;
  if (tagFilters.length > 0) query.tags = tagFilters;

  return query;
};

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
  applyFilters: () => void;
  updatePageTitle: (title: string) => void;
}

export const useFiltersStore = create<FiltersStore>()(
  persist(
    (set, get) => ({
      mainFilter: "home",
      setMainFilter: (filter) => {
        set({ mainFilter: filter });
        get().applyFilters();
      },

      tagFilters: [],
      addTagFilter: (tag) => {
        set((s) => ({ tagFilters: [...s.tagFilters, tag] }));
        get().applyFilters();
        get().updatePageTitle(
          `Bookmarks tagged: ${get().tagFilters.join(", ")}`,
        );
      },

      removeTagFilter: (tag) => {
        set((s) => ({ tagFilters: s.tagFilters.filter((t) => t !== tag) }));
        get().applyFilters();

        const pageTitle =
          get().tagFilters.length !== 0
            ? `Bookmarks tagged: ${get().tagFilters.join(", ")}`
            : get().mainFilter === "home"
              ? "All bookmarks"
              : "Archived bookmarks";

        get().updatePageTitle(pageTitle);
      },

      clearTagsFilters: () => {
        set({ tagFilters: [] });
        get().applyFilters();
      },

      sortByFilter: "Recently added",
      setSortByFilter: (sortBy) => set({ sortByFilter: sortBy }),

      // Helpers
      applyFilters: () => {
        const { mainFilter, tagFilters } = get();
        const query = buildQuery(mainFilter, tagFilters);
        useBookmarksStore.getState().setBookmarks(query);
      },

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
