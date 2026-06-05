import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useBookmarksStore } from "./useBookmarksStore";

type MainFilter = "all" | "archived";

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

  // Helper
  applyFilters: () => void;
}

export const useFiltersStore = create<FiltersStore>()(
  persist(
    (set, get) => ({
      mainFilter: "all",
      setMainFilter: (filter) => {
        set({ mainFilter: filter });
        get().applyFilters();
      },

      tagFilters: [],
      addTagFilter: (tag) => {
        set((s) => ({ tagFilters: [...s.tagFilters, tag] }));
        console.log(get().tagFilters);
        get().applyFilters();
      },

      removeTagFilter: (tag) => {
        set((s) => ({ tagFilters: s.tagFilters.filter((t) => t !== tag) }));
        console.log(get().tagFilters);
        get().applyFilters();
      },

      applyFilters: () => {
        const { mainFilter, tagFilters } = get();
        const query = buildQuery(mainFilter, tagFilters);
        useBookmarksStore.getState().setBookmarks(query);
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
