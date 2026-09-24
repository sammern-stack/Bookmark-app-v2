import styles from "./BookmarkContent.module.scss";
import { useFiltersStore } from "@/features/settings/stores/filterStore";

import {
  BookmarkCard,
  BookmarkTitle,
  useBookmarkQueryFilters,
  useBookmarks,
  useSortBookmarks,
} from "@/features/bookmark";

import { SortbyOption } from "@/features/settings";
import { Button } from "@/shared/components";
import { useDropdown } from "@/shared/hooks";

import SortbyIcon from "@/assets/images/icon-sort.svg?react";

export const BookmarkContent = () => {
  const { dropdownRef, openDropdown, toggle } = useDropdown();
  const sortByFilter = useFiltersStore((s) => s.sortByFilter);
  const queryFilters = useBookmarkQueryFilters();
  const { data = [] } = useBookmarks(queryFilters);
  const bookmarks = useSortBookmarks(data, sortByFilter);

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
      <div className={styles.bookmarkContent__bookmarkGrid}>
        {bookmarks.map((b) => (
          <BookmarkCard bookmark={b} />
        ))}
      </div>
    </div>
  );
};
