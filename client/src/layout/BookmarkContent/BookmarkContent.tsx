import styles from "./BookmarkContent.module.scss";
import { useMemo } from "react";
import { useFiltersStore } from "@/features/settings/stores/filterStore";

import {
  BookmarkCard,
  BookmarkTitle,
  useBookmarkQueryFilters,
  useBookmarks,
  prioritizePinnedBookmarks,
  sortBookmarks,
} from "@/features/bookmark";

import { SortbyOption } from "@/features/settings";
import { Button, List } from "@/shared/components";
import { useDropdown } from "@/shared/hooks";

import SortbyIcon from "@/assets/images/icon-sort.svg?react";

export const BookmarkContent = () => {
  const { dropdownRef, openDropdown, toggle } = useDropdown();

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
        <div
          className={styles.bookmarkContent__sortByDropdown}
          ref={dropdownRef}
        >
          <Button variant="secondary" onClick={toggle}>
            <SortbyIcon /> Sort by
          </Button>

          {openDropdown && (
            <div className={styles.bookmarkContent__sortByMenu}>
              <SortbyOption sortBy="Recently added" />
              <SortbyOption sortBy="Recently visited" />
              <SortbyOption sortBy="Most visited" />
            </div>
          )}
        </div>
      </div>
      <List className={styles.bookmarkContent__bookmarkGrid} list={bookmarks}>
        {(b) => <BookmarkCard bookmark={b} />}
      </List>
    </div>
  );
};
