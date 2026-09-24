import { useMemo } from "react";
import { countOccurrences } from "@/shared/utils/collections";
import type { BookmarkSchema } from "../types";

export const useCountTagOccurrences = (bookmarks: BookmarkSchema[]) => {
  return useMemo(() => {
    const tags = bookmarks.flatMap((b) => b.tags);
    return countOccurrences(tags);
  }, [bookmarks]);
};
