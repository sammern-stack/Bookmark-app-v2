import styles from "./BookmarkContent.module.scss";
import {
  useFiltersStore,
  type SortBy,
} from "@/features/settings/stores/filterStore";

import {
  BookmarkCard,
  BookmarkTitle,
  useBookmarkQueryFilters,
  useBookmarks,
  useSortBookmarks,
} from "@/features/bookmark";

import { Button } from "@/shared/components";
import { useDropdown } from "@/shared/hooks";

import SortbyIcon from "@/assets/images/icon-sort.svg?react";
import SortbyCheckIcon from "@/assets/images/icon-sort-by-check.svg?react";

const sortByOptions: SortBy[] = [
  "Most visited",
  "Recently added",
  "Recently visited",
];

export const BookmarkContent = () => {
  const { dropdownRef, openDropdown, toggle } = useDropdown();
  const sortByFilter = useFiltersStore((s) => s.sortByFilter);
  const { setSortByFilter } = useFiltersStore.getState();
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
            <ul className={styles.bookmarkContent__sortByMenu}>
              {sortByOptions.map((option) => (
                <li onClick={() => setSortByFilter(option)}>
                  <span>{option}</span>
                  {sortByFilter === option && <SortbyCheckIcon />}
                </li>
              ))}
            </ul>
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
