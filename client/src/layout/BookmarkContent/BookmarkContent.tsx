import styles from "./BookmarkContent.module.scss";
import { useMemo } from "react";
import { useFiltersStore } from "@/stores";

import { useBookmarks } from "@/features/bookmark/hooks/useBookmarks";
import { useBookmarkQueryFilters } from "@/features/bookmark/hooks/useBookmarkQueryFilters";
import {
  sortBookmarks,
  prioritizePinnedBookmarks,
} from "@/features/bookmark/utils/bookmarkListUtils";
import { BookmarkTitle, BookmarkCard } from "@/features/bookmark";

import { SortbyButton, SortbyOption } from "@/features/settings";
import { Dropdown, List } from "@/shared/components";

export const BookmarkContent = () => {
  // Fetch bookmarks based on the current filters
  const sortByFilter = useFiltersStore((s) => s.sortByFilter);
  const queryFilters = useBookmarkQueryFilters();
  const { data = [] } = useBookmarks(queryFilters);

  // Process sorting bookmarks (prioritize pinned bookmarks on top)
  const bookmarks = useMemo(() => {
    const list = sortBookmarks(data, sortByFilter);
    return prioritizePinnedBookmarks(list);
  }, [data, sortByFilter]);

  return (
    <div className={styles.bookmarkContent}>
      <div className={styles.bookmarkContent__header}>
        <BookmarkTitle />
        <Dropdown
          className={styles.bookmarkContent__sortBy}
          toggle={<SortbyButton />}
        >
          <SortbyOption sortBy="Recently added" />
          <SortbyOption sortBy="Recently visited" />
          <SortbyOption sortBy="Most visited" />
        </Dropdown>
      </div>
      <List className={styles.bookmarkContent__bookmarkGrid} list={bookmarks}>
        {(b) => <BookmarkCard bookmark={b} />}
      </List>
    </div>
  );
};
