import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useBookmarksStore } from "./useBookmarksStore";

type MainFilter = "all" | "archived";

interface FiltersStore {
  mainFilter: MainFilter;
  setMainFilter: (filter: MainFilter) => void;

  tagFilters: string[];
  addTagFilter: (tag: string) => void;

  query: Record<string, unknown>;
}

export const useFiltersStore = create<FiltersStore>()(
  persist(
    (set, get) => ({
      mainFilter: "all",
      setMainFilter: (filter) => {
        const { query, mainFilter } = get();
        const { setBookmarks } = useBookmarksStore.getState();

        set({ mainFilter: filter });
        query.isArchived = mainFilter === "archived" ? true : undefined;
        setBookmarks(query);
      },

      tagFilters: [],
      addTagFilter: (tag) =>
        set((s) => ({ tagFilters: [...s.tagFilters, tag] })),

      query: {},
    }),
    { name: "filters" },
  ),
);
