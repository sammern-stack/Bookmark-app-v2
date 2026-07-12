import { toTimestamp } from "@/shared/utils/date";
import type { SortBy } from "@/stores/useFiltersStore";
import type { BookmarkSchema } from "../types";

export const sortBookmarks = (bookmarks: BookmarkSchema[], sortby: SortBy) => {
  return [...bookmarks].sort((a, b) =>
    sortby === "Most visited"
      ? b.visitCount - a.visitCount
      : sortby === "Recently visited"
        ? toTimestamp(b.lastVisited) - toTimestamp(a.lastVisited)
        : toTimestamp(b.createdAt) - toTimestamp(a.createdAt),
  );
};

export const prioritizePinnedBookmarks = (bookmarks: BookmarkSchema[]) => {
  const pinned = bookmarks.filter((b) => b.pinned);
  const rest = bookmarks.filter((b) => !b.pinned);
  return [...pinned, ...rest];
};
