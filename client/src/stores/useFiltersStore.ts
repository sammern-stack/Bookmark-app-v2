import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useBookmarksStore } from "./useBookmarksStore";

type MainFilter = "home" | "archived";

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
        get().updatePageTitle(`Tagged: ${get().tagFilters.join(", ")}`);
      },

      removeTagFilter: (tag) => {
        set((s) => ({ tagFilters: s.tagFilters.filter((t) => t !== tag) }));
        get().applyFilters();

        const pageTitle =
          get().tagFilters.length !== 0
            ? `Tagged: ${get().tagFilters.join(", ")}`
            : get().mainFilter === "home"
              ? "All bookmarks"
              : "Archived bookmarks";

        get().updatePageTitle(pageTitle);
      },

      clearTagsFilters: () => {
        set({ tagFilters: [] });
        get().applyFilters();
      },

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
      }),
    },
  ),
);
