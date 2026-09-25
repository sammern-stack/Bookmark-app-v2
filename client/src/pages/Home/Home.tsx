import styles from "./Home.module.scss";
import { BookmarkSidebar, PageHeader, PageLayout } from "@/layout";

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

const Home = () => {
  const { dropdownRef, openDropdown, toggle } = useDropdown();
  const sortByFilter = useFiltersStore((s) => s.sortByFilter);
  const { setSortByFilter } = useFiltersStore.getState();
  const queryFilters = useBookmarkQueryFilters();
  const { data = [] } = useBookmarks(queryFilters);
  const bookmarks = useSortBookmarks(data, sortByFilter);

  return (
    <PageLayout header={<PageHeader />} sidebar={<BookmarkSidebar />}>
      <div className={styles.homeContent__header}>
        <BookmarkTitle />
        <div className={styles.homeContent__sortByDropdown} ref={dropdownRef}>
          <Button variant="secondary" onClick={toggle}>
            <SortbyIcon /> Sort by
          </Button>

          {openDropdown && (
            <ul className={styles.homeContent__sortByMenu}>
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
      <div className={styles.homeContent__bookmarkGrid}>
        {bookmarks.map((b) => (
          <BookmarkCard bookmark={b} />
        ))}
      </div>
    </PageLayout>
  );
};

export default Home;
