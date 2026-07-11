import styles from "./BookmarkContent.module.scss";
import { useBookmarksStore } from "@/stores";
import { BookmarkTitle, BookmarkCard } from "@/features/bookmark";
import { SortbyButton, SortbyOption } from "@/features/settings";
import { Dropdown, List } from "@/shared/components";

export const BookmarkContent = () => {
  const bookmarks = useBookmarksStore((s) => s.bookmarks);

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
