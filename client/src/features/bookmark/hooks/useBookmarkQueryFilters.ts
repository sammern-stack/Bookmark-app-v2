import { useMemo } from "react";
import { useFiltersStore } from "@/stores";
import type { BookmarkFilters } from "../types";

export const useBookmarkQueryFilters = (): BookmarkFilters => {
  const mainFilter = useFiltersStore((s) => s.mainFilter);
  const tagFilters = useFiltersStore((s) => s.tagFilters);

  return useMemo(
    () => ({
      ...(mainFilter === "archived" ? { isArchived: true } : {}),
      ...(tagFilters.length > 0 ? { tags: tagFilters } : {}),
    }),
    [mainFilter, tagFilters],
  );
};
