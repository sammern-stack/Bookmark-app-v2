import { useMemo } from "react";
import type { SortBy } from "@/features/settings/stores/filterStore";
import { toTimestamp } from "@/shared/utils/date";
import type { BookmarkSchema } from "../types";

export const useSortBookmarks = (
  bookmarks: BookmarkSchema[],
  sortBy: SortBy,
) => {
  return useMemo(() => {
    const sortedBookmarks = [...bookmarks].sort((a, b) =>
      sortBy === "Most visited"
        ? b.visitCount - a.visitCount
        : sortBy === "Recently visited"
          ? toTimestamp(b.lastVisited) - toTimestamp(a.lastVisited)
          : toTimestamp(b.createdAt) - toTimestamp(a.createdAt),
    );

    const pinnedBookmarks = sortedBookmarks.filter((b) => b.pinned);
    const unpinnedBookmarks = sortedBookmarks.filter((b) => !b.pinned);

    return [...pinnedBookmarks, ...unpinnedBookmarks];
  }, [bookmarks, sortBy]);
};
